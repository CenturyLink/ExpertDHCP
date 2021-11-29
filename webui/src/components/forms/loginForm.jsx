import React, { Component } from "react";
import { connect } from "react-redux";
import Joi from "joi-browser";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { loginUser } from "../../store/users";
import { getPallete } from "../../services/utilityService";

const MODULE_NAME = "LoginForm";

const emptyFields = {
  username: "",
  password: "",
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        username: "",
        password: "",
      },

      errors: {},
      success: false,
      error: false,
    };
  }

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
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

  createBranchOptions = (branches) => {
    const options = [];
    for (let branch of branches) {
      options.push({
        key: branch._id,
        text: branch.name,
        value: branch._id,
      });
    }
    return options;
  };

  handleChange = (e, { name, value }) => {
    if (this.state.error) this.setState({ errors: {}, error: false });
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
      console.log(`${MODULE_NAME}: Validation Failed`, errors);
      this.setState({ error: true });
      return null;
    }
    this.props.handleSubmit(this.state.fields);
    this.setState({ success: true });
    this.setState({ fields: emptyFields });
  };

  render() {
    const { username, password } = this.state.fields;

    const { authenticating } = this.props;

    const { errors } = this.state;

    let pallete = getPallete();

    return (
      <div style={{ background: pallete["themeColor#1"] }}>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Segment raised>
              <Header
                as="h2"
                style={{
                  color: pallete["themeColor#1"],
                }}
                textAlign="center"
              >
                Expert DHCP
              </Header>
              <Form size="large" success onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                    name="username"
                    style={{
                      background: pallete["themeColor#1"],
                      color: pallete["themeColor#1"],
                    }}
                    value={username}
                    onChange={this.handleChange}
                    error={errors.username}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    name="password"
                    style={{
                      background: pallete["themeColor#1"],
                      color: pallete["themeColor#1"],
                    }}
                    value={password}
                    onChange={this.handleChange}
                    error={errors.password}
                  />
                  {!authenticating && (
                    <Form.Button
                      content="Login"
                      style={{
                        background: pallete["themeColor#1"],
                        color: pallete["themeColor#3"],
                      }}
                      type="submit"
                      fluid
                      size="large"
                    />
                  )}
                  {authenticating && (
                    <Button
                      loading
                      style={{
                        color: pallete["themeColor#3"],
                        background: pallete["themeColor#1"],
                      }}
                      size="large"
                      fluid
                    >
                      Loading
                    </Button>
                  )}
                </Segment>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticating: state.entities.users.logingOn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (credentials) => {
      console.log("credentials", credentials);
      dispatch(loginUser(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
