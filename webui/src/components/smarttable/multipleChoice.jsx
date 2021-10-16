import React, { Component } from "react";
import { Form, List, Button } from "semantic-ui-react";

class MultipleChoice extends Component {
  constructor(props) {
    super(props);
    this.state = { inputs: ["input-0"], values: props.value, value: "" };
  }

  render() {
    const { value, values } = this.state;
    if (!values) values = [];
    return (
      <>
        <List celled size="small">
          {values.map((item, index) => (
            <List.Item key={index}>
              {item}
              <Button
                name={index}
                icon="x"
                size="mini"
                floated="right"
                onClick={() => {
                  const values = [...this.state.values];
                  console.log("BEF", values);
                  values.splice(index, 1);
                  console.log("AFT", values);
                  this.setState({ values });
                  this.props.onSubmit(values);
                }}
              />
            </List.Item>
          ))}
        </List>
        <Form size="mini">
          <Form.Group>
            <Form.Field>
              <Form.Input
                placeholder="IP Address"
                value={value}
                onChange={this.handleChange}
              />
            </Form.Field>

            <Form.Button
              content="add"
              type="submit"
              size="mini"
              color="blue"
              floated="right"
              value={value}
              onClick={() => this.appendInput()}
            />
          </Form.Group>
        </Form>
      </>
    );
  }

  handleChange = (e, { value }) => {
    console.log(e, value);
    this.setState({ value });
  };

  appendInput() {
    const values = [...this.state.values];
    values.push(this.state.value);
    this.setState({ values });
    this.props.onSubmit(values);
    var newInput = `input-${this.state.inputs.length}`;
    this.setState((prevState) => ({
      inputs: prevState.inputs.concat([newInput]),
    }));
  }
}

export default MultipleChoice;
