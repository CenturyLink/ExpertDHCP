"""
    Common functions that are either directly
    or indirectly used by the DHCP Provisioning server.
"""

import json
import os
import requests
import git
from flask import Response
from datetime import datetime
from restservice import LOGGER, create_dir
from restservice.config import PARENT_FOLDER, BACKUP_REPOSITORY_NAME, \
    BACKUP_FOLDER, KEY_CONFIG_GET, KEY_SERVICE_DHCP4, VAL_MAC, \
    LEASE_RETREIVAL_FAILED, KEA_SERVER_CON_ERROR, KEY_RESERVATIONS, \
    CONFIG_RETREIVAL_FAILED, DHCP_URL, KEY_LEASE4_GET, \
    KEY_LEASE_IDENTIFIER_TYPE,  KEY_LEASE_IDENTIFIER, DHCP_PORT, \
    SUBNET_NOT_FOUND, KEY_LEASE_SUBNETID, DHCP_IP, KEY_CONFIG_TEST, \
    KEY_CONFIG_SET, BACKUP_CONFIG, SUBNET_RETREIVAL_FAILED, KEY_CONFIG_WRITE, \
    KEY_FILENAME, SUBNETS_RETREIVAL_FAILED, CONFIG_UPDATE_FAILED, \
    KEY_OPTIONSDATA, INVALID_SUBNET, INVALID_RESERVATION, \
    KEY_OPTIONSDATA_CODE, BACKUP_CONFIG_PATH, RESERVATION_KEY_NOT_FOUND, \
    ALL_RESERVATIONS_NOT_FOUND, RESERVATION_NOT_FOUND, CONFIG_APPLY_FAILED, \
    CONFIG_BACKUP_FAILED, CONFIG_SET_FAILED, CONFIG_TEST_FAILED, \
    SUBNETS_NOT_FOUND, ALL_SUBNETS_NOT_FOUND, OPTIONS_NOT_FOUND, \
    ALL_OPTIONS_NOT_FOUND, INVALID_OPTIONS,  COMMIT_MESSAGE, GIT_PULL_FAILED, \
    GIT_PUSH_FAILED, KEA_SERVER_BACKUP, GIT_BACKUP, GIT_LINK, GIT_ASK_PASS, \
    GIT_PASSWORD, GIT_USERNAME, PULL_SUCCESS_MESSAGE, KEY_LEASE4_GET_ALL, \
    KEY_LEASE4_ADD, KEY_LEASE4_DELETE, KEY_LEASE4_UPDATE, KEY_LEASE4_WIPE, \
    CLIENT_CLASSES_NOT_FOUND, ALL_CLIENT_CLASSES_NOT_FOUND


def response_generator(status, http_code, output_code, output_value, data):
    """ Response formatted to suit fast core """
    LOGGER.info('Executing')
    return_value = {
        "status": status,
        'statusCode': output_code,
        'statusValue': output_value,
        'data': data
    }
    json_return_value = json.dumps(return_value)
    LOGGER.info("json_return_value = %s", str(json_return_value))
    response = Response(json_return_value, status=http_code,
                        mimetype='application/json')
    LOGGER.info('Returning %s', str(return_value))
    return response


def apply_config(config, write_config_flag):
    """
    Calls KEA API to Validate config/ write config
    :param config : <obj> DHCP Config
    :param write_config_flag : <boolean> Denotes Validate / Write functionality
    :return : Validation result
    """
    try:
        if write_config_flag:  # If write is set to True, command tells its write to KEA server
            command = KEY_CONFIG_SET
        else:
            command = KEY_CONFIG_TEST
        payload = {
            "command": command,
            "service": [KEY_SERVICE_DHCP4],
            "arguments": config
        }
        url = "http://{}:{}/provision/".format(DHCP_IP, DHCP_PORT)
        LOGGER.info('url --> %s', str(url))
        LOGGER.info('payload --> %s', str(payload))
        resp = requests.post(url, json=payload)
        json_response = json.loads(resp.text)
        LOGGER.info('json response --> %s', json.dumps(json_response))
        return json_response
    except Exception as excp:
        LOGGER.error("An error has occurred. Error is %s", str(excp))
        errmsg = CONFIG_TEST_FAILED
        if write_config_flag:
            errmsg = CONFIG_SET_FAILED
        LOGGER.debug("Response -> %s", json.dumps({"message": errmsg}))
        return {"message": errmsg}


