import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  createKey = (index, column) => {
    return index + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data &&
          data.map((item, index) => (
            <tr key={index}>
              {columns &&
                columns.map((column, index) => (
                  <td key={this.createKey(index, column)}>
                    {this.renderCell(item, column)}
                  </td>
                ))}
            </tr>
          ))}
      </tbody>
    );
  }
}

export default TableBody;
