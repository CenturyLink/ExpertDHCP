import csv
import secrets
import time
from restservice.config import API_KEYS_CSV
from io import StringIO
from os.path import exists
from datetime import date, datetime
from restservice import LOGGER

MIN_LINE_LENGTH = 37

def verify_api_key(apikey):
    # Given an API key, check whether it is valid

    api_key_csv = open(API_KEYS_CSV, 'r')
    if api_key_csv == None: 
        print("ERROR: api_key_csv is empty or a file read issue has been \
            encountered")
        LOGGER.error("ERROR: api_key_csv is empty or a file read issue has \
            been encountered")
        return False
    for line in api_key_csv:
        if len(line) > MIN_LINE_LENGTH:
            if not line[0] == '#' and not line.isspace():
                temp = StringIO(str(line))
                reader = csv.reader(temp, delimiter=',')
                for row in reader:
                    f_api_key= row[0]
                    f_is_valid = row[1]

                    # Uncomment for debug
                    print("DEBUG: key from file f_api_key = " + str(f_api_key))
                    LOGGER.debug("DEBUG: key from file f_api_key = " + 
                        str(f_api_key))

                    print("DEBUG: is valid value from filef_is_valid = " + 
                          str(f_is_valid)) 
                    LOGGER.debug("DEBUG: is valid value from filef_is_valid = "
                        + str(f_is_valid)) 

                    if str(apikey) == str(f_api_key):
                        print("DEBUG: API keys are equal")
                        LOGGER.debug("DEBUG: API keys are equal")

                    print("DEBUG: f_is_valid = " + str(f_is_valid))
                    LOGGER.debug("DEBUG: f_is_valid = " + str(f_is_valid))
    
                    if apikey == f_api_key and f_is_valid == 'True':
                        print("DEBUG: API key " + str(apikey) + " is valid")
                        LOGGER.debug("DEBUG: API key " + str(apikey) + 
                            " is valid")
                        return True
    api_key_csv.close()
    return False

# Test code below
if __name__ == "__main__":
    verify_result = verify_api_key("f062991854c60389d05ac9d0d6ddc2ca")
    if verify_result == True:
        print("INFO: API key is valid")
    else:
        print("INFO: API Key is invalid")
    verify_result = verify_api_key("062991854c60389d05ac9d0d6ddc2ca")
    if verify_result == True:
        print("INFO: API key is valid")
    else:
        print("INFO: API Key is invalid")
