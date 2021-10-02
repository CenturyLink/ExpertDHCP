"""
    Configuration file reader for DHCP
    Reads configs.ini and loads into corresponding variables
"""

import configparser
import os

CONFIGS = configparser.ConfigParser()
CONFIGS.read(os.path.dirname(os.path.abspath(__file__)) + '/config.ini')

PARENT_FOLDER = os.path.dirname(os.getcwd())

KEA_LOGPATH = CONFIGS['KEA']['LOGPATH']
DUMP_PATH = CONFIGS['KEA']['DUMP_PATH']
DUMP_INTERFACE = CONFIG['KEA']['DUMP_INTERFACE']

REQUIRE_API_AUTHENTICATION = CONFIG['AUTH']['REQUIRE_API_AUTHENTICATION']

