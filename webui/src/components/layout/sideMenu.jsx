import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllServers } from "../../services/serverService";
import TextIcon from "./textIcon";
import CenterLoader from "components/common/centerLoader";
import { toggleSideMenu } from "../../store/layouts/sidemenu";
import { changeSelection } from "../../store/layouts/search";
import { getServerStats } from "../../store/labs";
import { getPallete } from "../../services/utilityService";
import "./styles.css";

class SideMenu extends Component {
  state = {
    // activeItem: window.location.href.substring(
    //   window.location.href.lastIndexOf("/") + 1
    // ),
    activeItem: this.props.selection,
    user: this.props.user,
    serverStatus: this.props.serverStatus,
  };

  componentWillMount = () => {
    try {
      this.setState({
        user: this.props.user,
        serverStatus: this.props.serverStatus,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      try {
        this.setState({ user: this.props.user });
      } catch (error) {
        //
      }
    }
    if (this.props.serverStatus !== prevProps.serverStatus) {
      this.setState({ serverStatus: this.props.serverStatus });
    }

    if (this.props.selection !== prevProps.selection) {
      this.setState({ activeItem: this.props.selection });
    }
  }

  serverTable = () => {
    const labs = this.props.labs;
    const servers = getAllServers(labs);
    let serverList = [["IP", "Status", "Name", "Lab"]];

    for (let server of servers) {
      serverList.push([server.ip, { v: -1, f: "" }, server.title, server.lab]);
    }

    return serverList;
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.changeSelection(name);
  };
  changeSize = () => this.setState({ smallSidebar: !this.props.smallMenu });

  getMenu() {
    const { activeItem } = this.state;
    const pallete = getPallete();
    return (
      <Menu
        fixed="left"
        borderless
        // inverted
        floated
        style={{ color: `${pallete ? pallete["themeColor#1"] : "teal"}` }}
        className={(this.props.smallMenu ? "small-side" : "") + " side"}
        vertical
      >
        <Menu.Item
          as={Link}
          to={"/dashboard"}
          name="dashboard"
          active={activeItem === "dashboard"}
          onClick={this.handleItemClick}
        >
          <TextIcon
            hideText={this.props.smallMenu}
            name="columns"
            style={{
              background: `${pallete ? pallete["themeColor#1"] : "teal"}`,
            }}
          >
            Dashboard
          </TextIcon>
        </Menu.Item>

        <Menu.Item
          as={Link}
          to={"/servers"}
          name="servers"
          active={activeItem === "servers"}
          onClick={this.handleItemClick}
        >
          <TextIcon
            hideText={this.props.smallMenu}
            name="server"
            style={{
              background: `${pallete ? pallete["themeColor#1"] : "teal"}`,
            }}
          >
            DHCP Server
          </TextIcon>
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    // if (!this.props.user) {
    //   return <>{this.props.children}</>;
    // }

    return (
      <div className="parent">
        <div className={(this.props.smallMenu ? "small-side " : "") + "side"}>
          {this.getMenu()}
        </div>
        <div
          className={(this.props.smallMenu ? "small-content " : "") + "content"}
        >
          {this.state.user && this.props.children}
          {!this.state.user && <CenterLoader message="Loading..." />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    smallMenu: state.layouts.sidemenu.smallMenu,
    selection: state.layouts.search.selection,
    labs: state.entities.labs.list,
    serverStatus: state.entities.labs.serverStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSideMenu: () => {
      dispatch(toggleSideMenu());
    },
    changeSelection: (name) => {
      dispatch(changeSelection(name));
    },
    getServerStatus: (server) => {
      dispatch(getServerStats(server));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
