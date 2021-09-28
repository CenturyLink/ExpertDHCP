import os
import sys
import json
from flask import request, Blueprint, Response
from flask_cors import cross_origin
from concurrent.futures import ThreadPoolExecutor
from multiprocessing import Process
from dhcp_monitor.command_scripts.stream_handler import StreamHandler
from dhcp_monitor.data_manipulation.dump_message_handler import DataHandler
from dhcp_monitor.command_scripts.log_handler import LogHandler
from config import KEA_LOGPATH, DUMP_PATH, DUMP_INTERFACE, REQUIRE_API_AUTHENTICATION
from utils import MONITOR_LOGGER, check_path


MONITOR_BP = Blueprint('dhcp_monitor', __name__, url_prefix='/monitor')

SERVICE_CODE = "000"
STATUS_OK = "OK"
STATUS_KO = "KO"

HTTP_200 = 200  # Success
HTTP_400 = 404  # Bad request
HTTP_401 = 401  # None or bad credentials sent
HTTP_500 = 500  # General internal server error


SUCCESS_1000 = "1000"
SUCCESS_1000_VALUE = "Command execution successful"

ERROR_4000 = "4000"
ERROR_4000_VALUE = "Exception occured in the server. Command unsuccessful"
ERROR_4001 = "4001"
ERROR_4001_VALUE = "Could not find JSON key"

PACKET_CAPTURE_PID_FILE = 'packet_monitor.pid'
stream_instance = StreamHandler(dump_path=DUMP_PATH, dump_if=DUMP_INTERFACE)
log_handler_instance = LogHandler(logfile=KEA_LOGPATH)
log_map_handler = DataHandler(log_handler_instance)
data_handler = DataHandler(stream_instance)


#######################################################################################################################
#                                            FAST API AUTH HOOK START                                                 #
#######################################################################################################################

if REQUIRE_API_AUTHENTICATION:
    from fast_api_auth.utility.helpers import get_authenticator

    RAW_API_CODE = '***'
    GET_AUTH_TOKEN_API = '111'

    ERROR_5000 = "5000"
    ERROR_5000_VALUE = "Unauthorised"
    ERROR_5001 = "5001"
    ERROR_5001_VALUE = "Could not connect to Mongo DB server"

    ADMIN_API = ['status', 'rows', 'trigger', 'terminate', 'row_count']

    authenticator = get_authenticator(SERVICE_CODE)

    @MONITOR_BP.before_request
    def require_auth_token():
        if request.endpoint.split('.')[-1] not in ['home', 'get_auth_token']:
            hdr_token = request.headers['auth-token'] if 'auth-token' in request.headers else ''
            admin_req = True if request.endpoint.split('.')[-1] in ADMIN_API else False
            if not authenticator.check_api_key(hdr_token, admin_required=admin_req):
                auth, data = authenticator.verify_auth_token(hdr_token, admin_required=admin_req)
                if not auth:
                    return response_generator(
                        STATUS_KO,
                        HTTP_200,
                        SERVICE_CODE + RAW_API_CODE + ERROR_5000,
                        ERROR_5000_VALUE,
                        {'error': data}
                    )

    @MONITOR_BP.route("/token", methods=['POST'])
    @cross_origin()
    def get_auth_token():
        """
            A HTTP GET function to GET an AUTH Token
        """
        from pymongo.errors import ServerSelectionTimeoutError
        json_req_data = request.get_json()
        if not json_req_data:
            return response_generator(
                STATUS_KO,
                HTTP_401,
                SERVICE_CODE + GET_AUTH_TOKEN_API + ERROR_4001,
                ERROR_4001_VALUE,
                {'error': ERROR_4001_VALUE})
        else:
            try:
                token = authenticator.generate_auth_token(json_req_data['username'],
                                                          json_req_data['password']).decode('utf8')
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + GET_AUTH_TOKEN_API + SUCCESS_1000,
                    SUCCESS_1000_VALUE,
                    {"token": token})
            except ServerSelectionTimeoutError as excp:
                exc_type, exc_obj, exc_tb = sys.exc_info()
                file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + GET_AUTH_TOKEN_API + ERROR_5001,
                    ERROR_5001_VALUE,
                    {"error": str(excp)}
                )
            except Exception as excp:
                exc_type, exc_obj, exc_tb = sys.exc_info()
                file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + GET_AUTH_TOKEN_API + ERROR_4000,
                    ERROR_4000_VALUE,
                    {"error": str(excp)}
                )
            return response

