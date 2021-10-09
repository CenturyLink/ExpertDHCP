**ExpertDHCP REST Service Installation and Configuration**
-

The ExpertDHCP REST Service should be installed on each host where Kea DHCP
server has been installed.

ExpertDHCP has been installed and tested on hosts running FreeBSD and CentOS 
Linux.

<br />

**Prerequisites**
-
  - Python 3.6 or above
  - Supervisord
  - git 
  - Nginx

<br />

**Installation Steps**
-
Note: For many of the steps below, you will need to use "**sudo -u expertdhcp**" 
command to execute commands as the "**expertdhcp**" user.

<br />

**STEP 1 - Create expertdhcp user**
-

Create a user that will be the owner of the ExpertDHCP files and directories. 
This user will be called "expertdhcp" and will have no login shell.

**Linux**
```
sudo useradd -m -s /sbin/nologin expertdhcp
```

**FreeBSD**
Create the user and set a secure password. Once setup is complete, the 
ExpertDHCP user account can be locked.

```
pw useradd -n expertdhcp -m -d /home/expertdhcp -s /bin/sh 
passwd expertdhcp 
```

Use the above system specific command to create the "expertdhcp" user.

<br />

**STEP 2 - Install Supervisord**
-

Supervisord is a process control system that can be use to control Python 
programs. It needs to be installed in order to control ExpertDHCP REST service. 
Use the steps given below to install Supervisord.

**Linux**

(Ensure that "epel-release" is installed on CentOS based systems.)

```
sudo yum install supervisor
```

Once Supervisord has been installed it needs to be enabled and started using the
following command.
```
sudo systemctl enable supervisord
sudo systemctl start supervisord
```

**FreeBSD**

(These instructions are appropriate for FreeBSD 13. Other versions of FreeBSD
might have different package names. To find out the name of the correct
Supervisord package on a given FreeBSD system, run the command 
"pkg search supervisor")

```
pkg install -y py38-supervisor
```

Enable Supervisord in /etc/rc.conf.
```
echo 'supervisord_enable="YES"' | sudo tee -a /etc/rc.conf
```

Start Supervisord.
```
sudo service supervisord start
```

<br />

**STEP 3 - Get ExpertDHCP**
-

The ExpertDHCP repository is located at 
https://github.com/CenturyLink/ExpertDHCP and can be cloned using the following 
command.
```
cd /opt
git clone git@github.com:CenturyLink/ExpertDHCP.git
```

The repository should be cloned in a local directory of choice. Usually the 
**/opt** directory works well. This document will assume that the ExpertDHCP 
directory is **/opt/**. If the **/opt** directory doesnt exist (on FreeBSD 
systems, /opt does not exist by default), then it can be created. Any other 
convenient location can also be used to install ExpertDHCP REST service. 
Instructions in this document will assume that **/opt/ExpertDHCP** will be the
installation directory for ExpertDHCP REST service.

Ensure that the "expertdhcp" user created in STEP 1 owns the cloned directory.
This can in general be done by issuing the following command.
```
sudo chown -R expertdhcp:expertdhcp /opt/ExpertDHCP
```

<br />

**STEP 4 - Create ExprtDHCP log file directory**
-

Create the "/var/log/expertdhcp" directory and change its owner and group to 
"expertdhcp"
```
sudo mkdir /var/log/expertdhcp
sudo chown expertdhcp:expertdhcp /var/log/expertdhcp
```

<br />

**STEP 5 - Install Python Virtual Environment and its components**
-

A Python (3.6 plus) environment is needed to run the ExpertDHCP REST service. 

Generate a new Python virtual environment named "**venv**" in the 
/opt/ExpertDHCP directory. Note: You may need to switch to the **"expertdhcp"**
user to complete the instructions below.

```
cd /opt/ExpertDHCP
python3 -m venv venv
```

Activate the newly created virtual environment.
```
source ./venv/bin/activate
```

If the **source** command is not available, an alternative is the use of the following notation.
```
. ./venv/bin/activate
```

Upgrade pip.
```
pip3 install --upgrade pip
```

Install Python requirements.
```
pip3 install -r requirements.txt
```

Install Gunicorn.
```
pip3 install gunicorn
```

<br />

**STEP 6 - Modify ExpertDHCP shell file**
-

The ExpertDHCP shell file "expertdhcp.sh" is meant to be run using Supervisord.
It's path is **ExpertDHCP/deploy/supervisord/expertdhcp.sh**. This file 
should be modified for each specific deployment. 