def backup_config():
    """
    :return:
    """
    try:
        if KEA_SERVER_BACKUP:
            configfile = 'config_' + datetime.now(). \
                strftime('%Y-%m-%dT%H.%M.%S.%s') + '.json'
            payload = {
                "command": KEY_CONFIG_WRITE,
                "service": [KEY_SERVICE_DHCP4],
                "arguments": {
                    KEY_FILENAME: BACKUP_CONFIG_PATH + configfile
                }
            }
            url = "http://{}:{}/provision/".format(DHCP_IP, DHCP_PORT)
            LOGGER.info('url --> %s', str(url))
            LOGGER.info('payload --> %s', str(payload))
            resp = requests.post(url, json=payload)
            json_response = json.loads(resp.text)
            LOGGER.info('json response --> %s', json.dumps(json_response))
            return json_response

        elif GIT_BACKUP:
            configfile = 'kea_dhcp_config_{}.json'.format(DHCP_IP.replace('.', '_'))
            LOGGER.info('Taking backup to git')
            os.environ['GIT_ASKPASS'] = GIT_ASK_PASS
            os.environ['GIT_USERNAME'] = GIT_USERNAME
            os.environ['GIT_PASSWORD'] = GIT_PASSWORD
            repo_folder = PARENT_FOLDER + '/' + BACKUP_REPOSITORY_NAME
            LOGGER.info('Checking repository directory at --> %s', repo_folder)
            if not os.path.exists(repo_folder):
                LOGGER.info('Could not find repository directory at --> %s', repo_folder)
                LOGGER.info('Cloning %s at --> %s', GIT_LINK, PARENT_FOLDER)
                git.Git(PARENT_FOLDER).clone(GIT_LINK)
            else:
                LOGGER.info('Found repository directory at --> %s', repo_folder)
                LOGGER.info('Checking if Git repository')
                if not is_git_repo(repo_folder):
                    LOGGER.info('Not a Git repository. Removing it')
                    os.rmdir(repo_folder)
                    LOGGER.info('Cloning %s at --> %s', GIT_LINK, PARENT_FOLDER)
                    git.Git(PARENT_FOLDER).clone(GIT_LINK)
                else:
                    LOGGER.info('It is a Git Repository')
            git_folder = repo_folder + BACKUP_FOLDER
            create_dir(git_folder)
            LOGGER.info('config file name --> %s', configfile)
            LOGGER.info('config file location --> %s', git_folder)
            with open(git_folder + configfile, 'w') as file:
                config_obj = get_config()
                if "message" not in config_obj:
                    json.dump(config_obj, file, indent=4)
                else:
                    return config_obj
            pull_result = git_pull(repo_folder)
            if pull_result.replace('-', ' ') == PULL_SUCCESS_MESSAGE:
                return git_push(repo_folder, configfile)
            elif "message" in pull_result:
                return pull_result
            else:
                errmsg = GIT_PULL_FAILED
                LOGGER.debug("Response -> %s", json.dumps({"message": errmsg}))
                return {"message": errmsg}
    except Exception as excp:
        LOGGER.error("An error has occurred. Error is %s", str(excp))
        errmsg = CONFIG_BACKUP_FAILED
        LOGGER.debug("Response -> %s", json.dumps({"message": errmsg}))
        return {"message": errmsg}


def is_git_repo(path):
    try:
        _ = git.Repo(path).git_dir
        return True
    except git.exc.InvalidGitRepositoryError:
        return False
    except Exception:
        return False


def git_pull(git_dir):
    try:
        LOGGER.info('Pulling from git')
        g = git.cmd.Git(git_dir)
        pull_res = g.pull()
        LOGGER.info('Pull successful -> %s', str(pull_res))
        return pull_res
    except Exception as excp:
        LOGGER.error("An error has occurred. Error is %s", str(excp))
        errmsg = GIT_PULL_FAILED.format(git_dir)
        LOGGER.debug("Response -> %s", json.dumps({"message": errmsg}))
        return {"message": errmsg}


def git_push(git_dir, configfile):
    try:
        LOGGER.info('Pushing to Git')
        date = datetime.now().strftime('%Y-%m-%d')
        time = datetime.now().strftime('%H.%M.%S.%s')
        repo = git.Repo(git_dir)
        repo.git.add(update=True)
        repo.index.add([BACKUP_FOLDER + configfile])
        repo.index.commit(COMMIT_MESSAGE.format(time, date))
        origin = repo.remote(name='origin')
        push_res = origin.push()
        LOGGER.info('Pushing to Git successful')
        LOGGER.info(str(push_res))
        return push_res
    except Exception as excp:
        LOGGER.error("An error has occurred. Error is %s", str(excp))
        errmsg = GIT_PUSH_FAILED.format(configfile)
        LOGGER.debug("Response -> %s", json.dumps({"message": errmsg}))
        return {"message": errmsg}


