"""
    Configuration file reader for DHCP
    Reads configs.ini and loads into corresponding variables
"""

import configparser
import os

CONFIGS = configparser.ConfigParser()
CONFIGS.read(os.path.dirname(os.path.abspath(__file__)) + '/config.ini')

PARENT_FOLDER = os.path.dirname(os.getcwd())

HOST = CONFIGS['EXPERTDHCP']['HOST']
PORT = int(CONFIGS['EXPERTDHCP']['PORT'])
SERVICE_CODE = CONFIGS['EXPERTDHCP']['SERVICE_CODE']
REQUIRE_API_AUTHENTICATION = bool(CONFIGS['EXPERTDHCP']['REQUIRE_API_AUTHENTICATION'])


PULL_SUCCESS_MESSAGE = CONFIGS['GIT_BACKUP']['PULL_SUCCESS_MESSAGE']
GIT_USERNAME = CONFIGS['GIT_BACKUP']['GIT_USERNAME']
GIT_PASSWORD = CONFIGS['GIT_BACKUP']['GIT_PASSWORD']
GIT_ASK_PASS = PARENT_FOLDER + CONFIGS['GIT_BACKUP']['GIT_ASK_PASS']
GIT_LINK = CONFIGS['GIT_BACKUP']['GIT_LINK'].format(GIT_USERNAME)
BACKUP_REPOSITORY_NAME = CONFIGS['GIT_BACKUP']['BACKUP_REPOSITORY_NAME']
BACKUP_FOLDER = CONFIGS['GIT_BACKUP']['BACKUP_FOLDER']
COMMIT_MESSAGE = CONFIGS['GIT_BACKUP']['COMMIT_MESSAGE']
BACKUP_CONFIG = bool(CONFIGS['GIT_BACKUP']['BACKUP_CONFIG'])
BACKUP_CONFIG_PATH = CONFIGS['GIT_BACKUP']['BACKUP_CONFIG_PATH']
GIT_BACKUP = bool(CONFIGS['GIT_BACKUP']['GIT_BACKUP'])
KEA_SERVER_BACKUP = bool(CONFIGS['GIT_BACKUP']['KEA_SERVER_BACKUP'])

LOG_LEVEL = CONFIGS['LOGGER']['LOG_LEVEL']
LOG_FILE_NAME = CONFIGS['LOGGER']['LOG_FILE_NAME']
LOG_FILE_MAX_SIZE_MB = int(CONFIGS['LOGGER']['LOG_FILE_MAX_SIZE_MB'])
LOG_FILE_BACKUP_COUNT = int(CONFIGS['LOGGER']['LOG_FILE_BACKUP_COUNT'])

DHCP_URL = CONFIGS['KEA_DHCP']['DHCP_URL']
DHCP_IP = CONFIGS['KEA_DHCP']['DHCP_IP']
DHCP_PORT = CONFIGS['KEA_DHCP']['PORT']

KEY_LIST_COMMANDS = 'list-commands'
KEY_CONFIG_GET = 'config-get'
KEY_CONFIG_WRITE = 'config-write'
KEY_CONFIG_TEST = 'config-test'
KEY_CONFIG_SET = 'config-set'
KEY_SERVICE = 'service'
KEY_LEASE4_GET = 'lease4-get'
KEY_LEASE4_GET_ALL = 'lease4-get-all'
KEY_LEASE4_ADD = 'lease4-add'
KEY_LEASE4_DELETE = 'lease4-del'
KEY_LEASE4_UPDATE = 'lease4-update'
KEY_LEASE4_WIPE = 'lease4-wipe'
KEY_SERVICE_DHCP4 = 'dhcp4'
KEY_SERVICE_DHCP6 = 'dhcp6'
KEY_SUBNET4 = 'subnet4'
KEY_LEASE_IDENTIFIER_TYPE = 'identifier-type'
KEY_LEASE_IDENTIFIER = 'identifier'
KEY_LEASE_SUBNETID = 'subnet-id'
KEY_IP = 'ip-address'
KEY_RESERVATIONS = 'reservations'
KEY_OPTIONSDATA = 'option-data'
KEY_OPTIONSDATA_CODE = 'code'
KEY_FILENAME = 'filename'
KEY_SUBNET_ID = 'id'

VAL_MAC = 'hw-address'

ATTR_DHCP4_OPTIONS = 'option-data'
ATTR_ALWAYS_SEND = 'always-send'
ATTR_HW_ADDR = 'hw-address'
ATTR_IP_ADDR = 'ip-address'
ATTR_BOOT_FILENAME = 'boot-file-name'
ATTR_CLIENT_CLASSES = 'client-classes'


KEA_SERVER_CON_ERROR = 'Unable to connect to the server at {}:{}'
CONFIG_RETREIVAL_FAILED = 'Failed to retrieve config from DHCP server at {}:{}'
CONFIG_UPDATE_FAILED = 'Failed to update DHCP Server config object.'
CONFIG_APPLY_FAILED = 'An error occurred while trying to check and update the DHCP config object'
CONFIG_BACKUP_FAILED = 'An error occurred while trying to take a backup of the DHCP config object'
CONFIG_TEST_FAILED = 'An error occurred while trying to set the DHCP config object'
CONFIG_SET_FAILED = 'An error occurred while trying to test the DHCP config object'
LEASE_RETREIVAL_FAILED = 'Failed to retrieve lease for {} from DHCP server at {}:{}'
SUBNETS_RETREIVAL_FAILED = 'Unable to get subnets from config obtained from server  at {}:{}'
SUBNET_NOT_FOUND = 'Unable to find the subnet with id {} from config obtained from server at {}:{}'
SUBNET_RETREIVAL_FAILED = 'Failed to retrieve subnet with id {} from DHCP server at {}:{}'
RESERVATION_KEY_NOT_FOUND = 'Reservation key not found for subnet.'
RESERVATION_NOT_FOUND = 'Specified reservation mac(s) do not exist'
ALL_RESERVATIONS_NOT_FOUND = 'Some of the specified reservation mac(s) do not exist'
SUBNETS_NOT_FOUND = 'Specified subnet id(s) do not exist'
CLIENT_CLASSES_NOT_FOUND = 'Specified Client class(es) do not exist'
ALL_SUBNETS_NOT_FOUND = 'Some of the specified subnet id(s) do not exist'
ALL_CLIENT_CLASSES_NOT_FOUND = 'Some of the specified Client class(es) do not exist'
OPTIONS_NOT_FOUND = 'Specified option code(s) do not exist'
ALL_OPTIONS_NOT_FOUND = 'Some of the specified option code(s) do not exist'
INVALID_SUBNET = 'Invalid subnet object'
INVALID_RESERVATION = 'Invalid reservation object'
INVALID_OPTIONS = 'invalid options object'
GIT_PUSH_FAILED = 'Failed to push the file --> {} to git.'
GIT_PULL_FAILED = 'Some error occured during Git Pull. Make sure repository at {} is up to date.'

API_KEYS_CSV = CONFIGS['AUTH']['API_KEYS_CSV']