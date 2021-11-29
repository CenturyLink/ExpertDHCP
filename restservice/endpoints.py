"""
    REST API endpoints written in Flask
    Only POST Calls for requests requiring data
"""
import sys
import json
import os
from flask import request, Blueprint
from flask_cors import cross_origin
from restservice import LOGGER
from restservice.config import SERVICE_CODE, REQUIRE_API_AUTHENTICATION
from restservice.utilities import response_generator, get_config, leases_hook, get_reservation_info, add_reservation, \
    add_subnets, add_reservation_options, add_subnet_options, del_reservation, delete_subnet_options, modify_subnets, \
    delete_reservation_options, delete_subnets, add_client_classes, delete_client_classes, modify_client_classes
from restservice.apikeyhandler import verify_api_key

BP = Blueprint('dhcp4', __name__, url_prefix='/dhcp4')

STATUS_OK = "OK"
STATUS_KO = "KO"

HTTP_200 = 200  # Success
HTTP_400 = 404  # Bad request
HTTP_401 = 401  # None or bad credentials sent
HTTP_500 = 500  # General internal server error

# API CODE FOR SERVICE 100
HOME_API_CODE = "001"
GET_CONFIG_API_CODE = "002"
GET_IP_FROM_MAC_ADDRESS_API_CODE = "003"
GET_ALL_RESERVATIONS_API_CODE = "004"
ADD_RESERVATION_API_CODE = "005"
DELETE_RESERVATION_API_CODE = "006"
ADD_SUBNET4_API_CODE = "007"
DELETE_SUBNET4_API_CODE = "008"
MODIFY_SUBNET4_API_CODE = "009"
ADD_SUBNET_OPTION_API_CODE = "010"
DELETE_SUBNET_OPTION_API_CODE = "011"
ADD_SUBNET_RESERVATION_OPTION_API_CODE = "012"
DELETE_SUBNET_RESERVATION_OPTION_API_CODE = "013"
GET_ALL_LEASES_API_CODE = "014"
ADD_LEASES_API_CODE = "015"
UPDATE_LEASES_API_CODE = "016"
DELETE_LEASES_API_CODE = "017"
WIPE_LEASES_API_CODE = "018"
ADD_CLIENT_CLASSES_API_CODE = "019"
DELETE_CLIENT_CLASSES_API_CODE = "020"
MODIFY_CLIENT_CLASSES_API_CODE = "021"

RESULT_SUCCESS = 0
RESULT_FAILURE = 1
RESULT_EMPTY = 3

# RESPONSE CODES FOR SERVICE 900 - FastDHCP
SUCCESS_1000 = "1000"
SUCCESS_1000_VALUE = "Command execution successful"
SUCCESS_1001 = "1001"
SUCCESS_1001_VALUE = "Leases are empty"
SUCCESS_1002 = "1002"
SUCCESS_1002_VALUE = "No lease found to delete"
SUCCESS_1003 = "1003"
SUCCESS_1003_VALUE = "No lease found to wipe"

ERROR_4000 = "4000"
ERROR_4000_VALUE = "Exception occured in the server. Command unsuccessful"
ERROR_4001 = "4001"
ERROR_4001_VALUE = "Could not find JSON key"
ERROR_4002 = "4002"
ERROR_4002_VALUE = "Unable to fetch server Configuration"
ERROR_4003 = "4003"
ERROR_4003_VALUE = "IP Address not found"
ERROR_4004 = '4004'
ERROR_4004_VALUE = 'Could not fetch leases'
ERROR_4005 = '4005'
ERROR_4005_VALUE = 'Unable to fetch reservations from server.'
ERROR_4006 = "4006"
ERROR_4006_VALUE = "Failed to add reservation due to an issue with KEA server response"
ERROR_4007 = "4007"
ERROR_4007_VALUE = "Failed to add reservation"
ERROR_4008 = "4008"
ERROR_4008_VALUE = "Failed to remove reservation due to an issue with KEA server response"
ERROR_4009 = "4009"
ERROR_4009_VALUE = "Failed to remove reservation"
ERROR_4010 = "4010"
ERROR_4010_VALUE = "Failed to add subnet due to an issue with KEA server response"
ERROR_4011 = "4011"
ERROR_4011_VALUE = "Failed to add subnet"
ERROR_4012 = "4012"
ERROR_4012_VALUE = "Failed to remove subnet due to an issue with KEA server response"
ERROR_4013 = "4013"
ERROR_4013_VALUE = "Failed to remove subnet"
ERROR_4014 = "4014"
ERROR_4014_VALUE = "Failed to add subnet option due to an issue with KEA server response"
ERROR_4015 = "4015"
ERROR_4015_VALUE = "Failed to add subnet option"
ERROR_4016 = "4016"
ERROR_4016_VALUE = "Failed to remove subnet option due to an issue with KEA server response"
ERROR_4017 = "4017"
ERROR_4017_VALUE = "Failed to remove subnet option"
ERROR_4018 = "4018"
ERROR_4018_VALUE = "Failed to add subnet reservation option due to an issue with KEA server response"
ERROR_4019 = "4019"
ERROR_4019_VALUE = "Failed to add subnet reservation option"
ERROR_4020 = "4020"
ERROR_4020_VALUE = "Failed to remove subnet reservation option due to an issue with KEA server response"
ERROR_4021 = "4021"
ERROR_4021_VALUE = "Failed to remove subnet reservation option"
ERROR_4022 = "4022"
ERROR_4022_VALUE = "No Leases found"
ERROR_4023 = "4023"
ERROR_4023_VALUE = "Could not add lease successfully"
ERROR_4024 = "4024"
ERROR_4024_VALUE = "Could not update lease successfully"
ERROR_4025 = "4025"
ERROR_4025_VALUE = "Could not delete lease successfully"
ERROR_4026 = "4026"
ERROR_4026_VALUE = "Could not wipe subnet leases successfully"
ERROR_4027 = "4027"
ERROR_4027_VALUE = "Failed to add client class due to an issue with KEA server response"
ERROR_4028 = "4028"
ERROR_4028_VALUE = "Failed to add client class"
ERROR_4029 = "4029"
ERROR_4029_VALUE = "Failed to remove client class due to an issue with KEA server response"
ERROR_4030 = "4030"
ERROR_4030_VALUE = "Failed to remove client class"
ERROR_4031 = "4031"
ERROR_4031_VALUE = "Failed to modify client class due to an issue with KEA server response"
ERROR_4032 = "4032"
ERROR_4032_VALUE = "Failed to modify client class"
ERROR_4033 = "4033"
ERROR_4033_VALUE = "Failed to modify subnet due to an issue with KEA server response"
ERROR_4034 = "4034"
ERROR_4034_VALUE = "Failed to modify subnet"

# Check for API keys if REQUIRE_API_AUTHENTICATION is enabled in 
if REQUIRE_API_AUTHENTICATION:
    CHECK_AUTH_API = '022'
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
        if request.endpoint == "dhcp4.home":
            return            

        # If request method is POST
        if request.method == 'POST':

            print("DEBUG: request is POST")

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

            # If no apikey is found then return error
            if api_key is None:
                return return_no_api_key_found()
            else:
                print("DEBUG: api_key = " + str(api_key))

                verify_value = verify_api_key(api_key)
                print("DEBUG: check_auth(): verify_value = " + str(verify_value))

                if verify_value == False:
                    print("DEBUG: check_auth(): returning incorrect api key response")
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
            


