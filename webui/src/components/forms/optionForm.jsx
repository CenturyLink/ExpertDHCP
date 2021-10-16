import React, { Component } from "react";
import Joi from "joi-browser";
import { Form, Header, Divider, Popup } from "semantic-ui-react";
import { optionTypes } from "../../config/optionTypes.json";

const fieldMap = {
  alwaysSend: "always-send",
  csvFormat: "csv-format",
};
const emptyFields = {
  code: "",
  name: "",
  alwaySend: "",
  space: "",
  data: "",
  csvFormat: "",
};

const createCodeOptions = () => {
  const options = [];
  for (var i = 2; i <= 213; i++) {
    if (optionTypes[i]) {
      options.push({
        key: i,
        text: `${i}-${optionTypes[i].Name}`,
        value: i,
      });
    }
  }
  return options;
};
const options = createCodeOptions();

class OptionForm extends Component {
  state = {
    fields: {
      code: "",
      name: "",
      alwaysSend: "False",
      space: "dhcp4",
      data: "",
      csvFormat: "True",
    },
    type: "",
    errors: {},
    success: false,
    error: false,
  };

  schema = {
    code: Joi.number().min(2).max(214).required().label("DHCP Option Code"),
    name: Joi.string().required().label("Name"),
    alwaysSend: Joi.string().required().label("Always Send"),
    space: Joi.string().required().label("Space"),
    data: Joi.string().required().label("Data"),
    csvFormat: Joi.string().required().label("CSV Format?"),
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

    const optionList = [fields];
    return optionList;
  };
  handleChange = (e, { name, value }) => {
    e.preventDefault();
    const fields = { ...this.state.fields };
    fields[name] = value;

    if (name === "code") {
      fields["name"] = optionTypes[value].Name;
      this.setState({ type: optionTypes[value].Type });
    }
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
      code,
      name,
      alwaysSend,
      space,
      data,
      csvFormat,
    } = this.state.fields;

    const { type, errors } = this.state;

    console.log(this.state.fields);
    return (
      <div>
        <Header as="h5" dividing color="grey">
          Add Subnet Option
        </Header>
        <br />

        <Form success onSubmit={this.handleSubmit}>
          <Form.Group>
            <Popup
              trigger={
                <Form.Field required>
                  <label>DHCP Option Code</label>
                  <Form.Select
                    options={options}
                    placeholder="Code"
                    name="code"
                    value={code}
                    onChange={this.handleChange}
                    error={errors.code}
                  />
                </Form.Field>
              }
              content="Choose kea DHCP option code. Name and type fields will be auto filled"
              size="mini"
            />

            <Popup
              trigger={
                <Form.Field width="4">
                  <label>Name</label>
                  <Form.Input
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                    error={errors.name}
                    disabled={true}
                  />
                </Form.Field>
              }
              content="Kea DHCP option name"
              size="mini"
            />
            <Popup
              trigger={
                <Form.Field width="4">
                  <label>Type</label>
                  <Form.Input name="type" value={type} disabled={true} />
                </Form.Field>
              }
              content="Kea DHCP option type"
              size="mini"
            />
          </Form.Group>

          <Form.Group widths="2">
            <Popup
              trigger={
                <Form.Field required>
                  <label>Always Send</label>
                  <Form.Input
                    placeholder="Always Send"
                    name="alwaysSend"
                    value={alwaysSend}
                    onChange={this.handleChange}
                    error={errors.alwaysSend}
                  />
                </Form.Field>
              }
              content="Always send?"
              size="mini"
            />
            <Popup
              trigger={
                <Form.Field required>
                  <label>Space</label>
                  <Form.Input
                    placeholder="Space"
                    name="space"
                    value={space}
                    onChange={this.handleChange}
                    error={errors.space}
                  />
                </Form.Field>
              }
              content="dhcp4 or dhcp6?"
              size="mini"
            />
            <Popup
              trigger={
                <Form.Field required>
                  <label>CSV Format?</label>
                  <Form.Input
                    placeholder="CSV Format?"
                    name="csvFormat"
                    value={csvFormat}
                    onChange={this.handleChange}
                    error={errors.csvFormat}
                  />
                </Form.Field>
              }
              content="true or false?"
              size="mini"
            />
          </Form.Group>
          <Popup
            trigger={
              <Form.Field required width="6">
                <label>Data</label>
                <Form.Input
                  placeholder="10.189.136.37, 10.189.136.165,.."
                  name="data"
                  value={data}
                  onChange={this.handleChange}
                  error={errors.data}
                />
              </Form.Field>
            }
            content="Comma separated string"
            size="mini"
          />
          <Form.Button
            content="Submit"
            primary
            type="submit"
            disabled={!code || !data}
          />
        </Form>
      </div>
    );
  }
}

export default OptionForm;