def commit_config(config):
    """
    :param config:
    :return:
    """
    try:
        json_response = apply_config(config, False)  # Checks for config validation with Write Param set to False
        if "message" in json_response:  # If config is valid write the config
            return json_response
        if json_response[0].get("result") == 0:
            applied_config = True
        else:  # return the error message returned
            return json_response[0].get("text")
        if applied_config:
            if BACKUP_CONFIG:
                result = backup_config()
                if 'message' in result:
                    return result
                else:
                    apply_config(config, True)  # call the applyConfig flag with new config and write flag set to True
            else:
                apply_config(config, True)
        return applied_config
    except Exception as excp:
        LOGGER.error("An error has occurred. Error is %s", str(excp))
        errmsg = CONFIG_APPLY_FAILED
        LOGGER.debug("Response -> %s", json.dumps({"message": errmsg}))
        return {"message": errmsg}


def get_config():
    """
    Fetches the configuration using the KEA API.
    """
    try:
        url = DHCP_URL.format(DHCP_IP, DHCP_PORT)  # , str(json_req_data['command']))
        LOGGER.info("url -> %s", url)
        kea_payload = {
            "command": KEY_CONFIG_GET,  # 'config-get'
            "service": [KEY_SERVICE_DHCP4]  # ['dhcp4']
        }
        LOGGER.info("Fetching the configuration using KEA API")
        LOGGER.debug("Server url -> %s", url)
        LOGGER.debug("Payload -> %s",
                     json.dumps(kea_payload))
        resp = requests.post(url, json=kea_payload)
        LOGGER.debug("Response from KEA server -> %s", str(resp.text))
        return resp.json()
    except requests.exceptions.ConnectionError:
        errmsg = KEA_SERVER_CON_ERROR.format(DHCP_IP, DHCP_PORT)
        LOGGER.error("An error has occurred. Error is %s", errmsg)
        return {"message": errmsg}
    except Exception as excp:
        LOGGER.error("An error has occurred. Error is %s", str(excp))
        errmsg = CONFIG_RETREIVAL_FAILED.format(DHCP_IP, DHCP_PORT)
        LOGGER.debug("Response -> %s", json.dumps({"message": errmsg}))
        return {"message": errmsg}


def get_field(config, fetch_field=''):
    """
    Fetchs the Subnet4 Node from Config
    :param config : <obj>: DHCP Config from KEA server
    :param fetch_field : <str>: Field in DHCP Config from KEA server
    :return : list of subnets
    """
    try:
        LOGGER.debug("Extracting all subnet nodes list from config")
        LOGGER.debug("Recieved dhcp4_config -> %s", str(config))
        if fetch_field == 'subnet':
            subnets = []
            # Config structure : {"arguments": {"Dhcp4":{"subnet4":{[{"id":1} ]}}}
            for value in config:
                for key, val in value.items():
                    if isinstance(val, dict):
                        for key2, value2 in val.items():
                            if "subnet4" in value2.keys() and \
                                    isinstance(value2.get("subnet4"), list):
                                subnets = value2.get("subnet4")
            return subnets
        elif fetch_field == 'client_class':
            classes = []
            for value in config:
                for key, val in value.items():
                    if isinstance(val, dict):
                        for key2, value2 in val.items():
                            if "client-classes" in value2.keys():
                                classes = value2.get("client-classes")
            return classes
    except Exception as excp:
        LOGGER.error("An error has occurred. Error is %s", str(excp))
        errmsg = SUBNETS_RETREIVAL_FAILED.format(DHCP_IP, DHCP_PORT)
        LOGGER.debug("Response -> %s", json.dumps({"message": errmsg}))
        return {"message": errmsg}


def get_subnet_info(dhcp4_config, subnet_id, field=''):
    """
    Fetchs the Subnet Node from Config
    :param dhcp4_config : <obj>: Subnets List from KEA server
    :param subnet_id : <int> : Subnet ID
    :param field : <str> : field
    :return : Subnet object
    """
    try:
        LOGGER.info("Parsing the config to get the all Subnets")
        all_subnets = get_field(dhcp4_config, fetch_field='subnet')
        LOGGER.info("Parsing all subnets to get subnet with id -> %s", str(subnet_id))
        if isinstance(all_subnets, list):
            LOGGER.debug("Subnet list -> %s", str(all_subnets))
            for subnet in all_subnets:
                curr_subnet_id = subnet.get("id")
                if curr_subnet_id == int(subnet_id):
                    subnet_node = subnet
                    LOGGER.debug("Successfully found the subnet with id %s",
                                 str(subnet_id))
                    LOGGER.debug("Subnet -> %s", str(subnet_node))
                    if field == '':
                        LOGGER.debug("No field found")
                        return subnet_node
                    elif field == 'reservations':
                        LOGGER.debug("Fetching reservations from subnet_node")
                        if KEY_RESERVATIONS not in subnet_node.keys():
                            errmsg = RESERVATION_KEY_NOT_FOUND
                            LOGGER.debug("Response -> %s", json.dumps({"message": errmsg}))
                            return {"message": errmsg}
                        reservations = subnet_node.get(KEY_RESERVATIONS)
                        LOGGER.info("Reservations -> %s",
                                    str(reservations))
                        return reservations
            else:
                errmsg = SUBNET_NOT_FOUND.format(subnet_id, DHCP_IP, DHCP_PORT)
                LOGGER.error(errmsg)
                return {"message": errmsg}
        else:
            errmsg = INVALID_SUBNET
            LOGGER.error(errmsg)
            return {"message": errmsg}
    except Exception as excp:
        LOGGER.error("An error has occurred. Error is %s", str(excp))
        errmsg = SUBNET_RETREIVAL_FAILED.format(subnet_id, DHCP_IP, DHCP_PORT)
        LOGGER.debug("Response -> %s", json.dumps({"message": errmsg}))
        return {"message": errmsg}


