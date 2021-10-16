import React, { Component } from "react";
import Table from "../common/table";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { changeServer } from "../../store/labs";
import { loadDashboard, clearAll } from "../../store/dashboard";
import { changeSelection } from "../../store/layouts/search";
import { resetSubnet } from "../../store/subnets";
import { resetLeases } from "../../store/leases";
import { withRouter } from "react-router";

class ServersTable extends Component {
  state = { choosenId: -1 };

  columns = [
    {
      path: "title",
      label: "Name",
      // content: (server) => (
      //   <Link to={`/servers/${server._id}`}>{server.title}</Link>
      // ),
    },
    { path: "ip", label: "IP Address" },
    // // { path: "status", label: "Status" },
    {
      path: "choose",
      content: (server) => (
        <Button
          // as={Link}
          // to={`/configure/${server._id}`}
          onClick={() => {
            this.setState({ choosenId: server.id });
            if (this.props.currentServer.id !== server.id) {
              this.props.changeServer(server.id, this.props.labId);
              this.props.changeSelection("dashboard");
              this.props.resetSubnet();
              this.props.resetLeases();
              this.props.clearDashboard();
              this.props.reloadDashboard();
              this.props.history.push("/dashboard");
              this.props.onClose();
            }
          }}
          color={this.state.choosenId === server._id ? "blue" : "grey"}
          size="mini"
        >
          Select
        </Button>
      ),
    },
  ];

  render() {
    const { servers, onSort, sortColumn } = this.props;
    console.log("ST Servers#1", servers);
    return (
      <Table
        columns={this.columns}
        data={servers}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentServer: state.entities.labs.currentServer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeServer: (servId, labId) => {
      dispatch(changeServer(servId, labId));
    },
    clearDashboard: () => {
      dispatch(clearAll());
    },
    reloadDashboard: () => {
      dispatch(loadDashboard());
    },
    changeSelection: (name) => {
      dispatch(changeSelection(name));
    },
    resetSubnet: () => {
      dispatch(resetSubnet());
    },
    resetLeases: () => {
      dispatch(resetLeases());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ServersTable));
