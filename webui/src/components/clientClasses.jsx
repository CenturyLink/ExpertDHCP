import React, { Component } from "react";
import { loadSubnets } from "./../store/subnets";
import { connect } from "react-redux";
import { Grid, Button, Dropdown, Loader, Header } from "semantic-ui-react";
import DynamicGrid from "./smarttable/dynamicGrid";
import { clientClassTemplate } from "../config/objectTemplates.json";
import {
  deleteClass,
  addClientClass,
  modifyClientClass,
} from "../store/clientclasses";
import { createToastObject } from "./../services/utilityService";

import { changeClass } from "../store/subnets";

class ClinetClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: 1,
      classes: [],
      clientClass: props.subnets.currentClass,
      clientClasses: props.subnets.clientClasses,
      subnets: props.subnets.list,
      loaded: props.subnets.loaded,
      newClientClass: false,
    };
  }
  componentDidMount() {
    if (!this.props.subnets.loaded) {
      const toastInfo = createToastObject(
        "Clinet classes loaded",
        "FAST_STATUS",
        "Unable to load clinet classes"
      );
      this.props.loadSubnets(toastInfo);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.subnets !== prevProps.subnets) {
      const { list, loaded, clientClasses, currentClass } = this.props.subnets;
      this.setState({ subnets: list, loaded, clientClasses, currentClass });
    }
    if (this.props.updated !== prevProps.updated) {
      const toastInfo = createToastObject(
        null,
        null,
        "Unable to load ClinetClasses after modify"
      );

      if (this.props.updated) {
        this.setState({
          loaded: false,
          clientClass: null,
          newClientClass: false,
        });
        this.props.loadSubnets(toastInfo);
      }
    }
    if (this.props.clinetClasses !== prevProps.clinetClasses) {
      this.setState({ clientClass: this.props.subnets.currentClass });
    }
  }

  getCCOptions = (clientClasses) => {
    let key = 2010;
    let ccList = [];
    if (!clientClasses) return [];
    try {
      for (let cc of clientClasses) {
        let item = {
          key: key++,
          value: cc.name,
          text: cc.name,
        };
        ccList.push(item);
      }
    } catch (error) {
      console.log("Exception in creating class options", error);
    }
    return ccList;
  };

  handleOnClick = (btn) => {
    this.setState({ option: btn });
  };

  handleChange = (e, { value }) => {
    let clientClass;
    if (this.state.clientClasses)
      clientClass = this.state.clientClasses.find((cc) => cc.name === value);

    this.setState({
      clientClass,
    });
    this.props.changeClientClass(clientClass);
  };

  doAddClientClass = (clientClass) => {
    const api_input = {
      client_class_list: [clientClass],
    };
    this.props.addClass(api_input);
    // window.location = "/";
  };
  updateClientClass = (clientClass) => {
    const api_input = {
      client_class_list: [clientClass],
    };
    this.props.updateClass(api_input);
  };

  deleteClientClass = (clientClass) => {
    const api_input = {
      class_names: [clientClass.name],
    };
    this.props.deleteClass(api_input);
  };

  render() {
    const { clientClass, loaded, clientClasses, newClientClass } = this.state;
    if (!loaded) {
      return <Loader active inline="centered" />;
    }

    const ccOptions = this.getCCOptions(clientClasses);
    return (
      <div>
        <Grid columns="two" padded="horizontally">
          <Grid.Row>
            <Grid.Column width="16">
              <>
                <br />
                <br />
                {!newClientClass && (
                  <Dropdown
                    placeholder={"Change Client Class"}
                    onChange={this.handleChange}
                    selection
                    options={ccOptions}
                  />
                )}
                {!newClientClass && (
                  <Button
                    className="button-item"
                    content="Add Client Class"
                    floated="right"
                    positive
                    size="mini"
                    onClick={() => {
                      this.setState({
                        newClientClass: true,
                        clientClass: null,
                      });
                      this.props.changeClientClass(null);
                    }}
                  />
                )}
                {newClientClass && (
                  <Button
                    content="Cancel"
                    negative
                    floated="right"
                    size="mini"
                    onClick={() => {
                      this.setState({ newClientClass: !newClientClass });
                    }}
                  />
                )}
              </>
              <>
                {clientClass && !newClientClass && (
                  <Header as="h4" dividing color="grey">
                    {clientClass.name}
                  </Header>
                )}
                {newClientClass && (
                  <Header as="h4" dividing color="green">
                    New Client Class
                  </Header>
                )}
                {!newClientClass && clientClass && (
                  <DynamicGrid
                    json={{
                      title: "client class",
                      value: clientClass,
                      index: null,
                    }}
                    onUpdate={this.updateClientClass}
                    onDelete={this.deleteClientClass}
                    editable={false}
                  />
                )}
                {newClientClass && (
                  <DynamicGrid
                    json={{
                      title: "client class",
                      value: clientClassTemplate,
                      index: null,
                    }}
                    onUpdate={this.doAddClientClass}
                    editable={true}
                  />
                )}
              </>
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
    updated: state.entities.clientclasses.updated,
    clinetClasses: state.entities.subnets.clientClasses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSubnets: (toastInfo) => {
      if (!toastInfo) dispatch(loadSubnets());
      else dispatch(loadSubnets(toastInfo));
    },
    addClass: (input) => {
      dispatch(addClientClass(input));
    },
    updateClass: (input) => {
      dispatch(modifyClientClass(input));
    },
    deleteClass: (input) => {
      dispatch(deleteClass(input));
    },
    changeClientClass: (cc) => {
      dispatch(changeClass(cc));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ClinetClasses);
