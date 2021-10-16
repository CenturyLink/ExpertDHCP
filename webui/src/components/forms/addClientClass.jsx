import React, { Component } from "react";
import Joi from "joi-browser";
import { Form, Header, Button } from "semantic-ui-react";
import OptionForm from "./optionForm";

const fieldMap = {
  boot_file_name: "boot-file-name",
  next_server: "next-server",
  option_data: "option-data",
  option_def: "option-def",
  server_hostname: "server-hostname",
};

const emptyFields = {
  boot_file_name: "",
  name: "",
  next_server: "",
  server_hostname: "",
};

class AddClientClass extends Component {
  state = {
    fields: {
      boot_file_name: "",
      name: "",
      next_server: "",
      option_data: [],
      option_def: [],
      server_hostname: "",
    },
    errors: {},
    optionList: [],
    showOptDataForm: false,
    showOptDefForm: false,
    success: false,
    error: false,
  };

  schema = {
    boot_file_name: Joi.label("Boot File Name"),
    name: Joi.label("Name"),
    next_server: Joi.label("Next Server"),
    option_data: Joi.label("Option Data"),
    option_def: Joi.label("Option Data"),
    server_hostname: Joi.label("Server Hostname"),
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

  createActualJson = (input) => {
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
    const {
      boot_file_name,
      name,
      next_server,
      server_hostname,
    } = this.state.fields;
    const { errors, optionList, showOptDataForm, showOptDefForm } = this.state;

    return (
      <div>
        <Header as="h4" dividing color="grey">
          Add Client Class
        </Header>
        <br />

        <Form success>
          <Form.Group>
            <Form.Field required width="6">
              <label>Boot File Name</label>
              <Form.Input
                placeholder=""
                name="boot_file_name"
                value={boot_file_name}
                onChange={this.handleChange}
                error={errors.boot_file_name}
              />
            </Form.Field>
            <Form.Field required width="6">
              <label>Name</label>
              <Form.Input
                placeholder=""
                name="name"
                value={name}
                onChange={this.handleChange}
                error={errors.name}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field required width="6">
              <label>Next Server</label>
              <Form.Input
                placeholder=""
                name="next_server"
                value={next_server}
                onChange={this.handleChange}
                error={errors.next_server}
              />
            </Form.Field>
            <Form.Field required width="6">
              <label>Server Host Name</label>
              <Form.Input
                placeholder=""
                name="server_hostname"
                value={server_hostname}
                onChange={this.handleChange}
                error={errors.server_hostname}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Option Data</label>

              {optionList.map((option, index) => (
                <p>OptionList</p>
              ))}
              <Button.Group size="mini">
                <Button
                  icon="plus"
                  color="green"
                  size="mini"
                  inverted
                  onClick={() => this.setState({ showOptDataForm: true })}
                />
                <Button
                  icon="minus"
                  color="red"
                  size="mini"
                  inverted
                  onClick={() => this.setState({ showOptDataForm: false })}
                />
              </Button.Group>
              <br />
              {showOptDataForm && <OptionForm />}
            </Form.Field>
            <Form.Field>
              <label>Option Def</label>

              {optionList.map((option, index) => (
                <p>OptionList</p>
              ))}
              <Button.Group size="mini">
                <Button
                  icon="plus"
                  color="green"
                  inverted
                  onClick={() => this.setState({ showOptDefForm: true })}
                />
                <Button
                  icon="minus"
                  color="red"
                  inverted
                  onClick={() => this.setState({ showOptDefForm: false })}
                />
              </Button.Group>
              <br />
              {showOptDefForm && <OptionForm />}
            </Form.Field>
          </Form.Group>
          <Form.Button size="small" content="Submit" primary type="submit" />
        </Form>
      </div>
    );
  }
}

export default AddClientClass;