@BP.route("/")
@cross_origin()
def home():
    """
        Homepage to check if FASTDHCP server is working
    """
    LOGGER.info("Executing")
    LOGGER.info("Request url -> /dhcp4/")
    try:
        return response_generator(
            STATUS_OK,
            HTTP_200,
            SERVICE_CODE + HOME_API_CODE + SUCCESS_1000,
            SUCCESS_1000_VALUE,
            {"data": "DHCP Management server is up and running"})
    except Exception as exc:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
        file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
        LOGGER.error(error_msg)
        response = response_generator(
            STATUS_KO,
            HTTP_200,
            SERVICE_CODE + HOME_API_CODE + ERROR_4000,
            ERROR_4000_VALUE,
            {"error": repr(exc)}
        )
    return response


@BP.route("/config", methods=['GET'])
@cross_origin()
def get_kea_config():
    """
    A HTTP GET function to fetch the KEA configuration
    from DHCP server.
    :return : Response config object
    """
    LOGGER.info("Request url -> /dhcp4/config")
    LOGGER.info("Request Method -> GET")
    try:
        kea_config = get_config()
        LOGGER.info("Get config result ->  %s", kea_config)
        if "message" in kea_config:
            LOGGER.error('Error message --> %s', str(kea_config["message"]))
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + GET_CONFIG_API_CODE + ERROR_4002,
                ERROR_4002_VALUE,
                {"error": kea_config["message"]}
            )
        else:
            LOGGER.info("Successfully fetched configuration")
            response = response_generator(
                STATUS_OK,
                HTTP_200,
                SERVICE_CODE + GET_CONFIG_API_CODE + SUCCESS_1000,
                SUCCESS_1000_VALUE,
                {'keaConfig': kea_config}
            )
    except KeyError as exc:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
        file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
        LOGGER.error(error_msg)
        response = response_generator(
            STATUS_KO,
            HTTP_200,
            SERVICE_CODE + GET_CONFIG_API_CODE + ERROR_4001,
            ERROR_4001_VALUE,
            {"error": repr(exc)}
        )
    except Exception as exc:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
        file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
        LOGGER.error(error_msg)
        response = response_generator(
            STATUS_KO,
            HTTP_200,
            SERVICE_CODE + GET_CONFIG_API_CODE + ERROR_4000,
            ERROR_4000_VALUE,
            {"error": repr(exc)}
        )
    return response


@BP.route("/getipfrommac", methods=['POST'])
@cross_origin()
def get_ip_from_mac():
    """
        A HTTP GET function to fetch the IP address for mentioned MAC and Subnet
        in the JSON request parameters
        Parameters ---
            mac_address :
            subnet_id : <int> : Subnet ID
    """

    LOGGER.info("Request url -> /dhcp4/getipfrommac")
    LOGGER.info("Request Method -> POST")
    json_req_data = request.get_json()
    if not json_req_data:
        LOGGER.info("Error - No JSON data")
        response = response_generator(
            STATUS_KO,
            HTTP_401,
            SERVICE_CODE + GET_IP_FROM_MAC_ADDRESS_API_CODE + ERROR_4001,
            ERROR_4001_VALUE,
            {'error': ERROR_4001_VALUE})
        LOGGER.error("JSON ERROR - > %s", ERROR_4001_VALUE)
    else:
        LOGGER.info("Printing received JSON data")
        LOGGER.info("json_req_data = %s", str(json_req_data))
        LOGGER.info("subnet_id = %s", json_req_data['subnet_id'])
        LOGGER.info("mac_address = %s", json_req_data['mac_address'])
        try:
            leases = leases_hook(mac=json_req_data['mac_address'],
                                 subnet_id=json_req_data['subnet_id'], get_one=True)
            LOGGER.info("type(response) = %s", str(type(leases)))
            LOGGER.info("response[0] = %s", str(leases[0]))
            LOGGER.info("type(response[0]) = %s", str(type(leases[0])))
            if 'message' not in leases:
                if leases is not None and 'arguments' in leases[0].keys():
                    arguments = leases[0].get("arguments")
                    LOGGER.info("Response -> %s", json.dumps(leases))
                    response = response_generator(
                        STATUS_OK,
                        HTTP_200,
                        SERVICE_CODE + GET_IP_FROM_MAC_ADDRESS_API_CODE + SUCCESS_1000,
                        SUCCESS_1000_VALUE,
                        {"ip_address": arguments})  # .get("ip-address")})
                else:
                    LOGGER.info("Response -> %s", json.dumps(leases))
                    response = response_generator(
                        STATUS_KO,
                        HTTP_200,
                        SERVICE_CODE + GET_IP_FROM_MAC_ADDRESS_API_CODE + ERROR_4003,
                        ERROR_4003_VALUE,
                        {"error": leases})  # .get("text")})
            else:
                LOGGER.error('Error message --> %s', str(leases["message"]))
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + GET_IP_FROM_MAC_ADDRESS_API_CODE + ERROR_4004,
                    ERROR_4004_VALUE,
                    {"error": leases['message']})
        except KeyError as exc:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
            LOGGER.error(error_msg)
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + GET_IP_FROM_MAC_ADDRESS_API_CODE + ERROR_4001,
                ERROR_4001_VALUE,
                {"error": repr(exc)}
            )
        except Exception as excp:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            LOGGER.error('%s, %s, %s', str(exc_type), str(file_name), str(exc_tb.tb_lineno))
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + GET_IP_FROM_MAC_ADDRESS_API_CODE + ERROR_4000,
                ERROR_4000_VALUE,
                {"error": str(excp)}
            )
    return response


@BP.route("/reservations", methods=['POST'])
@cross_origin()
def get_all_reservations():
    """
        A HTTP GET function to fetch the reservations
        within a Subnet from KEA server.
        Parameters ---
            subnet_id : <str> : Subnet ID
    """
    LOGGER.info("Request url -> /dhcp4/reservations")
    LOGGER.info("Request Method -> POST")
    json_req_data = request.get_json()
    if not json_req_data:
        LOGGER.info("Error - No JSON data")
        response = response_generator(
            STATUS_KO,
            HTTP_401,
            SERVICE_CODE + GET_ALL_RESERVATIONS_API_CODE + ERROR_4001,
            ERROR_4001_VALUE,
            {'error': ERROR_4001_VALUE})
        LOGGER.error("JSON ERROR - > %s", ERROR_4001_VALUE)
    else:
        LOGGER.info("Printing received JSON data")
        LOGGER.info("json_req_data = %s", str(json_req_data))
        LOGGER.info("subnet_id = %s", str(json_req_data['subnet_id']))
        try:
            dhcp4_config = get_config()
            LOGGER.info("configuration -> %s", str(dhcp4_config))
            LOGGER.info("subnet_id -> %s", json_req_data['subnet_id'])
            if "message" in dhcp4_config:
                LOGGER.error('Error message --> %s', str(dhcp4_config["message"]))
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + GET_ALL_RESERVATIONS_API_CODE + ERROR_4002,
                    ERROR_4002_VALUE,
                    {'error': dhcp4_config.get("message")})
            else:
                reservations = get_reservation_info(dhcp4_config,
                                                    json_req_data['subnet_id'])
                LOGGER.info("reservations -> %s", reservations)
                if "message" in reservations:
                    LOGGER.error('Error message --> %s', str(reservations["message"]))
                    response = response_generator(
                        STATUS_KO,
                        HTTP_200,
                        SERVICE_CODE + GET_ALL_RESERVATIONS_API_CODE + ERROR_4005,
                        ERROR_4005_VALUE,
                        {'error': reservations.get("message")})
                else:
                    LOGGER.info("Successfully fetched reservations")
                    response = response_generator(
                        STATUS_OK,
                        HTTP_200,
                        SERVICE_CODE + GET_ALL_RESERVATIONS_API_CODE + SUCCESS_1000,
                        SUCCESS_1000_VALUE,
                        {'reservations': reservations})
        except KeyError as exc:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
            LOGGER.error(error_msg)
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + GET_ALL_RESERVATIONS_API_CODE + ERROR_4001,
                ERROR_4001_VALUE,
                {"error": repr(exc)}
            )
        except Exception as exc:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            error_msg = "{}, {}, {}".format(
                exc_type, file_name, exc_tb.tb_lineno)
            LOGGER.error(error_msg)
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + GET_ALL_RESERVATIONS_API_CODE + ERROR_4000,
                ERROR_4000_VALUE,
                {"error": repr(exc)}
            )
    return response