def get_reservation_info(dhcp4_config, subnet_id, mac=''):
    """
    Fetchs the reservation from the subnet
    :param dhcp4_config : <obj>: DHCP Config from KEA server
    :param subnet_id : <int> : Subnet ID
    :param mac : <str> : mac
    :return : Reservation object
    """
    LOGGER.info("Parsing the subnet to get reservations")
    reservations = get_subnet_info(dhcp4_config, subnet_id, field='reservations')
    if mac == '':
        LOGGER.info("Returning Reservations -> %s", str(reservations))
        return reservations
    else:
        if isinstance(reservations, list):
            for reservation in reservations:
                if mac == reservation[VAL_MAC]:
                    return reservation
            return {"message": RESERVATION_NOT_FOUND}
        else:
            errmsg = INVALID_RESERVATION
            LOGGER.error(errmsg)
            return {"message": errmsg}


def update_config(dhcp4_config, update_field='subnet', subnet_id=None, reservations=None, subnets=None, classes=None):
    """
    :param dhcp4_config: config object
    :param subnet_id: id
    :param reservations: reservations
    :param update_field: field to change
    :param subnets: subnets object
    :return:
    """
    try:
        if update_field == 'subnet':
            if reservations is not None:
                curr_subnets = get_field(dhcp4_config, fetch_field='subnet')
                for subnet in curr_subnets:
                    if int(subnet.get("id")) == subnet_id:
                        subnet[KEY_RESERVATIONS] = reservations
                subnets = curr_subnets
            for value in dhcp4_config:
                for key, val in value.items():
                    if isinstance(val, dict):
                        for key2, val2 in val.items():
                            if "subnet4" in val2.keys():
                                val2["subnet4"] = subnets
        elif update_field == 'classes':
            for value in dhcp4_config:
                for key, val in value.items():
                    if isinstance(val, dict):
                        for key2, val2 in val.items():
                            if "client-classes" in val2.keys():
                                val2["client-classes"] = classes
        return dhcp4_config
    except Exception as excp:
        LOGGER.error("An error has occurred. Error is %s", str(excp))
        errmsg = CONFIG_UPDATE_FAILED
        LOGGER.debug("Response -> %s", json.dumps({"message": errmsg}))
        return {"message": errmsg}


def modify_config_subnet_reservations(subnet_id, reservations=None, hw_addresses=None):
    """
    Modifies the configuration
    :param reservations : <obj> List of reservation to be added
    :param hw_addresses : <str> Mac address for removing
    :param subnet_id : <int> subnet_id
    :return : New configuration after modification
    """
    dhcp_config = get_config()
    if "message" in dhcp_config:
        return dhcp_config
    else:
        current_reservations = get_reservation_info(dhcp_config, subnet_id)
        if "message" in current_reservations:
            return current_reservations
        else:
            if reservations is None:
                retainable_elements = []
                initial_size = len(current_reservations)
                for reservation in current_reservations:
                    found = reservation[VAL_MAC] in hw_addresses
                    LOGGER.info("Removing mac address - %s: %s",
                                str(reservation[VAL_MAC]), str(not found))
                    if not found:
                        retainable_elements.append(reservation)
                size_after_removal = len(retainable_elements)
                LOGGER.info("Length of HW Addresses to remove --> %s",
                            str(len(hw_addresses)))
                LOGGER.info("Before Remove Size --> %s", str(initial_size))
                LOGGER.info("After Remove Size --> %s", str(size_after_removal))
                if size_after_removal == initial_size:
                    LOGGER.error("error --> %s", RESERVATION_NOT_FOUND)
                    return {"message": RESERVATION_NOT_FOUND}
                elif len(hw_addresses) != (initial_size - size_after_removal):
                    LOGGER.error("error --> %s", ALL_RESERVATIONS_NOT_FOUND)
                    return {"message": ALL_RESERVATIONS_NOT_FOUND}
                else:
                    reservation_arrays = []
                    reservation_arrays.extend(retainable_elements)
            else:
                if isinstance(reservations, list):
                    current_reservations.extend(reservations)
                else:
                    current_reservations.append(reservations)
                reservation_arrays = current_reservations
            dhcp_config = update_config(dhcp_config, subnet_id=subnet_id,
                                        reservations=reservation_arrays)
    return dhcp_config


