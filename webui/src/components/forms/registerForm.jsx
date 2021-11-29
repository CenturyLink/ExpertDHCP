import React, { Component } from "react";
import { connect } from "react-redux";
import Joi from "joi-browser";
import { Form, Header } from "semantic-ui-react";
// import logger from "../../services/logService";
import { getLabs, getLabServers } from "./../../services/serverService";

const emptyFields = {
  username: "",
  password: "",
  password_confirmation: "",
  email: "",
  phone: "",
  isAdmin: false,
  permissions: [],
  dateRegistered: "",
};

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        username: "",
        password: "",
        password_confirmation: "",
        email: "",
        phone: "",
        // isAdmin: false,
        permissions: [],
        dateRegistered: new Date(),
      },

      errors: {},
      success: false,
      error: false,
      labs: [],
      password_confirmation: "",
    };
  }

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().min(3).max(15).required(),
    password_confirmation: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .options({ language: { any: { allowOnly: "must match password" } } }),
    email: Joi.label("Email ID"),
    phone: Joi.label("Phone number"),
    // isAdmin: Joi.label("Is Admin"),
    permissions: Joi.label("Permissoins"),
    dateRegistered: Joi.label("dateRegistered"),
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

  handleMultiple = (e, { name, value }) => {
    if (name == "labs") {
      this.setState({ labs: value });
    }
    if (name === "servers") {
      const fields = { ...this.state.fields };
      fields["permissions"] = value;
      this.setState({ fields });
    }
  };

  handleChange = (e, { name, value }) => {
    e.preventDefault();
    const fields = { ...this.state.fields };
    fields[name] = value;
    this.setState({ fields });
  };

  handleCheckBox = (e, { name, checked }) => {
    const fields = { ...this.state.fields };
    fields[name] = checked;
    this.setState({ fields });
  };
  handleSubmit = () => {
    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) {
      console.log("Validation Failed.", errors);
      this.setState({ error: true });
      return null;
    }
    const { password_confirmation, ...fields } = this.state.fields;
    this.props.handleSubmit(fields);
    this.setState({ success: true, labs: [], password_confirmation: "" });
    this.setState({ fields: emptyFields });
  };

  // Update the list upon change in branch
  componentDidUpdate(prevProps) {
    try {
      if (this.props.registered !== prevProps.registered) {
        this.props.history.push("/login");
      }
    } catch (error) {}
  }

  getLabOptions = () => {
    const labs = this.props.labs;
    const options = [];
    for (let lab of labs) {
      options.push({
        key: lab.id,
        text: `${lab.location}`,
        value: lab.id,
      });
    }
    return options;
  };

  getServersOptions = () => {
    const labList = this.state.labs;
    const servers = getLabServers(this.props.labs, labList);
    const options = [];
    for (let server of servers) {
      options.push({
        key: server.id,
        text: `${server.ip}`,
        value: server.ip,
      });
    }
    return options;
  };

  render() {
    const { username, password, email, phone, isAdmin } = this.state.fields;

    const { password_confirmation, errors, labs } = this.state;

    const labOptions = this.getLabOptions();

    const serverOptions = this.getServersOptions();
    return (
      <div>
        <Header content="Register" dividing color="grey"></Header>
        <br />
        <Form success onSubmit={this.handleSubmit}>
          <Form.Field required width={4}>
            <label>Username</label>
            <Form.Input
              placeholder="Username"
              name="username"
              value={username}
              onChange={this.handleChange}
              error={errors.username}
            />
          </Form.Field>
          <Form.Group>
            <Form.Field required width={4}>
              <label>Password</label>
              <Form.Input
                placeholder="Password"
                name="password"
                type="password"
                value={password}
                onChange={this.handleChange}
                error={errors.password}
              />
            </Form.Field>
            <Form.Field required width={4}>
              <label>Confirm Password</label>
              <Form.Input
                placeholder="Confirm Password"
                name="password_confirmation"
                type="password"
                value={password_confirmation}
                onChange={this.handleChange}
                error={errors.password_confirmation}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width={4}>
              <label>Email</label>
              <Form.Input
                placeholder="Email"
                name="email"
                value={email}
                onChange={this.handleChange}
                error={errors.email}
              />
            </Form.Field>
            <Form.Field width={4}>
              <label>Phone</label>
              <Form.Input
                placeholder="Phone"
                name="phone"
                value={phone}
                onChange={this.handleChange}
                error={errors.phone}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group>
            <Form.Field width={4}>
              <label>Permissions: </label>
              <Form.Dropdown
                placeholder="Choose Labs"
                multiple
                selection
                name="labs"
                options={labOptions}
                onChange={this.handleMultiple}
              />
            </Form.Field>
            <Form.Field width={4}>
              <label> </label>
              <br />
              <Form.Dropdown
                placeholder="Choose Servers"
                multiple
                selection
                name="servers"
                options={serverOptions}
                disabled={labs.length === 0 ? true : false}
                onChange={this.handleMultiple}
              />
            </Form.Field>
          </Form.Group>

          {/* <Form.Field width={4}>
            <Form.Checkbox
              label="Is Admin?"
              name="isAdmin"
              checked={isAdmin}
              onChange={this.handleCheckBox}
            />
          </Form.Field> */}

          <Form.Button
            content="Submit"
            primary
            type="submit"
            disabled={!username || !password}
          />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    registered: state.entities.users.registered,
    labs: state.entities.labs.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (formData) => {
      console.log("FORMDATA", formData);
      // dispatch(registerUser(formData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