@BP.route("/reservations/add", methods=['POST'])
@cross_origin()
def add_reservations():
    """
        A HTTP POST function to add new Reservations to Subnet.
        Parameters ---
            subnet_id : <int> : Subnet ID
            reservations:
    """
    LOGGER.info("Request url -> /dhcp4/reservations/add")
    LOGGER.info("Request method -> POST")
    json_req_data = request.get_json()
    if not json_req_data:
        response = response_generator(
            STATUS_KO,
            HTTP_401,
            SERVICE_CODE + ADD_RESERVATION_API_CODE + ERROR_4001,
            ERROR_4001_VALUE,
            {'error': ERROR_4001_VALUE})
        LOGGER.error("JSON ERROR - > %s", ERROR_4001_VALUE)
    else:
        LOGGER.info("Printing received JSON data")
        LOGGER.info("json_req_data = %s", str(json_req_data))
        LOGGER.info("subnet_id = %s", json_req_data['subnet_id'])
        try:
            reservations = json_req_data["reservations"]
            LOGGER.info("Reservations from request -> %s",
                        str(reservations))
            LOGGER.info("Going to add reservation for subnet id : %s",
                        json_req_data['subnet_id'])
            result = add_reservation(reservations,
                                     int(json_req_data['subnet_id']))
            LOGGER.info("Result -> %s", str(result))
            # check if resp is boolean and proceed with the response
            if isinstance(result, bool) and result:
                LOGGER.info("Successfully added reservation")
                response = response_generator(
                    STATUS_OK,
                    HTTP_200,
                    SERVICE_CODE + ADD_RESERVATION_API_CODE + SUCCESS_1000,
                    SUCCESS_1000_VALUE,
                    {'data': result}
                )
            elif "message" in result:
                LOGGER.info("Failed to add reservation")
                LOGGER.error(result.get("message"))
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + ADD_RESERVATION_API_CODE + ERROR_4006,
                    ERROR_4006_VALUE,
                    {'error': result.get("message")}
                )
            else:
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + ADD_RESERVATION_API_CODE + ERROR_4007,
                    ERROR_4007_VALUE,
                    {'error': result}
                )
        except KeyError as exc:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
            LOGGER.error(error_msg)
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + ADD_RESERVATION_API_CODE + ERROR_4001,
                ERROR_4001_VALUE,
                {"error": repr(exc)}
            )
        except Exception as exc:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            error_msg = "{}, {}, {}".format(
                exc_type, file_name, exc_tb.tb_lineno)
            LOGGER.error(error_msg)
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + ADD_RESERVATION_API_CODE + ERROR_4000,
                ERROR_4000_VALUE,
                {"error": repr(exc)}
            )
    return response


@BP.route("/reservations/delete", methods=['POST'])
@cross_origin()
def remove_reservation():
    """
        A HTTP POST function to delete reservations from Subnet
        Parameters ---
            subnet_id : <int> : Subnet ID
            hw_addresses:
    """
    LOGGER.info("Request url -> /dhcp4/reservations/delete")
    LOGGER.info("Request method -> POST")
    json_req_data = request.get_json()
    if not json_req_data:
        response = response_generator(
            STATUS_KO,
            HTTP_401,
            SERVICE_CODE + DELETE_RESERVATION_API_CODE + ERROR_4001,
            ERROR_4001_VALUE,
            {'error': ERROR_4001_VALUE}
        )
        LOGGER.error("JSON ERROR - > %s", ERROR_4001_VALUE)
    else:
        try:
            LOGGER.info("Printing received JSON data")
            LOGGER.info("json_req_data = %s", str(json_req_data))
            LOGGER.info("subnet_id = %s", json_req_data['subnet_id'])
            LOGGER.info("hw_addresses = %s",
                        str(json_req_data['hw_addresses']))
            # Fetch user input
            reservations = json_req_data["hw_addresses"]
            LOGGER.info("hw_addresses -> %s", str(reservations))
            # Delete the reservation and returns a boolean value if successful
            LOGGER.info("Going to delete reservation for subnetId : %s",
                        json_req_data['subnet_id'])
            result = del_reservation(reservations, json_req_data['subnet_id'])
            # check if resp is boolean and proceed with the response
            if isinstance(result, bool) and result:
                LOGGER.info("Successfully removed reservation")
                __success_value = "Successfully removed reservation"
                response = response_generator(
                    STATUS_OK,
                    HTTP_200,
                    SERVICE_CODE + DELETE_RESERVATION_API_CODE + SUCCESS_1000,
                    SUCCESS_1000_VALUE,
                    {'data': result}
                )
                LOGGER.info("Response -> %s", str(response))
            elif "message" in result:
                LOGGER.info("Failed to remove reservation. message in result")
                LOGGER.error(result.get("message"))
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + DELETE_RESERVATION_API_CODE + ERROR_4008,
                    ERROR_4008_VALUE,
                    {'error': result.get("message")}
                )
                LOGGER.debug("Response -> %s", str(response))
            else:
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + DELETE_RESERVATION_API_CODE + ERROR_4009,
                    ERROR_4009_VALUE,
                    {'error': result}
                )
                LOGGER.debug("Response -> %s", str(response))
        except KeyError as exc:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
            LOGGER.error(error_msg)
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + DELETE_RESERVATION_API_CODE + ERROR_4001,
                ERROR_4001_VALUE,
                {"error": repr(exc)}
            )
        except Exception as exc:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            error_msg = "{}, {}, {}".format(
                exc_type, file_name, exc_tb.tb_lineno)
            LOGGER.error(error_msg)
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + DELETE_RESERVATION_API_CODE + ERROR_4000,
                ERROR_4000_VALUE,
                {"error": repr(exc)}
            )
    return response


