import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  getSession,
  getAPIKey,
//   getAuthToken,
//   removeSessionToken,
//   removeAuthTokens,
} from "./services/authService";
import { getUser, getAuthTokens, setLoginSuccess } from "./store/users";
import { loadDashboard } from "./store/dashboard";
import { withRouter } from "react-router";
import Dashboard from "./components/dashboard.jsx";
import Layout from "./components/layout/layout";
import ServerDetails from "./components/serverDetails";
import ProtectedRoute from "./components/common/protectedRoute";
import RegisterForm from "./components/forms/registerForm";
import LoginForm from "./components/forms/loginForm";
import Logout from "./components/logout";
import CenterLoader from "./components/common/centerLoader";
import Documentation from "masterdoc/documentation";
// import { apiKeyAdminRole, apiKeyNonAdminRole } from "./config/config.json";
import "react-toastify/dist/ReactToastify.css";
import { updateCurrentKey } from './store/configs';

class App extends Component {
  state = {
    session: { valid: false, username: "" },
  };

  componentDidUpdate(prevProps) {
    //**************************************************************************
    // To start master user authentication, config files need to be
    // read and loaded to the store. So, wait for configs to be read.
    //**************************************************************************

    if (this.props.labs.initialized !== prevProps.labs.initialized) {
      if (this.props.labs.initialized && this.props.configs.ready) {
        console.log("initialization complete. check for any valid session..");
        this.validateSession(this.props.configs, this.props.labs);
      }
    }
    if (this.props.configs.ready !== prevProps.configs.ready) {
      if (this.props.configs.ready && this.props.labs.initialized) {
        console.log("initialization complete. check for any valid session..");
        this.validateSession(this.props.configs, this.props.labs);
      }
    }

    //*****************************************************************************
    // If no valid session found. User will be redirected to login screen. Upon
    // entering valid credential.
    //*****************************************************************************
    if (this.props.users.authenticated !== prevProps.users.authenticated) {
      if (this.props.users.authenticated) {
        console.log("Master login successful.");
        // const { configs } = this.props;

        // Manually set login success. Earlier this phase triggered getAuthToken
        // which inturn does what setLoginSuccess does. Design has been revised 
        // in such a way that login become success if gui login is success.
        this.props.setLoginSuccess();
      }
    }
    //*****************************************************************************
    // Login process completes here. At this point, we have a valid user with auth-
    // tokens or api-keys for FAST authentication. So, go ahead and start loading
    // dashboard elements.
    //*****************************************************************************

    if (this.props.users.loginSuccess !== prevProps.users.loginSuccess) {
      if (this.props.users.loginSuccess) {
        console.log("Master & Fast login successful. Loading Dashboard");
        try {
          const { currentUser } = this.props.users;
          this.setState({
            session: { valid: true, username: currentUser.username },
          });
        } catch (error) {}

        this.props.loadDashboard();
      }
    }
  }

  validateSession = (configs, labs) => {
    //*****************************************************************************
    // This function validates the session token and make sure the configurations 
    // pocess api-key for fast authentication. If such a session token is found,
    // dispatch getUser to confirm the user actually exists in the DB / users.csv.
    // If such a user exists, mark the login process as complete.
    //*****************************************************************************
    
    const session = getSession();
    console.log("current session: ", session);

    if (!session.valid) {
      // Session token is expired or not valid.
      this.setState({ session: { valid: false, username: "" } });
      this.props.history.push("/login");
    }

    // we have a valid session. Now check whether the user session really 
    // exists in the database or in the users.csv
    this.props.getUser(session.token);

    console.log("Session validated.");

    let apikey = getAPIKey(configs, labs.currentServer);
    
    if (apikey){
        console.log(`-->> API key found for server`);
        this.props.updateCurrentKey(apikey)
    }
  };

  render() {
    let { session } = this.state;

    if (!this.props.labs.initialized) {
      let message = "initializing..";
      return <CenterLoader message={message} />;
    }

    return (
      <React.Fragment>
        <ToastContainer />
        <Layout session={session}>
          <Switch>
            {!session.valid && (
              <Route path="/login" component={LoginForm}></Route>
            )}
            <ProtectedRoute path="/logout" component={Logout}></ProtectedRoute>
            <ProtectedRoute
              path="/register"
              component={RegisterForm}
            ></ProtectedRoute>
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/servers" component={ServerDetails} />
            <ProtectedRoute path="/documentation" component={Documentation} />
            <Redirect to="/dashboard" />
          </Switch>
        </Layout>
      </React.Fragment>
    );
  }
}

// this is how we can get store details. In this case, this.props will have the required data.
const mapStateToProps = (state) => {
  return {
    configs: state.entities.configs,
    labs: state.entities.labs,
    users: state.entities.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDashboard: () => {
      dispatch(loadDashboard());
    },
    getUser: (token) => {
      const sessionToken = { sessionToken: token };
      dispatch(getUser(sessionToken));
    },
    getAuthTokens: () => {
      dispatch(getAuthTokens());
    },
    setLoginSuccess: () => {
      dispatch(setLoginSuccess());
    },
    updateCurrentKey: (key) => {
      dispatch(updateCurrentKey(key))
    } 
  };
};

// it's always better to put null if one of the two arguments is not required.
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
