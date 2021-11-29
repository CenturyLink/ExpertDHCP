FASTDHCP ENDPOINTS
==================

**Last Updated**: October 16, 2021

<br />

**001 DHCP4 Homepage**
-

API Information
-
<br />

***Function***: endpoints.home()<br />
***Description***: Homepage to check whether the server is up<br />
***HTTP Method***: GET <br />
***Call***: /dhcp4/ <br />
***Output Type***: JSON <br />

Request Parameters
-

    API - does not require request parameters

Response Parameters
-------------------

| Parameters | Data Type | Description | Example |
| ---------- | --------- | ----------- | ------- | 
| status | string | can be KO or OK | "OK" |
| statusCode | string | status code for each error/ success | "9000011000" | 
| statusValue | string | status description for the code | "Command execution successful" |
| data | JSON | response data result | {'data': 'DHCP BASED PROVISIONING'} |

Sample Request URL
-
```http
http://10.4.8.148:5007/dhcp4/
```

Sample Request Object
-

    *GET API* does not have a request object.

Sample Response Object
-

This is a successful API response. Values may change:

```json
{
    "status": "OK", 
    "statusCode": "9000011000", 
    "statusValue": "Command execution successful", 
    "data": {
        "data": "DHCP Management server is up and running"}
}
```

Error Codes
-

| Error Description | Status | Status Code | Status Value | Data |
| --- | --- | --- | --- | --- |
| Unknown Exception | KO | 9000014000 | An exception occured in the server. Command unsuccessful | {'error': \<Exception String>} |

<br />

**002 DHCP4 Configuration**
-

API Information
-

<br />

***Function***:  endpoints.get_kea_config()<br />
***Description***: returns the entire KEA Server Configuration<br />
***HTTP Method***: GET<br />
***Call***: /dhcp4/config<br />
***Output Type***: JSON<br />

Request Parameters
-

| Parameters | Data Type | Description | Example** |
| --- | --- | --- | --- |
| apikey | string | apikey configured in apikeys.csv | "f062991854c60389d05ac9d0d6ddc2ca" | 

**NOTE**: The DHCP server is configured in config.ini

Response Parameters
-

| Parameters | Data Type | Description | Example |
| --- | --- | --- | --- |
| status | string | can be KO or OK | "OK" |
| statusCode | string | status code for each error/ success | "9000021000" |
| statusValue | string | status description for the code | "Command execution successful" |
| data | JSON | response data result | {'data':\<config object from server>} |

Sample Request URL
-
```http
http://10.189.132.148:5007/dhcp4/config
```

Sample Request Object
-

GET API does not have a request object.

Sample Response Object
-

``` json
This is a successful API response. Values may change::

        {
            "status": "OK",
            "statusCode": "9000021000",
            "statusValue": "Command execution successful",
            "data": {
                "data": [
                    {
                        "arguments": {
                            "Dhcp4": {
                                "client-classes": [
                                    {
                                        "boot-file-name": "",
                                        "name": "Juniper 1",
                                        "next-server": "0.0.0.0",
                                        "option-data": [
                                            {
                                                "always-send": false,
                                                "code": 66,
                                                "csv-format": true,
                                                "data": "10.4.8.47",
                                                "name": "tftp-server-name",
                                                "space": "dhcp4"
                                            },
                                            {
                                                "always-send": false,
                                                "code": 67,
                                                "csv-format": true,
                                                "data": "/cmd/le-lnx.xml",
                                                "name": "boot-file-name",
                                                "space": "dhcp4"
                                            }
                                        ],
                                        "option-def": [],
                                        "server-hostname": "",
                                        "test": "option[vendor-class-identifier].text == 'SAOS.3906'"
                                    }
                                ],
                                "control-socket": {
                                    "socket-name": "/tmp/kea-dhcp4-ctrl.sock",
                                    "socket-type": "unix"
                                },
                                "decline-probation-period": 86400,
                                "dhcp-ddns": {
                                    "enable-updates": false,
                                    "generated-prefix": "myhost",
                                    "hostname-char-replacement": "",
                                    "hostname-char-set": "",
                                    "max-queue-size": 1024,
                                    "ncr-format": "JSON",
                                    "ncr-protocol": "UDP",
                                    "override-client-update": false,
                                    "override-no-update": false,
                                    "qualifying-suffix": "",
                                    "replace-client-name": "never",
                                    "sender-ip": "0.0.0.0",
                                    "sender-port": 0,
                                    "server-ip": "127.0.0.1",
                                    "server-port": 53001
                                },
                                "dhcp-queue-control": {
                                    "capacity": 500,
                                    "enable-queue": false,
                                    "queue-type": "kea-ring4"
                                },
                                "dhcp4o6-port": 0,
                                "echo-client-id": true,
                                "expired-leases-processing": {
                                    "flush-reclaimed-timer-wait-time": 25,
                                    "hold-reclaimed-time": 3600,
                                    "max-reclaim-leases": 100,
                                    "max-reclaim-time": 250,
                                    "reclaim-timer-wait-time": 10,
                                    "unwarned-reclaim-cycles": 5
                                },
                                "hooks-libraries": [
                                    {
                                        "library": "/usr/local/lib/hooks/libdhcp_lease_cmds.so",
                                        "parameters": {}
                                    },
                                    {
                                        "library": "/usr/local/lib/hooks/kea-hook-runscript.so",
                                        "parameters": {
                                            "script": "/usr/local/sbin/warehouse/warehouse.sh"
                                        }
                                    }
                                ],
                                "host-reservation-identifiers": [
                                    "hw-address",
                                    "duid",
                                    "circuit-id",
                                    "client-id"
                                ],
                                "interfaces-config": {
                                    "interfaces": [
                                        "eth0"
                                    ],
                                    "re-detect": true
                                },
                                "lease-database": {
                                    "lfc-interval": 1800,
                                    "persist": true,
                                    "type": "memfile"
                                },
                                "option-data": [],
                                "option-def": [
                                    {
                                        "array": true,
                                        "code": 121,
                                        "encapsulate": "",
                                        "name": "rfc3442-classless-static-routes",
                                        "record-types": "uint8, uint8, uint8, uint8, uint8, uint8, uint8, uint8",
                                        "space": "dhcp4",
                                        "type": "record"
                                    }
                                ],
                                "rebind-timer": 2000,
                                "renew-timer": 1000,
                                "sanity-checks": {
                                    "lease-checks": "warn"
                                },
                                "shared-networks": [],
                                "subnet4": [
                                    {
                                        "4o6-interface": "",
                                        "4o6-interface-id": "",
                                        "4o6-subnet": "",
                                        "authoritative": false,
                                        "boot-file-name": "",
                                        "id": 1,
                                        "match-client-id": true,
                                        "next-server": "0.0.0.0",
                                        "option-data": [
                                            {
                                                "always-send": false,
                                                "code": 6,
                                                "csv-format": true,
                                                "data": "10.4.8.164, 10.4.8.165",
                                                "name": "domain-name-servers",
                                                "space": "dhcp4"
                                            },
                                            {
                                                "always-send": false,
                                                "code": 3,
                                                "csv-format": true,
                                                "data": "10.4.8.1",
                                                "name": "routers",
                                                "space": "dhcp4"
                                            }
                                        ],
                                        "pools": [
                                            {
                                                "option-data": [],
                                                "pool": "10.4.8.101-10.4.8.252"
                                            }
                                        ],
                                        "rebind-timer": 2000,
                                        "relay": {
                                            "ip-addresses": []
                                        },
                                        "renew-timer": 1000,
                                        "reservation-mode": "all",
                                        "reservations": [],
                                        "server-hostname": "",
                                        "subnet": "10.4.8.0/24",
                                        "valid-lifetime": 604800
                                    },
                                    {
                                        "4o6-interface": "",
                                        "4o6-interface-id": "",
                                        "4o6-subnet": "",
                                        "authoritative": false,
                                        "boot-file-name": "",
                                        "id": 2,
                                        "match-client-id": true,
                                        "next-server": "0.0.0.0",
                                        "option-data": [
                                            {
                                                "always-send": false,
                                                "code": 6,
                                                "csv-format": true,
                                                "data": "10.4.8.37, 10.4.8.165",
                                                "name": "domain-name-servers",
                                                "space": "dhcp4"
                                            },
                                            {
                                                "always-send": false,
                                                "code": 3,
                                                "csv-format": true,
                                                "data": "10.4.8.1",
                                                "name": "routers",
                                                "space": "dhcp4"
                                            }
                                        ],
                                        "pools": [
                                            {
                                                "option-data": [],
                                                "pool": "10.4.8.101-10.4.8.252"
                                            }
                                        ],
                                        "rebind-timer": 2000,
                                        "relay": {
                                            "ip-addresses": []
                                        },
                                        "renew-timer": 1000,
                                        "reservation-mode": "all",
                                        "reservations": [],
                                        "server-hostname": "",
                                        "subnet": "10.4.8.0/24",
                                        "valid-lifetime": 604800
                                    },
                                    {
                                        "4o6-interface": "",
                                        "4o6-interface-id": "",
                                        "4o6-subnet": "",
                                        "authoritative": false,
                                        "boot-file-name": "",
                                        "id": 3,
                                        "match-client-id": true,
                                        "next-server": "0.0.0.0",
                                        "option-data": [
                                            {
                                                "always-send": false,
                                                "code": 6,
                                                "csv-format": true,
                                                "data": "10.4.8.37, 10.4.8.165",
                                                "name": "domain-name-servers",
                                                "space": "dhcp4"
                                            },
                                            {
                                                "always-send": false,
                                                "code": 3,
                                                "csv-format": true,
                                                "data": "10.4.8.1",
                                                "name": "routers",
                                                "space": "dhcp4"
                                            }
                                        ],
                                        "pools": [
                                            {
                                                "option-data": [],
                                                "pool": "10.4.8.101-10.4.8.252"
                                            }
                                        ],
                                        "rebind-timer": 2000,
                                        "relay": {
                                            "ip-addresses": []
                                        },
                                        "renew-timer": 1000,
                                        "reservation-mode": "all",
                                        "reservations": [],
                                        "server-hostname": "",
                                        "subnet": "10.4.8.0/24",
                                        "valid-lifetime": 604800
                                    }
                                ],
                                "valid-lifetime": 604800
                            },
                            "Logging": {
                                "loggers": [
                                    {
                                        "debuglevel": 0,
                                        "name": "kea-dhcp4",
                                        "output_options": [
                                            {
                                                "flush": true,
                                                "maxsize": 10240000,
                                                "maxver": 1,
                                                "output": "/usr/local/var/log/kea-dhcp4.log"
                                            }
                                        ],
                                        "severity": "INFO"
                                    }
                                ]
                            }
                        },
                        "result": 0
                    }
                ]
            }
        }
```

