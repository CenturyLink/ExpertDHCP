import React, { Component } from "react";
import { Form, Loader, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { getApiFromId } from "./../services/apiService";
import { createToastObject } from "./../services/utilityService";
import {
  loadLeases,
  addLease,
  updateLease,
  deleteLease,
  wipe,
} from "./../store/leases";
import DynamicGrid from "./smarttable/dynamicGrid";
import { leasesTemplate } from "../config/objectTemplates.json";
import { loadDashboard } from "./../store/dashboard";

class Leases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leases: props.leases.list,
      loaded: props.leases.loaded,
      currentApi: this.getLeasesAPI(),
      selected: null,
      newLease: false,
      wipeLeases: false,
      ipAddress: "",
    };
  }

  componentDidMount() {
    if (!this.props.leases.loaded) this.props.loadLeases(null);
  }

  componentDidUpdate(prevProps) {
    if (this.props.leases !== prevProps.leases) {
      if (this.props.leases.updated !== prevProps.leases.updated) {
        const toastInfo = createToastObject(null, null, "Leases reload failed");

        this.props.loadLeases(toastInfo);
        this.props.loadDashboard();
      }
      const { list, loaded } = this.props.leases;
      this.setState({
        leases: list,
        loaded,
        selected: null,
        newLease: false,
        wipeLeases: false,
      });
    }
  }

  getLeasesAPI = () => {
    return getApiFromId("API_MGR_GET_LEASES");
  };
  deleteLease = (row) => {
    this.props.deleteLease({ ip: row["ip-address"] });
  };

  updateLease = (lease) => {
    console.log("Updated Lease", lease);
    this.props.updateLease({ arguments: lease });
  };

  addLease = (lease) => {
    let newLease = { ...lease };
    for (let key in newLease) {
      console.log(key, newLease[key]);
      if (newLease[key] === "" || newLease[key] === -1) {
        delete newLease[key];
      }
    }
    // console.log("New Lease", newLease);
    this.props.addLease({ arguments: newLease });
  };

  handleChange = (e, { value }) => {
    this.setState({ ipAddress: value });
  };

  handleSubmit = () => {
    this.props.wipe({ subnet_id: this.state.ipAddress });
  };

  render() {
    const {
      leases,
      loaded,
      selected,
      newLease,
      wipeLeases,
      ipAddress,
    } = this.state;
    if (!loaded) {
      return (
        <>
          <br />
          <Loader active inline="centered" />
        </>
      );
    }

    return (
      <>
        <>
          <br />
          {!newLease && !selected && !wipeLeases && (
            <>
              <Button
                className="button-item"
                content="Wipe"
                floated="right"
                negative
                size="mini"
                onClick={() => {
                  this.setState({ wipeLeases: true });
                }}
              />
              <Button
                className="button-item"
                content="Add Lease"
                floated="right"
                positive
                size="mini"
                onClick={() => {
                  this.setState({ newLease: true });
                }}
              />

              <br />
              <br />
            </>
          )}

          {!selected && !newLease && !wipeLeases && (
            <table className="ui celled grey table-striped table-fixed table">
              <thead className="ui mini">
                <tr>
                  <th style={{ width: "15%" }}>client-id</th>
                  <th style={{ width: "11%" }}>cltt</th>
                  <th style={{ width: "7%" }}>fqdn-fwd</th>
                  <th style={{ width: "7%" }}>fqdn-rev</th>
                  <th style={{ width: "13%" }}>hostname</th>
                  <th style={{ width: "15%" }}>hw-address</th>
                  <th style={{ width: "13%" }}>ip-address</th>
                  <th style={{ width: "5%" }}>state</th>
                  <th style={{ width: "11%" }}>subnet-id</th>
                  <th style={{ width: "6%" }}>valid-lft</th>
                  <th style={{ width: "5%" }}></th>
                </tr>
              </thead>
              <tbody className="ui mini ">
                {leases &&
                  leases.map((row, key) => (
                    <tr className="" key={key}>
                      <td className="td">{row["client-id"]}</td>
                      <td className="td">{row["cltt"]}</td>
                      <td className="td">
                        {row["fqdn-fwd"] ? "true" : "false"}
                      </td>
                      <td className="td">
                        {row["fqdn-rev"] ? "true" : "false"}
                      </td>
                      <td className="td">{row["hostname"]}</td>
                      <td className="td">{row["hw-address"]}</td>
                      <td className="td">{row["ip-address"]}</td>
                      <td className="td">{row["state"]}</td>
                      <td className="td">{row["subnet-id"]}</td>
                      <td className="td">{row["valid-lft"]}</td>
                      <td className="td">
                        <Button.Group size="mini">
                          <Button
                            icon="edit"
                            color="grey"
                            onClick={() => this.setState({ selected: row })}
                          />
                          {/* <Button
                            icon="trash"
                            negative
                            onClick={() => this.deleteLease(row)}
                          /> */}
                        </Button.Group>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </>
        <>
          {selected && (
            <DynamicGrid
              json={{
                title: "lease",
                value: selected,
                index: null,
              }}
              onDelete={this.deleteLease}
              onUpdate={this.updateLease}
              onMinimize={() =>
                this.setState({
                  selected: null,
                  newLease: false,
                  wipeLeases: false,
                })
              }
              // editable={true}
            />
          )}
          {newLease && (
            <DynamicGrid
              json={{
                title: "lease",
                value: leasesTemplate,
                index: null,
              }}
              onUpdate={this.addLease}
              onMinimize={() =>
                this.setState({
                  newLease: false,
                  selected: null,
                  wipeLeases: false,
                })
              }
              editable={true}
            />
          )}
          {wipeLeases && (
            <Form success onSubmit={this.handleSubmit}>
              <br />
              <Form.Group>
                <Form.Input
                  placeholder="Subnet ID"
                  value={ipAddress}
                  onChange={this.handleChange}
                />

                <Form.Button content="Wipe" negative type="submit" />
              </Form.Group>
              <Button
                content="<< Back"
                primary
                size="mini"
                onClick={() => this.setState({ wipeLeases: false })}
              />
            </Form>
          )}
        </>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    leases: state.entities.leases,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadLeases: (toastInfo) => {
      if (!toastInfo) dispatch(loadLeases());
      else dispatch(loadLeases(toastInfo));
    },
    deleteLease: (input) => {
      dispatch(deleteLease(input));
    },
    updateLease: (input) => {
      dispatch(updateLease(input));
    },
    addLease: (input) => {
      dispatch(addLease(input));
    },
    wipe: (input) => {
      dispatch(wipe(input));
    },
    loadDashboard: () => {
      dispatch(loadDashboard());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Leases);
