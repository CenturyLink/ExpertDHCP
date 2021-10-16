import React, { Component } from "react";
import SideMenu from "../layout/sideMenu";
import TopMenu from "../layout/topMenu";
import { connect } from "react-redux";
import LoginForm from "./../forms/loginForm";
import { withRouter } from "react-router";
import CenterLoader from "components/common/centerLoader";

class Layout extends Component {
  render() {
    const { username, valid } = this.props.session;

    // if (!valid) this.props.history.push("/login");

    if (!valid) {
      let message = "validating session...";
      // Show loader while loging on or when user refresh screen.
      if (this.props.gettingUser) {
        return <CenterLoader message={message} />;
      } else if (this.props.logingOn && this.props.authenticated) {
        message = "collecting auth tokens...";
        return <CenterLoader message={message} />;
      } else {
        return <LoginForm />;
      }
    }

    console.log("Loading layout...");

    return (
      <div className="grid">
        <div className="menu">{<TopMenu user={username} />}</div>
        <div className="main-content">
          <SideMenu user={username}>{this.props.children}</SideMenu>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.entities.users.loginSuccess,
    logingOn: state.entities.users.logingOn,
    gettingUser: state.entities.users.gettingUser,
    currentUser: state.entities.users.currentUser,
    authenticated: state.entities.users.authenticated,
    initialized: state.entities.labs.initialized,
  };
};

export default connect(mapStateToProps, null)(withRouter(Layout));