def modify_config_subnets(subnets=None, subnet_ids=None, update_subnet=False):
    """
    Modify the configuration (ADD/ DELETE/ UPDATE SUBNET)
    :param subnets : <obj> Payload containing list of subnet to be added
    :param subnet_ids : <int> : Subnet ID
    :param update_subnet : <boolean> Denotes modify functionality
    :return : Modified configuration
    """
    dhcp4_config = get_config()
    if "message" in dhcp4_config:
        return dhcp4_config
    else:
        retained_nodes = []
        modified_nodes = []
        all_subnets = get_field(dhcp4_config, fetch_field='subnet')

        if "message" in all_subnets:
            return all_subnets

        if subnets is None:
            initial_size = len(all_subnets)
            for obj in all_subnets:
                curr_subnet_id = obj.get("id")
                if curr_subnet_id is not None:
                    if int(curr_subnet_id) not in subnet_ids:
                        retained_nodes.append(obj)
            size_after_removal = len(retained_nodes)
            LOGGER.info("Count of subnets to remove --> %s", str(len(subnet_ids)))
            LOGGER.info("Before Remove Size --> %s", str(initial_size))
            LOGGER.info("After Remove Size --> %s", str(size_after_removal))
            if size_after_removal == initial_size:
                LOGGER.error("error --> %s", SUBNETS_NOT_FOUND)
                return {"message": SUBNETS_NOT_FOUND}
            elif len(subnet_ids) != (initial_size - size_after_removal):
                LOGGER.error("error --> %s", ALL_SUBNETS_NOT_FOUND)
                return {"message": ALL_SUBNETS_NOT_FOUND}
            else:
                return update_config(dhcp4_config, subnets=retained_nodes)
        else:
            if update_subnet:
                if isinstance(all_subnets, list):
                    LOGGER.debug("Subnet list -> %s", str(all_subnets))
                    initial_size = len(all_subnets)
                    for obj in all_subnets:
                        curr_subnet_id = obj.get("id")
                        if curr_subnet_id is not None:
                            if int(curr_subnet_id) not in subnet_ids:
                                retained_nodes.append(obj)
                            else:
                                for sub_net in subnets:
                                    if sub_net['id'] == curr_subnet_id:
                                        modified_nodes.append(sub_net)
                    size_after_modify = len(modified_nodes) + len(retained_nodes)
                    LOGGER.info("Count of subnets to modify --> %s", str(len(subnet_ids)))
                    LOGGER.info("Before modification Size --> %s", str(initial_size))
                    LOGGER.info("After modification Size --> %s", str(size_after_modify))
                    if len(retained_nodes) == len(subnet_ids):
                        LOGGER.error("error --> %s", SUBNETS_NOT_FOUND)
                        return {"message": SUBNETS_NOT_FOUND}
                    elif len(subnet_ids) != len(modified_nodes):
                        LOGGER.error("error --> %s", ALL_SUBNETS_NOT_FOUND)
                        return {"message": ALL_SUBNETS_NOT_FOUND}
                    else:
                        modified_nodes.extend(retained_nodes)
                        return update_config(dhcp4_config, subnets=modified_nodes)
                else:
                    errmsg = INVALID_SUBNET
                    LOGGER.error(errmsg)
                    return {"message": errmsg}
            else:

                all_subnets.extend(subnets)
                return update_config(dhcp4_config, subnets=all_subnets)