Error Codes
-

| Error Description | Status | Status Code | Status Value | Data |
| --- | --- |--- |--- |--- |
| Unknown Exception | KO | 9000024000 | An exception occured in the server. Command unsuccessful | {'error':\<Exception String>}                                          |
| Cannot connect to the server | KO | 9000024002 | "Unable to fetch server Configuration" | {'error':Unable to connect to the server at $HOST:$PORT}              |
| Cannot fetch the dhcp4 configuration | KO | 9000024002 | "Unable to fetch server Configuration" | {'error':Failed to retrieve config from DHCP server at $HOST:$PORT} |

<br />

**003 DHCP4 Get IP from MAC Address**
-

API Information
-

<br />

***Function***: endpoints.get_ip_from_mac()<br />
***Description***: fetch IP address for mentioned MAC and subnet from KEA DHCP Server <br />
***HTTP Method***: POST<br />
***HTTP Application Type***: application/json<br />
***Call***: /dhcp4/getipfrommac<br />
***Input Type***: JSON<br />
***Output Type***: JSON<br />

Request Parameters
-

| Parameters | Data Type | Description | Example |
| --- | --- | --- | --- |
| subnet_id | string OR int | subnet id in KEA Configuration from API 002 | "3"  or 3 |
| mac_address | string | valid mac address in the subnet | "74:87:bb:a4:40:10" |
| apikey | string | API key for authentication | f062991854c60389d05ac9d0d6ddc2ca |

**NOTE**: The DHCP server is configured in config.ini

Response Parameters:
-

| Parameters | Data Type | Description | Example |
| --- | --- | --- | --- |
| status | string | can be KO or OK | "OK" |
| statusCode | string | status code for each error or success | "9000031000" |
| statusValue | string | status description corresponding to the code | "Command execution successful" |
| data | JSON | response data result | {'ip-address': "10.4.8.216"} |

Sample Request URL
-
```http
http://10.189.132.148:5007/dhcp4/getipfrommac
```

Sample Request Object
-

Sample request object is:
```json
{
    "subnet_id":"3",
    "mac_address":"74:87:bb:a4:40:10"
}
```

Sample Response Object
-

This is a successful API response. Values may change::

```json
{
    "status": "OK",
    "statusCode": "9000031000",
    "statusValue": "Command execution successful",
    "data": {
        "ip_address": "10.4.8.216"
    }
}
```

Error Codes
-

| Error Description | Status | Status Code | Status Value | Data |
| --- | --- | --- | --- | --- |
| Unknown Exception | KO | 9000034000 | An exception occured in the server. Command unsuccessful | {'error':\<Exception String>} |
| Incorrect JSON | KO | 9000034001 | Could not find JSON key | {'error': "Could not find JSON key"} |
| Missing header | KO | 9000034001 | Could not find JSON key | {'error': "Could not find JSON key"} |
| Incorrect Mac address | KO | 9000034003 | "IP Address not found" | {'error': "Lease not found."} |
| Mac address does not exist | KO | 9000034003 | "IP Address not found" | {'error': "Lease not found."} |
| Incorrect Subnet ID | KO | 9000034003 | "IP Address not found" | {'error': "Lease not found."} |
| Incorrect mac address format | KO | 9000034003 | "IP Address not found" | {'error': "invalid format of the decoded string \<mac>"} |
| Cannot connect to the server | KO | 9000034004 | "Could not fetch leases" | {'error':Unable to connect to the server at $HOST:$PORT} |
| Cannot fetch the dhcp4 configuration | KO | 9000034004 | "Could not fetch leases" | {'error':Failed to retrieve config from DHCP server at $HOST:$PORT} |


**004 DHCP4 Get Reservations**
-

API Information
-


***Function***: endpoints.get_all_reservations()<br />
***Description***: Fetches all reservations for a particular subnet from DHCP server<br />
***HTTP Method***: POST<br />
***HTTP Application Type***:application/json<br />
***Call***: /dhcp4/reservations<br />
***Input Type***: JSON<br />
***Output Type***:JSON<br />

