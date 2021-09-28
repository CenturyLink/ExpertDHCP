class dhcpOptionHandlerFactory(object):
    def __init__(self, dhcp_message_type, maximum_dhcp_msg_size=None,
                 client_identifier=None,
                 server_identifier=None,
                 host_name=None,
                 request_ip_address=None,
                 parameter_request_list=None,
                 vendor_class_identifier=None,
                 ip_address_lease_time=None,
                 routers=None,
                 dns_servers=None,
                 t1=None,
                 t2=None,
                 subnet_mask=None):
        self.__dhcp_message_type = dhcp_message_type
        self.__maximum_dhcp_msg_size = maximum_dhcp_msg_size
        self.__client_identifier = client_identifier
        self.__server_identifier = server_identifier
        self.__host_name = host_name
        self.__request_ip_address = request_ip_address
        self.__parameter_request_list = parameter_request_list
        self.__vendor_class_identifier = vendor_class_identifier
        self.__ip_address_lease_time = ip_address_lease_time
        self.__routers = routers
        self.__dns_servers = dns_servers
        self.__t1 = t1
        self.__t2 = t2
        self.__subnet_mask = subnet_mask

    def __repr__(self):
        return "dhcp_message_type=%s, maximum_dhcp_msg_size = %s, client_identifier=%s, " \
               "host_name=%s, server_identifier=%s, vendor_class_identifier=%s, parameter_request_list=%s, " \
               "request_ip_address=%s, ip_address_lease_time=%s, routers=%s, dns_servers=%s, subnet_mask=%s, " \
               "t1=%s, t2=%s" \
               % (
               self.__dhcp_message_type, self.__maximum_dhcp_msg_size, self.__client_identifier, self.__host_name,
               self.__server_identifier, self.__request_ip_address, self.__parameter_request_list,
               self.__vendor_class_identifier, self.__ip_address_lease_time, self.__routers, self.__dns_servers,
               self.__subnet_mask, self.__t1, self.__t2)

class dhcpNackBuilder(object):
    """
    OPTION:  53 (  1) DHCP message type         6 (DHCPNAK)
    OPTION:  54 (  4) Server identifier         172.28.12.132
    OPTION:  61 (  7) Client-identifier         01:74:87:bb:a3:82:c8
    :return:
    """

    def __init__(self):
        self.__instance = None
        self.reqired_fields = []

    def __call__(self, params):
        self.__instance = dhcpOptionHandlerFactory(
            dhcp_message_type=params.get('DHCP message type', None),
            client_identifier=params.get('Server identifier', None),
            server_identifier=params.get('Client-identifier', None)
        )
        return self.__instance

    def __repr__(self):
        return "DHCP Nack Object: {dhcp_message_type=%s, client_identifier=%s, server_identifier=%s}" % (self.__instance._dhcpOptionHandlerFactory__dhcp_message_type,self.__instance._dhcpOptionHandlerFactory__client_identifier,self.__instance._dhcpOptionHandlerFactory__server_identifier)
    def __str__(self):
        return "DHCPNACK: DHCPMsgType:{} ClientIdentifier:{} ServerIdentifier:{}".format(self.__instance._dhcpOptionHandlerFactory__dhcp_message_type,self.__instance._dhcpOptionHandlerFactory__client_identifier,self.__instance._dhcpOptionHandlerFactory__server_identifier)

    @property
    def required_fields(self):
        return ['DHCP message type', 'Server identifier', 'Client-identifier']


