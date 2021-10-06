**Rocky Linux 8.4 - KEA DHCP Installation and Configuration**
-
<br />

Note: This installation assumes that you have Rocky Linux 8.4 already installed
and updated. 

**Versions**
-

Rocky Linux 8.4
```
NAME="Rocky Linux"
VERSION="8.4 (Green Obsidian)"
ID="rocky"
ID_LIKE="rhel centos fedora"
VERSION_ID="8.4"
PLATFORM_ID="platform:el8"
PRETTY_NAME="Rocky Linux 8.4 (Green Obsidian)"
ANSI_COLOR="0;32"
CPE_NAME="cpe:/o:rocky:rocky:8.4:GA"
HOME_URL="https://rockylinux.org/"
BUG_REPORT_URL="https://bugs.rockylinux.org/"
ROCKY_SUPPORT_PRODUCT="Rocky Linux"
ROCKY_SUPPORT_PRODUCT_VERSION="8"
```

Kea DHCP

```
kea.x86_64             1.8.0-2.el8               @epel     
kea-libs.x86_64        1.8.0-2.el8               @epel 
```

<br />

**STEP 1 - Install epel-release**
-

Install the epel-release package using **yum**.

```
sudo yum install epel-release
```


**STEP 2 - Install KEA DHCP server**
-

Install the kea package using **yum**

```
sudo yum install kea
```

**STEP 3 - Configure kea-ctrl-agent.conf file**
-

Ensure that the /etc/kea/kea-ctrl-agent.conf has the following parameters set:

```
.
.
.
"Control-agent": {
    "http-host": "127.0.0.1",
    "http-port": 8080,
.
.
.
```

The "http-port" option allows an admin to change the port on which the HTTP 
control agent will listen. 

The "http-host" option enables the KEA control agent to listen on an IP address.
Setting it to "0.0.0.0" allows the KEA control agent to listen on all IP 
addresses on the host.

There are many other options in this file, which are beyond the scope of this
document.

**STEP 4 - Configure kea-dhcp4.conf file**
-

Configure the /etc/kea/kea-dhcp4.conf file. An explanation of all the parameters
in this file are beyond the scope of this document. A good place to learn about
how this file works, would be https://kb.isc.org/docs/aa-01615 and 
https://kb.isc.org. 

**Kea version 1.8** kea-dhcp4.conf example.
```
[asghar@expertdhcp-rocky-8 ~]$ cat /etc/kea/kea-dhcp4.conf
{
"Dhcp4": {
    "interfaces-config": {
        "interfaces": [ "ens3" ]
    },

    "control-socket": {
        "socket-type": "unix",
        "socket-name": "/tmp/kea4-ctrl-socket"
    },

    "lease-database": {
        "type": "memfile",
        "lfc-interval": 3600
    },

    "expired-leases-processing": {
        "reclaim-timer-wait-time": 10,
        "flush-reclaimed-timer-wait-time": 25,
        "hold-reclaimed-time": 3600,
        "max-reclaim-leases": 100,
        "max-reclaim-time": 250,
        "unwarned-reclaim-cycles": 5
    },

    "renew-timer": 900,
    "rebind-timer": 1800,
    "valid-lifetime": 3600,

    "option-data": [
        {
            "name": "domain-name-servers",
            "data": "192.0.2.1, 192.0.2.2"
        },

        {
            "code": 15,
            "data": "example.org"
        },

        {
            "name": "domain-search",
            "data": "mydomain.example.com, example.com"
        },

        {
            "name": "boot-file-name",
            "data": "EST5EDT4\\,M3.2.0/02:00\\,M11.1.0/02:00"
        },

        {
            "name": "default-ip-ttl",
            "data": "0xf0"
        }
    ],

    "client-classes": [
        {
            "name": "voip",

            "test": "substring(option[60].hex,0,6) == 'Aastra'",

            "next-server": "192.0.2.254",
            "server-hostname": "hal9000",
            "boot-file-name": "/dev/null"

        }
    ],

    "subnet4": [
        {
            "subnet": "192.0.2.0/24",

            "pools": [ { "pool": "192.0.2.1 - 192.0.2.200" } ],

            "option-data": [
                {
                    "name": "routers",
                    "data": "192.0.2.1"
                }
            ],

            "reservations": [
                {
                    "hw-address": "1a:1b:1c:1d:1e:1f",
                    "ip-address": "192.0.2.201"
                },

                {
                    "client-id": "01:11:22:33:44:55:66",
                    "ip-address": "192.0.2.202",
                    "hostname": "special-snowflake"
                },

                {
                    "duid": "01:02:03:04:05",
                    "ip-address": "192.0.2.203",
                    "option-data": [ {
                        "name": "domain-name-servers",
                        "data": "10.1.1.202, 10.1.1.203"
                    } ]
                },

                {
                    "client-id": "01:12:23:34:45:56:67",
                    "ip-address": "192.0.2.204",
                    "option-data": [
                        {
                            "name": "vivso-suboptions",
                            "data": "4491"
                        },
                        {
                            "name": "tftp-servers",
                            "space": "vendor-4491",
                            "data": "10.1.1.202, 10.1.1.203"
                        }
                    ]
                },
                {
                    "client-id": "01:0a:0b:0c:0d:0e:0f",
                    "ip-address": "192.0.2.205",
                    "next-server": "192.0.2.1",
                    "server-hostname": "hal9000",
                    "boot-file-name": "/dev/null"
                },
                {
                    "flex-id": "'s0mEVaLue'",
                    "ip-address": "192.0.2.206"
                }
            ]
        }
    ],

    "loggers": [
    {
        "name": "kea-dhcp4",
        "output_options": [
            {
                "output": "/var/log/kea-dhcp4.log"
            }
        ],
        "severity": "INFO",
        "debuglevel": 0
    }
  ]
}
}
```

The above configurations can be used for testing purposes and the subnet and 
other settings changed as needed.

Note: This document will not cover DHCPv6 configuration. DHCPv6 can be disabled
by setting dhcp6=no in /etc/kea/keactrl.conf. If you run DHCPv6 and have issues
with it, please check the KEA DHCP server documentation.

**STEP 5 - Start keactrl**
-

Start the KEA DHCP server by issuing the following command as super user:

```
keactrl start
````

When the above command is executed, the KEA Control Agent (kea-ctrl-agent), the
KEA DHCP4 (kea-dhcp4) and if enabled, the KEA DHCP6 servers should start.