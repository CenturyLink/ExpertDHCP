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

# Check for API keys if REQUIRE_API_AUTHENTICATION is enabled in 
if REQUIRE_API_AUTHENTICATION:
    GET_AUTH_TOKEN_API = '111'
    ERROR_5000 = "5000"
    ERROR_5000_VALUE = "Invalid request"
    ERROR_5001 = "5001"
    ERROR_5001_VALUE = "Could not find API key in request"
    ERROR_5002 = "5002"
    ERROR_5002_VALUE = "Incorrect API key"

    # This function will be called every time a request is received. In case
    # the request is a GET, then apikey is extracted from the GET request and
    # checked for validity. Other requests are handled similarly.
    @BP.before_request
    def check_auth():
        print("DEBUG: request.endpoint = " + str(request.endpoint))
        LOGGER.debug("request.endpoint = " + str(request.endpoint))
        if request.endpoint == "dhcp4.home":
            return            

        # If request method is POST
        if request.method == 'POST':
            print("DEBUG: request is POST")
            LOGGER.debug("DEBUG: request is POST")

            # Extract POST data, look for API key and handle verification
            json_req_data = request.get_json()

            # If no JSON POST request data is found, then return error
            if not json_req_data:
                LOGGER.info("Error - No JSON data")
                print("Error - No JSON data")
                response = response_generator(
                    STATUS_KO,
                    HTTP_400,
                    SERVICE_CODE + CHECK_AUTH_API + ERROR_5000,
                    ERROR_5000_VALUE,
                    {'error': ERROR_5000_VALUE})
                LOGGER.error("JSON ERROR - > %s", ERROR_5000_VALUE)
                return response
           # If JSON POST request data is found, then ...
            else:
                # If API key is found in JSON data then ...
                if "apikey" in json_req_data:
                    apikey = json_req_data['apikey']
                    print("DEBUG: apikey = " + str(apikey))
                    verify_value = verify_api_key(apikey) 
                    print("DEBUG: verify_value = " + str(verify_value))

                    # If API key is incorrect, send an error back
                    if verify_value == False:
                        LOGGER.error("JSON ERROR - > %s", ERROR_5000_VALUE)
                        return return_incorrect_api_key()
                        
                else:
                    print("DEBUG: Could not find API key in request")
                    LOGGER.error("JSON ERROR - > %s", ERROR_5001_VALUE)
                    return return_no_api_key_found()

        if request.method == 'GET':
            print("DEBUG: request is GET")

            # Extract GET arguments, look for API key and handle verification
            api_key = request.args.get('apikey')
            print("DEBUG: api_key = " + str(api_key))
            LOGGER.debug("DEBUG: api_key = " + str(api_key))

            # If no apikey is found then return error
            if api_key is None:
                return return_no_api_key_found()
            else:
                print("DEBUG: api_key = " + str(api_key))
                LOGGER.debug("DEBUG: api_key = " + str(api_key))

                verify_value = verify_api_key(api_key)
                print("DEBUG: check_auth(): verify_value = " + 
                    str(verify_value))
                LOGGER.debug("DEBUG: check_auth(): verify_value = " +
                    str(verify_value))

                if verify_value == False:
                    print("DEBUG: check_auth(): returning incorrect api key \
                          response")
                    LOGGER.debug("DEBUG: check_auth(): returning incorrect \
                                 api key response")
                    return return_incorrect_api_key()

        # Implement other methods here

    def return_no_api_key_found():
        response = response_generator(STATUS_KO, HTTP_400,
            SERVICE_CODE + CHECK_AUTH_API + ERROR_5001,
            ERROR_5001_VALUE, {'error': ERROR_5001_VALUE})
        return response

    def return_incorrect_api_key():
        response = response_generator(STATUS_KO, HTTP_401,
            SERVICE_CODE + CHECK_AUTH_API + ERROR_5002, ERROR_5002_VALUE,
            {'error': ERROR_5002_VALUE})
        return response


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