@BP.route("/subnets/add", methods=['POST'])
@cross_origin()
def add_subnet():
    """
        A HTTP POST function to add a Subnet
        Parameters ---
            subnet_list : <int> : Subnet ID
    """
    LOGGER.info("Request url -> /dhcp4/subnets/add")
    LOGGER.info("Request method -> POST")
    json_req_data = request.get_json()
    if not json_req_data:
        response = response_generator(
            STATUS_KO,
            HTTP_401,
            SERVICE_CODE + ADD_SUBNET4_API_CODE + ERROR_4001,
            ERROR_4001_VALUE,
            {'error': ERROR_4001_VALUE})
        LOGGER.error("JSON ERROR - > %s", ERROR_4001_VALUE)
    else:
        try:
            LOGGER.info("Printing received JSON data")
            LOGGER.info("json_req_data = %s", str(json_req_data))
            subnet_list = json_req_data["subnet_list"]
            LOGGER.info("subnet -> %s", str(subnet_list))
            LOGGER.info("Going to add a subnet")
            result = add_subnets(subnet_list)
            if result is True:
                LOGGER.info("Successfully added subnet")
                response = response_generator(
                    STATUS_OK,
                    HTTP_200,
                    SERVICE_CODE + ADD_SUBNET4_API_CODE + SUCCESS_1000,
                    SUCCESS_1000_VALUE,
                    {'data': result}
                )
            elif "message" in result:
                LOGGER.info("Failed to add subnet. MESSAGE in result")
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + ADD_SUBNET4_API_CODE + ERROR_4010,
                    ERROR_4010_VALUE,
                    {'error': result['message']})
            else:
                LOGGER.info("Failed to add subnet")
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + ADD_SUBNET4_API_CODE + ERROR_4011,
                    ERROR_4011_VALUE,
                    {'error': result}
                )
                LOGGER.debug("Response -> %s", str(response))
        except KeyError as exc:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
            LOGGER.error(error_msg)
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + ADD_SUBNET4_API_CODE + ERROR_4001,
                ERROR_4001_VALUE,
                {"error": repr(exc)}
            )
        except Exception as excp:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            LOGGER.error('%s, %s, %s', str(exc_type),
                         str(file_name), str(exc_tb.tb_lineno))
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + ADD_SUBNET4_API_CODE + ERROR_4000,
                ERROR_4000_VALUE,
                {"error": repr(excp)})
    return response


@BP.route("/subnets/delete", methods=['POST'])
@cross_origin()
def remove_subnet():
    """
        A HTTP POST function to delete a Subnet
        Parameters ---
            subnet_ids : list : Subnet IDs
    """
    LOGGER.info("Request url -> /dhcp4/subnets/delete")
    LOGGER.info("Request method -> POST")
    json_req_data = request.get_json()
    if not json_req_data:
        response = response_generator(
            STATUS_KO,
            HTTP_401,
            SERVICE_CODE + DELETE_SUBNET4_API_CODE + ERROR_4001,
            ERROR_4001_VALUE,
            {'error': ERROR_4001_VALUE})
        LOGGER.error("JSON ERROR - > %s", ERROR_4001_VALUE)
    else:
        try:
            LOGGER.info("Printing received JSON data")
            LOGGER.info("json_req_data = %s", str(json_req_data))
            subnet_ids = json_req_data["subnet_ids"]
            LOGGER.info("subnet_ids -> %s", str(subnet_ids))
            LOGGER.info("Going to remove a subnet")
            result = delete_subnets(subnet_ids)
            if result is True:
                LOGGER.info("Successfully removed subnet")
                response = response_generator(
                    STATUS_OK,
                    HTTP_200,
                    SERVICE_CODE + DELETE_SUBNET4_API_CODE + SUCCESS_1000,
                    SUCCESS_1000_VALUE,
                    {'data': result})
            elif "message" in result:
                LOGGER.info("Failed to remove subnet")
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + DELETE_SUBNET4_API_CODE + ERROR_4012,
                    ERROR_4012_VALUE,
                    {'error': result['message']})
            else:
                LOGGER.info("Failed to remove subnet")
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + DELETE_SUBNET4_API_CODE + ERROR_4013,
                    ERROR_4013_VALUE,
                    {'error': result})
        except KeyError as exc:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
            LOGGER.error(error_msg)
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + DELETE_SUBNET4_API_CODE + ERROR_4001,
                ERROR_4001_VALUE,
                {"error": repr(exc)}
            )

        except Exception as excp:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            LOGGER.error('%s, %s, %s', str(exc_type),
                         str(file_name), str(exc_tb.tb_lineno))
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + DELETE_SUBNET4_API_CODE + ERROR_4000,
                ERROR_4000_VALUE,
                {"error": repr(excp)})
    return response


@BP.route("/subnets/modify", methods=['POST'])
@cross_origin()
def modify_subnet():
    """
        A HTTP POST function to delete a Subnet
        Parameters ---
            subnet_ids : list : Subnet IDs
    """
    LOGGER.info("Request url -> /dhcp4/subnets/modify")
    LOGGER.info("Request method -> POST")
    json_req_data = request.get_json()
    if not json_req_data:
        response = response_generator(
            STATUS_KO,
            HTTP_401,
            SERVICE_CODE + MODIFY_SUBNET4_API_CODE + ERROR_4001,
            ERROR_4001_VALUE,
            {'error': ERROR_4001_VALUE})
        LOGGER.error("JSON ERROR - > %s", ERROR_4001_VALUE)
    else:
        try:
            LOGGER.info("Printing received JSON data")
            LOGGER.info("json_req_data = %s", str(json_req_data))
            subnet_list = json_req_data["subnet_list"]
            LOGGER.info("subnet_list -> %s", str(subnet_list))
            LOGGER.info("Going to modify subnet")
            result = modify_subnets(subnet_list)
            if result is True:
                LOGGER.info("Successfully modified subnet")
                response = response_generator(
                    STATUS_OK,
                    HTTP_200,
                    SERVICE_CODE + MODIFY_SUBNET4_API_CODE + SUCCESS_1000,
                    SUCCESS_1000_VALUE,
                    {'data': result})
            elif "message" in result:
                LOGGER.info("Failed to modify subnet")
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + MODIFY_SUBNET4_API_CODE + ERROR_4033,
                    ERROR_4033_VALUE,
                    {'error': result['message']})
            else:
                LOGGER.info("Failed to modify subnet")
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + MODIFY_SUBNET4_API_CODE + ERROR_4034,
                    ERROR_4034_VALUE,
                    {'error': result})
        except KeyError as exc:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
            LOGGER.error(error_msg)
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + MODIFY_SUBNET4_API_CODE + ERROR_4001,
                ERROR_4001_VALUE,
                {"error": repr(exc)}
            )
        except Exception as excp:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            LOGGER.error('%s, %s, %s', str(exc_type),
                         str(file_name), str(exc_tb.tb_lineno))
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + MODIFY_SUBNET4_API_CODE + ERROR_4000,
                ERROR_4000_VALUE,
                {"error": repr(excp)})
    return response


@BP.route("/subnets/options/add", methods=['POST'])
@cross_origin()
def add_option_subnet():
    """
        A HTTP POST function to add option data in Subnet
        Parameters ---
        subnet_id : <int> : Subnet ID
        options_list:
    """
    LOGGER.info("Request url -> /dhcp4/subnets/options/add")
    LOGGER.info("Request method -> POST")
    json_req_data = request.get_json()
    if not json_req_data:
        response = response_generator(
            STATUS_KO,
            HTTP_401,
            SERVICE_CODE + ADD_SUBNET_OPTION_API_CODE + ERROR_4001,
            ERROR_4001_VALUE,
            {'error': ERROR_4001_VALUE})
        LOGGER.error("JSON ERROR - > %s", ERROR_4001_VALUE)
    else:
        try:
            LOGGER.info("Printing received JSON data")
            LOGGER.info("json_req_data = %s", str(json_req_data))
            dhcp4_options = json_req_data["options_list"]
            LOGGER.info("Option Data -> %s", str(dhcp4_options))
            subnet_id = json_req_data["subnet_id"]
            LOGGER.info("Going to add option data to a subnet")
            result = add_subnet_options(dhcp4_options, subnet_id)
            if result is True:
                LOGGER.info("Successfully added option to subnet")
                response = response_generator(
                    STATUS_OK,
                    HTTP_200,
                    SERVICE_CODE + ADD_SUBNET_OPTION_API_CODE + SUCCESS_1000,
                    SUCCESS_1000_VALUE,
                    {'data': result})
            elif "message" in result:
                LOGGER.info("Failed to add option to subnet")
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + ADD_SUBNET_OPTION_API_CODE + ERROR_4014,
                    ERROR_4014_VALUE,
                    {'error': result.get("message")})
            else:
                LOGGER.info("Failed to add option to subnet")
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + ADD_SUBNET_OPTION_API_CODE + ERROR_4015,
                    ERROR_4015_VALUE,
                    {'error': result})
        except KeyError as exc:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
            LOGGER.error(error_msg)
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + ADD_SUBNET_OPTION_API_CODE + ERROR_4001,
                ERROR_4001_VALUE,
                {"error": repr(exc)}
            )
        except Exception as excp:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            LOGGER.error('%s, %s, %s', str(exc_type),
                         str(file_name), str(exc_tb.tb_lineno))
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + ADD_SUBNET_OPTION_API_CODE + ERROR_4000,
                ERROR_4000_VALUE,
                {"error": repr(excp)})
    return response


