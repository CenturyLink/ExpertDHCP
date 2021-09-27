import json
from fast_dhcp import LOGGER
from fast_dhcp.utilities import get_all_subnets, get_config
from fast_dhcp.tests.test_config import config_pt


def get_subnets():
    """
    :return: Returns all the subnets in list format
    """
    dhcp4_config = get_config()
    subnet_list = get_all_subnets(dhcp4_config)
    return subnet_list


def get_num_reservations(app):
    """
    Get the number of reservations for a particular subnet id.
    :return: Length of reservations available
    """
    LOGGER.info('Getting number of reservations')
    subnet_id = config_pt['subnet_id']
    json_req = {
        "command": "subnets",
        "subnet_id": subnet_id
    }
    response = app.post('/dhcp4/reservations',
                        content_type='application/json',
                        data=json.dumps(json_req))
    api_response = json.loads(response.data)
    LOGGER.info("Number of reservations = %s",
                str(len(api_response['data']['reservations'])))
    return len(api_response['data']['reservations'])


def get_num_subnets():
    """
    :return: Length of subnet list.
    """
    subnet_list = get_subnets()
    return len(subnet_list)


def get_len_subnet_options_by_id():
    """
    Length of option data in subnet for a particular id
    :return: length of options list for subnet
    """
    subnet_id = config_pt['subnet_id']
    subnet_list = get_subnets()
    LOGGER.info('Subnet List : %s', str(subnet_list))
    for subnet in subnet_list:
        if subnet['id'] == subnet_id:
            return len(subnet["option-data"])
    return -1


def get_len_subnet_reserv_options_by_id_and_mac(mac_add=None):
    """
    Length of option data in subnet for a particular id
    :return: length of res options for mac address in subnet id
    """
    subnet_id = config_pt['subnet_id']
    subnet_list = get_subnets()
    for subnet in subnet_list:
        if subnet['id'] == subnet_id:
            for reservation in subnet['reservations']:
                if reservation['hw-address'] == mac_add:
                    return len(reservation["option-data"])
    return -1