class dhcpDiscoverBuilder(object):
    """
    OPTION:  53 (  1) DHCP message type         1 (DHCPDISCOVER)
    OPTION:  61 (  7) Client-identifier         01:f0:92:1c:19:ed:9e
    OPTION:  12 ( 15) Host name                 HYPV02DSERV001
    OPTION:  55 ( 15) Parameter Request List      1 (Subnet mask)
                                                  2 (Time offset)
                                                  3 (Routers)
                                                  4 (Time server)
                                                  6 (DNS server)
                                                 15 (Domainname)
                                                 28 (Broadcast address)
                                                 33 (Static route)
                                                 42 (NTP servers)
                                                 43 (Vendor specific info)
                                                 44 (NetBIOS name server)
                                                 58 (T1)
                                                 59 (T2)
                                                100 (Printer Name)
                                                101 (MDHCP)

    """

    def __init__(self):
        self.__instance = None

    def __call__(self, params):
        self.__instance = dhcpOptionHandlerFactory(
            dhcp_message_type=params.get('DHCP message type', None),
            client_identifier=params.get('Client-identifier', None),
            host_name=params.get('Host name', None),
            vendor_class_identifier=params.get('Vendor class identifier', None),
            parameter_request_list=params.get('Parameter Request List', None)
        )
        return self.__instance

    @property
    def required_fields(self):
        return ['DHCP message type', 'Client-identifier', 'Host name', 'Vendor class identifier',
                'Parameter Request List']
    def __repr__(self):
        return "DHCP Discover Object: dhcp_message_type=%s, client_identifier=%s, host_name=%s, " \
               "vendor_class_identifier=%s , parameter_request_list=%s"\
               % (self.__instance._dhcpOptionHandlerFactory__dhcp_message_type,
                  self.__instance._dhcpOptionHandlerFactory__client_identifier,
                  self.__instance._dhcpOptionHandlerFactory__host_name,
                  self.__instance._dhcpOptionHandlerFactory__vendor_class_identifier,
                  self.__instance._dhcpOptionHandlerFactory__parameter_request_list)
    def __str__(self):
        return "DHCPDISCOVER: DHCPMsgType:{} ClientIdentifier:{} HostName:{} VendorClassIdentifier:{}" \
               "ParameterRequestList:{}".format(self.__instance._dhcpOptionHandlerFactory__dhcp_message_type,
                  self.__instance._dhcpOptionHandlerFactory__client_identifier,
                  self.__instance._dhcpOptionHandlerFactory__host_name,
                  self.__instance._dhcpOptionHandlerFactory__vendor_class_identifier,
                  self.__instance._dhcpOptionHandlerFactory__parameter_request_list)



class dhcpRequestBuilder(object):
    """
    OPTION:  53 (  1) DHCP message type         3 (DHCPREQUEST)
    OPTION:  50 (  4) Request IP address        10.240.129.148
    OPTION:  55 ( 15) Parameter Request List      1 (Subnet mask)
                                                  2 (Time offset)
                                                  3 (Routers)
                                                  6 (DNS server)
                                                  7 (Log server)
                                                 12 (Host name)
                                                 15 (Domainname)
                                                 28 (Broadcast address)
                                                 42 (NTP servers)
                                                 51 (IP address leasetime)
                                                 54 (Server identifier)
                                                 66 (TFTP server name)
                                                 67 (Bootfile name)
                                                125 (???)
                                                 53 (DHCP message type)

    OPTION:  57 (  2) Maximum DHCP message size 576
    OPTION:  60 ( 12) Vendor class identifier   ciena.cn3906
    OPTION:  61 (  7) Client-identifier         01:c4:83:6f:80:54:30

    """

    def __init__(self):
        self.__instance = None

    def __call__(self, params):
        self.__instance = dhcpOptionHandlerFactory(
            dhcp_message_type=params.get('DHCP message type', None),
            maximum_dhcp_msg_size=params.get('Maximum DHCP message size', None),
            client_identifier=params.get('Client-identifier', None),
            request_ip_address=params.get('Request IP address', None),
            vendor_class_identifier=params.get('Vendor class identifier', None),
            parameter_request_list=params.get('Parameter Request List', None)
        )
        return self.__instance

    @property
    def required_fields(self):
        return ['DHCP message type', 'Maximum DHCP message size', 'Client-identifier', 'Parameter Request List',
                'Vendor class identifier', 'Request IP address']