@BP.route("/subnets/options/delete", methods=['POST'])
@cross_origin()
def delete_option_subnet():
    """
        A HTTP POST function to delete option data from Subnet
        Parameters ---
            subnet_id : <int> : Subnet ID
            codes : <obj> : List of codes to be deleted
    """
    LOGGER.info("Request url -> /dhcp4/subnets/options/delete")
    LOGGER.info("Request method -> POST")
    json_req_data = request.get_json()
    if not json_req_data:
        response = response_generator(
            STATUS_KO,
            HTTP_401,
            SERVICE_CODE + DELETE_SUBNET_OPTION_API_CODE + ERROR_4001,
            ERROR_4001_VALUE,
            {'error': ERROR_4001_VALUE})
        LOGGER.error("JSON ERROR - > %s", ERROR_4001_VALUE)
    else:
        try:
            LOGGER.info("Printing received JSON data")
            LOGGER.info("json_req_data = %s", str(json_req_data))
            subnet_id = int(json_req_data['subnet_id'])
            codes = json_req_data["codes"]
            LOGGER.info("codes -> %s", str(codes))
            LOGGER.info("Going to delete option data from a subnet")
            result = delete_subnet_options(codes, subnet_id)
            if result is True:
                LOGGER.info("Successfully deleted option from subnet")
                __success_value = "Successfully deleted option from subnet"
                response = response_generator(
                    STATUS_OK,
                    HTTP_200,
                    SERVICE_CODE + DELETE_SUBNET_OPTION_API_CODE + SUCCESS_1000,
                    SUCCESS_1000_VALUE,
                    {'data': result})
            elif "message" in result:
                LOGGER.info("Failed to delete option from subnet")
                LOGGER.info(result.get("message"))
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + DELETE_SUBNET_OPTION_API_CODE + ERROR_4016,
                    ERROR_4016_VALUE,
                    {'error': result.get("message")})
            else:
                LOGGER.info("Failed to delete option from subnet")
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + DELETE_SUBNET_OPTION_API_CODE + ERROR_4017,
                    ERROR_4017_VALUE,
                    {'error': result})
        except KeyError as exc:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
            LOGGER.error(error_msg)
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + DELETE_SUBNET_OPTION_API_CODE + ERROR_4001,
                ERROR_4001_VALUE,
                {"error": repr(exc)}
            )
        except Exception as excp:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            LOGGER.error('%s, %s, %s', str(exc_type),
                         str(file_name), str(exc_tb.tb_lineno))
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + DELETE_SUBNET_OPTION_API_CODE + ERROR_4000,
                ERROR_4000_VALUE,
                {"error": repr(excp)})
    return response


@BP.route("/subnets/reservation/options/add", methods=['POST'])
@cross_origin()
def add_options_reservation():
    """
        A HTTP POST function to add options to reservations in Subnet
        Parameters ---
            subnet_id : <int> : Subnet ID
            mac : <str> : Hardware address
            options_list : <obj> : List of options to be added into the subnet
    """
    LOGGER.info("Request url -> /dhcp4/subnets/reservation/options/add")
    LOGGER.info("Request method -> POST")
    json_req_data = request.get_json()
    if not json_req_data:
        response = response_generator(
            STATUS_KO,
            HTTP_401,
            SERVICE_CODE + ADD_SUBNET_RESERVATION_OPTION_API_CODE + ERROR_4001,
            ERROR_4001_VALUE,
            {'error': ERROR_4001_VALUE})
        LOGGER.error("JSON ERROR - > %s", ERROR_4001_VALUE)
    else:
        try:
            LOGGER.info("Printing received JSON data")
            LOGGER.info("json_req_data = %s", str(json_req_data))
            LOGGER.info("Going to add options to reservations in Subnet")
            result = add_reservation_options(json_req_data["options_list"],
                                             json_req_data["mac"],
                                             int(json_req_data['subnet_id']))
            if result is True:
                LOGGER.info("Successfully added option to subnet reservation")
                response = response_generator(
                    STATUS_OK,
                    HTTP_200,
                    SERVICE_CODE + ADD_SUBNET_RESERVATION_OPTION_API_CODE + SUCCESS_1000,
                    SUCCESS_1000_VALUE,
                    {'data': result})
            elif "message" in result:
                LOGGER.info("Failed to add option to subnet reservation")
                LOGGER.info(result.get("message"))
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + ADD_SUBNET_RESERVATION_OPTION_API_CODE + ERROR_4018,
                    ERROR_4018_VALUE,
                    {'error': result.get("message")})
            else:
                LOGGER.info("Failed to add option to subnet reservation")
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + ADD_SUBNET_RESERVATION_OPTION_API_CODE + ERROR_4019,
                    ERROR_4019_VALUE,
                    {'error': result})
        except KeyError as exc:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
            LOGGER.error(error_msg)
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + ADD_SUBNET_RESERVATION_OPTION_API_CODE + ERROR_4001,
                ERROR_4001_VALUE,
                {"error": repr(exc)}
            )
        except Exception as excp:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            LOGGER.error('%s, %s, %s', str(exc_type), str(file_name),
                         str(exc_tb.tb_lineno))
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + ADD_SUBNET_RESERVATION_OPTION_API_CODE + ERROR_4000,
                ERROR_4000_VALUE,
                {"error": repr(excp)})
    return response


@BP.route("/subnets/reservation/options/delete", methods=['POST'])
@cross_origin()
def delete_options_reservation():
    """
        A HTTP POST function to delete option data in reservations for a Subnet
        Parameters ---
            subnet_id : <int> : Subnet ID
            mac : <str> : Hardware address
            codes : <obj> : List of codes to be deleted
    """
    LOGGER.info("Request url -> /dhcp4/subnets/reservation/options/delete")
    LOGGER.info("Request method -> POST")
    json_req_data = request.get_json()
    if not json_req_data:
        response = response_generator(
            STATUS_KO,
            HTTP_401,
            SERVICE_CODE + DELETE_SUBNET_RESERVATION_OPTION_API_CODE + ERROR_4001,
            ERROR_4001_VALUE,
            {'error': ERROR_4001_VALUE})
        LOGGER.info("JSON ERROR - > %s", ERROR_4001_VALUE)
    else:
        try:
            LOGGER.info("Printing received JSON data")
            LOGGER.info("json_req_data = %s", str(json_req_data))
            LOGGER.info("Going to delete option data in reservations for a Subnet")
            result = delete_reservation_options(json_req_data['codes'],
                                                json_req_data['mac'],
                                                int(json_req_data['subnet_id']))
            if result is True:
                LOGGER.info("Successfully deleted option on reservation")
                response = response_generator(
                    STATUS_OK,
                    HTTP_200,
                    SERVICE_CODE + DELETE_SUBNET_RESERVATION_OPTION_API_CODE + SUCCESS_1000,
                    SUCCESS_1000_VALUE,
                    {"data": result}
                )
            elif "message" in result:
                LOGGER.info("Failed to delete option on reservation")
                LOGGER.info(result.get("message"))
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + DELETE_SUBNET_RESERVATION_OPTION_API_CODE + ERROR_4020,
                    ERROR_4020_VALUE,
                    {'error': result.get("message")}
                )
            else:
                LOGGER.info("Failed to delete option on reservation")
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + DELETE_SUBNET_RESERVATION_OPTION_API_CODE + ERROR_4021,
                    ERROR_4021_VALUE,
                    {'error': result}
                )
        except KeyError as exc:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
            LOGGER.error(error_msg)
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + DELETE_SUBNET_RESERVATION_OPTION_API_CODE + ERROR_4001,
                ERROR_4001_VALUE,
                {"error": repr(exc)}
            )
        except Exception as excp:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            LOGGER.error('%s, %s, %s', str(exc_type),
                         str(file_name), str(exc_tb.tb_lineno))
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + DELETE_SUBNET_RESERVATION_OPTION_API_CODE + ERROR_4000,
                ERROR_4000_VALUE,
                {"error": repr(excp)})
    return response


