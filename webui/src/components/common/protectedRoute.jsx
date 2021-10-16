import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ErrorBoundary from "./errorBoundary";
import { getSession } from "../../services/authService";

// This Component checks if valid user exists or not. Route is allowed only if
// there is a valid user.

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const session = getSession();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!session.valid) {
          window.location = "/";
        }
        // return (
        //   <Redirect
        //     to={{
        //       pathname: "/login",
        //       state: { from: props.location },
        //     }}
        //   />
        // );
        return Component ? (
          <ErrorBoundary>
            <Component {...props} />
          </ErrorBoundary>
        ) : (
          render(props)
        );
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    userloaded: state.entities.users.userloaded,
    login: state.entities.users.login,
  };
};

export default connect(mapStateToProps, null)(ProtectedRoute);
