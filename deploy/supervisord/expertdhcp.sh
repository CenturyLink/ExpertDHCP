#!/usr/local/bin/bash
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
PROJECT_DIRECTORY=/opt/ExpertDHCP-main

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