@BP.route("/leases", methods=['GET'])
@cross_origin()
def get_all_leases():
    """
        A HTTP GET function to fetch the all active leases
    """
    LOGGER.info("Request url -> /dhcp4/leases")
    LOGGER.info("Request method -> GET")
    try:
        leases = leases_hook()
        LOGGER.info("type(response) = %s", str(type(leases)))
        LOGGER.info("response[0] = %s", leases)
        if 'message' not in leases:
            if leases is not None and 'arguments' in leases[0].keys():
                arguments = leases[0].get("arguments")
                result = leases[0].get("result")
                # 0 => SUCCESS , 1 => FAILED, 3 => Empty object

                LOGGER.info("Response -> %s", json.dumps(leases))
                if result == RESULT_SUCCESS:
                    response = response_generator(
                        STATUS_OK,
                        HTTP_200,
                        SERVICE_CODE + GET_ALL_LEASES_API_CODE + SUCCESS_1000,
                        SUCCESS_1000_VALUE,
                        arguments)
                elif result == RESULT_EMPTY:
                    response = response_generator(
                        STATUS_OK,
                        HTTP_200,
                        SERVICE_CODE + GET_ALL_LEASES_API_CODE + SUCCESS_1001,
                        SUCCESS_1001_VALUE,
                        arguments)
                else:
                    response = response_generator(
                        STATUS_KO,
                        HTTP_200,
                        SERVICE_CODE + GET_ALL_LEASES_API_CODE + ERROR_4022,
                        ERROR_4022_VALUE,
                        {"error": leases})
            else:
                LOGGER.info("Response -> %s", json.dumps(leases))
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + GET_ALL_LEASES_API_CODE + ERROR_4022,
                    ERROR_4022_VALUE,
                    {"error": leases})
        else:
            LOGGER.error('Error message --> %s', str(leases["message"]))
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + GET_ALL_LEASES_API_CODE + ERROR_4004,
                ERROR_4004_VALUE,
                {"error": leases['message']})
    except KeyError as exc:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
        file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
        LOGGER.error(error_msg)
        response = response_generator(
            STATUS_KO,
            HTTP_200,
            SERVICE_CODE + GET_ALL_LEASES_API_CODE + ERROR_4001,
            ERROR_4001_VALUE,
            {"error": repr(exc)}
        )
    except Exception as excp:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
        file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        LOGGER.error('%s, %s, %s', str(exc_type), str(file_name),
                     str(exc_tb.tb_lineno))
        response = response_generator(
            STATUS_KO,
            HTTP_200,
            SERVICE_CODE + GET_ALL_LEASES_API_CODE + ERROR_4000,
            ERROR_4000_VALUE,
            {"error": str(excp)}
        )
    return response


@BP.route("/lease/add", methods=['POST'])
@cross_origin()
def add_lease():
    """
        A HTTP GET function to add a new lease
    """
    LOGGER.info("Request url -> /dhcp4/lease/add")
    LOGGER.info("Request method -> POST")
    json_req_data = request.get_json()
    if not json_req_data:
        response = response_generator(
            STATUS_KO,
            HTTP_401,
            SERVICE_CODE + ADD_LEASES_API_CODE + ERROR_4001,
            ERROR_4001_VALUE,
            {'error': ERROR_4001_VALUE})
        LOGGER.info("JSON ERROR - > %s", ERROR_4001_VALUE)
    else:
        try:
            leases = leases_hook(add_lease=True, arguments=json_req_data['arguments'])
            LOGGER.info("type(response) = %s", str(type(leases)))
            LOGGER.info("response[0] = %s", leases)
            if 'message' not in leases:
                if leases is not None and 'result' in leases[0].keys():
                    result = leases[0].get("result")
                    text = leases[0].get("text")
                    LOGGER.info("Response -> %s", json.dumps(leases))
                    # 0 => SUCCESS , 1 => FAILED
                    if result == RESULT_SUCCESS:
                        response = response_generator(
                            STATUS_OK,
                            HTTP_200,
                            SERVICE_CODE + ADD_LEASES_API_CODE + SUCCESS_1000,
                            SUCCESS_1000_VALUE,
                            leases)
                    else:
                        response = response_generator(
                            STATUS_KO,
                            HTTP_200,
                            SERVICE_CODE + ADD_LEASES_API_CODE + ERROR_4023,
                            ERROR_4023_VALUE,
                            leases)
                else:
                    LOGGER.info("Response -> %s", json.dumps(leases))
                    response = response_generator(
                        STATUS_KO,
                        HTTP_200,
                        SERVICE_CODE + ADD_LEASES_API_CODE + ERROR_4023,
                        ERROR_4023_VALUE,
                        {"error": leases})
            else:
                LOGGER.error('Error message --> %s', str(leases["message"]))
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + ADD_LEASES_API_CODE + ERROR_4023,
                    ERROR_4023_VALUE,
                    {"error": leases['message']})
        except KeyError as exc:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
            LOGGER.error(error_msg)
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + ADD_LEASES_API_CODE + ERROR_4001,
                ERROR_4001_VALUE,
                {"error": repr(exc)}
            )
        except Exception as excp:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            LOGGER.error('%s, %s, %s', str(exc_type), str(file_name),
                         str(exc_tb.tb_lineno))
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + ADD_LEASES_API_CODE + ERROR_4000,
                ERROR_4000_VALUE,
                {"error": str(excp)}
            )
    return response


