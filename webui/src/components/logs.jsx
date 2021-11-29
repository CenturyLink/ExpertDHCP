import React, { Component } from "react";
import { Message, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import ReactJson from "react-json-view";
import { clearLogs } from "./../store/logs";

class Logs extends Component {
  getColor = (log) => {
    try {
      if ("error" in log[1]) {
        return "red";
      } else {
        if (log[1]["status"] === "OK") return "green";
        else return "orange";
      }
    } catch (error) {
      return false;
    }
  };

  getMessage = (log) => {
    try {
      if ("error" in log) return log["error"];
      else return log["status"] === "OK" ? "SUCCESS" : log["statusValue"];
    } catch (error) {
      return "Unknown Error";
    }
  };

  render() {
    return (
      <>
        <br />
        <Button
          className="button-item"
          content="Clear Logs"
          floated="right"
          negative
          size="mini"
          onClick={() => {
            this.props.resetLogs();
          }}
        />
        <br />

        {this.props.logs.map((log, index) => (
          <Message color={this.getColor(log)} key={index}>
            <Message.Header key={index}>
              {`${log[0]} --- ${this.getMessage(log[1])}`}
            </Message.Header>
            <p>{`${log[1]["method"]} ---> ${log[1]["url"]}`}</p>

            <ReactJson
              name="Input"
              src={log[1]["input"]}
              theme="shapeshifter:inverted"
              iconStyle="triangle"
              displayDataTypes={false}
              displayObjectSize={false}
              collapsed={true}
              enableClipboard={false}
            />

            <ReactJson
              name="Response Data"
              src={log[1]["responseData"]}
              theme="summerfruit:inverted"
              iconStyle="triangle"
              displayDataTypes={false}
              displayObjectSize={false}
              collapsed={true}
              enableClipboard={false}
            />
          </Message>
        ))}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logs: state.entities.logs.logs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetLogs: () => {
      dispatch(clearLogs());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logs);
