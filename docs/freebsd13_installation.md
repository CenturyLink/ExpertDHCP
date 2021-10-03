**FreeBSD 13 - KEA DHCP Installation and Configuration**
-
<br />

Note: This installation assumes that you have FreeBSD 13 already installed and 
updated.

**Versions**
-

FreeBSD 13
```
NAME=FreeBSD
VERSION=13.0-RELEASE
VERSION_ID=13.0
ID=freebsd
ANSI_COLOR="0;31"
PRETTY_NAME="FreeBSD 13.0-RELEASE"
CPE_NAME=cpe:/o:freebsd:freebsd:13.0
HOME_URL=https://FreeBSD.org/
BUG_REPORT_URL=https://bugs.FreeBSD.org/
```

Kea DHCP
```
kea-1.8.2_1                    Alternative DHCP implementation by ISC
```

<br />

**STEP 1 - Install KEA DHCP server**
-

Install the kea package using **pkg**

```
sudo pkg install kea
```
**STEP 2 - Configure kea-ctrl-agent.conf file**
-

Ensure that the /usr/local/etc/kea/kea-ctrl-agent.conf has the following 
parameters set:

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

Configure the /usr/local/etc/kea/kea-dhcp4.conf file. An explanation of all the
parameters in this file are beyond the scope of this document. A good place to 
learn about how this file works, would be https://kb.isc.org/docs/aa-01615 and 
https://kb.isc.org. 

Below, a sample configuration for a single subnet is given. 

```
{
"Dhcp4": {
    "interfaces-config": {
        "interfaces": [ "ens4" ]
    },

    "control-socket": {
        "socket-type": "unix",
        "socket-name": "/tmp/kea-dhcp4-ctrl.sock"
    },

    "lease-database": {
        // Memfile is the simplest and easiest backend to use. It's a in-memory
        // C++ database that stores its state in CSV file.
        "type": "memfile",
        "lfc-interval": 3600,
        "name": "/var/lib/kea/dhcp4.leases"
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
            "data": "10.10.10.2"
        }
    ],
    //"client-classes": [{}],

    "subnet4": [
        {
            "subnet": "10.10.10.0/24",
            "pools": [ { "pool": "10.10.10.200 - 10.10.10.254" } ],
            "option-data": [
                {
                    "name": "routers",
                    "data": "10.10.10.1"
                }
            ],

            "reservations": [ ]
        }
    ],

    "loggers": [
    {
        "name": "kea-dhcp4",
        "output_options": [
            {
                "output": "/var/log/kea-dhcp4.log",
                "flush": true,
                "maxsize": 1048576,
                "maxver": 99
            }
        ],
        // This specifies the severity of log messages to keep. Supported values
        // are: FATAL, ERROR, WARN, INFO, DEBUG
        "severity": "DEBUG",

        // If DEBUG level is specified, this value is used. 0 is least verbose,
        // 99 is most verbose. Be cautious, Kea can generate lots and lots
        // of logs if told to do so.
        "debuglevel": 10 
    }
  ]
}
}
```

The above configuration can be used for testing purposes and the subnet and 
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
KEA DHCP4 (kea-dhcp4) and (if enabled), the KEA DHCP6 servers should start.