@BP.route("/lease/update", methods=['POST'])
@cross_origin()
def update_lease():
    """
        A HTTP GET function to update active lease
    """
    LOGGER.info("Request url -> /dhcp4/lease/update")
    LOGGER.info("Request method -> POST")
    json_req_data = request.get_json()
    if not json_req_data:
        response = response_generator(
            STATUS_KO,
            HTTP_401,
            SERVICE_CODE + UPDATE_LEASES_API_CODE + ERROR_4001,
            ERROR_4001_VALUE,
            {'error': ERROR_4001_VALUE})
        LOGGER.info("JSON ERROR - > %s", ERROR_4001_VALUE)
    else:
        try:
            leases = leases_hook(update_lease=True, arguments=json_req_data['arguments'])
            LOGGER.info("type(response) = %s", str(type(leases)))
            LOGGER.info("response[0] = %s", leases)
            if 'message' not in leases:
                if leases is not None and 'result' in leases[0].keys():
                    result = leases[0].get("result")
                    LOGGER.info("Response -> %s", json.dumps(leases))
                    # 0 => SUCCESS , 1 => FAILED
                    if result == RESULT_SUCCESS:
                        response = response_generator(
                            STATUS_OK,
                            HTTP_200,
                            SERVICE_CODE + UPDATE_LEASES_API_CODE + SUCCESS_1000,
                            SUCCESS_1000_VALUE,
                            leases)
                    else:
                        response = response_generator(
                            STATUS_KO,
                            HTTP_200,
                            SERVICE_CODE + UPDATE_LEASES_API_CODE + ERROR_4024,
                            ERROR_4024_VALUE,
                            leases)
                else:
                    LOGGER.info("Response -> %s", json.dumps(leases))
                    response = response_generator(
                        STATUS_KO,
                        HTTP_200,
                        SERVICE_CODE + UPDATE_LEASES_API_CODE + ERROR_4024,
                        ERROR_4024_VALUE,
                        {"error": leases})
            else:
                LOGGER.error('Error message --> %s', str(leases["message"]))
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + UPDATE_LEASES_API_CODE + ERROR_4024,
                    ERROR_4024_VALUE,
                    {"error": leases['message']})
        except KeyError as exc:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
            LOGGER.error(error_msg)
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + UPDATE_LEASES_API_CODE + ERROR_4001,
                ERROR_4001_VALUE,
                {"error": repr(exc)}
            )
        except Exception as excp:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            LOGGER.error('%s, %s, %s', str(exc_type), str(file_name),
                         str(exc_tb.tb_lineno))
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + UPDATE_LEASES_API_CODE + ERROR_4000,
                ERROR_4000_VALUE,
                {"error": str(excp)}
            )
    return response


@BP.route("/lease/delete", methods=['POST'])
@cross_origin()
def delete_lease():
    """
        A HTTP GET function to delete active leases
    """
    LOGGER.info("Request url -> /dhcp4/lease/delete")
    LOGGER.info("Request method -> POST")
    json_req_data = request.get_json()
    if not json_req_data:
        response = response_generator(
            STATUS_KO,
            HTTP_401,
            SERVICE_CODE + DELETE_LEASES_API_CODE + ERROR_4001,
            ERROR_4001_VALUE,
            {'error': ERROR_4001_VALUE})
        LOGGER.info("JSON ERROR - > %s", ERROR_4001_VALUE)
    else:
        try:
            leases = leases_hook(delete_lease=True, ip=json_req_data['ip'])
            LOGGER.info("type(response) = %s", str(type(leases)))
            LOGGER.info("response[0] = %s", leases)
            if 'message' not in leases:
                if leases is not None and 'result' in leases[0].keys():
                    result = leases[0].get("result")
                    LOGGER.info("Response -> %s", json.dumps(leases))
                    # 0 => SUCCESS , 1 => FAILED, 3 => Empty object
                    if result == RESULT_SUCCESS:
                        response = response_generator(
                            STATUS_OK,
                            HTTP_200,
                            SERVICE_CODE + DELETE_LEASES_API_CODE + SUCCESS_1000,
                            SUCCESS_1000_VALUE,
                            leases)
                    elif result == RESULT_EMPTY:
                        response = response_generator(
                            STATUS_OK,
                            HTTP_200,
                            SERVICE_CODE + DELETE_LEASES_API_CODE + SUCCESS_1002,
                            SUCCESS_1002_VALUE,
                            leases)
                    else:
                        response = response_generator(
                            STATUS_KO,
                            HTTP_200,
                            SERVICE_CODE + DELETE_LEASES_API_CODE + ERROR_4025,
                            ERROR_4025_VALUE,
                            leases)
                else:
                    LOGGER.info("Response -> %s", json.dumps(leases))
                    response = response_generator(
                        STATUS_KO,
                        HTTP_200,
                        SERVICE_CODE + DELETE_LEASES_API_CODE + ERROR_4025,
                        ERROR_4025_VALUE,
                        {"error": leases})
            else:
                LOGGER.error('Error message --> %s', str(leases["message"]))
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + DELETE_LEASES_API_CODE + ERROR_4025,
                    ERROR_4025_VALUE,
                    {"error": leases['message']})
        except KeyError as exc:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
            LOGGER.error(error_msg)
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + DELETE_LEASES_API_CODE + ERROR_4001,
                ERROR_4001_VALUE,
                {"error": repr(exc)}
            )
        except Exception as excp:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            LOGGER.error('%s, %s, %s', str(exc_type), str(file_name),
                         str(exc_tb.tb_lineno))
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + DELETE_LEASES_API_CODE + ERROR_4000,
                ERROR_4000_VALUE,
                {"error": str(excp)}
            )
    return response


@BP.route("/lease/wipe", methods=['POST'])
@cross_origin()
def wipe_lease():
    """
        A HTTP GET function to remove all active leases of a subnet
    """
    LOGGER.info("Request url -> /dhcp4/lease/wipe")
    LOGGER.info("Request method -> POST")
    json_req_data = request.get_json()
    if not json_req_data:
        response = response_generator(
            STATUS_KO,
            HTTP_401,
            SERVICE_CODE + WIPE_LEASES_API_CODE + ERROR_4001,
            ERROR_4001_VALUE,
            {'error': ERROR_4001_VALUE})
        LOGGER.info("JSON ERROR - > %s", ERROR_4001_VALUE)
    else:
        try:
            leases = leases_hook(wipe_subnet_lease=True, subnet_id=int(json_req_data['subnet_id']))
            LOGGER.info("type(response) = %s", str(type(leases)))
            LOGGER.info("response[0] = %s", leases)
            if 'message' not in leases:
                if leases is not None and 'result' in leases[0].keys():
                    result = leases[0].get("result")
                    LOGGER.info("Response -> %s", json.dumps(leases))
                    # 0 => SUCCESS , 1 => FAILED, 3 => Empty object
                    if result == RESULT_SUCCESS:
                        response = response_generator(
                            STATUS_OK,
                            HTTP_200,
                            SERVICE_CODE + WIPE_LEASES_API_CODE + SUCCESS_1000,
                            SUCCESS_1000_VALUE,
                            leases)
                    elif result == RESULT_EMPTY:
                        response = response_generator(
                            STATUS_OK,
                            HTTP_200,
                            SERVICE_CODE + WIPE_LEASES_API_CODE + SUCCESS_1003,
                            SUCCESS_1003_VALUE,
                            leases)
                    else:
                        response = response_generator(
                            STATUS_KO,
                            HTTP_200,
                            SERVICE_CODE + WIPE_LEASES_API_CODE + ERROR_4026,
                            ERROR_4026_VALUE,
                            leases)
                else:
                    LOGGER.info("Response -> %s", json.dumps(leases))
                    response = response_generator(
                        STATUS_KO,
                        HTTP_200,
                        SERVICE_CODE + WIPE_LEASES_API_CODE + ERROR_4026,
                        ERROR_4026_VALUE,
                        {"error": leases})
            else:
                LOGGER.error('Error message --> %s', str(leases["message"]))
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + WIPE_LEASES_API_CODE + ERROR_4026,
                    ERROR_4026_VALUE,
                    {"error": leases['message']})
        except KeyError as exc:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
            LOGGER.error(error_msg)
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + WIPE_LEASES_API_CODE + ERROR_4001,
                ERROR_4001_VALUE,
                {"error": repr(exc)}
            )
        except Exception as excp:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            LOGGER.error('%s, %s, %s', str(exc_type), str(file_name),
                         str(exc_tb.tb_lineno))
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + WIPE_LEASES_API_CODE + ERROR_4000,
                ERROR_4000_VALUE,
                {"error": str(excp)}
            )
    return response


