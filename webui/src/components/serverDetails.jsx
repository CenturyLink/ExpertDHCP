import React, { Component } from "react";
import { Header, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { changeServer, changeTab, getServerUrl } from "../store/labs";
import SelectionForm from "./rawApi";
import DHCPDump from "./dhcpDump";
import Subnets from "./subnets";
import Leases from "./leases";
import ClinetClasses from "./clientClasses";
import Logs from "./logs";

class ServerDetails extends Component {
  state = { activeItem: this.props.currentTab, server: this.props.server };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.handleTabChange(name);
  };

  componentDidMount = () => {
    // const server = this.props.servers.find(
    //   (serv) => serv._id === this.props.match.params.id
    // );
    // this.props.handleServerChange(this.props.match.params.id);
    this.props.getServerUrl();
  };

  componentDidUpdate(prevProps) {
    if (this.props.currentTab !== prevProps.currentTab) {
      this.setState({ activeItem: this.props.currentTab });
    }
    if (this.props.server !== prevProps.server) {
      this.setState({ server: this.props.server });
    }
  }

  render() {
    const { activeItem, server } = this.state;

    return (
      <>
        <Header dividing color="black">
          {`${server.title}: [${server.ip}]`}
        </Header>
        <div>
          <Menu attached="top" tabular>
            <Menu.Item
              name="SUBNETS"
              active={activeItem === "SUBNETS"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="LEASES"
              active={activeItem === "LEASES"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="CLIENT CLASSES"
              active={activeItem === "CLIENT CLASSES"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="DHCP DUMP"
              active={activeItem === "DHCP DUMP"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="RAW API"
              active={activeItem === "RAW API"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              position="right"
              name="LOGS"
              active={activeItem === "LOGS"}
              onClick={this.handleItemClick}
            />
          </Menu>
          {activeItem === "SUBNETS" && <Subnets />}
          {activeItem === "LEASES" && <Leases />}
          {activeItem === "CLIENT CLASSES" && <ClinetClasses />}
          {activeItem === "DHCP DUMP" && <DHCPDump />}
          {activeItem === "RAW API" && <SelectionForm />}
          {activeItem === "LOGS" && <Logs />}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    server: state.entities.labs.currentServer,
    currentTab: state.entities.labs.currentTab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleServerChange: (servId) => {
      dispatch(changeServer(servId));
    },
    handleTabChange: (tab) => {
      dispatch(changeTab(tab));
    },
    getServerUrl: () => {
      dispatch(getServerUrl());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerDetails);
