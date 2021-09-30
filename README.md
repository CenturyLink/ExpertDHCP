Expert DHCP is a frontend GUI and accompanying REST service that
works in conjunction with ISC KEA DHCP (https://www.isc.org/kea/, 
https://gitlab.isc.org/isc-projects/kea).

The Expert DHCP REST service can be used to control many aspects of the KEA DHCP
server. In addition, the Expert DHCP frontend GUI makes DHCP provisioning easy 
for administrators.

Expert DHCP facilitates DHCP administrators to control multiple KEA DHCP servers
located in geographically different areas.

<br />

**Architecture Diagram**
![Architecture Diagram](docs/Expert_DHCP_Architecture_Diagram.png)

<br />

**Deployment Example**
![Deployment Diagram](docs/Expert_DHCP_Multi_Location_Deployment_Scenario.png)

<br />

- **General Features**
  - Control geographically redundant KEA DHCP servers from a single WEB UI 
  - Configure subnets, reservations, classes and other aspects of KEA DHCP
    using a web UI
  - Capture DHCP packets for troubleshooting 

<br />

- **REST API Features**
  - Get DHCP configuration
  - Get IP from a given MAC address
  - Get reservations
  - Add reservations
  - Delete reservations
  - Add subnet
  - Delete subnet
  - Modify subnet
  - Add subnet options
  - Delete subnet options
  - Add subnet reservation options
  - Delete subnet reservation options
  - Get leases
  - Add lease
  - Update lease
  - Delete lease
  - Delete all client leases for a subnet
  - Add class
  - Delete class
  - Modify class

  <br />

- **GUI Features**
  - Configure subnets
  - Configure leases
  - Configure client classes
  - DHCPDUMP console (future)
  - RAW REST API console

  <br />
 
- **Platforms**
  - Linux

  <br />

- **Getting Master DHCP**
  - [Documentation](docs/documentation.md)