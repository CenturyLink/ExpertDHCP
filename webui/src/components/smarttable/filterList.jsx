import React, { Component } from "react";
import { Input } from "semantic-ui-react";

class FilterList extends Component {
  state = { filterStr: "" };
  render() {
    const { elements } = this.props;
    const { filterStr } = this.state;

    let filteredElements = [];

    try {
      filteredElements = elements
        .filter((e) => e.label.includes(filterStr))
        .map((e, index) => (
          <div role="listitem" className="item" key={index}>
            <a
              className="header"
              // href="" --- !!! this single line will cause unintended browser reload.
              onClick={() => this.props.onSelectItem(e.id)}
            >
              {e.header}
            </a>
            <a
              className="description"
              onClick={() => this.props.onSelectItem(e.id)}
            >
              {e.desc}
            </a>
          </div>
        ));
    } catch (error) {
      console.log("Unable to display items", error);
    }

    return (
      <div>
        <Input
          value={filterStr}
          onChange={(e) => this.setState({ filterStr: e.target.value })}
          icon="search"
          iconPosition="left"
          placeholder="Search..."
          fluid
        />
        <div role="list" className="ui divided list">
          {filteredElements}
        </div>
      </div>
    );
  }
}

export default FilterList;
