**ExpertDHCP REST Service Installation and Configuration**
-

The ExpertDHCP REST Service should be installed on each host where Kea DHCP
server has been installed.

ExpertDHCP has been installed and tested on hosts running FreeBSD and CentOS 
Linux.

**Prerequisites**
-
  - Python 3.6 or above
  - Supervisord
  - git 

<br />

**Installation Steps**
-
Note: For many of the steps below, you will need to use "**sudo -u expertdhcp**" 
command to execute commands as the "**expertdhcp**" user.

**STEP 1 - Create expertdhcp user**
-

Create a user that will be the owner of the ExpertDHCP files and directories. 
This user will be called "expertdhcp" and will have no login shell.

**Linux**
```
sudo useradd -m -s /sbin/nologin expertdhcp
```

**FreeBSD**
```
pw useradd -n expertdhcp -s /sbin/nologin -d /home/expertdhcp
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

**FreeBSD**

(These instructions are appropriate for FreeBSD 13. Other versions of FreeBSD
might have different package names. To find out the name of the correct
Supervisord package on a given FreeBSD system, run the command 
"pkg search supervisor")

```
pkg install -y py38-supervisor
```

**STEP 3 - Get ExpertDHCP**
-

The ExpertDHCP repository is located at 
https://github.com/CenturyLink/ExpertDHCP and can be cloned using the following 
command.
```
git clone git@github.com:CenturyLink/ExpertDHCP.git
```

The repository should be cloned in a local directory of choice. Usually the 
**/opt** directory works well. This document will assume that the ExpertDHCP 
directory is **/opt/**

Ensure that the "expertdhcp" user created in STEP 1 owns the cloned directory.
This can in general be done by issuing the following command.
```
sudo chown -R expertdhcp:expertdhcp /opt/ExpertDHCP
```

**STEP 4 - Create ExprtDHCP log file directory**
-

Create the "/var/log/expertdhcp" directory and change its owner and group to 
"expertdhcp"
```
mkdir /var/log/expertdhcp
chown expertdhcp:expertdhcp /var/log/expertdhcp
```

**STEP 5 - Install Python Virtual Environment**
-
A Python (3.6 plus) environment is needed to run the ExpertDHCP REST service. 

Generate a new Python virtual environment named "**venv**" in the 
/opt/ExpertDHCP directory.
```
cd /opt/ExpertDHCP
python3 -m venv venv
```

Activate the newly created virtual environment.
```
source ./venv/bin/activate
```

Upgrade pip.
```
sudo pip3 install --upgrade pip
```

Install Python requirements.
```
pip3 install -r requirements.txt
```

Install Gunicorn.
```
pip3 install gunicorn
```

**STEP 6 - Modify ExpertDHCP shell file**
-

The ExpertDHCP shell file "expertdhcp.sh" is meant to be run using Supervisord.
It's path is **/opt/ExpertDHCP/deploy/supervisord/expertdhcp.sh**. This file 
should be modified for each specific deployment. 

The file contains comments on the functionality of each variable. A sample of 
this file is given below. 

```

```

**STEP 7 - Configure supervisord to run ExpertDHCP REST service**
-