class dhcpAckBuilder():
    """
      TIME: 04:02:51.628899
        IP: > (0c:c4:7a:51:5d:44) >  (78:19:f7:86:5b:89)
    OP: 2 (BOOTPREPLY)
     HTYPE: 1 (Ethernet)
      HLEN: 6
      HOPS: 1
       XID: 171507d1
      SECS: 0
     FLAGS: 7f80
    CIADDR: 0.0.0.0
    YIADDR: 10.189.137.245
    SIADDR: 0.0.0.0
    GIADDR: 10.189.137.1
    CHADDR: 44:aa:50:c0:d7:01:00:00:00:00:00:00:00:00:00:00
     SNAME: .
     FNAME: .
    OPTION:   1 (  4) Subnet mask               255.255.255.0
    OPTION:   3 (  4) Routers                   10.189.137.1
    OPTION:   6 (  8) DNS server                10.189.136.37,10.189.136.165
    OPTION:  12 ( 12) Host name                 TA3717080095
    OPTION:  51 (  4) IP address leasetime      3600 (60m)
    OPTION:  53 (  1) DHCP message type         5 (DHCPACK)
    OPTION:  54 (  4) Server identifier         172.28.12.132
    OPTION:  58 (  4) T1                        900 (15m)
    OPTION:  59 (  4) T2                        1800 (30m)

    Option                    DHCPOFFER    DHCPACK            DHCPNAK
    ------                    ---------    -------            -------
    Requested IP address      MUST NOT     MUST NOT           MUST NOT
    IP address lease time     MUST         MUST (DHCPREQUEST) MUST NOT
                                           MUST NOT (DHCPINFORM)
    Use 'file'/'sname' fields MAY          MAY                MUST NOT
    DHCP message type         DHCPOFFER    DHCPACK            DHCPNAK
    Parameter request list    MUST NOT     MUST NOT           MUST NOT
    Message                   SHOULD       SHOULD             SHOULD
    Client identifier         MUST NOT     MUST NOT           MAY
    Vendor class identifier   MAY          MAY                MAY
    Server identifier         MUST         MUST               MUST
    Maximum message size      MUST NOT     MUST NOT           MUST NOT
    All others                MAY          MAY                MUST NOT
    """

    def __init__(self):
        self.__instance = None

    def __call__(self, params):
        self.__instance = dhcpOptionHandlerFactory(
            dhcp_message_type=params.get('DHCP message type', None),
            subnet_mask=params.get('Subnet mask', None),
            ip_address_lease_time=params.get('IP address leasetime', None),
            routers=params.get('Routers', None),
            dns_servers=params.get('DNS server', None),
            server_identifier=params.get('Server identifier', None),
            host_name=params.get('Host name', None),
            t1=params.get('T1', None),
            t2=params.get('T2', None)
        )
        return self.__instance

    @property
    def required_fields(self):
        # look at file_or_sname
        return ['DHCP message type', 'IP address leasetime', 'file_or_sname', 'Routers',
                'DNS server', 'Host name ', 'Server identifier', 'T1', 'T2']

class dhcpOfferBuilder(object):
    """
    TIME: 07:03:16.200649
    IP: > (0c:c4:7a:51:5d:44) >  (00:1f:12:37:1f:41)
    OP: 2 (BOOTPREPLY)
     HTYPE: 1 (Ethernet)
      HLEN: 6
      HOPS: 0
       XID: 23561d98
      SECS: 0
     FLAGS: 7f80
    CIADDR: 0.0.0.0
    YIADDR: 172.28.12.245
    SIADDR: 0.0.0.0
    GIADDR: 0.0.0.0
    CHADDR: 00:1f:12:37:1f:41:00:00:00:00:00:00:00:00:00:00
     SNAME: .
     FNAME: .
    OPTION:   1 (  4) Subnet mask               255.255.255.0
    OPTION:   3 (  4) Routers                   172.28.12.1
    OPTION:   6 (  8) DNS server                10.189.136.37,10.189.136.165
    OPTION:  51 (  4) IP address leasetime      3600 (60m)
    OPTION:  53 (  1) DHCP message type         2 (DHCPOFFER)
    OPTION:  54 (  4) Server identifier         172.28.12.132
    OPTION:  58 (  4) T1                        900 (15m)
    OPTION:  59 (  4) T2                        1800 (30m)
    """
    def __init__(self):
        self.__instance = None

    def __call__(self, params):
        self.__instance = dhcpOptionHandlerFactory(
            dhcp_message_type=params.get('DHCP message type', None),
            subnet_mask=params.get('Subnet mask', None),
            routers=params.get('Routers', None),
            dns_servers=params.get('DNS server', None),
            ip_address_lease_time=params.get('IP address leasetime', None),
            server_identifier=params.get('Server identifier', None),
            t1=params.get('T1', None),
            t2=params.get('T2', None)
        )
        return self.__instance

class ObjectFactory:
    def __init__(self):
        self._builders = {}

    def register_builder(self, key, builder):
        self._builders[key] = builder

    def create(self, key, params):
        builder = self._builders.get(key)
        if not builder:
            raise ValueError(key)
        return builder(params)[ayush@dev-dhcp-server ~]$ 
