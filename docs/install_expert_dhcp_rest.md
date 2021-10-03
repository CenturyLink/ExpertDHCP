**ExpertDHCP REST Service Installation and Configuration**
-

The ExpertDHCP REST Service should be installed on each host where Kea DHCP
server has been installed.

ExpertDHCP has been installed and tested on hosts running FreeBSD and CentOS 
Linux.

**Prerequisites**
  - Python 3.6 or above
  - Supervisord

<br />

**STEP 1 - Create expertdhcp user**

Create a user that will be the owner of the ExpertDHCP files and directories. 
This user will be called "expertdhcp" and will have no login shell.

Linux
```
sudo useradd -m -s /sbin/nologin expertdhcp
```

FreeBSD
```
pw useradd -n expertdhcp -s /sbin/nologin -d /home/expertdhcp
```

Use the above system specific command to create the "expertdhcp" user.

<br />

**STEP 2 - Install supervisord**

Supervisord is a process control system that can be use to control Python 
programs. It needs to be installed in order to control ExpertDHCP. Use the steps
given below to install Supervisord.

Linux


(Ensure that "epel-release" is installed on CentOS based systems.)

```
sudo yum install supervisor
```

FreeBSD

(These instructions are appropriate for FreeBSD 13. Other versions of FreeBSD
might have different package names. To find out the name of the correct
Supervisord package on a given FreeBSD system, run the command 
"pkg search supervisor")

```
pkg install -y py38-supervisor
```

**STEP 1 - Acquire ExpertDHCP**

The ExpertDHCP repository is located at https://github.com/CenturyLink/ExpertDHCP
and can be cloned using the following command.
```
git clone git@github.com:CenturyLink/ExpertDHCP.git
```

The repository should be cloned in a local directory of choice. Usually the 
**/opt** directory works well.




