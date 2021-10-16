import React, { Component } from "react";
import Joi from "joi-browser";
import { Form, Header } from "semantic-ui-react";

const fieldMap = {};

const emptyFields = {
  mac_address: ""
};

class GetIPForm extends Component {
  state = {
    fields: {
      mac_address: ""
    },
    errors: {},
    success: false,
    error: false
  };

  schema = {
    mac_address: Joi.string()
      .required()
      .label("Mac Address")
  };

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
        console.log("FF", field);
      } else {
        console.log(field);
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
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      this.setState({ error: true });
      return null;
    }
    const { fields } = this.state;
    this.setState({ success: true });
    this.setState({ fields: emptyFields });
    this.props.onSubmit(this.createActualJson(fields));
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
          <Form.Field required width="6">
            <label>MAC Address</label>
            <Form.Input
              placeholder="52:54:00:d1:fb:41"
              name="mac_address"
              value={mac_address}
              onChange={this.handleChange}
              error={errors.mac_address}
            />
          </Form.Field>
          <Form.Button
            content="Submit"
            primary
            type="submit"
            disabled={!mac_address}
          />
        </Form>
      </div>
    );
  }
}

export default GetIPForm;
