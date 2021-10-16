import React, { Component } from "react";
import { Message } from "semantic-ui-react";

//Top level componet to catch exceptions.

class ErrorBoundary extends Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError)
      return (
        <Message negative>
          <Message.Header>Oops!!! Something went wrong</Message.Header>
        </Message>
      );
    else return this.props.children;
  }
}

export default ErrorBoundary;
