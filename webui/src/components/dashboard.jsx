import React, { Component } from "react";
import { Segment, Label, Statistic, Loader, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import Chart from "react-google-charts";
import ChartDiagram from "./common/chartDiagram";
import { getPallete, getVendorCharColors } from "../services/utilityService";
import { lookupMAC } from "./../store/dashboard";
import { getServerStats } from "./../store/labs";
import { getAllServers } from "../services/serverService";

const colors = getVendorCharColors();

class Dashboard extends Component {
  state = {
    loaded: false, // either Subnets or Leases loaded
    dashboardReady: false, // Dashboard processing complete
    macVendors: [], // MAC Vendor List
    SubnetStats: [], // Subnet Stats to display
    dashboard: {}, // All the dashboard statitics to display
    leasesLoadSuccess: true, // to stop the loader
    hasValidApikey: this.props.configs.currentServerApiKey? true: false,
  };

  componentWillMount = async () => {
    try {
      this.getServersStatus();
      this.setState({
        serverStatus: this.props.serverStatus,
      });
    } catch (error) {
      console.error("Error in mount", error);
    }
    this.setState({ macVendors: this.createMacVendors() });
    this.prepareDashboard();
  };

  getServersStatus = () => {
    console.log("Getting server status");
    const labs = [...this.props.labs.list];
    const servers = getAllServers(labs);
    console.log("SERVERS---", servers);
    this.props.getServerStatus(servers);
  };

  componentDidUpdate = (prevProps) => {
    if (
      this.props.dashboard.leasesLoaded !== prevProps.dashboard.leasesLoaded
    ) {
      if (this.props.dashboard.leasesLoaded) {
        if (!this.props.dashboard.leasesLoadSuccess)
          this.setState({ leasesLoadSuccess: false });
      }
    }
    if (
      this.props.dashboard.subnetLoadSuccess !==
      prevProps.dashboard.subnetLoadSuccess
    ) {
      if (this.props.dashboard.subnetLoadSuccess)
        this.setState({ subnetLoadSuccess: false });
    }
    if (
      this.props.dashboard.leasesLoadSuccess !==
      prevProps.dashboard.leasesLoadSuccess
    ) {
      const { leasesLoadSuccess, leases } = this.props.dashboard;
      if (leasesLoadSuccess) {
        console.log("Looking for Vendors", leases);
        this.props.lookupMAC(leases);
        this.prepareDashboard();
      }
    }
    if (this.props.dashboard !== prevProps.dashboard) {
      try {
        this.setState({
          macVendors: this.createMacVendors(),
          dashboardReady: !this.props.dashboard.processing,
          loaded: this.props.dashboard.loaded,
          dashboard: {},
        });
        this.prepareDashboard();
      } catch (error) {
        console.error("Exception componentDidUpdate", error);
      }
    }
  };

  getPools = (pools) => {
    let poolList = [];
    try {
      for (let pool of pools) {
        if ("pool" in pool) {
          poolList.push(pool["pool"]);
        }
      }
      return poolList;
    } catch (error) {
      console.error("Exception in getPools", error);
      return [];
    }
  };

  createSubnetLeases = () => {
    const { leases, subnets } = this.props.dashboard;
    let SubnetStats = [];

    try {
      for (let subnet of subnets) {
        let SubnetStat = {};

        if (subnet.id in leases) {
          SubnetStat["activeLeases"] = leases[subnet.id].length;
        } else SubnetStat["activeLeases"] = 0;

        SubnetStat["pools"] = this.getPools(subnet["pools"]);
        SubnetStats.push(SubnetStat);
      }
      return SubnetStats;
    } catch (error) {
      console.error("Exception createSubnetLeases", error);
      return [];
    }
  };

  createMacVendors = () => {
    let mv = [["Vendor", "Count"]];
    let temp = {};

    try {
      for (const [key, value] of Object.entries(
        this.props.dashboard.macVendors
      )) {
        if (value in temp) {
          temp[value] += 1;
        } else {
          temp[value] = 1;
        }
      }

      for (const [key, value] of Object.entries(temp)) {
        mv.push([key, value]);
      }
    } catch (error) {
      console.error("Exception in createMacVendors", error);
    }
    return mv;
  };

  getIpfromId = (id) => {
    try {
      let subnet;
      if (this.props.dashboard && this.props.dashboard.subnets)
        subnet = this.props.dashboard.subnets.find((sub) => sub.id == id);
      return subnet ? subnet.subnet : "unknown";
    } catch (error) {
      console.error("Exception in Dashboard [createMacVendors]", error);
      return "unknown";
    }
  };

  getRandomColor = () => {
    let item = colors[Math.floor(Math.random() * colors.length)];
    return item;
  };

  prepareDashboard = () => {
    const { dashboard, labs } = this.props;
    let dashLabs = {};

    try {
      for (const [key, value] of Object.entries(labs.list)) {
        if (value.servers) dashLabs[value.text] = value.servers.length;
        else dashLabs[value.text] = 0;
      }
      const currentLab = labs.currentLab.text;

      let subnetCount = 0;
      if (dashboard.subnets) subnetCount = dashboard.subnets.length;

      let totalLeases = 0;
      let subnetwiseLeases = [];
      subnetwiseLeases.push([
        "Subnet",
        "Total IP Addresses",
        "Available IP Addresses",
        "Allocated Leases",
      ]);
      let name, available, allocated, total;
      for (const [key, value] of Object.entries(dashboard.subnetPools)) {
        name = this.getIpfromId(key) + " [" + key + "]";
        total = 0;
        for (let pl of value) {
          totalLeases += pl.count;
          total += pl.count;
        }
        allocated = dashboard.subnetLeases[key]
          ? dashboard.subnetLeases[key].length
          : 0;
        available = total - allocated;
        subnetwiseLeases.push([name, total, available, allocated]);
      }

      let allocatedLeases = 0;
      if (dashboard.leases) allocatedLeases = dashboard.leases.length;

      let availableLeases = 0;
      if (dashboard.leases.length > 0 && totalLeases >= allocatedLeases)
        availableLeases = totalLeases - allocatedLeases;

      let macVendorCount = {};

      let macV = this.createMacVendors();
      for (let mv of macV.slice(1)) {
        macVendorCount[mv[0]] = mv[1];
      }

      const dash = {
        labs: dashLabs,
        currentLab: currentLab,
        server: {
          name: labs.currentServer.title,
          ip: labs.currentServer.ip,
          port: labs.currentServer.port,
          subnets: subnetCount,
          totalLeases: totalLeases,
          allocatedLeases: allocatedLeases,
          availableLeases: availableLeases,
          macVendorCount: macVendorCount,
          subnetwiseLeases: subnetwiseLeases,
        },
      };

      this.setState({ dashboard: dash });
    } catch (error) {
      console.error("Exception in prepareDashboard", error);
      this.setState({ dashboard: {} });
    }
  };

  serverTable = () => {
    const labs = [...this.props.labs.list];
    const servers = getAllServers(labs);

    let serverList = [["IP", "Status", "Name", "Lab"]];

    for (let server of servers) {
      serverList.push([
        server.ip,
        { v: this.props.serverStatus[server.ip] ? 1 : -1, f: "" },
        server.title,
        server.location,
      ]);
    }

    return serverList;
  };

  splitString = (input) => {
    var len = 10;
    var curr = len;
    var prev = 0;

    let output = [];
    try {
      while (input[curr]) {
        if (input[curr++] === " ") {
          output.push(input.substring(prev, curr));
          prev = curr;
          curr += len;
        }
      }
      output.push(input.substr(prev));
    } catch (error) {
      console.error("Exception in splitString", error);
    }
    return output;
  };
  renderLoader = () => {
    return (
      <>
        <br />
        <br />
        <br />
        <br />

        <Loader active inline="centered" size="large" />
      </>
    );
  };

  renderGrowingSpinner = () => {
    return (
      <div className="container">
        <div className="row"></div>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <div className="spinner-grow text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-danger" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-dark" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  renderSmallLoader = () => {
    return (
      <>
        <Loader active inline="centered" size="large" />
      </>
    );
  };

  createLeaseStatus = () => {
    let leaseStatus = [["Leases", "Count"]];

    const { server } = this.state.dashboard;

    try {
      leaseStatus.push(["Available IP Addresses", server.availableLeases]);
      leaseStatus.push(["Allocated Leases", server.allocatedLeases]);
    } catch (error) {
      console.error("Exception in createLeaseStatus", error);
      leaseStatus = [["Leases", "Count"]];
    }
    return leaseStatus;
  };

  render() {
    const { server } = this.state.dashboard;
    const { hasValidApikey } = this.state;

    const { leasesLoaded, subnetsLoaded } = this.props.dashboard;

    console.log("hasValidApikey", hasValidApikey)
    let leaseStatus = [["Leases", "Count"]];
    if (leasesLoaded) {
      leaseStatus = this.createLeaseStatus();
    }

    let pallete = getPallete();
    let segmentHeight = server.subnetwiseLeases.length * 5.5;
    if (segmentHeight < 20) segmentHeight = 20;
    else if (segmentHeight > 80) segmentHeight = 80;

    if (pallete) pallete = pallete["dashboard"];

    return (
      <>
        <div className="row">
          <div className="col-7">
            <Segment raised>
              <Label
                as="a"
                style={{
                  background: `${pallete ? pallete["overviewLabel"] : "blue"}`,
                  color: "white",
                }}
                ribbon
              >
                {`OVERVIEW - [${this.props.labs.currentServer.ip}]`}
              </Label>
            </Segment>
            {hasValidApikey && (<div className="row">
              <div className="col-4">
                <Segment raised>
                  <Statistic
                    color={
                      pallete && pallete["overview"]
                        ? pallete && pallete["overview"]["subnets"]
                        : "grey"
                    }
                  >
                    {subnetsLoaded && (
                      <Statistic.Value>{server.subnets}</Statistic.Value>
                    )}
                    {!subnetsLoaded && (
                      <Statistic.Value>
                        {this.renderSmallLoader()}
                      </Statistic.Value>
                    )}
                    <Statistic.Label>subnets</Statistic.Label>
                  </Statistic>
                </Segment>
                <Segment raised>
                  <Statistic
                    color={
                      pallete && pallete["overview"]
                        ? pallete && pallete["overview"]["total"]
                        : "grey"
                    }
                  >
                    {subnetsLoaded && (
                      <Statistic.Value style={{ color: "#364f6b" }}>
                        {server.totalLeases}
                      </Statistic.Value>
                    )}
                    {!subnetsLoaded && this.state.leasesLoadSuccess && (
                      <Statistic.Value>
                        {this.renderSmallLoader()}
                      </Statistic.Value>
                    )}
                    {!subnetsLoaded && !this.state.leasesLoadSuccess && (
                      <Statistic.Value>0</Statistic.Value>
                    )}
                    <Statistic.Label>Total IP Addresses</Statistic.Label>
                  </Statistic>
                </Segment>
              </div>
              <div className="col-8">
                <Segment
                  raised
                  style={{
                    display: null,
                    justifyContent: "center",
                    height: 225,
                    maxHeight: 225,
                  }}
                >
                  {leaseStatus.length > 1 && (
                    <Chart
                      width={"300px"}
                      height={"200px"}
                      chartType="PieChart"
                      loader={<div></div>}
                      data={leaseStatus}
                      options={{
                        title: "IP Address Allocation",
                        // Just add this option
                        pieHole: 0.4,
                        colors: ["#364f6b", "red"],
                      }}
                      rootProps={{ "data-testid": "3" }}
                    />
                  )}
                  {leaseStatus.length <= 1 && this.renderLoader()}
                </Segment>
              </div>
            </div>)}
            {!hasValidApikey && (
                <div className="row">
                    <div className="col-12">
                <Segment raised>
                <Message warning>
                    <Message.Header>
                        You must collect API Keys for this server!
                    </Message.Header>
                        <p>place the keys inside /conf/apikeys.json</p>
                    </Message>
                </Segment>
                </div>
                </div>
            )}
          </div>
          <div className="col-5">
            <Segment
              raised
              style={{
                display: null,
              }}
            >
              <Label as="a" color="red" ribbon>
                DHCP Servers
              </Label>
            </Segment>
            <Segment
              raised
              style={{
                overflowX: "hidden",
                overflowY: "scroll",
                display: null,
                justifyContent: "center",
                maxHeight: 225,
                height: 225,
              }}
            >
              <Chart
                width={"800px"}
                height={"300px"}
                chartType="Table"
                loader={<div>{this.renderLoader()}</div>}
                data={this.serverTable()}
                formatters={[
                  {
                    type: "ArrowFormat",
                    column: 1,
                  },
                ]}
                options={{
                  allowHtml: true,
                  // showRowNumber: true,
                }}
                rootProps={{ "data-testid": "1" }}
              />
            </Segment>
          </div>
        </div>
        <Segment
          raised
          style={{
            display: null,
          }}
        >
          <Label
            as="a"
            style={{
              background: `${pallete ? pallete["leasesLabel"] : "green"}`,
              color: "white",
            }}
            ribbon
          >
            Leases
          </Label>
        </Segment>
        <Segment
          raised
          style={{
            overflow: "auto",
            height: `${segmentHeight}vh`,
          }}
        >
          <div className="row">
            {server && server.subnetwiseLeases.length > 1 && (
              <Chart
                width={"1100px"}
                height={`${server.subnetwiseLeases.length * 30}px`}
                chartType="BarChart"
                loader={
                  <div className="container">
                    <div className="col-4">{this.renderGrowingSpinner()}</div>
                  </div>
                }
                data={server.subnetwiseLeases}
                options={{
                  title: "IP Address Allocation Per Subnets",
                  chartArea: { width: "50%" },
                  hAxis: {
                    title: "IP Addresses",
                    minValue: 0,
                  },
                  vAxis: {
                    title: "Subnets",
                  },
                  colors: [
                    pallete && pallete["leases"]
                      ? pallete["leases"]["total"]
                      : "blue",
                    pallete && pallete["leases"]
                      ? pallete["leases"]["available"]
                      : "red",
                    pallete && pallete["leases"]
                      ? pallete["leases"]["allocated"]
                      : "brown",
                  ],
                }}
                // For tests
                rootProps={{ "data-testid": "1" }}
              />
            )}
            {(!server || (server && server.subnetwiseLeases.length <= 1)) &&
              this.state.leasesLoadSuccess &&
              this.renderGrowingSpinner()}
            {(!server || (server && server.subnetwiseLeases.length <= 1)) &&
              !this.state.leasesLoadSuccess && <div></div>}
          </div>
        </Segment>

        <Segment
          raised
          // style={{
          //   overflow: "auto",
          // }}
        >
          <Label
            as="a"
            style={{
              background: `${pallete ? pallete["leasesLabel"] : "green"}`,
              color: "white",
            }}
            ribbon
          >
            VENDOR CHART
          </Label>
          <div className="row">
            {this.state.macVendors.length > 1 && (
              <ChartDiagram
                data={this.state.macVendors}
                heading="MAC Vendors"
                colorList={colors}
                is3d={true}
                chartType="PieChart"
                chartWidth="900px"
                chartHt="350px"
              />
            )}
            {this.state.macVendors.length <= 1 &&
              this.state.leasesLoadSuccess &&
              this.renderGrowingSpinner()}
            {this.state.macVendors.length <= 1 &&
              !this.state.leasesLoadSuccess && (
                <div></div>
              )}
          </div>
        </Segment>
      </>
    );
  }
}

// this is how we can get store details. In this case, this.props.branches will have the required data.
const mapStateToProps = (state) => {
  return {
    dashboard: state.entities.dashboard,
    labs: state.entities.labs,
    configs: state.entities.configs,
    updatedSubnets: state.entities.subnets.loaded,
    leasesUpdated: state.entities.leases.list,
    serverStatus: state.entities.labs.serverStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    lookupMAC: (leases) => {
      dispatch(lookupMAC(leases));
    },
    getServerStatus: (servers) => {
      dispatch(getServerStats(servers));
    },
    // getToken: () => {
    //   dispatch(getToken());
    // },
  };
};

// it's always better to put null if one of the two arguments is not required.
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