Request Parameters
-

| Parameters | Data Type | Description | Example |
| --- | --- | --- | --- |
| subnet_id | string or int | subnet id in KEA Configuration from API 002 | "1" or 1 |

**NOTE**: The DHCP server is configured in config.ini

Response Parameters:
-

| Parameters | Data Type | Description | Example |
| --- | --- | --- | --- |
| status | string | can be KO or OK | "OK" |
| statusCode | string | status code for each error or success | "9000041000" |
| statusValue | string | status description corresponding to the code | "Command execution successful" |
| data | JSON | response data result | {'reservations': <list of reservations>} |

Sample Request URL
-

```
http://10.189.4.148:5007/dhcp4/reservations
```

Sample Request Object
-
Sample request object is::
```json
{
    "subnet_id": "1"
}
```

Sample Response Object
-

This is a successful API response. Values may change::
```json
{
    "status": "OK",
    "statusCode": "9000041000",
    "statusValue": "Command execution successful",
    "data": {
        'reservations': []
    }
}
```

Error Codes
-

| Error Description | Status | Status Code | Status Value | Data |
| --- | --- | --- | --- | --- |
| Unknown Exception | KO | 9000044000 | An exception occured in the server. Command unsuccessful | {'error':<Exception String>} |
| Incorrect JSON | KO | 9000044001 | Could not find JSON key | {'error': "Could not find JSON key"} |
| Missing header | KO | 9000044001 | Could not find JSON key | {'error': "Could not find JSON key"} |
| Cannot connect to the server | KO | 9000044005 | 'Unable to fetch reservations from server." | {'error':Unable to connect to the server at $HOST:$PORT} |
| Cannot fetch the dhcp4 configuration | KO | 9000044005 | 'Unable to fetch reservations from server." | {'error':Failed to retrieve config from DHCP server at $HOST:$PORT} |
| Incorrect Subnet ID | KO | 9000044005 | 'Unable to fetch reservations from server." | {'error': 'Unable to find the subnet with id $SID from config obtained from server at $HOST:$PORT'} |
| Cannot fetch subnets from server | KO | 9000044005 | 'Unable to fetch reservations from server." | {'error':Unable to get subnets from config obtained from server at $HOST:$PORT} |
| Cannot find the key 'reservations' | KO | 9000044005 | 'Unable to fetch reservations from server." | {'error':'Reservation key not found for subnet.'} |
| Error occured while getting subnet | KO | 9000044005 | 'Unable to fetch reservations from server." | {'error':'Failed to retrieve subnet with id $SID from DHCP server at $HOST:$PORT'}} |
| Subnet object in configuration is not list | KO | 9000044005 | 'Unable to fetch reservations from server." | {'error':'Invalid subnet object'} |


**005 DHCP4 Add a Reservation**
-

API Information
-

***Function***: endpoints.add_reservations()<br />
***Description***: add new reservations on a subnet<br />
***HTTP Method***: POST<br />
***HTTP Application Type***: application/json<br />
***Call***: /dhcp4/reservations/add<br />
***Input Type***: JSON<br />
***Output Type***: JSON<br />

Request Parameters
-

| Parameters | Data Type | Description | Example |
| --- | --- | --- | --- |
| subnet_id | string or int | subnet id in KEA Configuration from API 002 | "3" or 3 |
| reservations | python list | List of reservation JSON objects to add | \<reservation object list\> |

**NOTE**: The DHCP server is configured in config.ini


```json
<reservation object list example> 
[{
    "hostname": "test_reservation",
    "hw-address": "fc:00:ff:ef:ee:ee",
    "ip-address": "2.3.3.102",
    "next-server": "172.16.12.191",
    "option-data":
    [{
        "name": "root-path",
        "data": "172.16.12.191:/b/tftpboot/FreeBSD/install/"
    },
     {
         "name": "domain-name-servers",
         "data": "10.189.4.37"
     }
    ],
    "server-hostname": "test_reservation_server"
}]
```

Response Parameters:
-

| Parameters | Data Type | Description | Example |
| --- | --- | --- | --- |
| status | string | can be KO or OK | "OK" |
| statusCode | string | status code for each error or success | "9000051000" |
| statusValue | string | status description corresponding to the code | "Command execution successful" |
| data | JSON | response data result | {'data': true } |

Sample Request URL
-

```
http://10.189.4.148:5007/dhcp4/reservations/add
```

Sample Request Object
```json
-

{
    "subnet_id": 3,
    "reservations": [{
        "hostname": "test_reservation",
        "hw-address": "fc:00:ff:ef:ee:ee",
        "ip-address": "2.3.3.102",
        "next-server": "172.16.12.191",
        "option-data":
        [{
            "name": "root-path",
            "data": "172.16.12.191:/b/tftpboot/FreeBSD/install/"
        },
         {
             "name": "domain-name-servers",
             "data": "10.189.4.37"
         }
        ],
        "server-hostname": "test_reservation_server"
    }]
}
```

Sample Response Object
-

This is a successful API response. Values may change:

```json
{
    "status": "OK",
    "statusCode": "9000051000",
    "statusValue": "Command execution successful",
    "data": {
        'data': true
    }
}
```

Error Codes
-