@BP.route("/classes/add", methods=['POST'])
@cross_origin()
def add_class():
    """
        A HTTP POST function to add a class
        Parameters ---
            subnet_list : <int> : Subnet ID
    """
    LOGGER.info("Request url -> /dhcp4/classes/add")
    LOGGER.info("Request method -> POST")
    json_req_data = request.get_json()
    if not json_req_data:
        response = response_generator(
            STATUS_KO,
            HTTP_401,
            SERVICE_CODE + ADD_CLIENT_CLASSES_API_CODE + ERROR_4001,
            ERROR_4001_VALUE,
            {'error': ERROR_4001_VALUE})
        LOGGER.error("JSON ERROR - > %s", ERROR_4001_VALUE)
    else:
        try:
            LOGGER.info("Printing received JSON data")
            LOGGER.info("json_req_data = %s", str(json_req_data))
            client_class_list = json_req_data["client_class_list"]
            LOGGER.info("client_classes -> %s", str(client_class_list))
            LOGGER.info("Going to add a client_classes")
            result = add_client_classes(client_class_list)
            if result is True:
                LOGGER.info("Successfully added client class")
                response = response_generator(
                    STATUS_OK,
                    HTTP_200,
                    SERVICE_CODE + ADD_CLIENT_CLASSES_API_CODE + SUCCESS_1000,
                    SUCCESS_1000_VALUE,
                    {'data': result}
                )
            elif "message" in result:
                LOGGER.info("Failed to add client class. MESSAGE in result")
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + ADD_CLIENT_CLASSES_API_CODE + ERROR_4027,
                    ERROR_4027_VALUE,
                    {'error': result['message']})
            else:
                LOGGER.info("Failed to add client class")
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + ADD_CLIENT_CLASSES_API_CODE + ERROR_4028,
                    ERROR_4028_VALUE,
                    {'error': result}
                )
                LOGGER.debug("Response -> %s", str(response))
        except KeyError as exc:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
            LOGGER.error(error_msg)
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + ADD_CLIENT_CLASSES_API_CODE + ERROR_4001,
                ERROR_4001_VALUE,
                {"error": repr(exc)}
            )
        except Exception as excp:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            LOGGER.error('%s, %s, %s', str(exc_type),
                         str(file_name), str(exc_tb.tb_lineno))
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + ADD_CLIENT_CLASSES_API_CODE + ERROR_4000,
                ERROR_4000_VALUE,
                {"error": repr(excp)})
    return response


@BP.route("/classes/delete", methods=['POST'])
@cross_origin()
def remove_class():
    """
        A HTTP POST function to delete a class
        Parameters ---
            subnet_ids : list : Subnet IDs
    """
    LOGGER.info("Request url -> /dhcp4/classes/delete")
    LOGGER.info("Request method -> POST")
    json_req_data = request.get_json()
    if not json_req_data:
        response = response_generator(
            STATUS_KO,
            HTTP_401,
            SERVICE_CODE + DELETE_CLIENT_CLASSES_API_CODE + ERROR_4001,
            ERROR_4001_VALUE,
            {'error': ERROR_4001_VALUE})
        LOGGER.error("JSON ERROR - > %s", ERROR_4001_VALUE)
    else:
        try:
            LOGGER.info("Printing received JSON data")
            LOGGER.info("json_req_data = %s", str(json_req_data))
            class_names = json_req_data["class_names"]
            LOGGER.info("class_names -> %s", str(class_names))
            LOGGER.info("Going to remove a class")
            result = delete_client_classes(class_names)
            if result is True:
                LOGGER.info("Successfully removed class")
                response = response_generator(
                    STATUS_OK,
                    HTTP_200,
                    SERVICE_CODE + DELETE_CLIENT_CLASSES_API_CODE + SUCCESS_1000,
                    SUCCESS_1000_VALUE,
                    {'data': result})
            elif "message" in result:
                LOGGER.info("Failed to remove class")
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + DELETE_CLIENT_CLASSES_API_CODE + ERROR_4029,
                    ERROR_4029_VALUE,
                    {'error': result['message']})
            else:
                LOGGER.info("Failed to remove class")
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + DELETE_CLIENT_CLASSES_API_CODE + ERROR_4030,
                    ERROR_4030_VALUE,
                    {'error': result})
        except KeyError as exc:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
            LOGGER.error(error_msg)
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + DELETE_CLIENT_CLASSES_API_CODE + ERROR_4001,
                ERROR_4001_VALUE,
                {"error": repr(exc)}
            )
        except Exception as excp:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            LOGGER.error('%s, %s, %s', str(exc_type),
                         str(file_name), str(exc_tb.tb_lineno))
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + DELETE_CLIENT_CLASSES_API_CODE + ERROR_4000,
                ERROR_4000_VALUE,
                {"error": repr(excp)})
    return response


@BP.route("/classes/modify", methods=['POST'])
@cross_origin()
def modify_class():
    """
        A HTTP POST function to modify a CLIENT CLASS
    """
    LOGGER.info("Request url -> /dhcp4/classes/modify")
    LOGGER.info("Request method -> POST")
    json_req_data = request.get_json()
    if not json_req_data:
        response = response_generator(
            STATUS_KO,
            HTTP_401,
            SERVICE_CODE + MODIFY_CLIENT_CLASSES_API_CODE + ERROR_4001,
            ERROR_4001_VALUE,
            {'error': ERROR_4001_VALUE})
        LOGGER.error("JSON ERROR - > %s", ERROR_4001_VALUE)
    else:
        try:
            LOGGER.info("Printing received JSON data")
            LOGGER.info("json_req_data = %s", str(json_req_data))
            classes = json_req_data["client_class_list"]
            LOGGER.info("classes -> %s", str(classes))
            LOGGER.info("Going to modify class")
            result = modify_client_classes(classes)
            if result is True:
                LOGGER.info("Successfully modified class")
                response = response_generator(
                    STATUS_OK,
                    HTTP_200,
                    SERVICE_CODE + MODIFY_CLIENT_CLASSES_API_CODE + SUCCESS_1000,
                    SUCCESS_1000_VALUE,
                    {'data': result})
            elif "message" in result:
                LOGGER.info("Failed to modify class")
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + MODIFY_CLIENT_CLASSES_API_CODE + ERROR_4031,
                    ERROR_4031_VALUE,
                    {'error': result['message']})
            else:
                LOGGER.info("Failed to modify class")
                response = response_generator(
                    STATUS_KO,
                    HTTP_200,
                    SERVICE_CODE + MODIFY_CLIENT_CLASSES_API_CODE + ERROR_4032,
                    ERROR_4032_VALUE,
                    {'error': result})
        except KeyError as exc:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            error_msg = "{}, {}, {}".format(exc_type, file_name, exc_tb.tb_lineno)
            LOGGER.error(error_msg)
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + MODIFY_CLIENT_CLASSES_API_CODE + ERROR_4001,
                ERROR_4001_VALUE,
                {"error": repr(exc)}
            )
        except Exception as excp:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            LOGGER.debug('%s, %s, %s', exc_type, exc_obj, exc_tb)
            file_name = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            LOGGER.error('%s, %s, %s', str(exc_type),
                         str(file_name), str(exc_tb.tb_lineno))
            response = response_generator(
                STATUS_KO,
                HTTP_200,
                SERVICE_CODE + MODIFY_CLIENT_CLASSES_API_CODE + ERROR_4000,
                ERROR_4000_VALUE,
                {"error": repr(excp)})
    return response
