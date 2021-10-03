#!/usr/local/bin/bash
#
# This script starts up ExpertDHCP using Gunicorn

NAME="expertdhcp" # Name of process/daemon
USER=expertdhcp # User account whose permissions will be used to run this daemon
GROUP=expertdhcp # Group account whose permissions will be used to run this daemon
NUM_WORKERS=10 # Number of gunicorn workers to start
NUM_THREADS=2 # Number of gunicorn threads per worker
PROJECT_DIRECTORY=/opt/ExpertDHCP-main # Path of ExpertDHCP project directory
PIDFILE=/opt/ExpertDHCP-main/ # File where process PID will br written
HOST=127.0.0.1 # IP address to listen on
PORT=8007 # Port to which the ExpertDHCP REST service will bind and listen on

# Gunicorn error log file path
GUNICORN_ERROR_LOG=/var/log/expertdhcp/gunicorn-error.log

# Gunicorn access log file path
GUNICORN_ACCESS_LOG=/var/log/expertdhcp/gunicorn-access.log

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
    --pid $PIDFILE \
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