| Error Description | Status | Status Code | Status Value | Data |
| --- | --- | --- | --- | --- |
| Unknown Exception | KO | 9000054000 | An exception occured in the server. Command unsuccessful | {'error':<Exception String>} |
| Incorrect JSON | KO | 9000054001 | Could not find JSON key | {'error': "Could not find JSON key"} |
| Missing header | KO | 9000054001 | Could not find JSON key | {'error': "Could not find JSON key"} |
| Cannot connect to the server | KO | 9000054006 | "Failed to add reservation due to an issue with KEA server response" | {'error':Unable to connect to the server at $HOST:$PORT} |
| Cannot fetch the dhcp4 configuration | KO | 9000054006 | "Failed to add reservation due to an issue with KEA server response"  | {'error':Failed to retrieve config from DHCP server at $HOST:$PORT} |
| Incorrect Subnet ID | KO | 9000054006 | "Failed to add reservation due to an issue with KEA server response" | {'error': 'Unable to find the subnet with id $SID from config obtained from server at $HOST:$PORT'} |
| Cannot fetch subnets from server | KO | 9000054006 | "Failed to add reservation due to an issue with KEA server response" | {'error':Unable to get subnets from config obtained from server at $HOST:$PORT} |
| Cannot find the key 'reservations' | KO | 9000054006 | "Failed to add reservation due to an issue with KEA server response" | {'error':'Reservation key not found for subnet.'} |
| Error occured while getting subnet | KO | 9000054006 | "Failed to add reservation due to an issue with KEA server response" | {'error':'Failed to retrieve subnet with id $SID from DHCP server at $HOST:$PORT'}} |
| Subnet object in configuration is not list | KO | 9000054006 | "Failed to add reservation due to an issue with KEA server response" | {'error':'Invalid subnet object'} |
| Error occured while updating the config | KO | 9000054006 | "Failed to add reservation due to an issue with KEA server response"  | {'error':'Failed to update DHCP Server config object.'} |
| Error occured while testing config on kea | KO | 9000054006 | "Failed to add reservation due to an issue with KEA server response" | {'error':'An error occured while trying to check and update the DHCP config object'} |
| Error occured while taking a backup | KO | 9000054006 | "Failed to add reservation due to an issue with KEA server response" | {'error':'An error occured while trying to take a backup of the DHCP config object'} |
| Error occured while pulling git backup | KO | 9000054006 | "Failed to add reservation due to an issue with KEA server response"  | {'error':'Some error occured during Git Pull. Make sure repository at $LOCALREPO is up to date.'} |
| Error occured while pushing to git | KO | 9000054006 | "Failed to add reservation due to an issue with KEA server response" | {'error':'Failed to push the file --> $FILENAME to git.'} |
| Existing Mac address reservation | KO | 9000054007 | Failed to add reservation | {'error':  "failed to add new host using the HW address <mac> to the IPv4 subnet id <sid> as this host has already been added"} |
| incorrect mac address format | KO | 9000054007 | Failed to add reservation | {'error': invalid host identifier value <mac> (<wire>:0:4901)} |
| Existing IP address | KO | 9000054007 | Failed to add reservation | {'error': "failed to add new host using the HW address <mac> and DUID '(null)' to the IPv4 subnet id <sid> for the address <ip>: There's already a reservation for this address"} |
| incorrect IP address format | KO | 9000054007 | Failed to add reservation | {'error': "Failed to convert string to address <ip>: Invalid argument (<wire>:0:4983)"                                                                                             |

**006 DHCP4 Delete Reservation**
-

API Information
-

***Function***: endpoints.remove_reservation()<br />
***Description***: delete reservation on a subnet<br />
***HTTP Method***: POST<br />
***HTTP Application Type***: application/json<br />
***Call***: /dhcp4/reservations/delete<br />
***Input Type***: JSON<br />
***Output Type***: JSON<br />

Request Parameters
-

| Parameters | Data Type | Description | Example |
| --- | --- | --- | --- |
| subnet_id | string or int | subnet id in KEA Configuration from API 002 | "3" or 3 |
| hw_addresses | python list | list of all mac addresses to remove | \<list of hw_addresses\> |

**NOTE**: The DHCP server is configured in config.ini

\<list of hw_addresses\> sample::

    ["fc:00:ff:ef:ee:ee"]

Response Parameters:
-

| Parameters | Data Type | Description | Example |
| --- | --- | --- | --- |
| status | string | can be KO or OK | "OK" |
| statusCode | string | status code for each error or success | "9000061000" |
| statusValue | string | status description corresponding to the code | "Command execution successful" |
| data | JSON | response data result | {'data': true } |

Sample Request URL
-

```
http://10.189.132.148:5007/dhcp4/reservations/delete
```

Sample Request Object
-


Sample request object is::

```json
{
    "subnet_id": 1,
    "hw_addresses": [
        "fc:00:ff:ef:ee:ee"
    ]
}
```

Sample Response Object
-

This is a successful API response. Values may change::

```json
{
    "status": "OK",
    "statusCode": "9000061000",
    "statusValue": "Command execution successful",
    "data": {
        'data': true
    }
}
```

Error Codes
-

| Error Description | Status | Status Code | Status Value | Data |
| --- | --- | --- | --- | --- |
| Unknown Exception | KO | 9000064000 | An exception occured in the server. Command unsuccessful | {'error':<Exception String>} |
| Incorrect JSON | KO | 9000064001 | Could not find JSON key | {'error': "Could not find JSON key"} |
| Missing header | KO | 9000064001 | Could not find JSON key | {'error': "Could not find JSON key"} |
| Cannot connect to the server | KO | 9000064008 | "Failed to remove reservation due to an issue with KEA server response" | {'error':Unable to connect to the server at $HOST:$PORT} |
| Cannot fetch the dhcp4 configuration | KO | 9000064008 | "Failed to remove reservation due to an issue with KEA server response" | {'error':Failed to retrieve config from DHCP server at $HOST:$PORT} |
| Incorrect Subnet ID | KO | 9000064008 | "Failed to remove reservation due to an issue with KEA server response" | {'error': 'Unable to find the subnet with id $SID from config obtained from server at $HOST:$PORT'} |
| Cannot fetch subnets from server | KO | 9000064008 | "Failed to remove reservation due to an issue with KEA server response" | {'error':Unable to get subnets from config obtained from server at $HOST:$PORT} |
| Cannot find the key 'reservations' | KO | 9000064008 | "Failed to remove reservation due to an issue with KEA server response" | {'error':'Reservation key not found for subnet.'} |
| Reservation not found | KO | 9000064008 | "Failed to remove reservation due to an issue with KEA server response" | {'error':'Specified reservation mac(s) do not exist'} |
| Not all reservations were found | KO | 9000064008 | "Failed to remove reservation due to an issue with KEA server response" | {'error':'Some of the specified reservation mac(s) do not exist'} |
| Error occured while getting subnet | KO | 9000064008 | "Failed to remove reservation due to an issue with KEA server response" | {'error':'Failed to retrieve subnet with id $SID from DHCP server at $HOST:$PORT'}} |
| Subnet object in configuration is not list | KO | 9000064008 | "Failed to remove reservation due to an issue with KEA server response" | {'error':'Invalid subnet object'} |
| Error occured while updating the config | KO | 9000064008 | "Failed to remove reservation due to an issue with KEA server response" | {'error':'Failed to update DHCP Server config object.'} |
| Error occured while testing config on kea | KO | 9000064008 | "Failed to remove reservation due to an issue with KEA server response" | {'error':'An error occured while trying to check and update the DHCP config object'} |
| Error occured while taking a backup | KO | 9000064008 | "Failed to remove reservation due to an issue with KEA server response" | {'error':'An error occured while trying to take a backup of the DHCP config object'} |
| Error occured while pulling git backup | KO | 9000064008 | "Failed to remove reservation due to an issue with KEA server response" | {'error':'Some error occured during Git Pull. Make sure repository at $LOCALREPO is up to date.'} |
| Error occured while pushing to git | KO | 9000064008 | "Failed to remove reservation due to an issue with KEA server response" | {'error':'Failed to push the file --> $FILENAME to git.'} |
| incorrect mac address format | KO | 9000064009 | Failed to remove reservation | {'error': invalid host identifier value <mac> (<wire>:0:4901)} |
| incorrect IP address format | KO | 9000064009 | Failed to remove reservation | {'error': "Failed to convert string to address <ip>: Invalid argument (<wire>:0:4983)" |

**007 DHCP4 Add Subnet**
-

API Information
-

***Function8***: endpoints.add_subnet()<br />
***Description8***: add a subnet<br />
***HTTP Method***: POST<br />
***HTTP Application Type***: application/json<br />
***Call***: /dhcp4/subnets/add<br />
***Input Type***: JSON<br />
***Output Type***: JSON<br />

Request Parameters
-

| Parameters | Data Type | Description | Example |
| --- | --- | --- | ---- |
| subnet_list | Python List | List of subnets | \<subnet object list\> |

**NOTE**: The DHCP server is configured in config.ini

\<subnet  object list example\>:

```json 
[
    {
        "id": 8,
        "subnet": "10.189.143.0/24",
        "pools": [
            {
                "pool": "10.189.143.100 - 10.189.143.150"
            }
        ],
        "option-data": [
            {
                "name": "domain-name-servers",
                "code": 6,
                "space": "dhcp4",
                "csv-format": "true",
                "data": "10.189.136.37, 10.189.136.165"
            }
        ],
        "reservations": [
            {
                "hw-address": "ec:b0:e1:4c:ab:9f",
                "ip-address": "10.189.143.100",
                "option-data": [
                    {
                        "name": "tftp-server-name",
                        "code": 66,
                        "csv-format": "true",
                        "data": "172.28.12.132"
                    },
                    {
                        "name": "boot-file-name",
                        "code": 67,
                        "data": "ciena/cmd/3906.xml"
                    }
                ]
            },
            {
                "hw-address": "ec:b0:e1:4c:ab:90",
                "ip-address": "10.189.143.109"
            }
        ]
    }
]
```

Response Parameters:
-

| Parameters | Data Type | Description | Example |
| --- | --- | --- | --- |
| status | string | can be KO or OK | "OK" |
| statusCode | string | status code for each error or success | "9000071000" |
| statusValue | string | status description corresponding to the code | "Command execution successful" |
| data | JSON | response data result | {'data': true  } |

Sample Request URL
-

```
http://10.189.132.148:5007/dhcp4/subnets/add
```

Sample Request Object
-

```json
Sample request object is::

    {
        "subnet_list": [
            {
                "id": 8,
                "subnet": "10.189.143.0/24",
                "pools": [
                    {
                        "pool": "10.189.143.100 - 10.189.143.150"
                    }
                ],
                "option-data": [
                    {
                        "name": "domain-name-servers",
                        "code": 6,
                        "space": "dhcp4",
                        "csv-format": "true",
                        "data": "10.189.136.37, 10.189.136.165"
                    }
                ],
                "reservations": [
                    {
                        "hw-address": "ec:b0:e1:4c:ab:9f",
                        "ip-address": "10.189.143.100",
                        "option-data": [
                            {
                                "name": "tftp-server-name",
                                "code": 66,
                                "csv-format": "true",
                                "data": "172.28.12.132"
                            },
                            {
                                "name": "boot-file-name",
                                "code": 67,
                                "data": "ciena/cmd/3906.xml"
                            }
                        ]
                    },
                    {
                        "hw-address": "ec:b0:e1:4c:ab:90",
                        "ip-address": "10.189.143.109"
                    }
                ]
            }
        ]
    }
```

Sample Response Object
-

This is a successful API response. Values may change::

```json
{
    "status": "OK",
    "statusCode": "9000071000",
    "statusValue": "Command execution successful",
    "data": {
        'data': true
    }
}
```

Error Codes
-

| Error Description | Status  | Status Code  | Status Value | Data |
| --- | --- | --- | --- | --- |
| Unknown Exception | KO | 9000074000 | An exception occured in the server. Command unsuccessful | {'error':\<Exception String\>} |
| Incorrect JSON | KO | 9000074001 | Could not find JSON key | {'error': "Could not find JSON key"} |
| Missing header | KO | 9000074001 | Could not find JSON key | {'error': "Could not find JSON key"} |
| Cannot connect to the server | KO | 9000074010 | "Failed to add subnet due to an issue with KEA server response" | {'error':Unable to connect to the server at $HOST:$PORT} |
| Cannot fetch the dhcp4 configuration | KO | 9000074010 | "Failed to add subnet due to an issue with KEA server response" | {'error':Failed to retrieve config from DHCP server at $HOST:$PORT} |
| Cannot fetch subnets from server | KO | 9000074010 | "Failed to add subnet due to an issue with KEA server response" | {'error':Unable to get subnets from config obtained from server at $HOST:$PORT} |
| Subnet object in configuration is not list | KO | 9000074010 | "Failed to add subnet due to an issue with KEA server response" | {'error':'Invalid subnet object'} |
| Error occured while updating the config | KO | 9000074010 | "Failed to add subnet due to an issue with KEA server response" | {'error':'Failed to update DHCP Server config object.'} |
| Error occured while testing config on kea | KO | 9000074010 | "Failed to add subnet due to an issue with KEA server response" | {'error':'An error occured while trying to check and update the DHCP config object'} |
| Error occured while taking a backup | KO | 9000074010 | "Failed to add subnet due to an issue with KEA server response" | {'error':'An error occured while trying to take a backup of the DHCP config object'} |
| Error occured while pulling git backup | KO | 9000074010 | "Failed to add subnet due to an issue with KEA server response" | {'error':'Some error occured during Git Pull. Make sure repository at $LOCALREPO is up to date.'} |
| Error occured while pushing to git | KO | 9000074010 | "Failed to add subnet due to an issue with KEA server response" | {'error':'Failed to push the file --> $FILENAME to git.'} |
| Existing Subnet ID | KO | 9000074011 | Failed to add subnet | {'error': "ID of the new IPv4 subnet \<ID\> is already in use (\<wire\>:0:5748)"} |
| incorrect mac address format | KO | 9000074011 | Failed to add subnet | {'error': invalid host identifier value \<mac\> (\<wire\>:0:4901)} |
| incorrect IP address format | KO | 9000074011 | Failed to add subnet | {'error': "Failed to convert string to address \<ip\>: Invalid argument (\<wire\>:0:4983)" |
| Existing Mac address reservation | KO | 9000074011 | Failed to add subnet | {'error': "failed to add new host using the HW address \<mac\> to the IPv4 subnet id \<sid\> as this host has already been added"} |
| Existing IP address | KO | 9000074011 | Failed to add subnet | {'error':"failed to add new host using the HW address \<mac\> and DUID '(null)' to the IPv4 subnet id \<sid\> for the address \<ip\>: There's already a reservation for this address"} |
| Existing Subnet Prefix | KO | 9000074011 | Failed to add subnet | {'error':"subnet with the prefix of \<subnet prefix\> already exists"} |
| IP Pool and Prefix Mismatch | KO | 9000074011 | Failed to add subnet | {'error':"subnet configuration failed: a pool of type V4, with the following address range: \<ip range\> does not match the prefix of a subnet: \<prefix\> to which it is being added"}|

**008 DHCP4 Delete Subnet**
-

API Information
-

***Function***: endpoints.remove_subnet()<br />
***Description***: remove a subnet<br />
***HTTP Method***: POST<br />
***HTTP Application Type***: application/json<br />
***Call***: /dhcp4/subnets/delete<br />
***Input Type***: JSON<br />
***Output Type***: JSON<br />

Request Parameters
-

| Parameters | Data Type | Description | Example |
| --- | --- | --- | --- |
| subnet_ids | Python List | List of subnet ids | \<list of codes\> |

**NOTE**: The DHCP server is configured in config.ini

\<list of codes\> sample::

    [6,7,8]

Response Parameters:
-

| Parameters | Data Type | Description | Example |
| --- | --- | --- | --- | --- |
| status | string | can be KO or OK | "OK" |
| statusCode | string | status code for each error or success | "9000081000" |
| statusValue | string | status description corresponding to the code | "Command execution successful" |
| data | JSON | response data result | {'data': true } |

Sample Request URL
-

```
http://10.189.132.148:5007/dhcp4/subnets/delete
```

Sample Request Object
-

Sample request object is::

```stop
{
    "subnet_ids": [8]
}
```

Sample Response Object
-

This is a successful API response. Values may change::

```json
{
    "status": "OK",
    "statusCode": "9000081000",
    "statusValue": "Command execution successful",
    "data": {
        'data': true
    }
}
```

Error Codes
-

| Error Description | Status | Status Code | Status Value | Data |
| --- | --- | --- | --- | --- |
| Unknown Exception | KO | 9000084000 | An exception occured in the server. Command unsuccessful | {'error':\<Exception String\>} |
| Incorrect JSON | KO | 9000084001 | Could not find JSON key | {'error': "Could not find JSON key"} |
| Missing header | KO | 9000084001 | Could not find JSON key | {'error': "Could not find JSON key"} |
| Cannot connect to the server | KO | 9000084012 | "Failed to delete subnet due to an issue with KEA server response" | {'error':Unable to connect to the server at $HOST:$PORT} |
| Cannot fetch the dhcp4 configuration | KO | 9000084012 | "Failed to delete subnet due to an issue with KEA server response" | {'error':Failed to retrieve config from DHCP server at $HOST:$PORT} |
| Cannot fetch subnets from server | KO | 9000084012 | "Failed to delete subnet due to an issue with KEA server response" | {'error':Unable to get subnets from config obtained from server at $HOST:$PORT} |
| Subnet object in configuration is not list | KO | 9000084012 | "Failed to delete subnet due to an issue with KEA server response" | {'error':'Invalid subnet object'} |
| Error occured while updating the config | KO | 9000084012 | "Failed to delete subnet due to an issue with KEA server response" | {'error':'Failed to update DHCP Server config object.'} |
| Error occured while testing config on kea | KO | 9000084012 | "Failed to delete subnet due to an issue with KEA server response" | {'error':'An error occured while trying to check and update the DHCP config object'} |
| Error occured while taking a backup | KO | 9000084012 | "Failed to delete subnet due to an issue with KEA server response" | {'error':'An error occured while trying to take a backup of the DHCP config object'} |
| Error occured while pulling git backup | KO | 9000084012 | "Failed to delete subnet due to an issue with KEA server response" | {'error':'Some error occured during Git Pull. Make sure repository at $LOCALREPO is up to date.'} |
| Error occured while pushing to git | KO | 9000084012 | "Failed to delete subnet due to an issue with KEA server response" | {'error':'Failed to push the file --> $FILENAME to git.'} |
| Subnet not found | KO | 9000084012 | "Failed to delete subnet due to an issue with KEA server response" | {'error':'Specified subnet id(s) do not exist'} |
| Not all subnets were found | KO | 9000084012 | "Failed to delete subnet due to an issue with KEA server response" | {'error':'Some of the specified subnet id(s) do not exist'} |

**009 DHCP4 Add Subnet Option**
-

API Information
-

***Function***: endpoints.add_option_subnet()<br />
***Description***: add an option to subnet<br />
***HTTP Method***: POST<br />
***HTTP Application Type***: application/json<br />
***Call***: /dhcp4/subnets/options/add<br />
***Input Type***: JSON<br />
***Output Type***: JSON<br />

Request Parameters
-

| Parameters | Data Type | Description | Example |
| --- | --- | --- | --- |
| subnet_id | int | subnet id | 8 |
| options_list| Python List | List of reservation options | \<Options Object List\> |

**NOTE**: The DHCP server is configured in config.ini

\<Options Object List\> Sample::

```json
[
    {
        "always-send": "False",
        "code": 6,
        "csv-format": "True",
        "data": "10.189.136.37, 10.189.136.165",
        "name": "domain-name-servers",
        "space": "dhcp4"
    }
]
```

Response Parameters:
-

| Parameters | Data Type | Description | Example |
| --- | --- | --- | --- |
| status | string | can be KO or OK | "OK" |
| statusCode | string | status code for each error or success | "9000091000" |
| statusValue | string | status description corresponding to the code | "Command execution successful" |
| data | JSON | response data result | {'data': true } |

Sample Request URL
-

```
http://10.189.4.148:5007/dhcp4/subnets/options/add
```

Sample Request Object
-

Sample request object is::

```json
{
    "subnet_id": 8,
    "options_list": [
        {
            "always-send": "False",
            "code": 6,
            "csv-format": "True",
            "data": "10.189.4.37, 10.189.4.165",
            "name": "domain-name-servers",
            "space": "dhcp4"
        }
    ]
}
```

Sample Response Object
-

This is a successful API response. Values may change::

```json
{
    "status": "OK",
    "statusCode": "9000091000",
    "statusValue": "Command execution successful",
    "data": {
        'data': true
    }
}
```

Error Codes
-

| Error Description | Status | Status Code  | Status Value | Data |
| --- | --- | --- | --- | --- |
| Unknown Exception | KO | 9000094000 | An exception occured in the server. Command unsuccessful | {'error':\<Exception String\>} |
| Incorrect JSON | KO | 9000094001 | Could not find JSON key | {'error': "Could not find JSON key"} |
| Missing header | KO | 9000094001 | Could not find JSON key | {'error': "Could not find JSON key"} |
| Cannot connect to the server | KO | 9000094014 | "Failed to add subnet option due to an issue with KEA server response" | {'error':Unable to connect to the server at $HOST:$PORT} |
| Cannot fetch the dhcp4 configuration | KO | 9000094014 | "Failed to add subnet option due to an issue with KEA server response" | {'error':Failed to retrieve config from DHCP server at $HOST:$PORT} |
| Cannot fetch subnets from server | KO | 9000094014 | "Failed to add subnet option due to an issue with KEA server response" | {'error':Unable to get subnets from config obtained from server at $HOST:$PORT} |
| Subnet object in configuration is not list | KO | 9000094014 | "Failed to add subnet option due to an issue with KEA server response" | {'error':'Invalid subnet object'} |
| Incorrect Subnet ID | KO | 9000094014 | "Failed to add subnet option due to an issue with KEA server response" | {'error': 'Unable to find the subnet with id $SID from config obtained from server at $HOST:$PORT'} |
| Error occured while getting subnet | KO | 9000094014 | "Failed to add subnet option due to an issue with KEA server response" | {'error':'Failed to retrieve subnet with id $SID from DHCP server at $HOST:$PORT'}} |
| Options object to add is not a list | KO | 9000094014 | "Failed to add subnet option due to an issue with KEA server response" | {'error':'invalid options object'}} |
| Error occured while updating the config | KO | 9000094014 | "Failed to add subnet option due to an issue with KEA server response" | {'error':'Failed to update DHCP Server config object.'} |
| Error occured while testing config on kea | KO | 9000094014 | "Failed to add subnet option due to an issue with KEA server response" | {'error':'An error occured while trying to check and update the DHCP config object'} |
| Error occured while taking a backup | KO | 9000094014 | "Failed to add subnet option due to an issue with KEA server response" | {'error':'An error occured while trying to take a backup of the DHCP config object'} |
| Error occured while pulling git backup | KO | 9000094014 | "Failed to add subnet option due to an issue with KEA server response" | {'error':'Some error occured during Git Pull. Make sure repository at $LOCALREPO is up to date.'} |
| Error occured while pushing to git | KO | 9000094014 | "Failed to add subnet option due to an issue with KEA server response" | {'error':'Failed to push the file --> $FILENAME to git.'} |
| Options code and option name mismatch | KO | 9000094015 | "Failed to add subnet option" | {'error':"specified option name \<name\> does not match the option definition: 'dhcp4.log-servers'"} |

