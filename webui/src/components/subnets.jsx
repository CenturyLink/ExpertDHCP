import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown, Button, Grid, Header, Loader } from "semantic-ui-react";
import {
  loadSubnets,
  changeSubnet,
  modifySubnet,
  deleteSubnet,
} from "./../store/subnets";
import { loadDashboard } from "./../store/dashboard";
import { getApiFromId, getRawApis } from "./../services/apiService";
import { createToastObject } from "./../services/utilityService";
import { subnetTemplate } from "../config/objectTemplates.json";
import DynamicGrid from "./smarttable/dynamicGrid";

class Subnets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subnets: props.subnets.list,
      loaded: props.subnets.loaded,
      currentApi: getApiFromId("API_MGR_GET_KEA_CONFIG"),
      subnet: props.subnets.currentSubnet,
      subnetAPIs: getRawApis(),
      newSubnet: false,
    };
  }

  componentDidMount() {
    const toastInfo = createToastObject(
      "Subnets loaded",
      "FAST_STATUS",
      "Unable to load subnets"
    );

    if (!this.props.subnets.loaded) this.props.loadSubnets(toastInfo);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.subnets !== prevProps.subnets) {
      const { list, loaded, currentSubnet } = this.props.subnets;
      this.setState({ subnets: list, loaded, subnet: currentSubnet });
      this.setState({ newSubnet: false });
    }
    if (this.props.updatedSubnets !== prevProps.updatedSubnets) {
      if (this.props.updatedSubnets) {
        const toastInfo = createToastObject(
          null,
          null,
          "Unable to load subnets after modify"
        );

        this.setState({ loaded: false });
        this.props.loadSubnets(toastInfo);
        this.props.loadDashboard();
        // await sleep(3000);
        // this.props.changeSubnetOption(currentSubnet.subnet);
      }
    }
  }

  handleChange = (e, { value }) => {
    let subnet = {};
    if (this.state.subnets) {
      subnet = this.state.subnets.find((sub) => sub.subnet === value);
    }
    this.setState({
      subnet,
    });
    this.props.changeSubnetOption(value);
  };

  getSubnetOptions = (subnets) => {
    let key = 1010;
    let subnetList = [];
    for (let sub of subnets) {
      let item = {
        key: key++,
        value: sub.subnet,
        text: sub.subnet,
      };
      subnetList.push(item);
    }
    return subnetList;
  };

  doAddSubnet = (subnet) => {
    const addApi = getApiFromId("API_MGR_ADD_SUBNET");

    const api_input = {
      subnet_list: [subnet],
    };

    const toastInfo = createToastObject(
      "New subnet added",
      "FAST_STATUS",
      "Subnet add failed"
    );

    this.setState({ newSubnet: false });
    this.props.modifySubnet(addApi, api_input, toastInfo);
  };

  doUpdateSubnet = (subnet) => {
    const modifyApi = getApiFromId("API_MGR_MOD_SUBNET");
    const api_input = {
      subnet_list: [subnet],
    };

    const toastInfo = createToastObject(
      "Subnet updated",
      "FAST_STATUS",
      "Subnet update failed"
    );

    this.props.modifySubnet(modifyApi, api_input, toastInfo);
  };

  doDeleteSubnet = (subnet) => {
    const deleteApi = getApiFromId("API_MGR_DEL_SUBNET");
    const input = {
      subnet_ids: [subnet.id],
    };
    this.props.deleteSubnet(deleteApi, input);
  };

  render() {
    const { subnets, subnet, loaded, newSubnet } = this.state;
    if (!loaded) {
      return (
        <>
          <br />
          <Loader active inline="centered" />
        </>
      );
    }

    const subnetList = this.getSubnetOptions(subnets);

    return (
      <div className="Centered-Div">
        <Grid padded="horizontally">
          <Grid.Row>
            <Grid.Column>
              {!newSubnet && (
                <Dropdown
                  placeholder={subnet ? "Change Subnet" : "Choose Subnet"}
                  onChange={this.handleChange}
                  selection
                  options={subnetList}
                />
              )}
              {!newSubnet && (
                <Button
                  className="button-item"
                  content="Add Subnet"
                  floated="right"
                  positive
                  size="mini"
                  onClick={() => {
                    this.setState({ newSubnet: true });
                  }}
                />
              )}
              {newSubnet && (
                <Button
                  content="Cancel"
                  negative
                  floated="right"
                  size="mini"
                  onClick={() => {
                    this.setState({ newSubnet: !newSubnet });
                  }}
                />
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {subnet && !newSubnet && (
                <Header as="h4" dividing color="grey">
                  Subnet {subnet.id}: {subnet.subnet}
                </Header>
              )}
              {newSubnet && (
                <Header as="h4" dividing color="green">
                  New Subnet
                </Header>
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {newSubnet && (
                <DynamicGrid
                  json={{
                    title: "subnet",
                    value: subnetTemplate,
                    index: null,
                  }}
                  onUpdate={this.doAddSubnet}
                  editable={true}
                />
              )}
              {subnet && !newSubnet && (
                <DynamicGrid
                  json={{ title: "subnet", value: subnet, index: null }}
                  onUpdate={this.doUpdateSubnet}
                  onDelete={this.doDeleteSubnet}
                  editable={false}
                />
              )}
              <br />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subnets: state.entities.subnets,
    dhcpServer: state.entities.labs.currentServer,
    updatedSubnets: state.entities.subnets.updatedSubnets,
  };
};
// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

const mapDispatchToProps = (dispatch) => {
  return {
    loadSubnets: (toastInfo) => {
      if (!toastInfo) dispatch(loadSubnets());
      else dispatch(loadSubnets(toastInfo));
    },

    changeSubnetOption: (subnet) => {
      dispatch(changeSubnet(subnet));
    },
    modifySubnet: (api, subnet, toastInfo) => {
      dispatch(modifySubnet(api, subnet, toastInfo));
    },
    deleteSubnet: (api, subnet) => {
      dispatch(deleteSubnet(api, subnet));
    },
    loadDashboard: () => {
      dispatch(loadDashboard());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Subnets);
