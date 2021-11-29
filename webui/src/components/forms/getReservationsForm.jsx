import React, { Component } from "react";
import Joi from "joi-browser";
import { Form, Header } from "semantic-ui-react";

const fieldMap = {};

const emptyFields = {};

class GetReservationsForm extends Component {
  state = {
    fields: {},
    errors: {},
    success: false,
    error: false
  };

  schema = {};

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.fields, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  createActualJson = input => {
    const fields = {};
    for (let field in input) {
      if (field in fieldMap) {
        fields[fieldMap[field]] = input[field];
      } else {
        fields[field] = input[field];
      }
    }
    return fields;
  };
  handleChange = (e, { name, value }) => {
    e.preventDefault();
    const fields = { ...this.state.fields };
    fields[name] = value;
    this.setState({ fields });
  };

  handleSubmit = () => {
    this.setState({ success: true });
    this.setState({ fields: emptyFields });
    this.props.onSubmit({});
  };

  render() {
    const { mac_address } = this.state.fields;

    const { errors } = this.state;

    console.log(this.state.fields);
    return (
      <div>
        <Header as="h5" dividing>
          GET IP FROM MAC
        </Header>
        <br />

        <Form success onSubmit={this.handleSubmit}>
          <Form.Button content="Submit" primary type="submit" />
        </Form>
      </div>
    );
  }
}

export default GetReservationsForm;