**010 DHCP4 Delete option on subnet**
-

API Information
-

***Function***: endpoints.delete_option_subnet()
***Description***: remove a subnet option
***HTTP Method***: POST
***HTTP Application Type***: application/json
***Call***: /dhcp4/subnets/options/delete
***Input Type***: JSON
***Output Type***: JSON

Request Parameters
-

| Parameters | Data Type | Description | Example |
| --- | --- | --- | --- |
| subnet_id | int | subnet id | 1 |
| codes | Python List | list of option codes to remove | \<list of codes\> |

**NOTE**: The DHCP server is configured in config.ini

\<list of codes\> sample::

[6,7,8]

Response Parameters:
-

| Parameters | Data Type | Description | Example |
| --- | --- | --- | --- |
| status | string | can be KO or OK | "OK" |
| statusCode | string | status code for each error or success | "9000101000" |
| statusValue | string | status description corresponding to the code | "Command execution successful" |
| data | JSON | response data result | {'data': true } |

Sample Request URL
-

```
 http://10.189.132.148:5007/dhcp4/subnets/options/delete
```

Sample Request Object
-

Sample request object is::

```json
{
    "subnet_id": 1,
    "codes": [
        3
    ]
}
```

Sample Response Object
-

This is a successful API response. Values may change::

```json
{
    "status": "OK",
    "statusCode": "9000101000",
    "statusValue": "Command execution successful",
    "data": {
        'data': true
    }
}
```