#######################################################################################################################
#                                            FAST API AUTH HOOK END                                                   #
#######################################################################################################################

def start_threads():
    try:
        with ThreadPoolExecutor(max_workers=min(32, os.cpu_count() + 4), thread_name_prefix='pooler') as executor:
            MONITOR_LOGGER.info("Starting log map handler")
            executor.submit(fn=log_map_handler.print_tail)
            MONITOR_LOGGER.info("Starting data handler")
            executor.submit(fn=data_handler.create_dataframe)
            MONITOR_LOGGER.info("Done")
        return {'data': 'success', 'triggered': check_trigger_status()}
    except Exception as excp:
        return {'error': repr(excp), 'triggered': check_trigger_status()}


def check_trigger_status():
    return check_path(PACKET_CAPTURE_PID_FILE)



@MONITOR_BP.route('/status', methods=['GET'])
@cross_origin()
def status():
    try:
        return {'triggered': check_trigger_status()}
    except Exception as excp:
        return {'error': repr(excp), 'triggered': check_trigger_status()}


@MONITOR_BP.route('/', methods=['GET'])
@cross_origin()
def home():
    try:
        return {'data': 'DHCP Monitor up.', 'triggered': check_trigger_status()}
    except Exception as excp:
        return {'error': repr(excp), 'triggered': check_trigger_status()}


@MONITOR_BP.route('/get_rows', methods=['POST'])
@cross_origin()
def rows():
    try:
        req = request.get_json()
        data = data_handler.get_rows(int(req['offset']), int(req['count']))
        return data
    except Exception as excp:
        return {'error': repr(excp), 'triggered': check_trigger_status()}


@MONITOR_BP.route('/trigger', methods=['GET'])
@cross_origin()
def trigger():
    try:
        if check_trigger_status():
            return {'triggered': check_trigger_status()}
        data_handler.reset_dump_collection_file()
        MONITOR_LOGGER.info("Starting log map handler")
        dump_process = Process(target=start_threads)
        dump_process.start()
        with open(PACKET_CAPTURE_PID_FILE, 'w') as file:
            MONITOR_LOGGER.info('Writing to file - DUMP Process PID -> %s', dump_process.pid)
            file.write(str(dump_process.pid))
        MONITOR_LOGGER.info("Starting data handler")
        return {'data': 'success', 'triggered': check_trigger_status()}
    except Exception as excp:
        return {'error': repr(excp), 'triggered': check_trigger_status()}


@MONITOR_BP.route('/terminate', methods=['GET'])
@cross_origin()
def terminate():
    print('hi')
    MONITOR_LOGGER.info("Getting global variable")
    try:
        MONITOR_LOGGER.info("Stopping now")
        if check_trigger_status():
            MONITOR_LOGGER.info("Trigger found")
            with open(PACKET_CAPTURE_PID_FILE) as file:
                pid = file.read()
                MONITOR_LOGGER.info('DUMP Process PID from FILE -> %s', pid)
                os.kill(int(pid), 9)
            os.remove(PACKET_CAPTURE_PID_FILE)
            MONITOR_LOGGER.info("Dump terminated")
        else:
            MONITOR_LOGGER.info("No Trigger found")
        return {'data': 'success', 'triggered': check_trigger_status()}
    except Exception as excp:
        return {'error': repr(excp), 'triggered': check_trigger_status()}


@MONITOR_BP.route('/row_count', methods=['GET'])
@cross_origin()
def row_count():
    try:
        MONITOR_LOGGER.debug("Getting row count")
        data = data_handler.row_count()
        if isinstance(data, int):
            return {'data': data, 'triggered': check_trigger_status()}
        else:
            return {'error': data, 'triggered': check_trigger_status()}
    except Exception as excp:
        return {'error': repr(excp), 'triggered': check_trigger_status()}


def response_generator(status, http_code, output_code, output_value, data):
    """ Response formatted to suit fast core """
    MONITOR_LOGGER.info('Executing')
    return_value = {
        "status": status,
        'statusCode': output_code,
        'statusValue': output_value,
        'data': data
    }
    json_return_value = json.dumps(return_value)
    MONITOR_LOGGER.info("json_return_value = %s", str(json_return_value))
    response = Response(json_return_value, status=http_code,
                        mimetype='application/json')
    MONITOR_LOGGER.info('Returning %s', str(return_value))
    return response