The file contains comments on the functionality of each variable. A sample of 
this file is given below. 

```
#!/bin/sh
#
# This script starts up ExpertDHCP using Gunicorn.

# Name of the process as run by Gunicorn.
NAME="expertdhcp"

# User whose permissions the daemon will run with.
USER=expertdhcp 

# Group whose permissions the daemon will run with.
GROUP=expertdhcp

# Number of Gunicorn worker processes to spawn.
NUM_WORKERS=5

# Number of threads per worker.
NUM_THREADS=2

# Path of directory where the ExpertDHCP is located.
PROJECT_DIRECTORY=/opt/ExpertDHCP

# IP address on which to listen. This should be left as localhost, and a front
# facing proxy such as Nginx should be used on the public interface.
HOST=127.0.0.1

# Port to which the ExpertDHCP process will bind to.
PORT=8007

# Location of the Gunicorn error log file
GUNICORN_ERROR_LOG=/var/log/expertdhcp/gunicorn-error.log

# Location of the Gunicorn access log file
GUNICORN_ACCESS_LOG=/var/log/expertdhcp/gunicorn-access.log

# Location of the Gunicorn executable
GUNICORN_DIRECTORY=$PROJECT_DIRECTORY/venv/

# Python path
PYTHONPATH=$GUNICORN_DIRECTORY

# Change to project directory 
cd  $PROJECT_DIRECTORY
if [ $? -ne 0 ]; then
    echo "{\"status\":\"failed\""
    echo ",\"message\":\"Could not change directory\"}"
    exit
fi

# Activate Python virtual environment
source ./venv/bin/activate
if [ $? -ne 0 ]; then
    echo "{\"status\":\"failed\""
    echo ",\"message\":\"Could not activate virtual env\"}"
    exit
fi

# Export Python path
export PYTHONPATH=$GUNICORN_DIRECTORY:$PYTHONPATH

# Create the run directory if it doesn't exist
RUNDIR=$(dirname $PIDFILE)
test -d $RUNDIR || mkdir -p $RUNDIR
if [ $? -ne 0 ]; then
    echo "{\"status\":\"failed\""
    echo ",\"message\":\"Could not handle run dir\"}"
    exit
fi

# Start ExportDHCP using Gunicorn
exec ./venv/bin/gunicorn \
    --name $NAME \
    --user=$USER \
    --group=$GROUP \
    --bind $HOST:$PORT \
    --error-logfile $GUNICORN_ERROR_LOG \
    --access-logfile $GUNICORN_ACCESS_LOG \
    --workers=$NUM_WORKERS \
    --threads=$NUM_THREADS \
    run:DHCP_APP

# Check if process started correctly and print relevant information
echo "$?"

if [ $? -ne 0 ]; then
    echo "{\"status\":\"failed\""
    echo ",\"message\":\"Could not start Gunicorn\"}"
    exit
else
    echo "{\"status\":\"success\""
    echo ",\"message\":\"fastverification started successfully\"}"
fi
```

Although the above file is expected to work as is, in some install environments,
 modifications to the above file may be necessary.

The location of the bash shell in the above script should be changed if 
necessary.

Make the **expertdhcp.sh** file executable using the following command.
```
chmod +x /opt/ExpertDHCP/deploy/supervisord/expertdhcp.sh
```

<br />

**STEP 7 - Configure expert DHCP**
-

Configure ExpertDHCP REST service behavior by modifying the ExpertDHCP
configuration file located at **ExpertDHCP/restservice/conf/config.ini**. A 
sample of the file containing explanatory comments is given here and it should 
be modified to suit the local environment.