Error Codes
-

| Error Description | Status | Status Code | Status Value |  Data | 
| --- | --- | --- | --- | --- |
| Unknown Exception | KO | 9000104000 | An exception occured in the server. Command unsuccessful | {'error': \<Exception String\>} |
| Incorrect JSON | KO | 9000104001 | Could not find JSON key | {'error': "Could not find JSON key"} |
| Missing header | KO | 9000104001 | Could not find JSON key | {'error': "Could not find JSON key"} |
| Cannot connect to the server | KO | 9000104016 | "Failed to remove subnet option due to an issue with KEA server response" | {'error':Unable to connect to the server at $HOST:$PORT} |
| Cannot fetch the dhcp4 configuration | KO | 9000104016 | "Failed to remove subnet option due to an issue with KEA server response" | {'error':Failed to retrieve config from DHCP server at $HOST:$PORT} |
| Cannot fetch subnets from server | KO | 9000104016 | "Failed to remove subnet option due to an issue with KEA server response" | {'error':Unable to get subnets from config obtained from server at $HOST:$PORT} |
| Subnet object in configuration is not list | KO | 9000104016 | "Failed to remove subnet option due to an issue with KEA server response" | {'error':'Invalid subnet object'} |
| Incorrect Subnet ID | KO | 9000104016 | "Failed to remove subnet option due to an issue with KEA server response" | {'error': 'Unable to find the subnet with id $SID from config obtained from server at $HOST:$PORT'} |
| Error occured while getting subnet | KO | 9000104016 | "Failed to remove subnet option due to an issue with KEA server response" | {'error':'Failed to retrieve subnet with id $SID from DHCP server at $HOST:$PORT'}} |
| All Option Codes were not found | KO | 9000104016 | "Failed to remove subnet option due to an issue with KEA server response" | {'error':"Specified option code(s) do not exist"}} |
| Some of the option codes not found | KO | 9000104016 | "Failed to remove subnet option due to an issue with KEA server response" | {'error':'Some of the specified option code(s) do not exist'}} |
| Error occured while updating the config | KO | 9000104016 | "Failed to remove subnet option due to an issue with KEA server response" | {'error':'Failed to update DHCP Server config object.'} |
| Error occured while testing config on kea | KO | 9000104016 | "Failed to remove subnet option due to an issue with KEA server response" | {'error':'An error occured while trying to check and update the DHCP config object'} |
| Error occured while taking a backup | KO | 9000104016 | "Failed to remove subnet option due to an issue with KEA server response" | {'error':'An error occured while trying to take a backup of the DHCP config object'} |
| Error occured while pulling git backup | KO | 9000104016 | "Failed to remove subnet option due to an issue with KEA server response" | {'error':'Some error occured during Git Pull. Make sure repository at $LOCALREPO is up to date.'} |
| Error occured while pushing to git | KO | 9000104016 | "Failed to remove subnet option due to an issue with KEA server response" | {'error':'Failed to push the file --> $FILENAME to git.'} |