def modify_config_options(subnet_id=1, new_options=None, codes=None, mac=None):
    """
    Modifies the configuration
    :param subnet_id : <int> subnet_id : Mandatory
    :param new_options : <obj> Option to be added : Mandatory
    :param codes : <obj> Code to be deleted
    :param mac : <str> Mac address for removing option in reservation
    :return : New configuration after modification
    """
    dhcp4_config = get_config()
    if "message" in dhcp4_config:
        return dhcp4_config
    else:
        subnet_node = get_subnet_info(dhcp4_config, subnet_id)
        if 'message' in subnet_node:
            return subnet_node
        if mac is None:
            current_options = subnet_node[KEY_OPTIONSDATA]
        else:
            reservation = get_reservation_info(dhcp4_config, subnet_id, mac)
            if 'message' in reservation:
                return reservation
            current_options = reservation[KEY_OPTIONSDATA]
        if new_options is not None:
            if current_options is None:
                current_options = []
            else:
                if isinstance(current_options, list):
                    current_options.extend(new_options)
                else:
                    LOGGER.info("invalid options found in reservation")
                    return {"message": INVALID_OPTIONS}
        else:
            initial_size = len(current_options)
            retained_nodes = []
            for option in current_options:
                if int(option.get(KEY_OPTIONSDATA_CODE)) not in codes:
                    LOGGER.info('%s added', str(option))
                    retained_nodes.append(option)
            size_after_removal = len(retained_nodes)
            LOGGER.info("Length of codes to remove --> %s", str(len(codes)))
            LOGGER.info("Before Remove Size --> %s", str(initial_size))
            LOGGER.info("After Remove Size --> %s", str(size_after_removal))
            if size_after_removal == initial_size:
                LOGGER.info("Specified Options not found")
                return {"message": OPTIONS_NOT_FOUND}
            elif len(codes) > (initial_size - size_after_removal):
                LOGGER.info("Some options specified not found")
                return {"message": ALL_OPTIONS_NOT_FOUND}
            else:
                current_options = retained_nodes
        curr_subnets = get_field(dhcp4_config, fetch_field='subnet')
        if mac is not None:
            for subnet in curr_subnets:
                if subnet_id == subnet['id']:
                    for reservation in subnet[KEY_RESERVATIONS]:
                        if reservation['hw-address'] == mac:
                            reservation[KEY_OPTIONSDATA] = current_options
                            return update_config(dhcp4_config, subnets=curr_subnets)
        else:
            for subnet in curr_subnets:
                if subnet_id == subnet['id']:
                    subnet[KEY_OPTIONSDATA] = current_options
                    return update_config(dhcp4_config, subnets=curr_subnets)


def add_reservation(kea_reservations, subnet_id):
    """
    :param kea_reservations:
    :param subnet_id:
    :return:
    """
    LOGGER.debug("Adding a reservation")
    LOGGER.debug("reservation to add --> %s", str(kea_reservations))
    modified_config = modify_config_subnet_reservations(subnet_id,
                                                        reservations=kea_reservations)
    if "message" in modified_config:
        LOGGER.error("An error has occurred. Error is %s", str(modified_config["message"]))
        return modified_config
    added_reservation = commit_config(modified_config[0]["arguments"])
    return added_reservation


def del_reservation(hw_addresses, subnet_id):
    """
    :param hw_addresses:
    :param subnet_id:
    :return:
    """
    LOGGER.debug("Removing reservation with macs --> %s for subnet id --> %s",
                 str(hw_addresses), str(subnet_id))
    modified_config = modify_config_subnet_reservations(subnet_id,
                                                        hw_addresses=hw_addresses)
    if "message" in modified_config:
        LOGGER.error("An error has occurred. Error is %s", str(modified_config["message"]))
        return modified_config
    removed_reservation = commit_config(modified_config[0]["arguments"])
    return removed_reservation


def add_subnets(subnet_list):
    """
    :param subnet_list:
    :return:
    """
    LOGGER.debug("Adding subnet")
    LOGGER.debug("subnets to add --> %s", str(subnet_list))
    modified_config = modify_config_subnets(subnet_list)
    if "message" in modified_config:
        LOGGER.error("An error has occurred. Error is %s", str(modified_config["message"]))
        return modified_config
    added_subnets = commit_config(modified_config[0].get("arguments"))
    return added_subnets


def delete_subnets(subnet_ids):
    """
    :param subnet_ids:
    :return:
    """
    LOGGER.debug("Removing subnets")
    modified_config = modify_config_subnets(subnet_ids=subnet_ids)
    if "message" in modified_config:
        LOGGER.error("An error has occurred. Error is %s", str(modified_config["message"]))
        return modified_config
    removed_subnets = commit_config(modified_config[0].get("arguments"))
    return removed_subnets


def modify_subnets(subnets):
    """
    :param subnets:
    :return:
    """
    LOGGER.debug("Modifying subnets")
    subnet_ids = [subnet['id'] for subnet in subnets]
    modified_config = modify_config_subnets(subnets=subnets,
                                            subnet_ids=subnet_ids,
                                            update_subnet=True)
    if "message" in modified_config:
        LOGGER.error("An error has occurred. Error is %s", str(modified_config["message"]))
        return modified_config
    removed_subnets = commit_config(modified_config[0].get("arguments"))
    return removed_subnets


def add_subnet_options(dhcp4_options, subnet_id):
    """
    :param dhcp4_options:
    :param subnet_id:
    :return:
    """
    LOGGER.debug("Adding options in subnet")
    LOGGER.debug("Options -> %s", str(dhcp4_options))
    modified_config = modify_config_options(subnet_id=subnet_id,
                                            new_options=dhcp4_options)
    if "message" in modified_config:
        LOGGER.error("An error has occurred. Error is %s", str(modified_config["message"]))
        return modified_config
    return commit_config(modified_config[0].get("arguments"))


