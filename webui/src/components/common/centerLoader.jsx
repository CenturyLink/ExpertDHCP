import React, { Component } from "react";
import { Loader, Grid, Segment } from "semantic-ui-react";

class CenterLoader extends Component {
  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Segment>
            <Loader active inline="centered">
              {this.props.message}
            </Loader>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CenterLoader;
