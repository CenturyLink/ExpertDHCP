import unittest
import json
from restservice import LOGGER, create_app
from restservice.endpoints import ERROR_4001_VALUE, ERROR_4006_VALUE, \
    ERROR_4005_VALUE, ERROR_4008_VALUE, ERROR_4011_VALUE, ERROR_4014_VALUE, \
    ERROR_4020_VALUE, ERROR_4018_VALUE, ERROR_4012_VALUE, ERROR_4015_VALUE, \
    ERROR_4003_VALUE, ERROR_4019_VALUE, ERROR_4007_VALUE, ERROR_4016_VALUE
from restservice.config import GIT_BACKUP, KEA_SERVER_BACKUP, BACKUP_CONFIG, \
    SUBNETS_NOT_FOUND, SUBNET_NOT_FOUND, DHCP_IP, TEST_LOGGING, \
    DHCP_PORT, RESERVATION_NOT_FOUND, OPTIONS_NOT_FOUND
from restservice.tests.test_config import config_pt, config_nt
from restservice.tests.test_utilities import get_num_reservations, get_num_subnets, \
    get_len_subnet_reserv_options_by_id_and_mac, get_len_subnet_options_by_id


class PositiveTests(unittest.TestCase):
    """
    Test Cases - Positive
    """

    def setUp(self):
        """
            Creating the test client using the create app from init
        """
        test_app = create_app()
        self.app = test_app.test_client()

    def test_01_main_page(self):
        """
            Testing the /dhcp4 path which should just return
            DHCP Based provisioning as data in response

            API Path: /dhcp4
            API Code: 001
            API Function Name: fast_dhcp.endpoints.home

            Passes only if all of the following are true:
                1. Response data is DHCP BASED PROVISIONING.
                2. FAST Type Response statusCode is 9000011000
                3. FAST Type Response statusValue is 'Command
                   execution successful'
                4. Response status code is 200
        """
        LOGGER.info('Testing home()')
        response = self.app.get('/dhcp4', follow_redirects=True)
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(api_response_json['statusCode'],
                         '9000011000')
        self.assertEqual(api_response_json['statusValue'],
                         "Command execution successful")
        self.assertEqual(api_response_json['data']['title'],
                         'DHCP BASED PROVISIONING')

    def test_02_get_kea_config(self):
        """
            Testing the get kea config api to retrieve
            the configurations from another server.

            API Path: /dhcp4/config
            API Code: 002
            API Function Name: fast_dhcp.endpoints.get_kea_config

            Passes only if
                1. Length of returned is greater than 0.
                2. FAST Type Response statusCode is 9000021000
                3. FAST Type Response statusValue is 'Command
                   execution successful'
                4. Response status code is 200
        """
        LOGGER.info('Testing get_kea_config()')
        response = self.app.get('/dhcp4/config', follow_redirects=True)
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(api_response_json['statusCode'],
                         '9000021000')
        self.assertEqual(api_response_json['statusValue'],
                         "Command execution successful")
        self.assertNotEqual(len(api_response_json['data']['keaConfig']), 0)

    def test_03_add_subnet(self):
        """
            Testing add subnet api.

            API Path: /dhcp4/subnets/add
            API Code: 007
            API Function Name: fast_dhcp.endpoints.add_subnet

            Case: Happy Path

            JSON Request contains
                subnet_list

            Passes only if
                1. FAST Type Response statusCode is 9000071000
                2. FAST Type Response statusValue is 'Command
                   execution successful'
                3. Number of subnets should increase
        """
        LOGGER.info('Positive Testing add_subnet()')
        json_req = {
            "subnet_list": [
                {
                    "id": config_pt['subnet_id'],
                    "subnet": config_pt['subnet'],
                    "pools": config_pt['pools'],
                    "option-data": config_pt['option_data'],
                    "reservations": [
                        {
                            "hw-address": config_pt['macs'][0],
                            "ip-address": config_pt['ips'][0],
                            "option-data": config_pt['option_data']
                        },
                        {
                            "hw-address": config_pt['macs'][1],
                            "ip-address": config_pt['ips'][1]
                        }
                    ]
                }
            ]
        }
        before_add_subnets = get_num_subnets()
        LOGGER.info('Subnets before the Add API call: %d',
                    before_add_subnets)
        response = self.app.post('/dhcp4/subnets/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        after_add_subnet = get_num_subnets()
        LOGGER.info('Subnets after the Add API call: %d',
                    after_add_subnet)
        self.assertEqual(api_response_json['statusCode'],
                         '9000071000')
        self.assertEqual(api_response_json['statusValue'],
                         'Command execution successful')
        self.assertGreater(after_add_subnet, before_add_subnets)

    def test_04_add_reservations(self):
        """
            Testing the add a new reservation api to a subnet.

            API Path: /dhcp4/reservations/add
            API Code: 005
            API Function Name: fast_dhcp.endpoints.add_reservations

            Case: Happy Path

            JSON Request contains
                subnet_id
                reservation info

            Passes only if
                1. Response status code is 200
                2. FAST Type Response statusCode is 9000051000
                3. FAST Type Response statusValue is 'Command
                   execution successful'
                4. Length of reservation should increase after the API call
        """
        LOGGER.info('Positive Testing add_reservations()')
        json_req = {
            "subnet_id": config_pt['subnet_id'],
            "reservations": [{
                "hostname": "test_reservation",
                "hw-address": config_pt['macs'][2],
                "ip-address": config_pt['ips'][2],
                "next-server": "172.28.12.191",
                "server-hostname": "test_reservation_server"
            }]
        }
        num_reservations_before_add = get_num_reservations(self.app)
        LOGGER.info('Reservations after the Add API call: %d',
                    num_reservations_before_add)
        response = self.app.post('/dhcp4/reservations/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        num_reservations_after_add = get_num_reservations(self.app)
        LOGGER.info('Reservations after the Add API call: %d',
                    num_reservations_after_add)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(api_response_json['statusCode'],
                         '9000051000')
        self.assertEqual(api_response_json['statusValue'],
                         'Command execution successful')
        self.assertGreater(num_reservations_after_add,
                           num_reservations_before_add)

    def test_05_get_all_reservations(self):
        """
            Testing the get all reservations api to retrieve
            the configurations from another server.

            API Path: /dhcp4/reservations
            API Code: 004
            API Function Name: fast_dhcp.endpoints.get_all_reservations

            Case: Happy Path

            JSON Request contains
                command
                subnet_id

            Passes only if
                1. Response status code is 200
                2. FAST Type Response statusCode is 9000041000
                3. FAST Type Response statusValue is 'Command
                   execution successful
                4. Length of reservation should be greater than 0
        """
        LOGGER.info('Positive Testing get_all_reservations()')

        json_req = {
            "command": "subnets",
            "subnet_id": config_pt['subnet_id']
        }
        response = self.app.post('/dhcp4/reservations',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(api_response_json['statusCode'],
                         '9000041000')
        self.assertEqual(api_response_json['statusValue'],
                         'Command execution successful')
        self.assertGreater(len(api_response_json['data']['reservations']), 0)

    def test_06_get_ip_from_mac(self):
        """
            Testing the fetch the IP address for mentioned
            MAC and Subnet ID

            API Path: /dhcp4/getipfrommac
            API Code: 003
            API Function Name: fast_dhcp.endpoints.get_ip_from_mac

            Case: Happy Path

            JSON Request contains
                mac_address
                subnet_id

            Passes only if
                1. Response status code is 200
        """
        LOGGER.info('Positive Testing get_ip_from_mac()')
        json_req = {
            "subnet_id": config_pt['subnet_id'],
            'mac_address': 'ec:b0:e1:4c:ab:90'
        }
        response = self.app.post('/dhcp4/getipfrommac',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(response.status_code, 200)   # check ip here

    def test_07_add_option_subnet(self):
        """
            Testing add subnet option api.

            API Path: /dhcp4/subnets/options/add
            API Code: 009
            API Function Name: fast_dhcp.endpoints.add_option_subnet

            Case: Happy Path

            JSON Request contains
                subnet_id
                options_list

            Passes only if
                1. FAST Type Response statusCode is 9000091000
                2. Number of subnets options for the id should increase.
                3. FAST Type Response statusValue is 'Command
                   execution successful
        """
        LOGGER.info('Positive Testing add_option_subnet()')
        json_req = {
            "subnet_id": config_pt['subnet_id'],
            "options_list": config_pt['option_data']
        }
        num_option_before_add_opt = get_len_subnet_options_by_id()
        LOGGER.info('Subnets after the Add Options API call: %d',
                    num_option_before_add_opt)
        response = self.app.post('/dhcp4/subnets/options/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        num_option_after_add_opt = get_len_subnet_options_by_id()
        LOGGER.info('Subnets after the Add Options API call: %d',
                    num_option_after_add_opt)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(api_response_json['statusCode'], '9000091000')
        self.assertEqual(api_response_json['statusValue'],
                         'Command execution successful')
        self.assertGreater(num_option_after_add_opt,
                           num_option_before_add_opt)

    def test_08_add_reserv_option_subnet(self):
        """
            Testing add subnet id reservations option api.
            API Path: /dhcp4/subnets/reservation/options/add
            API Code: 011
            API Function Name: fast_dhcp.endpoints.add_reserv_option_subnet

            Case: Happy Path

            JSON Request contains
                subnet_id
                mac_address
                options_list

            Passes only if
                1. FAST Type Response statusCode is 9000111000
                2. Number of subnets reservations options for the
                   id and mac address should increase
                3. FAST Type Response statusValue is 'Command
                   execution successful
        """
        mac = config_pt['macs'][2]
        LOGGER.info('Positive Testing add_reserv_option_subnet()')
        num_reserve_option_before_add_opt = \
            get_len_subnet_reserv_options_by_id_and_mac(mac)
        LOGGER.info('Subnets before the add reserv Options API call: %d',
                    num_reserve_option_before_add_opt)
        json_req = {
            "subnet_id": config_pt['subnet_id'],
            "mac": mac,
            "options_list": config_pt['option_data']

        }
        response = self.app.post('/dhcp4/subnets/reservation/options/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_reserve_option_after_add_opt = \
            get_len_subnet_reserv_options_by_id_and_mac(mac)
        LOGGER.info('Subnets after the add reserv Options API call: %d',
                    num_reserve_option_after_add_opt)
        self.assertEqual(api_response_json['statusCode'], '9000111000')
        self.assertEqual(api_response_json['statusValue'],
                         'Command execution successful')
        self.assertGreater(num_reserve_option_after_add_opt,
                           num_reserve_option_before_add_opt)

    def test_09_delete_reserv_option_subnet(self):
        """
            Testing remove subnet id option api based on codes.
            API Path: /dhcp4/subnets/reservation/options/delete
            API Code: 012
            API Function Name: fast_dhcp.endpoints.delete_reserv_option_subnet

            Case: Happy Path

            JSON Request contains
                subnet_id
                mac_address
                options_list

            Passes only if
                1. FAST Type Response statusCode is 9000121000
                2. Number of subnets reservations options for the
                   id and mac address should decrease
                3. FAST Type Response statusValue is 'Command
                   execution successful
        """
        mac = config_pt['macs'][2]
        LOGGER.info('Positive Testing delete_reserv_option_subnet()')
        num_reserve_option_before_rm_opt = \
            get_len_subnet_reserv_options_by_id_and_mac(mac)
        LOGGER.info('Subnets before the remove reserv Options API call: %d',
                    num_reserve_option_before_rm_opt)
        json_req = {
            "subnet_id": config_pt['subnet_id'],
            "mac": mac,
            "codes": [
                config_pt['option_data'][0]["code"]
            ]
        }
        response = self.app.post('/dhcp4/subnets/reservation/options/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_reserve_option_after_rm_opt = \
            get_len_subnet_reserv_options_by_id_and_mac(mac)
        LOGGER.info('Subnets after the remove reserv Options API call: %d',
                    num_reserve_option_after_rm_opt)
        self.assertEqual(api_response_json['statusCode'], '9000121000')
        self.assertGreater(num_reserve_option_before_rm_opt,
                           num_reserve_option_after_rm_opt)
        self.assertEqual(api_response_json['statusValue'],
                         'Command execution successful')

    def test_10_delete_option_subnet(self):
        """
            Testing remove subnet id option api based on codes.

            API Path: /dhcp4/subnets/delete/options
            API Code: 010
            API Function Name: fast_dhcp.endpoints.delete_option_subnet

            Case: Happy Path

            JSON Request contains
                subnet_id
                codes

            Passes only if
                1. FAST Type Response statusCode is 9000101000
                2. Number of subnets options for the id should decrease
                3. FAST Type Response statusValue is 'Command
                   execution successful
        """
        LOGGER.info('Positive Testing delete_option_subnet()')
        num_option_before_rm_opt = \
            get_len_subnet_options_by_id()
        LOGGER.info('Subnets before the remove Options API call: %d',
                    num_option_before_rm_opt)
        json_req = {
            "subnet_id": config_pt['subnet_id'],
            "codes": [
                config_pt['option_data'][0]["code"]
            ]
        }
        response = self.app.post('/dhcp4/subnets/options/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_option_after_rm_opt = get_len_subnet_options_by_id()
        LOGGER.info('Subnets after the Add Options API call: %d',
                    num_option_after_rm_opt)
        self.assertEqual(api_response_json['statusCode'], '9000101000')
        self.assertGreater(num_option_before_rm_opt,
                           num_option_after_rm_opt)
        self.assertEqual(api_response_json['statusValue'],
                         'Command execution successful')

    def test_11_remove_reservation(self):
        """
            Testing remove reservation api to a subnet.

            API Path: /dhcp4/reservations/delete
            API Code: 006
            API Function Name: fast_dhcp.endpoints.remove_reservation

            Case: Happy Path

            JSON Request contains
                subnet_id
                hw_addresses

            Passes only if
                1. Response status code is 200
                2. FAST Type Response statusCode is 9000101000
                3. Number of reservations for the id should decrease
                4. FAST Type Response statusValue is 'Command
                   execution successful
        """
        LOGGER.info('Positive Testing remove_reservation()')
        json_req = {
            "subnet_id": config_pt['subnet_id'],
            "hw_addresses": [config_pt['macs'][2]],
        }
        num_reservations_before_rm = get_num_reservations(self.app)
        response = self.app.post('/dhcp4/reservations/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(response.status_code, 200)
        self.assertGreater(num_reservations_before_rm,
                           get_num_reservations(self.app))
        self.assertEqual(api_response_json['statusCode'], '9000061000')
        self.assertEqual(api_response_json['statusValue'],
                         'Command execution successful')

    def test_12_remove_subnet(self):
        """
            Testing remove subnet api.

            API Path: /dhcp4/subnets/delete
            API Code: 008
            API Function Name: fast_dhcp.endpoints.remove_subnet

            Case: Happy Path

            JSON Request contains
                subnet_id

            Passes only if
                1. FAST Type Response statusCode is 9000081000
                2. Number of subnets decrease
                3. Response status code is 200
                4. FAST Type Response statusValue is 'Command
                   execution successful

        """
        LOGGER.info('Positive Testing remove_subnet()')
        json_req = {
            "subnet_ids": [config_pt['subnet_id']]
        }
        before_rm_subnets = get_num_subnets()
        LOGGER.info('Subnets before the Remove API call: %d',
                    before_rm_subnets)
        response = self.app.post('/dhcp4/subnets/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        after_rm_subnet = get_num_subnets()
        LOGGER.info('Subnets after the Remove API call: %d',
                    after_rm_subnet)
        LOGGER.info('API Test Response -> %s',
                    json.dumps(api_response_json))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(api_response_json['statusCode'],
                         '9000081000')
        self.assertGreater(before_rm_subnets,
                           after_rm_subnet)
        self.assertEqual(api_response_json['statusValue'],
                         'Command execution successful')


class NegativeTests(unittest.TestCase):
    """
    Test Cases - Negative
    """

    def setUp(self):
        """
            Creating the test client using the create app from init
        """
        test_app = create_app()
        self.app = test_app.test_client()
        LOGGER.info('Adding subnet for negative testing purpose')
        json_req = {
            "subnet_list": [
                {
                    "id": config_nt['subnet_id']['existing'],
                    "subnet": config_nt['subnet']['existing'],
                    "pools": config_nt['pools']['existing'],
                    "option-data": config_nt['option_data']['valid'],
                    "reservations": [
                        {
                            "hw-address": config_nt['mac']['existing'],
                            "ip-address": config_nt['ip']['existing'],
                            "option-data": config_nt['option_data']['valid']
                        }
                    ]
                }
            ]
        }
        response = self.app.post('/dhcp4/subnets/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Response -> %s', str(api_response_json))

    def tearDown(self):
        LOGGER.info('Removing subnet after negative testing')
        json_req = {
            "subnet_ids": [config_nt['subnet_id']['existing']]
        }
        response = self.app.post('/dhcp4/subnets/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s',
                    json.dumps(api_response_json))

    def test_4001_get_ip_from_mac(self):
        """
            Testing the no json case for fetch the IP address for mentioned
            MAC and Subnet ID

            API Path: /dhcp4/getipfrommac
            API Code: 003
            API Function Name: fast_dhcp.endpoints.get_ip_from_mac

            JSON Request contains
                mac_address
                subnet_id

            Case: No JSON Request
                  Sending empty string as request object instead of JSON

            Passes only if
                1. FAST Type Response statusCode is 9000034001
                2. FAST Type Response statusValue is Could not find JSON key
        """
        LOGGER.info('Negative Testing get_ip_from_mac() - No JSON')
        json_req = ""
        response = self.app.post('/dhcp4/getipfrommac',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(api_response_json['statusCode'], '9000034001')
        self.assertEqual(api_response_json['statusValue'], ERROR_4001_VALUE)

    def test_4001_get_all_reservations(self):
        """
            Testing the no json case for get all reservations api
            to retrieve the configurations from kea server.

            API Path: /dhcp4/reservations
            API Code: 004
            API Function Name: fast_dhcp.endpoints.get_all_reservations

            JSON Request contains
                command
                subnet_id

            Case: No json data
                  Sending an empty json as a empty string

            Passes only if
                1. FAST Type Response statusCode is 9000044001
                2. FAST Type Response statusValue is Could not find JSON key
        """
        LOGGER.info('Negative Testing get_all_reservations() - NO JSON')
        json_req = ""
        response = self.app.post('/dhcp4/reservations',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(api_response_json['statusCode'],
                         '9000044001')
        self.assertEqual(api_response_json['statusValue'], ERROR_4001_VALUE)

    def test_4001_add_reservations(self):
        """
            Testing the empty json scenario for add a new
            reservation api to a subnet.

            API Path: /dhcp4/reservations/add
            API Code: 005
            API Function Name: fast_dhcp.endpoints.add_reservations

            JSON Request contains
                subnet_id
                reservation info

            Case: No json data
                  Sending an empty string instead of json

            Passes only if
                1. FAST Type Response statusCode is 9000054001
                2. FAST Type Response statusValue is Could not find JSON key
                3. Length of reservation does not change after the API call
        """
        LOGGER.info('Negative Testing add_reservations() - NO JSON')
        json_req = ""
        num_reservations_before_add = get_num_reservations(self.app)
        LOGGER.info('Reservations before add_reservations() -> %s', str(num_reservations_before_add))
        response = self.app.post('/dhcp4/reservations/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_reservations_after_add = get_num_reservations(self.app)
        LOGGER.info('Reservations after add_reservations() -> %s', str(num_reservations_after_add))
        self.assertEqual(api_response_json['statusCode'], '9000054001')
        self.assertEqual(api_response_json['statusValue'], ERROR_4001_VALUE)
        self.assertEqual(num_reservations_after_add, num_reservations_before_add)

    def test_4001_remove_reservation(self):
        """
            Testing negative case of no json for
            remove reservation api to a subnet.

            API Path: /dhcp4/reservations/delete
            API Code: 006
            API Function Name: fast_dhcp.endpoints.remove_reservation

            JSON Request contains
                subnet_id
                hw_addresses

            Case: No json data
                  Sending an empty string instead of json

            Passes only if
                1. FAST Type Response statusCode is 9000064001
                2. FAST Type Response statusValue is Could not find JSON key
                3. Length of reservation should not change
        """
        LOGGER.info('Negative Testing remove_reservation() - No JSON')
        json_req = ""
        num_reservations_before_rm = get_num_reservations(self.app)
        LOGGER.info('Reservations before remove_reservations() -> %s', str(num_reservations_before_rm))
        response = self.app.post('/dhcp4/reservations/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_reservations_after_rm = get_num_reservations(self.app)
        LOGGER.info('Reservations after remove_reservations() -> %s', str(num_reservations_after_rm))
        self.assertEqual(api_response_json['statusCode'], '9000064001')
        self.assertEqual(api_response_json['statusValue'], ERROR_4001_VALUE)
        self.assertEqual(num_reservations_before_rm, num_reservations_after_rm)

    def test_4001_add_subnet(self):
        """
            Testing NO JSON scenario for add subnet api.

            API Path: /dhcp4/subnets/add
            API Code: 007
            API Function Name: fast_dhcp.endpoints.add_subnet

            JSON Request contains
                subnet_list

            Case: No json data
                  Sending an empty string instead of json

            Passes only if
                1. FAST Type Response statusCode is 9000074001
                2. FAST Type Response statusValue is Could not find JSON key
                3. Number of subnets should not change

        """
        before_add_subnets = get_num_subnets()
        LOGGER.info('Subnets before the Add API call: %d', before_add_subnets)
        LOGGER.info('Negative Testing add_subnet() - No JSON')
        json_req = ""
        response = self.app.post('/dhcp4/subnets/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        after_add_subnet = get_num_subnets()
        LOGGER.info('Subnets after the Add API call: %d', after_add_subnet)
        self.assertEqual(api_response_json['statusCode'], '9000074001')
        self.assertEqual(api_response_json['statusValue'], ERROR_4001_VALUE)
        self.assertEqual(before_add_subnets, after_add_subnet)

    def test_4001_remove_subnet(self):
        """
            Testing no json scenario for remove subnet api.

            API Path: /dhcp4/subnets/delete
            API Code: 008
            API Function Name: fast_dhcp.endpoints.remove_subnet

            JSON Request contains
                subnet_id

            Case: No json data
                  Sending an empty string instead of json

            Passes only if
                1. FAST Type Response statusCode is 9000084001
                2. FAST Type Response statusValue is Could not find JSON key
                3. Number of subnets should not change
        """
        LOGGER.info('Negative Testing remove_subnet() - No JSON')
        json_req = ""
        before_rm_subnets = get_num_subnets()
        LOGGER.info('Subnets before the Remove API call: %d', before_rm_subnets)
        response = self.app.post('/dhcp4/subnets/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        after_rm_subnet = get_num_subnets()
        LOGGER.info('Subnets after the Remove API call: %d', after_rm_subnet)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(api_response_json['statusCode'], '9000084001')
        self.assertEqual(api_response_json['statusValue'], ERROR_4001_VALUE)
        self.assertEqual(before_rm_subnets, after_rm_subnet)

    def test_4001_add_option_subnet(self):
        """
            Testing no json scenario for add subnet option api.

            API Path: /dhcp4/subnets/options/add
            API Code: 009
            API Function Name: fast_dhcp.endpoints.add_option_subnet

            JSON Request contains
                subnet_id
                options_list

            Case: No json data
                  Sending an empty string instead of json

            Passes only if
                1. FAST Type Response statusCode is 9000094001
                2. FAST Type Response statusValue is Could not find JSON key
                3. Number of subnets options for the id should NOT change
        """
        LOGGER.info('Negative Testing add_option_subnet() - No JSON')
        json_req = ""
        num_option_before_add_opt = get_len_subnet_options_by_id()
        LOGGER.info('Subnets before the Add Options API call: %d', num_option_before_add_opt)
        response = self.app.post('/dhcp4/subnets/options/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        num_option_after_add_opt = get_len_subnet_options_by_id()
        LOGGER.info('Subnets after the Add Options API call: %d', num_option_after_add_opt)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(api_response_json['statusCode'], '9000094001')
        self.assertEqual(api_response_json['statusValue'], ERROR_4001_VALUE)
        self.assertEqual(num_option_before_add_opt, num_option_after_add_opt)

    def test_4001_delete_option_subnet(self):
        """
            Testing no json scenario for remove
            subnet id option api based on codes.

            API Path: /dhcp4/subnets/options/delete
            API Code: 010
            API Function Name: fast_dhcp.endpoints.delete_option_subnet

            Case: No JSON

            JSON Request contains
                subnet_id
                codes

            Case: No json data
                  Sending an empty string instead of json

            Passes only if
                1. FAST Type Response statusCode is 9000104001
                2. FAST Type Response statusValue is Could not find JSON key
                3. Number of subnets options for the id should NOT change
        """
        LOGGER.info('Negative Testing delete_option_subnet() - No JSON')
        num_option_before_rm_opt = get_len_subnet_options_by_id()
        LOGGER.info('Subnets before the remove Options API call: %d',
                    num_option_before_rm_opt)
        json_req = ""
        response = self.app.post('/dhcp4/subnets/options/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_option_after_rm_opt = get_len_subnet_options_by_id()
        LOGGER.info('Subnets after the Add Options API call: %d',
                    num_option_after_rm_opt)
        self.assertEqual(api_response_json['statusCode'], '9000104001')
        self.assertEqual(api_response_json['statusValue'], ERROR_4001_VALUE)
        self.assertEqual(num_option_before_rm_opt, num_option_after_rm_opt)

    def test_4001_add_subnet_reservation_option(self):
        """
            Testing no json case for add subnet id reservations option api
            .
            API Path: /dhcp4/subnets/reservation/options/add
            API Code: 011
            API Function Name: fast_dhcp.endpoints.add_reserv_option_subnet

            JSON Request contains
                subnet_id
                mac_address
                options_list

            Case: No json data
                  Sending an empty string instead of json

            Passes only if
                1. FAST Type Response statusCode is 9000111000
                2. FAST Type Response statusValue is Could not find JSON key
                3. Number of subnets reservations options for the id and
                   mac address should not change
        """
        LOGGER.info('Negative Testing add_reserv_option_subnet() - No JSON')
        num_reserve_option_before_add_opt = \
            get_len_subnet_reserv_options_by_id_and_mac()
        LOGGER.info('Subnets before the add reserv Options API call: %s',
                    str(num_reserve_option_before_add_opt))
        json_req = ""
        response = self.app.post('/dhcp4/subnets/reservation/options/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_reserve_option_after_add_opt = \
            get_len_subnet_reserv_options_by_id_and_mac()
        LOGGER.info('Subnets after the add reserv Options API call: %s',
                    str(num_reserve_option_after_add_opt))
        self.assertEqual(api_response_json['statusCode'], '9000114001')
        self.assertEqual(api_response_json['statusValue'], ERROR_4001_VALUE)
        self.assertEqual(num_reserve_option_after_add_opt,
                         num_reserve_option_before_add_opt)

    def test_4001_delete_subnet_reservation_option(self):
        """
            Testing no json case for remove subnet id option
            api based on codes.

            API Path: /dhcp4/subnets/reservation/options//delete
            API Code: 012
            API Function Name: fast_dhcp.endpoints.delete_reserv_option_subnet

            JSON Request contains
                subnet_id
                mac_address
                options_list

            Case: No json data
                  Sending an empty string instead of json

            Passes only if
                1. FAST Type Response statusCode is 9000121000
                2. Number of subnets reservations options for the id
                   and mac address should decrease
        """
        LOGGER.info('Negative Testing delete_reserv_option_subnet() - No JSON')
        num_reserve_option_before_rm_opt = \
            get_len_subnet_reserv_options_by_id_and_mac()
        LOGGER.info('Subnets before the remove reserv Options API call: %d',
                    num_reserve_option_before_rm_opt)
        json_req = ""
        response = self.app.post('/dhcp4/subnets/reservation/options/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_reserve_option_after_rm_opt = \
            get_len_subnet_reserv_options_by_id_and_mac()
        LOGGER.info('Subnets after the remove reserv Options API call: %d',
                    num_reserve_option_after_rm_opt)
        self.assertEqual(api_response_json['statusCode'], '9000124001')
        self.assertEqual(api_response_json['statusValue'], ERROR_4001_VALUE)
        self.assertEqual(num_reserve_option_before_rm_opt,
                         num_reserve_option_after_rm_opt)

    def test_4003_get_ip_from_mac_incorrect_subnet_id(self):
        """
            Testing the fetch the IP address for mentioned
            MAC and Subnet ID

            API Path: /dhcp4/getipfrommac
            API Code: 003
            API Function Name: fast_dhcp.endpoints.get_ip_from_mac

            JSON Request contains
                mac_address
                subnet_id

            Case: Incorrect Subnet_id
                  Sending a subnet id which does not exist on the dhcp4

            Passes only if
                1. FAST Type Response statusCode is 9000034003
                2. FAST Type Response statusValue is "IP Address not found"
        """
        LOGGER.info('Negative Testing get_ip_from_mac() - Incorrect subnet id')
        json_req = {
            "subnet_id": config_nt['subnet_id']['incorrect'],
            "mac_address": [
                config_nt["mac"]['existing']
            ]
        }
        response = self.app.post('/dhcp4/getipfrommac',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(api_response_json['statusCode'], '9000034003')
        self.assertEqual(api_response_json['statusValue'], ERROR_4003_VALUE)

    def test_4003_get_ip_from_mac_incorrect_mac_address(self):
        """
            Testing the fetch the IP address for mentioned
            MAC and Subnet ID

            API Path: /dhcp4/getipfrommac
            API Code: 003
            API Function Name: fast_dhcp.endpoints.get_ip_from_mac

            JSON Request contains
                mac_address
                subnet_id

            Case: Incorrect mac_address
                  Sending a mac_address which does not exist on the subnet

            Passes only if
                1. FAST Type Response statusCode is 9000034003
                2. FAST Type Response statusValue is "IP Address not found"
        """
        LOGGER.info('Negative Testing get_ip_from_mac() - '
                    'incorrect hw_address / mac address')
        json_req = {
            "subnet_id": config_nt['subnet_id']['existing'],
            "mac_address": [
                config_nt["mac"]['incorrect']
            ]
        }
        response = self.app.post('/dhcp4/getipfrommac',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(api_response_json['statusCode'], '9000034003')
        self.assertEqual(api_response_json['statusValue'], ERROR_4003_VALUE)

    def test_4005_get_all_reservations_incorrect_subnet_id(self):
        """
            Testing the get all reservation api to retrieve
            the configurations from kea server.

            API Path: /dhcp4/reservations
            API Code: 004
            API Function Name: fast_dhcp.endpoints.get_all_reservations

            JSON Request:
                command
                subnet_id

            Case: Incorrect subnet id
                  sending a subnet id which will not exist in the dhcp4

            Passes only if
                1. FAST Type Response statusCode is 9000044005
                2. FAST Type Response statusValue is
                   Unable to fetch reservations from server.
                3. FAST Type Response data will have error as
                   Unable to find the subnet with id {} from config obtained from server at {}:{}
        """
        LOGGER.info('Negative Testing get_all_reservations() - Incorrect Subnet ID')
        json_req = {
            "subnet_id": config_nt['subnet_id']['incorrect']
        }
        response = self.app.post('/dhcp4/reservations',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(api_response_json['statusCode'],
                         '9000044005')
        self.assertEqual(api_response_json['statusValue'],
                         ERROR_4005_VALUE)
        self.assertEqual(api_response_json["data"]["error"],
                         SUBNET_NOT_FOUND.format(config_nt['subnet_id']['incorrect'],
                                                 DHCP_IP, DHCP_PORT))

    def test_4006_add_reservations_incorrect_subnet_id(self):
        """
            Testing the add a new reservation api to a subnet.

            API Path: /dhcp4/reservations/add
            API Code: 005
            API Function Name: fast_dhcp.endpoints.add_reservations

            JSON Request contains
                subnet_id
                reservation info

            Case: Incorrect Subnet ID
                  sending a subnet id which will not exist in the dhcp4

            Passes only if
                1. FAST Type Response statusCode is 9000054006
                2. FAST Type Response statusValue is
                   "Failed to add reservation due to an issue with KEA server"
                3. FAST Type Response data will have error as
                   Unable to find the subnet with id {} from config obtained from server at {}:{}
        """
        LOGGER.info('Negative Testing add_reservations() - incorrect subnet_id')
        json_req = {
            "subnet_id": config_nt['subnet_id']['incorrect'],
            "reservations": [
                {
                    "hostname": "test_reservation",
                    "hw-address": config_nt['mac']['valid'],
                    "ip-address": config_nt['ip']['valid'],
                    "next-server": "172.28.12.191",
                    "server-hostname": "test_reservation_server"
                }
            ]
        }
        response = self.app.post('/dhcp4/reservations/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(api_response_json["statusCode"], "9000054006")
        self.assertEqual(api_response_json["statusValue"], ERROR_4006_VALUE)
        self.assertEqual(api_response_json["data"]["error"],
                         SUBNET_NOT_FOUND.format(config_nt['subnet_id']['incorrect'],
                                                 DHCP_IP, DHCP_PORT))

    def test_4007_add_reservations_duplicate_ip_address(self):
        """
            Testing the add a new reservation api to a subnet.

            API Path: /dhcp4/reservations/add
            API Code: 005
            API Function Name: fast_dhcp.endpoints.add_reservations

            JSON Request contains
                subnet_id
                reservation info

            Case: Duplicate IP Address
                  Sending an existing reserved IP added during setup in the subnet.

            Passes only if
                1. FAST Type Response statusCode is 9000054007
                2. FAST Type Response statusValue is Failed to add reservation
                3. Length of reservation should not have changed
        """
        LOGGER.info('Negative Testing add_reservations() - Existing IP address')
        json_req = {
            "subnet_id": config_nt['subnet_id']['existing'],
            "reservations": [
                {
                    "hostname": "test_reservation",
                    "hw-address": config_nt['mac']['valid'],
                    "ip-address": config_nt['ip']['existing'],
                    "next-server": "172.28.12.191",
                    "server-hostname": "test_reservation_server"
                }
            ]
        }
        num_reservations_before_add = get_num_reservations(self.app)
        response = self.app.post('/dhcp4/reservations/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_reservations_after_add = get_num_reservations(self.app)
        self.assertEqual(api_response_json["statusCode"], "9000054007")
        self.assertEqual(api_response_json["statusValue"], ERROR_4007_VALUE)
        self.assertEqual(num_reservations_after_add, num_reservations_before_add)

    def test_4007_add_reservations_duplicate_mac_address(self):
        """
            Testing the add a new reservation api to a subnet.

            API Path: /dhcp4/reservations/add
            API Code: 005
            API Function Name: fast_dhcp.endpoints.add_reservations

            JSON Request contains
                subnet_id
                reservation info

            Case: Duplicate Hardware Address
                  Sending an existing reserved mac added during setup in the subnet.

            Passes only if
                1. FAST Type Response statusCode is 9000054007
                2. FAST Type Response statusValue is Failed to add reservation
                3. Length of reservation should not have changed
        """
        LOGGER.info('Negative Testing add_reservations() - Existing MAC address')
        json_req = {
            "subnet_id": config_nt['subnet_id']['existing'],
            "reservations": [
                {
                    "hostname": "test_reservation",
                    "hw-address": config_nt['mac']['existing'],
                    "ip-address": config_nt['ip']['valid'],
                    "next-server": "172.28.12.191",
                    "server-hostname": "test_reservation_server"
                }
            ]
        }
        num_reservations_before_add = get_num_reservations(self.app)
        response = self.app.post('/dhcp4/reservations/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_reservations_after_add = get_num_reservations(self.app)
        self.assertEqual(api_response_json["statusCode"], "9000054007")
        self.assertEqual(api_response_json["statusValue"], ERROR_4007_VALUE)
        self.assertEqual(num_reservations_after_add, num_reservations_before_add)

    def test_4007_add_reservations_incorrect_mac_address(self):
        """
            Testing the add a new reservation api to a subnet.

            API Path: /dhcp4/reservations/add
            API Code: 005
            API Function Name: fast_dhcp.endpoints.add_reservations

            JSON Request contains
                subnet_id
                reservation info

            Case: Incorrect MAC Address
                  Sending a mac address which is not in correct format.

            Passes only if
                1. FAST Type Response statusCode is 9000054007
                2. FAST Type Response statusValue is Failed to add reservation
                3. Length of reservation should not have changed
        """
        LOGGER.info('Negative Testing add_reservations() - Invalid MAC address')
        json_req = {
            "subnet_id": config_nt['subnet_id']['existing'],
            "reservations": [
                {
                    "hostname": "test_reservation",
                    "hw-address": config_nt['mac']['incorrect'],
                    "ip-address": config_nt['ip']['valid'],
                    "next-server": "172.28.12.191",
                    "server-hostname": "test_reservation_server"
                }
            ]
        }
        num_reservations_before_add = get_num_reservations(self.app)
        response = self.app.post('/dhcp4/reservations/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_reservations_after_add = get_num_reservations(self.app)
        self.assertEqual(api_response_json["statusCode"], "9000054007")
        self.assertEqual(api_response_json["statusValue"], ERROR_4007_VALUE)
        self.assertEqual(num_reservations_after_add, num_reservations_before_add)

    def test_4007_add_reservations_incorrect_option_code(self):
        """
            Testing the add a new reservation api to a subnet.

            API Path: /dhcp4/reservations/add
            API Code: 005
            API Function Name: fast_dhcp.endpoints.add_reservations

            JSON Request contains
                subnet_id
                reservation info

            Case: Incorrect Option Code
                  Sending a code outside of DHCP codes

            Passes only if
                1. FAST Type Response statusCode is 9000054007
                2. FAST Type Response statusValue is Failed to add reservation
                3. Length of reservation should not have changed
        """
        LOGGER.info('Negative Testing add_reservations() - Incorrect option code')
        json_req = {
            "subnet_id": config_nt['subnet_id']['existing'],
            "reservations": [
                {
                    "hostname": "test_reservation",
                    "hw-address": config_nt['mac']['valid'],
                    "ip-address": config_nt['ip']['valid'],
                    "next-server": "172.28.12.191",
                    "server-hostname": "test_reservation_server",
                    "option-data": config_nt['option_data']['incorrect']

                }
            ]
        }
        num_reservations_before_add = get_num_reservations(self.app)
        response = self.app.post('/dhcp4/reservations/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_reservations_after_add = get_num_reservations(self.app)
        self.assertEqual(api_response_json["statusCode"], "9000054007")
        self.assertEqual(api_response_json["statusValue"], ERROR_4007_VALUE)
        self.assertEqual(num_reservations_after_add, num_reservations_before_add)

    def test_4008_remove_reservation_incorrect_subnet_id(self):
        """
            Testing remove reservation api to a subnet.

            API Path: /dhcp4/reservations/delete
            API Code: 006
            API Function Name: fast_dhcp.endpoints.remove_reservation

            JSON Request contains
                subnet_id
                hw_addresses

            Case: Incorrect Subnet_id
                  Sending a subnet id which does not exist on the dhcp4

            Passes only if
                1. FAST Type Response statusCode is 9000064008
                2. FAST Type Response statusValue is
                   "Failed to remove reservation due to an issue with KEA server"
                3. FAST Type Response data will have error as
                   Unable to find the subnet with id {} from config obtained from server at {}:{}
        """
        LOGGER.info('Negative Testing remove_reservation() - incorrect subnet_id')
        json_req = {
            "subnet_id": config_nt['subnet_id']['incorrect'],
            "hw_addresses": [
                config_nt['mac']['existing']
            ]
        }
        response = self.app.post('/dhcp4/reservations/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(api_response_json['statusCode'],
                         '9000064008')
        self.assertEqual(api_response_json["statusValue"], ERROR_4008_VALUE)
        self.assertEqual(api_response_json["data"]["error"],
                         SUBNET_NOT_FOUND.format(config_nt['subnet_id']['incorrect'],
                                                 DHCP_IP, DHCP_PORT))

    def test_4008_remove_reservation_empty_hw_address_list(self):
        """
            Testing remove reservation api to a subnet.

            API Path: /dhcp4/reservations/delete
            API Code: 006
            API Function Name: fast_dhcp.endpoints.remove_reservation

            JSON Request contains
                subnet_id
                hw_addresses

            Case: Empty Hardware Address List
                  Sending a empty list for mac_addresses

            Passes only if
                1. FAST Type Response statusCode is 9000064008
                2. FAST Type Response statusValue is
                   "Failed to remove reservation due to an issue with KEA server"
                3. FAST Type Response data will have error as
                   Specified reservation mac(s) do not exist
                4. Length of reservation should not change
        """
        LOGGER.info('Negative Testing remove_reservation() - empty hw address list')

        json_req = {
            "subnet_id": config_nt['subnet_id']['existing'],
            "hw_addresses": []
        }
        num_reservations_before_rm = get_num_reservations(self.app)
        response = self.app.post('/dhcp4/reservations/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_reservations_after_rm = get_num_reservations(self.app)
        self.assertEqual(api_response_json['statusCode'],
                         '9000064008')
        self.assertEqual(api_response_json["statusValue"], ERROR_4008_VALUE)
        self.assertEqual(num_reservations_before_rm, num_reservations_after_rm)
        self.assertEqual(api_response_json["data"]["error"], RESERVATION_NOT_FOUND)

    def test_4008_remove_reservation_incorrect_hw_address(self):
        """
            Testing remove reservation api to a subnet.

            API Path: /dhcp4/reservations/delete
            API Code: 006
            API Function Name: fast_dhcp.endpoints.remove_reservation

            JSON Request contains
                subnet_id
                hw_addresses

            Case: Incorrect MAC Address
                  Sending a mac address which is not present in the config.

            Passes only if
                1. FAST Type Response statusCode is 9000064008
                2. FAST Type Response statusValue is
                   "Failed to remove reservation due to an issue with KEA server"
                3. FAST Type Response data will have error as
                   'Specified reservation mac(s) do not exist'
                4. Length of reservation should not change
        """
        LOGGER.info('Negative Testing remove_reservation() - '
                    'incorrect hw address')

        json_req = {
            "subnet_id": config_nt['subnet_id']['existing'],
            "hw_addresses": [
                config_nt['mac']['valid']
            ]
        }
        num_reservations_before_rm = get_num_reservations(self.app)
        response = self.app.post('/dhcp4/reservations/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_reservations_after_rm = get_num_reservations(self.app)
        self.assertEqual(api_response_json['statusCode'],
                         '9000064008')
        self.assertEqual(api_response_json["statusValue"], ERROR_4008_VALUE)
        self.assertEqual(num_reservations_before_rm, num_reservations_after_rm)
        self.assertEqual(api_response_json["data"]["error"], RESERVATION_NOT_FOUND)

    def test_4008_remove_reservation_invalid_hw_address(self):
        """
            Testing remove reservation api to a subnet.

            API Path: /dhcp4/reservations/delete
            API Code: 006
            API Function Name: fast_dhcp.endpoints.remove_reservation

            JSON Request contains
                subnet_id
                hw_addresses

            Case: Invalid MAC Address
                  Sending a mac address which is not in correct format.

            Passes only if
                1. FAST Type Response statusCode is 9000064008
                2. FAST Type Response statusValue is
                   "Failed to remove reservation due to an issue with KEA server"
                3. FAST Type Response data will have error as
                   'Specified reservation mac(s) do not exist'
                4. Length of reservation should not change
        """
        LOGGER.info('Negative Testing remove_reservation() - '
                    'invalid hw address')

        json_req = {
            "subnet_id": config_nt['subnet_id']['existing'],
            "hw_addresses": [
                config_nt['mac']['incorrect']
            ]
        }
        num_reservations_before_rm = get_num_reservations(self.app)

        response = self.app.post('/dhcp4/reservations/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_reservations_after_rm = get_num_reservations(self.app)
        self.assertEqual(api_response_json['statusCode'],
                         '9000064008')
        self.assertEqual(api_response_json["statusValue"], ERROR_4008_VALUE)
        self.assertEqual(num_reservations_before_rm, num_reservations_after_rm)
        self.assertEqual(api_response_json["data"]["error"], RESERVATION_NOT_FOUND)

    def test_4011_add_subnet_duplicate_subnet_id(self):
        """
            Testing add subnet api.

            API Path: /dhcp4/subnets/add
            API Code: 007
            API Function Name: fast_dhcp.endpoints.add_subnet

            JSON Request contains
                subnet_list

            Case: Duplicate Subnet ID
                  Sending an ID which is already been used.

            Passes only if
                1. FAST Type Response statusCode is 9000074011
                2. FAST Type Response statusValue is 'Failed to add subnet'
                3. Number of subnets should not change
        """
        LOGGER.info('Negative Testing add_subnet() - Duplicate subnet id')
        json_req = {
            "subnet_list": [
                {
                    "id": config_nt['subnet_id']['existing'],
                    "subnet": config_nt['subnet']['valid'],
                    "pools": config_nt['pools']['valid'],
                    "option-data": config_nt['option_data']['valid'],
                    "reservations": [
                        {
                            "hw-address": config_nt['mac']['valid'],
                            "ip-address": config_nt['ip']['valid']
                        }
                    ]
                }
            ]
        }
        before_add_subnets = get_num_subnets()
        LOGGER.info('Subnets before the Add API call: %d', before_add_subnets)
        response = self.app.post('/dhcp4/subnets/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        after_add_subnet = get_num_subnets()
        LOGGER.info('Subnets after the Add API call: %d', after_add_subnet)
        self.assertEqual(api_response_json['statusCode'], '9000074011')
        self.assertEqual(api_response_json['statusValue'], ERROR_4011_VALUE)
        self.assertEqual(before_add_subnets, after_add_subnet)

    def test_4011_add_subnet_duplicate_subnet(self):
        """
            Testing add subnet api.

            API Path: /dhcp4/subnets/add
            API Code: 007
            API Function Name: fast_dhcp.endpoints.add_subnet

            JSON Request contains
                subnet_list

            Case: Duplicate Subnet
                  Sending a subnet which is already been used.

            Passes only if
                1. FAST Type Response statusCode is 9000074011
                2. FAST Type Response statusValue is 'Failed to add subnet'
                3. Number of subnets should not change
        """
        LOGGER.info('Negative Testing add_subnet() - Duplicate subnet')
        json_req = {
            "subnet_list": [
                {
                    "id": config_nt['subnet_id']['valid'],
                    "subnet": config_nt['subnet']['existing'],
                    "pools": config_nt['pools']['valid'],
                    "option-data": config_nt['option_data']['valid'],
                    "reservations": [
                        {
                            "hw-address": config_nt['mac']['valid'],
                            "ip-address": config_nt['ip']['valid']
                        }
                    ]
                }
            ]
        }
        before_add_subnets = get_num_subnets()
        LOGGER.info('Subnets before the Add API call: %d', before_add_subnets)
        response = self.app.post('/dhcp4/subnets/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        after_add_subnet = get_num_subnets()
        LOGGER.info('Subnets after the Add API call: %d', after_add_subnet)
        self.assertEqual(api_response_json['statusCode'], '9000074011')
        self.assertEqual(api_response_json['statusValue'], ERROR_4011_VALUE)
        self.assertEqual(before_add_subnets, after_add_subnet)

    def test_4011_add_subnet_incorrect_pool(self):
        """
            Testing add subnet api.

            API Path: /dhcp4/subnets/add
            API Code: 007
            API Function Name: fast_dhcp.endpoints.add_subnet

            JSON Request contains
                subnet_list

            Case: Incorrect Pool
                  Sending a pool which is outside the subnet

            Passes only if
                1. FAST Type Response statusCode is 9000074011
                2. FAST Type Response statusValue is 'Failed to add subnet'
                3. Number of subnets should not change
        """
        LOGGER.info('Negative Testing add_subnet() - Incorrect Pool')
        json_req = {
            "subnet_list": [
                {
                    "id": config_nt['subnet_id']['valid'],
                    "subnet": config_nt['subnet']['valid'],
                    "pools": config_nt['pools']['incorrect'],
                    "option-data": config_nt['option_data']['valid'],
                    "reservations": [
                        {
                            "hw-address": config_nt['mac']['valid'],
                            "ip-address": config_nt['ip']['valid']
                        }
                    ]
                }
            ]
        }
        before_add_subnets = get_num_subnets()
        LOGGER.info('Subnets before the Add API call: %d', before_add_subnets)
        response = self.app.post('/dhcp4/subnets/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        after_add_subnet = get_num_subnets()
        LOGGER.info('Subnets after the Add API call: %d', after_add_subnet)
        self.assertEqual(api_response_json['statusCode'], '9000074011')
        self.assertEqual(api_response_json['statusValue'], ERROR_4011_VALUE)
        self.assertEqual(before_add_subnets, after_add_subnet)

    def test_4011_add_subnet_invalid_option_code(self):
        """
            Testing add subnet api.

            API Path: /dhcp4/subnets/add
            API Code: 007
            API Function Name: fast_dhcp.endpoints.add_subnet

            Case: Duplicate Subnet ID
                  Sending an option code outside of the DHCP code list.

            JSON Request contains
                subnet_list

            Passes only if
                1. FAST Type Response statusCode is 9000074011
                2. FAST Type Response statusValue is 'Failed to add subnet'
                3. Number of subnets should not change
        """
        LOGGER.info('Negative Testing add_subnet() - Incorrect Option Data')
        json_req = {
            "subnet_list": [
                {
                    "id": config_nt['subnet_id']['valid'],
                    "subnet": config_nt['subnet']['valid'],
                    "pools": config_nt['pools']['valid'],
                    "option-data": config_nt['option_data']['incorrect'],
                    "reservations": [
                        {
                            "hw-address": config_nt['mac']['valid'],
                            "ip-address": config_nt['ip']['valid']
                        }
                    ]
                }
            ]
        }
        before_add_subnets = get_num_subnets()
        LOGGER.info('Subnets before the Add API call: %d', before_add_subnets)
        response = self.app.post('/dhcp4/subnets/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        after_add_subnet = get_num_subnets()
        LOGGER.info('Subnets after the Add API call: %d', after_add_subnet)
        self.assertEqual(api_response_json['statusCode'], '9000074011')
        self.assertEqual(api_response_json['statusValue'], ERROR_4011_VALUE)
        self.assertEqual(before_add_subnets, after_add_subnet)

    def test_4011_add_subnet_invalid_reservation_option_code(self):
        """
            Testing add subnet api.

            API Path: /dhcp4/subnets/add
            API Code: 007
            API Function Name: fast_dhcp.endpoints.add_subnet

            Case: Invalid option code in reservation
                  Sending an option code outside of the DHCP code list for reservation.

            JSON Request contains
                subnet_list

            Passes only if
                1. FAST Type Response statusCode is 9000074011
                2. FAST Type Response statusValue is 'Failed to add subnet'
                3. Number of subnets should not change
        """
        LOGGER.info('Negative Testing add_subnet() - Incorrect Option Data')
        json_req = {
            "subnet_list": [
                {
                    "id": config_nt['subnet_id']['valid'],
                    "subnet": config_nt['subnet']['valid'],
                    "pools": config_nt['pools']['valid'],
                    "option-data": config_nt['option_data']['valid'],
                    "reservations": [
                        {
                            "hw-address": config_nt['mac']['valid'],
                            "ip-address": config_nt['ip']['valid'],
                            "option-data": config_nt['option_data']['incorrect'],

                        }
                    ]
                }
            ]
        }
        before_add_subnets = get_num_subnets()
        LOGGER.info('Subnets before the Add API call: %d', before_add_subnets)
        response = self.app.post('/dhcp4/subnets/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        after_add_subnet = get_num_subnets()
        LOGGER.info('Subnets after the Add API call: %d', after_add_subnet)
        self.assertEqual(api_response_json['statusCode'], '9000074011')
        self.assertEqual(api_response_json['statusValue'], ERROR_4011_VALUE)
        self.assertEqual(before_add_subnets, after_add_subnet)

    def test_4011_add_subnet_duplicate_reservation_ip_address(self):
        """
            Testing add subnet api.

            API Path: /dhcp4/subnets/add
            API Code: 007
            API Function Name: fast_dhcp.endpoints.add_subnet

            JSON Request contains
                subnet_list

            Case: Duplicate reservation IP Address
                  Sending an IP which has already been used.

            Passes only if
                1. FAST Type Response statusCode is 9000074011
                2. FAST Type Response statusValue is 'Failed to add subnet'
                3. Number of subnets should not change
        """
        LOGGER.info('Negative Testing add_subnet() - Incorrect Option Data')
        json_req = {
            "subnet_list": [
                {
                    "id": config_nt['subnet_id']['valid'],
                    "subnet": config_nt['subnet']['valid'],
                    "pools": config_nt['pools']['valid'],
                    "option-data": config_nt['option_data']['valid'],
                    "reservations": [
                        {
                            "hw-address": config_nt['mac']['valid'],
                            "ip-address": config_nt['ip']['existing'],
                            "option-data": config_nt['option_data']['valid']
                        }
                    ]
                }
            ]
        }
        before_add_subnets = get_num_subnets()
        LOGGER.info('Subnets before the Add API call: %d', before_add_subnets)
        response = self.app.post('/dhcp4/subnets/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        after_add_subnet = get_num_subnets()
        LOGGER.info('Subnets after the Add API call: %d', after_add_subnet)
        self.assertEqual(api_response_json['statusCode'], '9000074011')
        self.assertEqual(api_response_json['statusValue'], ERROR_4011_VALUE)
        self.assertEqual(before_add_subnets, after_add_subnet)

    def test_4011_add_subnet_duplicate_reservation_mac_address(self):
        """
            Testing add subnet api.

            API Path: /dhcp4/subnets/add
            API Code: 007
            API Function Name: fast_dhcp.endpoints.add_subnet

            JSON Request contains
                subnet_list

            Case: Duplicate reservation Mac Address
                  Sending an MAC which has already been used.

            Passes only if
                1. FAST Type Response statusCode is 9000074011
                2. FAST Type Response statusValue is 'Failed to add subnet'
                3. Number of subnets should not change
        """
        LOGGER.info('Negative Testing add_subnet() - Incorrect Option Data')
        json_req = {
            "subnet_list": [
                {
                    "id": config_nt['subnet_id']['valid'],
                    "subnet": config_nt['subnet']['valid'],
                    "pools": config_nt['pools']['valid'],
                    "option-data": config_nt['option_data']['valid'],
                    "reservations": [
                        {
                            "hw-address": config_nt['mac']['existing'],
                            "ip-address": config_nt['ip']['valid']
                        }
                    ]
                }
            ]
        }
        before_add_subnets = get_num_subnets()
        LOGGER.info('Subnets before the Add API call: %d', before_add_subnets)
        response = self.app.post('/dhcp4/subnets/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        after_add_subnet = get_num_subnets()
        LOGGER.info('Subnets after the Add API call: %d', after_add_subnet)
        self.assertEqual(api_response_json['statusCode'], '9000074011')
        self.assertEqual(api_response_json['statusValue'], ERROR_4011_VALUE)
        self.assertEqual(before_add_subnets, after_add_subnet)

    def test_4011_add_subnet_invalid_reservation_mac_address(self):
        """
            Testing add subnet api.

            API Path: /dhcp4/subnets/add
            API Code: 007
            API Function Name: fast_dhcp.endpoints.add_subnet

            JSON Request contains
                subnet_list

            Case: Invalic reservation Mac Address
                  Sending an MAC which has incorrect ormat.

            Passes only if
                1. FAST Type Response statusCode is 9000074011
                2. FAST Type Response statusValue is 'Failed to add subnet'
                3. Number of subnets should not change
        """
        LOGGER.info('Negative Testing add_subnet() - Incorrect Option Data')
        json_req = {
            "subnet_list": [
                {
                    "id": config_nt['subnet_id']['valid'],
                    "subnet": config_nt['subnet']['valid'],
                    "pools": config_nt['pools']['valid'],
                    "option-data": config_nt['option_data']['valid'],
                    "reservations": [
                        {
                            "hw-address": config_nt['mac']['incorrect'],
                            "ip-address": config_nt['ip']['valid']
                        }
                    ]
                }
            ]
        }
        before_add_subnets = get_num_subnets()
        LOGGER.info('Subnets before the Add API call: %d', before_add_subnets)
        response = self.app.post('/dhcp4/subnets/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        after_add_subnet = get_num_subnets()
        LOGGER.info('Subnets after the Add API call: %d', after_add_subnet)
        self.assertEqual(api_response_json['statusCode'], '9000074011')
        self.assertEqual(api_response_json['statusValue'], ERROR_4011_VALUE)
        self.assertEqual(before_add_subnets, after_add_subnet)

    def test_4012_remove_subnet_incorrect_subnet_id(self):
        """
            Testing remove subnet api.

            API Path: /dhcp4/subnets/delete
            API Code: 008
            API Function Name: fast_dhcp.endpoints.remove_subnet

            JSON Request contains
                subnet_id

            Case: Incorrect subnet id
                  sending a subnet id which will not exist in the dhcp4

            Passes only if
                1. FAST Type Response statusCode is 9000084012
                2. FAST Type Response statusValue is
                   "Failed to remove subnet due to an issue with KEA server response"
                3. FAST Type Response data has error - Specified subnet id(s) do not exist
                4. Number of subnets should not change
        """
        LOGGER.info('Negative Testing remove_subnet() - Incorrect subnet id')
        json_req = {
            "subnet_ids": [config_nt['subnet_id']['incorrect']]

        }
        before_rm_subnets = get_num_subnets()
        LOGGER.info('Subnets before the Remove API call: %d', before_rm_subnets)
        response = self.app.post('/dhcp4/subnets/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        after_rm_subnet = get_num_subnets()
        LOGGER.info('Subnets after the Remove API call: %d', after_rm_subnet)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(api_response_json['statusCode'], '9000084012')
        self.assertEqual(api_response_json['statusValue'], ERROR_4012_VALUE)
        self.assertEqual(api_response_json["data"]["error"], SUBNETS_NOT_FOUND)
        self.assertEqual(before_rm_subnets, after_rm_subnet)

    def test_4012_remove_subnet_empty_list(self):
        """
            Testing remove subnet api.

            API Path: /dhcp4/subnets/delete
            API Code: 008
            API Function Name: fast_dhcp.endpoints.remove_subnet

            JSON Request contains
                subnet_id

            Case: Empty subnet id list
                  Sending an empty list for subnets.

            Passes only if
                1. FAST Type Response statusCode is 9000084010
                2. FAST Type Response statusValue is Specified subnet not found
                3. FAST Type Response data has error as Specified subnet not found
                4. Number of subnets should not change
        """
        LOGGER.info('Negative Testing remove_subnet() - empty subnet id list')
        json_req = {
            "subnet_ids": []
        }
        before_rm_subnets = get_num_subnets()
        LOGGER.info('Subnets before the Remove API call: %d', before_rm_subnets)
        response = self.app.post('/dhcp4/subnets/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        after_rm_subnet = get_num_subnets()
        LOGGER.info('Subnets after the Remove API call: %d', after_rm_subnet)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(api_response_json['statusCode'], '9000084012')
        self.assertEqual(api_response_json['statusValue'], ERROR_4012_VALUE)
        self.assertEqual(api_response_json['data']['error'], SUBNETS_NOT_FOUND)
        self.assertEqual(before_rm_subnets, after_rm_subnet)

    def test_4014_add_option_subnet_incorrect_subnet_id(self):
        """
            Testing add subnet option api.

            API Path: /dhcp4/subnets/add/options
            API Code: 009
            API Function Name: fast_dhcp.endpoints.add_option_subnet

            JSON Request contains
                subnet_id
                options_list

            Case: Incorrect subnet id
                  sending a subnet id which will not exist in the dhcp4

            Passes only if
                1. FAST Type Response statusCode is 9000094014
                2. FAST Type Response statusValue is
                   'Failed to add subnet option due to an issue with KEA server response'
                3. Length should be -1 since subnet id is incorrect
                4. FAST Type Response data will have error as
                   Unable to find the subnet with id {} from config obtained from server at {}:{}
       """
        LOGGER.info('Negative Testing add_option_subnet() - Incorrect subnet id')
        json_req = {
            "subnet_id": config_nt['subnet_id']['incorrect'],
            "options_list": config_nt["option_data"]['valid']
        }
        num_option_before_add_opt = get_len_subnet_options_by_id()
        LOGGER.info('Subnets after the Add Options API call: %d',
                    num_option_before_add_opt)
        response = self.app.post('/dhcp4/subnets/options/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        num_option_after_add_opt = get_len_subnet_options_by_id()
        LOGGER.info('Subnets after the Add Options API call: %d',
                    num_option_after_add_opt)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(api_response_json['statusCode'], '9000094014')
        self.assertEqual(api_response_json['statusValue'], ERROR_4014_VALUE)
        self.assertEqual(num_option_after_add_opt, num_option_before_add_opt, -1)
        self.assertEqual(api_response_json["data"]["error"],
                         SUBNET_NOT_FOUND.format(config_nt['subnet_id']['incorrect'],
                                                 DHCP_IP, DHCP_PORT))

    def test_4015_add_option_subnet_invalid_option_code(self):
        """
            Testing add subnet option api.

            API Path: /dhcp4/subnets/add/options
            API Code: 009
            API Function Name: fast_dhcp.endpoints.add_option_subnet

            JSON Request contains
                subnet_id
                options_list

            Case: Invalid Options Code
                  Sending an option code outside of the DHCP code list.

            Passes only if
                1. FAST Type Response statusCode is 9000094015
                2. FAST Type Response statusValue is
                   'Failed to add subnet option'
                3. Number of subnets options for the id should not change
        """
        LOGGER.info('Negative Testing add_option_subnet() - '
                    'Duplicate Options Code for same id')
        json_req = {
            "subnet_id": config_nt['subnet_id']['existing'],
            "options_list": config_nt['option_data']['incorrect']
        }
        num_option_before_add_opt = get_len_subnet_options_by_id()
        LOGGER.info('Subnets after the Add Options API call: %d',
                    num_option_before_add_opt)
        response = self.app.post('/dhcp4/subnets/options/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        num_option_after_add_opt = get_len_subnet_options_by_id()
        LOGGER.info('Subnets after the Add Options API call: %d',
                    num_option_after_add_opt)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(api_response_json['statusCode'], '9000094015')
        self.assertEqual(api_response_json['statusValue'], ERROR_4015_VALUE)
        self.assertEqual(num_option_before_add_opt, num_option_after_add_opt)

    def test_4016_delete_option_subnet_invalid_option_code(self):
        """
            Testing remove subnet option api based on codes.

            API Path: /dhcp4/subnets/options/delete
            API Code: 010
            API Function Name: fast_dhcp.endpoints.delete_option_subnet

            Case: Incorrect Options Code
                  Sending an option code outside of the DHCP code list.

            JSON Request contains
                subnet_id
                codes

            Passes only if
                1. FAST Type Response statusCode is 9000094016
                2. FAST Type Response statusValue is
                   'Failed to remove subnet option due to an issue with KEA server response'
                3. Number of subnets options for the id should not change
                4. FAST Type Response data will have error as
                   'Specified option code(s) do not exist'
        """
        LOGGER.info('Negative Testing delete_option_subnet() - Incorrect Options Code')
        num_option_before_rm_opt = get_len_subnet_options_by_id()
        LOGGER.info('Subnets before the remove Options API call: %d',
                    num_option_before_rm_opt)
        json_req = {
            "subnet_id": config_nt['subnet_id']['existing'],
            "codes": [
                config_nt['option_data']['incorrect'][0]['code']
            ]
        }
        response = self.app.post('/dhcp4/subnets/options/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_option_after_rm_opt = get_len_subnet_options_by_id()
        LOGGER.info('Subnets after the Add Options API call: %d',
                    num_option_after_rm_opt)
        self.assertEqual(num_option_before_rm_opt, num_option_after_rm_opt)
        self.assertEqual(api_response_json['statusCode'], '9000104016')
        self.assertEqual(api_response_json['statusValue'], ERROR_4016_VALUE)
        self.assertEqual(api_response_json['data']['error'], OPTIONS_NOT_FOUND)

    def test_4016_delete_option_subnet_incorrect_subnet_id(self):
        """
            Testing remove subnet id option api based on codes.

            API Path: /dhcp4/subnets/options/delete
            API Code: 010
            API Function Name: fast_dhcp.endpoints.delete_option_subnet

            JSON Request contains
                subnet_id
                codes

            Case: Incorrect subnet id
                  sending a subnet id which will not exist in the dhcp4

            Passes only if
                1. FAST Type Response statusCode is 9000104016
                2. FAST Type Response statusValue is
                   'Failed to remove subnet option due to an issue with KEA server response'
                3. Number of subnets options for the id should not change
                4. FAST Type Response data will have error as
                   Unable to find the subnet with id {} from config obtained from server at {}:{}
        """
        LOGGER.info('Negative Testing delete_option_subnet() - Incorrect subnet id ')
        num_option_before_rm_opt = get_len_subnet_options_by_id()
        LOGGER.info('Subnets before the remove Options API call: %d',
                    num_option_before_rm_opt)
        json_req = {
            "subnet_id": config_nt['subnet_id']['incorrect'],
            "codes": [
                config_nt['option_data']['valid'][0]['code']
            ]
        }
        response = self.app.post('/dhcp4/subnets/options/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_option_after_rm_opt = get_len_subnet_options_by_id()
        LOGGER.info('Subnets after the Add Options API call: %d',
                    num_option_after_rm_opt)
        self.assertEqual(api_response_json['statusCode'], '9000104016')
        self.assertEqual(api_response_json['statusValue'], ERROR_4016_VALUE)
        self.assertEqual(api_response_json["data"]["error"],
                         SUBNET_NOT_FOUND.format(config_nt['subnet_id']['incorrect'],
                                                 DHCP_IP, DHCP_PORT))
        self.assertEqual(num_option_before_rm_opt, num_option_after_rm_opt)

    def test_4016_delete_option_subnet_empty_code_list(self):
        """
            Testing remove subnet id option api based on codes.

            API Path: /dhcp4/subnets/options/delete
            API Code: 010
            API Function Name: fast_dhcp.endpoints.delete_option_subnet

            JSON Request contains
                subnet_id
                codes

            Case: Empty Code List
                  Sending an empty list in codes

            Passes only if
                1. FAST Type Response statusCode is 9000094016
                2. FAST Type Response statusValue is
                   'Failed to remove subnet option due to an issue with KEA server response'
                3. Number of subnets options for the id should not change
                4. FAST Type Response data will have error as
                   'Specified option code(s) do not exist'
        """
        LOGGER.info('Negative Testing delete_option_subnet() - Empty Code List ')
        num_option_before_rm_opt = get_len_subnet_options_by_id()
        LOGGER.info('Subnets before the remove Options API call: %d',
                    num_option_before_rm_opt)
        json_req = {
            "subnet_id": config_nt['subnet_id']['existing'],
            "codes": []
        }
        response = self.app.post('/dhcp4/subnets/options/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_option_after_rm_opt = get_len_subnet_options_by_id()
        LOGGER.info('Subnets after the Add Options API call: %d',
                    num_option_after_rm_opt)
        self.assertEqual(num_option_before_rm_opt, num_option_after_rm_opt)
        self.assertEqual(api_response_json['statusCode'], '9000104016')
        self.assertEqual(api_response_json['statusValue'], ERROR_4016_VALUE)
        self.assertEqual(api_response_json['data']['error'], OPTIONS_NOT_FOUND)

    def test_4018_add_subnet_reservation_option_incorrect_subnet_id(self):
        """
            Testing add subnet id reservations option api.

            API Path: /dhcp4/subnets/reservation/options/add
            API Code: 011
            API Function Name: fast_dhcp.endpoints.add_reserv_option_subnet

            JSON Request contains
                subnet_id
                mac_address
                options_list

            Case: Incorrect subnet id
                  sending a subnet id which will not exist in the dhcp4

            Passes only if
                1. FAST Type Response statusCode is 9000114018
                2. FAST Type Response statusValue is
                   Failed to add subnet reservation option due to an issue with KEA server response
                3. FAST Type Response data will have error as
                   Unable to find the subnet with id {} from config obtained from server at {}:{}
        """
        LOGGER.info('Negative Testing add_reserv_option_subnet() - incorrect subnet id')
        json_req = {
            "subnet_id": config_nt['subnet_id']['incorrect'],
            "mac": config_nt['mac']['valid'],
            "options_list": config_nt["option_data"]['valid']
        }
        response = self.app.post('/dhcp4/subnets/reservation/options/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(api_response_json['statusCode'], '9000114018')
        self.assertEqual(api_response_json['statusValue'], ERROR_4018_VALUE)
        self.assertEqual(api_response_json["data"]["error"],
                         SUBNET_NOT_FOUND.format(config_nt['subnet_id']['incorrect'],
                                                 DHCP_IP, DHCP_PORT))

    def test_4018_add_subnet_reservation_option_incorrect_mac_add(self):
        """
            Testing add subnet id reservations option api.
            API Path: /dhcp4/subnets/reservation/options/add
            API Code: 011
            API Function Name: fast_dhcp.endpoints.add_reserv_option_subnet

            JSON Request contains
                subnet_id
                mac_address
                options_list

            Case: Incorrect Mac Address
                  Sending a mac address which does not exist.

            Passes only if
                1. FAST Type Response statusCode is 9000114018
                2. FAST Type Response statusValue is
                   "Failed to add subnet reservation option due to an issue with KEA server response"
                3. Number of subnets reservations options for the
                   id and mac address should be -1
                4. FAST Type Response data has error as
                   Specified reservation mac(s) do not exist
        """
        LOGGER.info('Positive Testing add_reserv_option_subnet() '
                    '- Incorrect Mac Address')
        num_reserve_option_before_add_opt = \
            get_len_subnet_reserv_options_by_id_and_mac()
        LOGGER.info('Subnets before the add reserv Options API call: %s',
                    str(num_reserve_option_before_add_opt))
        json_req = {
            "subnet_id": config_nt['subnet_id']['existing'],
            "mac": config_nt['mac']['valid'],
            "options_list": config_nt["option_data"]['valid']
        }
        response = self.app.post('/dhcp4/subnets/reservation/options/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_reserve_option_after_add_opt = \
            get_len_subnet_reserv_options_by_id_and_mac()
        LOGGER.info('Subnets after the add reserv Options API call: %s',
                    str(num_reserve_option_after_add_opt))
        self.assertEqual(num_reserve_option_after_add_opt,
                         num_reserve_option_before_add_opt, -1)
        self.assertEqual(api_response_json['statusCode'], '9000114018')
        self.assertEqual(api_response_json['statusValue'], ERROR_4018_VALUE)
        self.assertEqual(api_response_json['data']['error'], RESERVATION_NOT_FOUND)

    def test_4019_add_subnet_reservation_option_invalid_option_code(self):
        """
            Testing add subnet id reservations option api.
            API Path: /dhcp4/subnets/reservation/options/add
            API Code: 011
            API Function Name: fast_dhcp.endpoints.add_reserv_option_subnet

            JSON Request contains
                subnet_id
                mac_address
                options_list

            Case: Invalid option Code
                  Sending an option code outside of the DHCP code list.


            Passes only if
                1. FAST Type Response statusCode is 9000114019
                2. FAST Type Response statusValue is
                   'Failed to add subnet reservation option'
                3. Number of subnets reservations options for the
                   id and mac address should be -1
        """
        LOGGER.info('Negative Testing add_reserv_option_subnet() - Duplicate Code')
        json_req = {
            "subnet_id": config_nt['subnet_id']['existing'],
            "mac": config_nt['mac']['existing'],
            "options_list": config_nt["option_data"]['incorrect']
        }
        num_reserve_option_before_add_opt = \
            get_len_subnet_reserv_options_by_id_and_mac()
        LOGGER.info('Subnets before the add reserv Options API call: %d',
                    num_reserve_option_before_add_opt)
        LOGGER.info('Second API Call for duplication')
        response = self.app.post('/dhcp4/subnets/reservation/options/add',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_reserve_option_after_add_opt = \
            get_len_subnet_reserv_options_by_id_and_mac()
        LOGGER.info('Subnets after the add reserv Options API call: %d',
                    num_reserve_option_after_add_opt)
        self.assertEqual(api_response_json['statusCode'], '9000114019')
        self.assertEqual(api_response_json['statusValue'], ERROR_4019_VALUE)
        self.assertEqual(num_reserve_option_after_add_opt,
                         num_reserve_option_before_add_opt, -1)

    def test_4020_delete_subnet_reservation_option_incorrect_subnet_id(self):
        """
            Testing remove subnet id option api based on codes.

            API Path: /dhcp4/subnets/reservation/options/delete
            API Code: 012
            API Function Name: fast_dhcp.endpoints.delete_reserv_option_subnet

            JSON Request contains
                subnet_id
                mac_address
                options_list

            Case: Incorrect subnet id
                  sending a subnet id which will not exist in the dhcp4

            Passes only if
                1. FAST Type Response statusCode is 9000124020
                2. FAST Type Response statusValue is
                   'Failed to remove subnet reservation option due to an issue with KEA server response'
                3. Number of subnets reservations options for the id
                   and mac address should not change
        """
        LOGGER.info('Negative Testing delete_reserv_option_subnet() '
                    '- Incorrect subnet id ')
        json_req = {
            "subnet_id": config_nt['subnet_id']['incorrect'],
            "mac": config_nt['mac']['existing'],
            "codes": [
                config_nt["option_data"]['valid'][0]['code']
            ]
        }
        response = self.app.post('/dhcp4/subnets/reservation/options/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        self.assertEqual(api_response_json['statusCode'], '9000124020')
        self.assertEqual(api_response_json['statusValue'], ERROR_4020_VALUE)
        self.assertEqual(api_response_json["data"]["error"],
                         SUBNET_NOT_FOUND.format(config_nt['subnet_id']['incorrect'],
                                                 DHCP_IP, DHCP_PORT))

    def test_4020_delete_subnet_reservation_option_subnet_empty_code_list(self):
        """
            Testing remove subnet id option api based on codes.

            API Path: /dhcp4/subnets/reservation/options/delete
            API Code: 012
            API Function Name: fast_dhcp.endpoints.delete_reserv_option_subnet

            JSON Request contains
                subnet_id
                mac_address
                options_list

            Case: Empty code list
                  Sending an empty list in codes

            Passes only if
                1. Number of subnets reservations options for the
                   id and mac address should not change
                2. FAST Type Response statusCode is 9000124020
                3. FAST Type Response statusValue is
                   'Failed to remove subnet reservation option due to an issue with KEA server response'
                4. FAST Type Response data has error as
                   Specified option code(s) do not exist
        """
        LOGGER.info('Positive Testing delete_reserv_option_subnet()')
        num_reserve_option_before_rm_opt = \
            get_len_subnet_reserv_options_by_id_and_mac()
        LOGGER.info('Subnets before the remove reserv Options API call: %d',
                    num_reserve_option_before_rm_opt)
        json_req = {
            "subnet_id": config_nt['subnet_id']['existing'],
            "mac": config_nt["mac"]['existing'],
            "codes": []
        }
        response = self.app.post('/dhcp4/subnets/reservation/options/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_reserve_option_after_rm_opt = \
            get_len_subnet_reserv_options_by_id_and_mac()
        LOGGER.info('Subnets after the remove reserv Options API call: %d',
                    num_reserve_option_after_rm_opt)
        self.assertEqual(api_response_json['statusCode'], '9000124020')
        self.assertEqual(api_response_json['statusValue'], ERROR_4020_VALUE)
        self.assertEqual(api_response_json['data']['error'], OPTIONS_NOT_FOUND)
        self.assertEqual(num_reserve_option_before_rm_opt,
                         num_reserve_option_after_rm_opt)

    def test_4020_delete_subnet_reservation_option_subnet_incorrect_mac_add(self):
        """
            Testing remove subnet id option api based on codes.

            API Path: /dhcp4/subnets/reservation/options/delete
            API Code: 012
            API Function Name: fast_dhcp.endpoints.delete_reserv_option_subnet

            JSON Request contains
                subnet_id
                mac_address
                options_list

            Case: Incorrect Mac Address
                  Sending a mac address which does not exist.

            Passes only if
                1. FAST Type Response statusCode is 9000124020
                2. FAST Type Response statusValue is
                   'Failed to remove subnet reservation option due to an issue with KEA server response'
                3. Number of subnets reservations options for
                   the id and mac address should decrease
                4. FAST Type Response data has error as
                   'Specified reservation mac(s) do not exist'
        """
        LOGGER.info('Positive Testing delete_reserv_option_subnet()')
        num_reserve_option_before_rm_opt = \
            get_len_subnet_reserv_options_by_id_and_mac()
        LOGGER.info('Subnets before the remove reserv Options API call: %d',
                    num_reserve_option_before_rm_opt)
        json_req = {
            "subnet_id": config_nt['subnet_id']['existing'],
            "mac": config_nt['mac']['valid'],
            "codes": [
                config_nt['option_data']['valid'][0]['code']
            ]
        }
        response = self.app.post('/dhcp4/subnets/reservation/options/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_reserve_option_after_rm_opt =\
            get_len_subnet_reserv_options_by_id_and_mac()
        LOGGER.info('Subnets after the remove reserv Options API call: %d',
                    num_reserve_option_after_rm_opt)
        self.assertEqual(num_reserve_option_before_rm_opt,
                         num_reserve_option_after_rm_opt)
        self.assertEqual(api_response_json['statusCode'], '9000124020')
        self.assertEqual(api_response_json['statusValue'], ERROR_4020_VALUE)
        self.assertEqual(api_response_json['data']['error'], RESERVATION_NOT_FOUND)

    def test_4020_delete_subnet_reservation_option_subnet_incorrect_code(self):
        """
            Testing remove subnet id option api based on codes.

            API Path: /dhcp4/subnets/reservation/options/delete
            API Code: 012
            API Function Name: fast_dhcp.endpoints.delete_reserv_option_subnet

            JSON Request contains
                subnet_id
                mac_address
                options_list

            Case: Incorrect code
                  Sending an option code outside of the DHCP code list.

            Passes only if
                1. FAST Type Response statusCode is 9000124020
                2. FAST Type Response statusValue is
                   'Failed to remove subnet reservation option due to an issue with KEA server response'
                3. Number of subnets reservations options for
                   the id and mac address should decrease
                4. FAST Type Response data has error as
                   'Specified reservation option code(s) do not exist'
        """
        LOGGER.info('Negative Testing delete_reserv_option_subnet() - Incorrect code')
        num_reserve_option_before_rm_opt = \
            get_len_subnet_reserv_options_by_id_and_mac()
        LOGGER.info('Subnets before the remove reserv Options API call: %d',
                    num_reserve_option_before_rm_opt)
        json_req = {
            "subnet_id": config_nt['subnet_id']['existing'],
            "mac": config_nt['mac']['existing'],
            "codes": [
                config_nt['option_data']['incorrect'][0]['code']
            ]
        }
        response = self.app.post('/dhcp4/subnets/reservation/options/delete',
                                 content_type='application/json',
                                 data=json.dumps(json_req))
        api_response_json = json.loads(response.data)
        LOGGER.info('API Test Response -> %s', str(api_response_json))
        num_reserve_option_after_rm_opt = \
            get_len_subnet_reserv_options_by_id_and_mac()
        LOGGER.info('Subnets after the remove reserv Options API call: %d',
                    num_reserve_option_after_rm_opt)
        self.assertEqual(num_reserve_option_before_rm_opt,
                         num_reserve_option_after_rm_opt)
        self.assertEqual(api_response_json['statusCode'], '9000124020')
        self.assertEqual(api_response_json['statusValue'], ERROR_4020_VALUE)
        self.assertEqual(api_response_json['data']['error'], OPTIONS_NOT_FOUND)


if __name__ == "__main__":
    if not TEST_LOGGING:
        print('Logging disabled')
        print('NOTE: To enable logging for testing. Change the TEST_LOGGING setting in config.ini')
        LOGGER.disabled = True
    if GIT_BACKUP or KEA_SERVER_BACKUP or BACKUP_CONFIG:
        print('Make sure all backups are off to avoid backing up test dhcp configs.')
    else:
        unittest.main(verbosity=2)
