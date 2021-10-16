import React, { Component } from "react";
import { Icon, Dropdown, Button, Menu, Popup } from "semantic-ui-react";
import { toggleSideMenu } from "../../store/layouts/sidemenu";
import { searchByText } from "../../store/layouts/search";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changeLab } from "../../store/labs";
import ModalItem from "../common/modalItem";
import { getPallete } from "../../services/utilityService";

class TopMenu extends Component {
  state = {
    serversModal: false,
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  componentDidMount() {
    this.setState({ user: this.props.user });
  }

  doSearch(event) {
    this.props.searchAction(event.target.value);
  }

  render() {
    const { currentServer } = this.props.labs;

    const { user, serversModal } = this.state;

    const pallete = getPallete();

    if (serversModal) {
      return (
        <ModalItem
          // data={`Delete ${this.props.title}?`}
          displayType="serverSelect"
          name={"dump"}
          title="Choose Server"
          // submit={true}
          // onSubmit={() => {
          //   this.props.onDelete(this.props.level);
          //   this.setState({ showConfirm: false });
          // }}
          onCloseModal={() => {
            this.setState({ serversModal: false });
          }}
        />
      );
    }

    return (
      <Menu
        fixed="top"
        className="top-menu"
        inverted
        style={{
          background: `${pallete ? pallete["themeColor#1"] : "teal"}`,
        }}
        borderless
        tabular
      >
        {user && (
          <Menu.Item>
            <div
              className="display-inline logo-space"
              style={{ color: `${pallete ? pallete["title"] : "teal"}` }}
            >
              EXPERT DHCP
            </div>
          </Menu.Item>
        )}
        {user && (
          <Menu.Item
            fitted="horizontally"
            style={{ padding: null }}
            onClick={() => this.props.toggleSideMenu()}
          >
            <Icon name="bars" size="large" />
          </Menu.Item>
        )}

        <Menu.Menu position="right">
          <>
            <Menu.Item
              className="no-border"
              position="right"
              fitted="horizontally"
            >
              <Link to="/documentation" style={{ paddingRight: 20 }}>
                Documentation
              </Link>
            </Menu.Item>
            {user && (
              <Menu.Item
                className="no-border"
                position="right"
                fitted="horizontally"
              >
                <>
                  <Button.Group labeled size="tiny" compact>
                    <Popup
                      size="mini"
                      trigger={
                        <Button
                          content={
                            currentServer ? currentServer.ip : "Not Selected"
                          }
                          onClick={() => this.setState({ serversModal: true })}
                          style={{
                            background: `${
                              pallete ? pallete["themeColor#3"] : "#62d2a2"
                            }`,
                            color: `${pallete ? pallete["title"] : "white"}`,
                          }}
                        />
                      }
                    >
                      Click to change server
                    </Popup>
                  </Button.Group>
                </>
              </Menu.Item>
            )}
            {user && (
              <Menu.Item
                className="no-border"
                position="right"
                fitted="horizontally"
              >
                <Dropdown
                  icon="user"
                  pointing
                  className="link item"
                  style={{
                    color: `${pallete ? pallete["title"] : "teal"}`,
                  }}
                >
                  <Dropdown.Menu>
                    <Dropdown.Header>{`Logged in as ${user.toUpperCase()}`}</Dropdown.Header>
                    <Dropdown.Item as={Link} to="/logout" name="Logout">
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            )}
          </>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selection: state.layouts.search.selection,
    labs: state.entities.labs,
    smallMenu: state.layouts.sidemenu.smallMenu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchAction: (text) => {
      dispatch(searchByText(text));
    },
    toggleSideMenu: () => {
      dispatch(toggleSideMenu());
    },
    changeLab: (id) => {
      dispatch(changeLab(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
