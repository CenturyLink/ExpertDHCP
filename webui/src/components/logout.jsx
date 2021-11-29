import React, { Component } from "react";
import { connect } from "react-redux";
import { resetUserDetails } from "../../src/store/users";
import { terminate } from "../../src/store/dhcpdump";
import { toast } from "react-toastify";
import CenterLoader from "./common/centerLoader";
import {
  removeAuthTokens,
  removeSessionToken,
} from "./../services/authService";

class Logout extends Component {
  componentDidMount = async () => {
    try {
      this.props.resetUserDetails();
      if (this.props.triggered) {
        this.props.stopdump();
      }
      toast.success("Logged out successfully!");
    } catch (error) {
      console.log("Exception componentDidMount");
    } finally {
      removeAuthTokens();
      removeSessionToken();
      window.location = "/";
    }
  };
  render() {
    return <CenterLoader message="Logging out..." />;
  }
}

const mapStateToProps = (state) => {
  return {
    triggered: state.entities.dhcpdump.triggered,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetUserDetails: () => {
      dispatch(resetUserDetails());
    },
    stopdump: () => {
      dispatch(terminate());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
