import React, { Component } from "react";
import ServersTable from "./tables/serversTable";
import SearchBox from "./common/searchBox";
import { paginate } from "./../utils/paginate";
import _ from "lodash";
import { Header, Dropdown } from "semantic-ui-react";
import Pagination from "./common/pagination";
import { connect } from "react-redux";
import { changeLab } from "../store/labs";
import { getCurrentServers } from "../services/serverService";

class Servers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servers: getCurrentServers(props.labs.currentLab),
      currentPage: 1,
      pageSize: 8,
      searchQuery: "",
      sortColumn: { path: "title", order: "asc" },
    };
  }

  componentDidMount() {
    this.setState({ servers: getCurrentServers(this.props.labs.currentLab) });
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.labs !== prevProps.labs) {
      this.setState({ servers: getCurrentServers(this.props.labs.currentLab) });
    }
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      servers: allServers,
    } = this.state;

    let filtered = allServers;
    if (searchQuery)
      filtered = allServers.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const data = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data };
  };

  createLabOptions = (labs) => {
    const options = [];
    for (let lab of labs) {
      options.push({
        key: lab.id,
        text: lab.location,
        value: lab.id,
      });
    }
    return options;
  };

  render() {
    const { length: count } = this.state.servers;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no servers in the database.</p>;
    const { totalCount, data: servers } = this.getPagedData();

    console.log("ST Servers", servers);
    return (
      <>
        <Dropdown
          button
          className="icon"
          labeled
          icon="world"
          // basic
          options={this.createLabOptions(this.props.labs.list)}
          text={this.props.labs.currentLab.location}
          onChange={(e, { value }) => {
            this.props.changeLab(value);
            // window.location = "/servers";
          }}
        />

        <Header as="h3" dividing color="teal">
          {/* Servers */}
        </Header>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <ServersTable
          servers={servers}
          labId={this.props.labs.currentLab.id}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onClose={this.props.onClose}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    labs: state.entities.labs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLab: (id) => {
      dispatch(changeLab(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Servers);