def delete_subnet_options(codes, subnet_id):
    """
    :param codes:
    :param subnet_id:
    :return:
    """
    LOGGER.debug("Deleting options in subnet with codes -> %s", str(codes))
    modified_config = modify_config_options(subnet_id=subnet_id, codes=codes)
    if "message" in modified_config:
        LOGGER.error("An error has occurred. Error is %s", str(modified_config["message"]))
        return modified_config
    return commit_config(modified_config[0].get("arguments"))


def add_reservation_options(dhcp4_options, mac, subnet_id):
    """
    :param dhcp4_options:
    :param mac:
    :param subnet_id:
    :return:
    """
    LOGGER.debug("Adding options in subnet %s for reservation %s",
                 str(subnet_id), mac)
    LOGGER.debug("Options -> %s", str(dhcp4_options))
    modified_config = modify_config_options(subnet_id=subnet_id,
                                            new_options=dhcp4_options,
                                            mac=mac)
    if "message" in modified_config:
        LOGGER.error("An error has occurred. Error is %s", str(modified_config["message"]))
        return modified_config
    return commit_config(modified_config[0].get("arguments"))


def delete_reservation_options(codes, mac, subnet_id):
    """
    :param codes:
    :param mac:
    :param subnet_id:
    :return:
    """
    LOGGER.debug("Deleting options in subnet subnet %s for "
                 "reservation %s with codes -> %s", str(subnet_id),
                 mac, str(codes))
    modified_config = modify_config_options(subnet_id=subnet_id,
                                            codes=codes,
                                            mac=mac)
    if "message" in modified_config:
        LOGGER.error("An error has occurred. Error is %s", str(modified_config["message"]))
        return modified_config
    return commit_config(modified_config[0].get("arguments"))


def leases_hook(mac='', subnet_id=0, ip='', arguments=None, get_one=False, add_lease=False,
                delete_lease=False, wipe_subnet_lease=False, update_lease=False):
    """
    Fetchs the Leases Node from Config
    :param subnet_id : <int> : Subnet ID
    :param mac : <str> Mac address
    :param ip : <str> ip address
    :param arguments : <str> ip address
    :param get_one : <bool> whether to fetch one lease or all.
    :param delete_lease : <bool> whether to delete lease.
    :param add_lease : <bool> whether to add lease.
    :param wipe_subnet_lease : <bool> whether to delete all leases in subnet.
    :param update_lease : <bool> whether to update lease.
    :return : ip address
    """
    # refer https://ftp.isc.org/isc/kea/1.4.0/doc/kea-guide.html#flex-id

    try:
        if arguments is None:
            arguments = {}
        LOGGER.info("Fetching IP address for mac address -> %s", str(mac))
        LOGGER.info("Subnet id -> %s", subnet_id)
        payload = {
            "service": [KEY_SERVICE_DHCP4]
        }
        if get_one:
            payload["command"] = KEY_LEASE4_GET
            payload["arguments"] = {
                KEY_LEASE_IDENTIFIER_TYPE: VAL_MAC,
                KEY_LEASE_IDENTIFIER: mac,
                KEY_LEASE_SUBNETID: int(subnet_id)
            }
        elif add_lease:
            payload["command"] = KEY_LEASE4_ADD
            payload["arguments"] = arguments
        elif delete_lease:
            payload["command"] = KEY_LEASE4_DELETE
            payload["arguments"] = {
                "ip-address": ip
            }
        elif wipe_subnet_lease:
            payload["command"] = KEY_LEASE4_WIPE
            payload["arguments"] = {
                KEY_LEASE_SUBNETID: int(subnet_id)
            }
        elif update_lease:
            payload["command"] = KEY_LEASE4_UPDATE
            payload["arguments"] = arguments
        else:
            payload["command"] = KEY_LEASE4_GET_ALL

        url = "http://{}:{}/provision/".format(DHCP_IP, DHCP_PORT)
        LOGGER.debug("Server url -> %s", url)
        LOGGER.debug("Payload -> %s", json.dumps(payload))
        response = requests.post(url, json=payload)
        leases = response.json()
        LOGGER.info("leases -> %s", str(leases))
        return leases
    except requests.exceptions.ConnectionError:
        errmsg = KEA_SERVER_CON_ERROR.format(DHCP_IP, DHCP_PORT)
        LOGGER.error("An error has occurred. Error is %s", errmsg)
        return {"message": errmsg}
    except Exception as excp:
        LOGGER.error("An error has occurred. Error is %s", str(excp))
        errmsg = LEASE_RETREIVAL_FAILED.format(mac, DHCP_IP, DHCP_PORT)
        LOGGER.debug("Response -> %s", json.dumps({"message": errmsg}))
        return {"message": errmsg}