```
[EXPERTDHCP]
# Service code that will be returned in JSON replies. This can be used by 
# other programs to identify ExpertDHCP.
SERVICE_CODE=900
# Enable API authentication. Setting to 'true' enables API authentication.
REQUIRE_API_AUTHENTICATION=true

[KEA_DHCP]
# A URL string that is used to format DHCP IP and port. This should be left as
# is for now.
DHCP_URL=http://{}:{}/provision/

# IP address of the DHCP server. 
DHCP_IP=127.0.0.1

# TCP port on which the Kea DHCP is listening. This corresponds to the port 
# number defined in the kea-ctrl-agent.conf file for the Kea DHCP server.
PORT=8080

[AUTH]
# Path to file containing authorization keys. All auth keys should be defined in
# here. The format of this file is as follows:
#
# API Key, isValid
# key1,True
# key2,True
# 
# Ideally the keys should be 32 alphanumeric characters long. If the isValid 
# flag is set to true, then the key will be valid. If set to false, then the 
# key is considered invalid

API_KEYS_CSV=../apikeys.csv

[GIT_BACKUP]
# Git functionality will be implemented in a future release. This section can 
# be ignored and left as is

GIT_ASK_PASS=/ExpertDHCP/restservice/git_pass.py
GIT_USERNAME=someuser
GIT_PASSWORD=somepassword
GIT_LINK=https://{}@git.example.com/dhcpbackuprepository.git
BACKUP_REPOSITORY_NAME=dhcpbackuprepository/
BACKUP_FOLDER=expertdhcp/
PULL_SUCCESS_MESSAGE=Already up to date.
BACKUP_CONFIG=
GIT_BACKUP=
KEA_SERVER_BACKUP=
BACKUP_CONFIG_PATH=/usr/local/etc/kea/Archives/
COMMIT_MESSAGE=Config Backup saved at {} on {}

[LOGGER]
# Path to ExpertDHCP REST service log file
LOG_FILE_NAME=/var/log/expertdhcp/expertdhcp.log

# Maximum log file size
LOG_FILE_MAX_SIZE_MB = 200

# Number of backed up log files to keep
LOG_FILE_BACKUP_COUNT = 5

# Logging level
LOG_LEVEL=DEBUG
```

Create the **apikeys.csv** file with the format given above. Ensure that the 
API keys file is unreadable by any user other than the **expertdhcp** user. 
Change the **API_KEYS_CSV** variable in the 
**ExpertDHCP/restservice/conf/config.ini** file to reflect the location of this
file. This should be the full path to the **apikeys.csv** file.
<br />


**STEP 8 - Configure supervisord to run ExpertDHCP REST service**
-

Add the following lines to the end of Supervisord to enable control of the 
ExpertDHCP program.

```
[program:expertdhcp]
command=/opt/ExpertDHCP/deploy/supervisord/expertdhcp.sh
process_name=%(program_name)s
numprocs=1
```

Once the ExpertDHCP entry has been made, start the ExpertDHCP REST service 
issuing the following command.

```
sudo supervisorctl reload
```

To check status of programs controlled by Supervisord use the following command.
```
sudo supervisorctl status all
```

The above command will show the status of all programs controlled by 
Supervisord.

<br />

**STEP 9 - Configure and start Nginx as HTTP proxy**
-

This document assumes that Nginx is already installed. For Linux, SELinux should
be set to permissive. If there is a firewall restricting connections to the 
**TCP 5007** (default) port, then it should be opened.

Add the following server clause to the Nginx configuration file and restart
the Nginx process.

```
server {
    listen	5007;
    location /dhcp4/ {
        proxy_pass http://127.0.0.1:8007;
    }
}
```

It is highly recommended that HTTPS be enable for any external facing 
production service.  For security, SSL/TLS certificates can be installed for 
Nginx. This is a highly recommended practice for production deployments. Please 
see Nginx documentation for more information

Nginx should be restarted afer adding the server clause. Note: for Linux SE 
Linux should be set to **permissive**.

<br />

**STEP 10 - Allow firewall acces to ExpertDHCP REST service port**
-

Default configuration asks for port 5007 to be open for external clients to 
connect to the ExpertDHCP REST service. A sample Linux FirewallD rule is given 
below to allow clients to connect to port 5007.
```
sudo firewall-cmd --zone=public --add-port=5007/tcp --permanent
sudo firewall-cmd --reload
```

For FreeBSD, the commands will depend on which firewall is being used.


**STEP 11 - Test if the system is working**
-

Use curl or another HTTP client to check if the ExpertDHCP is working correctly.

The following command will allow the admin to check the status of the ExpertDHCP
REST service functioning.

```
$ curl http://172.16.0.86:5007/dhcp4/

{"status": "OK", "statusCode": "9000011000", "statusValue": "Command execution successful", "data": {"data": "DHCP Management server is up and running"}}
```

**Troubleshooting**

For troubleshooting, run the **ExpertDHCP/deploy/supervisord/expertdhcp.sh** 
file manually. This will show any problems that the service might be 
experiencing.

Gunicorn log files will be available in /var/log/expertdhcp and the ExpertDHCP
REST service log file will be available in the path configured in the 
ExpertDHCP/restservice/config.ini file.