**011 DHCP4 Add Subnet Reservation Option**
-

API Information
-

***Function***: endpoints.add_reserv_option_subnet()
***Description***: add options to reservations in Subnet
***HTTP Method***: POST
***HTTP Application Type***: application/json
***Call***: /dhcp4/subnets/reservation/options/add
***Input Type***: JSON
***Output Type***: JSON

Request Parameters
-

| Parameters | Data Type | Description | Example |
| --- | --- | --- | --- |
| subnet_id | int | subnet id | 8 |
| mac | string | reservation mac address | "fc:00:ff:ef:ee:ee" |
| options_list | Python List | List of reservation options | \<Options Object List\> |

**NOTE**: The DHCP server is configured in config.ini

\<Options Object List\> Sample::

```json
[
    {
        "always-send": "False",
        "code": 6,
        "csv-format": "True",
        "data": "10.189.4.37, 10.189.4.165",
        "name": "domain-name-servers",
        "space": "dhcp4"
    }
]
```

Response Parameters:
-

| Parameters  | Data Type | Description | Example |
| --- | --- | --- | --- |
| status          | string        | can be KO or OK                                | "OK"                            |
| statusCode      | string        | status code for each error or success          | "9000111000"                    |
| statusValue     | string        | status description corresponding to the code   | "Command execution successful"  |
| data            | JSON          | response data result                           | {'data': true }                 |

Sample Request URL
-

```
http://10.189.4.148:5007/dhcp4/subnets/reservation/options/add
```

Sample Request Object
-

Sample request object is::

```json
{
    "subnet_id": 8,
    "mac": "ec:b0:e1:4c:ab:9f",
    "options_list": [
        {
            "always-send": "False",
            "code": 6,
            "csv-format": "True",
            "data": "10.189.4.37, 10.189.4.165",
            "name": "domain-name-servers",
            "space": "dhcp4"
        }
    ]
}
```

Sample Response Object
-

This is a successful API response. Values may change::

```json
{
    "status": "OK",
    "statusCode": "9000111000",
    "statusValue": "Command execution successful",
    "data": {
        'data': true
    }
}
```

Error Codes
-