def modify_config_classes(classes=None, class_names=None, update_class=False):
    """
    Modify the configuration (ADD/ DELETE/ UPDATE CLIENT CLASS)
    :param classes : <obj> Payload containing list of Classes to be added
    :param class_names : <int> : class name
    :param update_class : <boolean> Denotes modify functionality
    :return : Modified configuration
    """
    dhcp4_config = get_config()
    if "message" in dhcp4_config:
        return dhcp4_config
    else:
        retained_nodes = []
        modified_nodes = []
        existing_client_classes = get_field(dhcp4_config, fetch_field='client_class')
        if "message" in existing_client_classes:
            return existing_client_classes
        if classes is None:
            initial_size = len(existing_client_classes)
            for obj in existing_client_classes:
                curr_class_name = obj.get("name")
                LOGGER.info(curr_class_name)
                if curr_class_name is not None:
                    if curr_class_name not in class_names:
                        retained_nodes.append(obj)
            size_after_removal = len(retained_nodes)
            LOGGER.info("Count of classes to remove --> %s", str(len(class_names)))
            LOGGER.info("Before Remove Size --> %s", str(initial_size))
            LOGGER.info("After Remove Size --> %s", str(size_after_removal))
            if size_after_removal == initial_size:
                LOGGER.error("error --> %s", CLIENT_CLASSES_NOT_FOUND)
                return {"message": CLIENT_CLASSES_NOT_FOUND}
            elif len(class_names) != (initial_size - size_after_removal):
                LOGGER.error("error --> %s", ALL_CLIENT_CLASSES_NOT_FOUND)
                return {"message": ALL_CLIENT_CLASSES_NOT_FOUND}
            else:
                return update_config(dhcp4_config, update_field='classes', classes=retained_nodes)
        else:
            if update_class:
                if isinstance(existing_client_classes, list):
                    LOGGER.debug("Subnet list -> %s", str(existing_client_classes).encode('utf8'))
                    initial_size = len(existing_client_classes)
                    for obj in existing_client_classes:
                        curr_class_name = obj.get("name")
                        if curr_class_name is not None:
                            if curr_class_name not in class_names:
                                retained_nodes.append(obj)
                            else:
                                for sub_net in classes:
                                    if sub_net['name'] == curr_class_name:
                                        modified_nodes.append(sub_net)
                    size_after_modify = len(modified_nodes) + len(retained_nodes)
                    LOGGER.info("Count of classes to modify --> %s", str(len(class_names)))
                    LOGGER.info("Before modification Size --> %s", str(initial_size))
                    LOGGER.info("After modification Size --> %s", str(size_after_modify))
                    if len(retained_nodes) == len(class_names):
                        LOGGER.error("error --> %s", CLIENT_CLASSES_NOT_FOUND)
                        return {"message": CLIENT_CLASSES_NOT_FOUND}
                    elif len(class_names) != len(modified_nodes):
                        LOGGER.error("error --> %s", ALL_CLIENT_CLASSES_NOT_FOUND)
                        return {"message": ALL_CLIENT_CLASSES_NOT_FOUND}
                    else:
                        modified_nodes.extend(retained_nodes)
                        return update_config(dhcp4_config, update_field='classes', classes=modified_nodes)
                else:
                    errmsg = INVALID_SUBNET
                    LOGGER.error(errmsg)
                    return {"message": errmsg}
            else:
                existing_client_classes.extend(classes)
                LOGGER.debug("New classes -> %s", str(existing_client_classes))
                return update_config(dhcp4_config, update_field='classes', classes=existing_client_classes)


def add_client_classes(classes):
    """
    :param classes:
    :return:
    """
    LOGGER.debug("Adding client class")
    LOGGER.debug("classes to add --> %s", str(classes))
    modified_config = modify_config_classes(classes=classes)
    if "message" in modified_config:
        LOGGER.error("An error has occurred. Error is %s", str(modified_config["message"]))
        return modified_config
    added_classes = commit_config(modified_config[0].get("arguments"))
    return added_classes


def delete_client_classes(class_names):
    """
    :param class_names:
    :return:
    """
    LOGGER.debug("Removing client class")
    modified_config = modify_config_classes(class_names=class_names)
    if "message" in modified_config:
        LOGGER.error("An error has occurred. Error is %s", str(modified_config["message"]))
        return modified_config
    removed_classes = commit_config(modified_config[0].get("arguments"))
    return removed_classes


def modify_client_classes(classes):
    """
    :param classes:
    :return:
    """
    LOGGER.debug("Modifying client class")
    class_names = [cls['name'] for cls in classes]
    modified_config = modify_config_classes(classes=classes,
                                            class_names=class_names,
                                            update_class=True)
    if "message" in modified_config:
        LOGGER.error("An error has occurred. Error is %s", str(modified_config["message"]))
        return modified_config
    modified_classes = commit_config(modified_config[0].get("arguments"))
    return modified_classes
