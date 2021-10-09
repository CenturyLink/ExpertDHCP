from restservice import create_app
#from restservice.config import HOST, PORT

DHCP_APP = create_app()
#DHCP_APP.run(host=HOST, port=PORT)
# If running with gunicorn or systemd file, Comment the DHCP_APP.run() command