| Error Description | Status | Status Code | Status Value | Data |
| --- | --- | --- | --- | --- |
| Unknown Exception | KO | 9000114000 | An exception occured in the server. Command unsuccessful | {'error':\<Exception String\>} |
| Incorrect JSON | KO | 9000114001 | Could not find JSON key | {'error': "Could not find JSON key"} |
| Missing header | KO | 9000114001 | Could not find JSON key | {'error': "Could not find JSON key"} |
| Cannot connect to the server | KO | 9000114018 | "Failed to add subnet reservation option due to an issue with KEA server response" | {'error':Unable to connect to the server at $HOST:$PORT} |
| Cannot fetch the dhcp4 configuration | KO | 9000114018 | "Failed to add subnet reservation option due to an issue with KEA server response" | {'error':Failed to retrieve config from DHCP server at $HOST:$PORT} |
| Cannot fetch subnets from server | KO | 9000114018 | "Failed to add subnet reservation option due to an issue with KEA server response" | {'error':Unable to get subnets from config obtained from server at $HOST:$PORT} |
| Subnet object in configuration is not list | KO | 9000114018 | "Failed to add subnet reservation option due to an issue with KEA server response" | {'error':'Invalid subnet object'} |
| Incorrect Subnet ID | KO | 9000114018 | "Failed to add subnet reservation option due to an issue with KEA server response" | {'error': 'Unable to find the subnet with id $SID from config obtained from server at $HOST:$PORT'}  |
| Error occured while getting subnet | KO | 9000114018 | "Failed to add subnet reservation option due to an issue with KEA server response" | {'error':'Failed to retrieve subnet with id $SID from DHCP server at $HOST:$PORT'}} |
| Cannot find the key 'reservations' | KO | 9000114018 | "Failed to add subnet reservation option due to an issue with KEA server response" | {'error':'Reservation key not found for subnet.'} |
| Reservation not found | KO | 9000114018 | "Failed to add subnet reservation option due to an issue with KEA server response" | {'error':'Specified reservation mac(s) do not exist'} |
| Reservation object is not a list | KO | 9000114018 | "Failed to add subnet reservation option due to an issue with KEA server response" | {'error':'invalid reservation object'}} |
| Options object to add is not a list | KO | 9000114018 | "Failed to add subnet reservation option due to an issue with KEA server response" | {'error':'invalid options object'}} |
| Error occured while updating the config | KO | 9000114018 | "Failed to add subnet reservation option due to an issue with KEA server response" | {'error':'Failed to update DHCP Server config object.'} |
| Error occured while testing config on kea | KO | 9000114018 | "Failed to add subnet reservation option due to an issue with KEA server response" | {'error':'An error occured while trying to check and update the DHCP config object'} |
| Error occured while taking a backup | KO | 9000114018 | "Failed to add subnet reservation option due to an issue with KEA server response" | {'error':'An error occured while trying to take a backup of the DHCP config object'} |
| Error occured while pulling git backup | KO | 9000114018 | "Failed to add subnet reservation option due to an issue with KEA server response" | {'error':'Some error occured during Git Pull. Make sure repository at $LOCALREPO is up to date.'} |
| Error occured while pushing to git | KO | 9000114018 | "Failed to add subnet reservation option due to an issue with KEA server response" | {'error':'Failed to push the file --> $FILENAME to git.'} |
| Options code and option name mismatch | KO | 9000114019 | "Failed to add subnet reservation option" | {'error':"specified option name \<name\> does not match the option definition: 'dhcp4.log-servers'"} |


**012 DHCP4 Delete Subnet Reservation Option**
-

API Information
-

***Function***: endpoints.delete_reserv_option_subnet()
***Description***: remove options from reservation in subnet
***HTTP Method***: POST
***HTTP Application Type***: application/json
***Call***: /dhcp4/subnets/reservation/options/delete 
***Input Type**: JSON
***Output Type**: JSON

Request Parameters
-

| Parameters | Data Type | Description | Example |
| --- | --- | --- | --- |
| subnet_id | int | subnet id | 1 |
| mac | string | reservation mac address | "fc:00:ff:ef:ee:ee" |
| codes | Python List | list of option codes to remove | \<list of codes\> |

**NOTE**: The DHCP server is configured in config.ini

\<list of codes\> sample::

```json
[6,7,8]
```

Response Parameters:
-

| Parameters | Data Type | Description | Example |
| --- | --- | --- | --- |
| status | string | can be KO or OK | "OK" |
| statusCode | string | status code for each error or success | "9000121000" |
| statusValue | string | status description corresponding to the code | "Command execution successful" |
| data | JSON | response data result | {'data': true } |

Sample Request URL
-

```
http://10.189.4.148:5007/dhcp4/subnets/reservation/options/delete
```

Sample Request Object
-

Sample request object is::

```json
{
    "subnet_id": 1,
    "mac": "fc:00:ff:ef:ee:ee",
    "codes": [
        6
    ]
}
```

Sample Response Object
-

This is a successful API response. Values may change::

```json
{
    "status": "OK",
    "statusCode": "9000121000",
    "statusValue": "Command execution successful",
    "data": {
        'data': true
    }
}
```

Error Codes
-

| Error Description | Status | Status Code | Status Value | Data |
| --- | --- | --- | --- | --- |
| Unknown Exception | KO | 9000124000 | An exception occured in the server. Command unsuccessful | {'error':\<Exception String\>} |
| Incorrect JSON | KO | 9000124001 | Could not find JSON key | {'error': "Could not find JSON key"} |
| Missing header | KO | 9000124001 | Could not find JSON key | {'error': "Could not find JSON key"} |
| Cannot connect to the server | KO | 9000124020 | "Failed to remove subnet reservation option due to an issue with KEA server response" | {'error':Unable to connect to the server at $HOST:$PORT} |
| Cannot fetch the dhcp4 configuration | KO | 9000124020 | "Failed to remove subnet reservation option due to an issue with KEA server response" | {'error':Failed to retrieve config from DHCP server at $HOST:$PORT} |
| Cannot fetch subnets from server | KO | 9000124020 | "Failed to remove subnet reservation option due to an issue with KEA server response" | {'error':Unable to get subnets from config obtained from server at $HOST:$PORT} |
| Subnet object in configuration is not list | KO | 9000124020 | "Failed to remove subnet reservation option due to an issue with KEA server response" | {'error':'Invalid subnet object'} |
| Incorrect Subnet ID | KO | 9000124020 | "Failed to remove subnet reservation option due to an issue with KEA server response" | {'error': 'Unable to find the subnet with id $SID from config obtained from server at $HOST:$PORT'} |
| Error occured while getting subnet | KO | 9000124020 | "Failed to remove subnet reservation option due to an issue with KEA server response" | {'error':'Failed to retrieve subnet with id $SID from DHCP server at $HOST:$PORT'}} |
| Cannot find the key 'reservations' | KO | 9000124020 | "Failed to remove subnet reservation option due to an issue with KEA server response" | {'error':'Reservation key not found for subnet.'} |
| Reservation not found | KO | 9000124020 | "Failed to remove subnet reservation option due to an issue with KEA server response" | {'error':'Specified reservation mac(s) do not exist'} |
| Reservation object is not a list | KO | 9000124020 | "Failed to remove subnet reservation option due to an issue with KEA server response" | {'error':'invalid reservation object'}} |
| All Option Codes were not found | KO | 9000124020 | "Failed to remove subnet reservation option due to an issue with KEA server response" | {'error':"Specified option code(s) do not exist"}} |
| Some of the option codes not found | KO | 9000124020 | "Failed to remove subnet reservation option due to an issue with KEA server response" | {'error':'Some of the specified option code(s) do not exist'}} |
| Error occured while updating the config | KO | 9000124020 | "Failed to remove subnet reservation option due to an issue with KEA server response" | {'error':'Failed to update DHCP Server config object.'} |
| Error occured while testing config on kea | KO | 9000124020 | "Failed to remove subnet reservation option due to an issue with KEA server response" | {'error':'An error occured while trying to check and update the DHCP config object'} |
| Error occured while taking a backup | KO | 9000124020 | "Failed to remove subnet reservation option due to an issue with KEA server response" | {'error':'An error occured while trying to take a backup of the DHCP config object'} |
| Error occured while pulling git backup | KO | 9000124020 | "Failed to remove subnet reservation option due to an issue with KEA server response" | {'error':'Some error occured during Git Pull. Make sure repository at $LOCALREPO is up to date.'} |
| Error occured while pushing to git | KO | 9000124020 | "Failed to remove subnet reservation option due to an issue with KEA server response" | {'error':'Failed to push the file --> $FILENAME to git.'} |
