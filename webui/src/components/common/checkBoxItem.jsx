import React, { Component } from "react";

class CheckBoxItem extends Component {
  state = { value: this.props.item.value };

  render() {
    const { item, onChangeItem } = this.props;
    return (
      <div>
        <p>
          <input
            id="checkbox_id"
            type="checkbox"
            checked={item.value}
            onChange={() => onChangeItem(item.id)}
          />
          &nbsp;
          <label htmlFor="checkbox_id">{item.name}</label>
        </p>
      </div>
    );
  }
}

export default CheckBoxItem;
