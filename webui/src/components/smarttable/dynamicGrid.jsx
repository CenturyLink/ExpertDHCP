import React, { Component } from "react";
import Stack from "./../../utils/stack";
import _ from "lodash";
import { Grid, Button, Message, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import EditableTable from "./editableTable";
import ModalItem from "./../common/modalItem";
import { getPallete } from "../../services/utilityService";

const times = (x) => (f) => {
  if (x > 0) {
    f();
    times(x - 1)(f);
  }
};

class DynamicGrid extends Component {
  state = {
    initialState: this.props.json,
    stack: new Stack(),
    editable: this.props.editable,
  };

  componentWillMount() {
    this.state.stack.push(this.props.json);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.json !== this.props.json) {
      const { stack } = this.state;
      try {
        times(stack.stackSize())(() => stack.pop());
        stack.push(this.props.json);
      } catch (error) {
        console.log("Exception in DynamicGrid [componentDidUpdate]", error);
      }
      this.setState({ stack, initialState: this.props.json });
    }
  }

  jsonDiff = (obj1, obj2) => {
    const result = {};
    try {
      if (Object.is(obj1, obj2)) {
        return undefined;
      }
      if (!obj2 || typeof obj2 !== "object") {
        return obj2;
      }
      Object.keys(obj1 || {})
        .concat(Object.keys(obj2 || {}))
        .forEach((key) => {
          if (obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
            result[key] = obj2[key];
          }
          if (typeof obj2[key] === "object" && typeof obj1[key] === "object") {
            const value = this.jsonDiff(obj1[key], obj2[key]);
            if (value !== undefined) {
              result[key] = value;
            }
          }
        });
    } catch (error) {
      console.log("Exception in DynamicGrid[jsonDiff]", error);
    }

    return result;
  };

  renderModal = (json) => {
    const not_updated = _.isEqual(json, this.props.json.value);
    const pallete = getPallete();
    return (
      <>
        <Button
          color={not_updated ? "grey" : "red"}
          // style={{
          //   background: `${
          //     not_updated
          //       ? pallete
          //         ? pallete["themeColor#1"]
          //         : "green"
          //       : pallete
          //       ? pallete["negativeBtn"]
          //       : "red"
          //   }`,
          //   color: `${pallete ? pallete["themeColor#3"] : "green"}`,
          // }}
          floated="right"
          size="mini"
          content={not_updated ? "json" : "update"}
          compact
          onClick={() => {
            this.setState({ showModal: true });
          }}
        />

        <Button
          floated="right"
          size="mini"
          content={"diff"}
          compact
          style={{
            background: `${pallete ? pallete["themeColor#1"] : "green"}`,
            color: `${pallete ? pallete["themeColor#3"] : "green"}`,
          }}
          onClick={() => {
            this.setState({ showDiff: true });
          }}
        />

        {!not_updated && (
          <Button
            style={{
              background: `${pallete ? pallete["themeColor#1"] : "grey"}`,
              color: `${pallete ? pallete["themeColor#3"] : "white"}`,
            }}
            floated="right"
            size="mini"
            content={"reset"}
            compact
            onClick={() => {
              const { stack } = this.state;
              while (!stack.isEmpty()) {
                stack.pop();
              }
              stack.push(this.props.json);
              this.setState({ stack });
            }}
          />
        )}

        {this.state.showModal && (
          <ModalItem
            data={json}
            name={this.props.json.title}
            displayType="json"
            title={`${this.props.json.title.toUpperCase()}`}
            submit={not_updated ? false : true}
            submitText="Submit"
            onSubmit={() => this.props.onUpdate(json)}
            onCloseModal={() => this.setState({ showModal: false })}
          />
        )}
        {this.state.showDiff && (
          <ModalItem
            name={null}
            displayType="json"
            data={this.jsonDiff(this.props.json.value, json)}
            title={"Diff"}
            submit={false}
            onCloseModal={() => this.setState({ showDiff: false })}
          />
        )}
      </>
    );
  };

  doUpdateStack = (level, updated_obj) => {
    const { stack } = this.state;

    if (stack.stackSize() === 1) {
      //update happened in the first level.
      const item = stack.pop();
      const new_item = {
        title: item.title,
        value: updated_obj,
        index: item.index,
      };
      stack.push(new_item);
    } else {
      const tempStack = new Stack();
      const levelFromTop = stack.stackSize() - level;

      let l = 0;

      // replace the new item in the appropriate level.

      try {
        while (!stack.isEmpty()) {
          const popped = stack.pop();
          if (l == levelFromTop) {
            // push the new object instead of original to temp stack
            const new_item = {
              title: popped.title,
              value: updated_obj,
              index: popped.index,
            };
            tempStack.push(new_item);
          } else tempStack.push(popped);
          l = l + 1;
        }
        while (!tempStack.isEmpty()) {
          stack.push(tempStack.pop());
        }

        // console.log("Stack now", stack.cloneArray());

        // attach the updated object to it's previous level.
        l = 1;
        let popped = stack.pop();
        tempStack.push(popped);

        let latest_value = popped.value;

        while (!stack.isEmpty()) {
          const peek = stack.peek();
          if (peek) {
            const new_obj = {};
            for (const [key, value] of Object.entries(peek.value)) {
              const title =
                popped.index === -2 ? popped.title.slice(2) : popped.title;
              if (key === title) {
                if (popped.index === -2) {
                  // item is new one. value must be an array
                  // console.log("Update new object");
                  const new_arr = [];
                  for (let i in value) {
                    new_arr.push(value[i]);
                  }
                  new_arr.push(latest_value);
                  new_obj[title] = new_arr;
                } else if (popped.index === -1) {
                  // item to update is an object.
                  // console.log("updating object");
                  new_obj[title] = latest_value;
                } else {
                  // item to update is array

                  const new_arr = [];
                  for (let i in value) {
                    if (i == popped.index) {
                      // console.log("updating array", i);
                      new_arr.push(latest_value);
                    } else {
                      new_arr.push(value[i]);
                    }
                  }
                  new_obj[title] = new_arr;
                }
              } else {
                new_obj[key] = value;
              }
            }
            const new_item = {
              title: peek.title,
              value: new_obj,
              index: peek.index,
            };
            console.log("stacks", stack.cloneArray(), tempStack.cloneArray());
            tempStack.push(new_item);
            latest_value = new_obj;
          }
          popped = stack.pop();
        }

        while (!tempStack.isEmpty()) {
          stack.push(tempStack.pop());
        }
      } catch (error) {
        console.log("Exception in DynamicGrid[doUpdateStack]", error);
      }
    }
    this.setState({ stack });
  };

  doDeleteItem = (level) => {
    const { stack } = this.state;

    if (stack.stackSize() === 1 || level === 1) {
      // delete the entire object
      if (this.props.onDelete) {
        const item = stack.pop();
        this.props.onDelete(item.value);
      }
    } else {
      //deleting single object
      const tempStack = new Stack();
      const levelFromTop = stack.stackSize() - level;
      let l = 0;

      while (l < levelFromTop && !stack.isEmpty()) {
        stack.pop();
        l = l + 1;
      }

      const itemToDelete = stack.pop();

      let last_item = {
        title: itemToDelete.title,
        value: {},
        index: itemToDelete.index,
      };

      let popped;
      let updated = false;

      try {
        while (!stack.isEmpty()) {
          popped = stack.pop();
          const new_obj = {};
          for (const [key, value] of Object.entries(popped.value)) {
            const title =
              last_item.index === -2
                ? last_item.title.slice(2)
                : last_item.title;
            if (key === title) {
              if (last_item.index == -2) {
                // ignore the key
                new_obj[key] = [...value];
              } else if (last_item.index === -1) {
                // item is object
                new_obj[key] = last_item.value;
              } else {
                // list item
                const new_arr = [...value];
                if (!updated) {
                  new_arr.splice(last_item.index, 1);
                  updated = true;
                }
                new_obj[key] = new_arr;
              }
            } else {
              new_obj[key] = value;
            }
          }

          last_item = {
            title: popped.title,
            value: new_obj,
            index: popped.index,
          };

          tempStack.push(last_item);
        }
      } catch (error) {
        console.log("Exception in DynamicGrid[doDeleteItem]", error);
      }

      while (!tempStack.isEmpty()) {
        stack.push(tempStack.pop());
      }
    }

    this.setState({ stack });
  };

  doStackPop = (level) => {
    const { stack } = this.state;
    const size = stack.stackSize();
    times(size - level + 1)(() => stack.pop());
    this.setState({ stack });
    if (this.props.onMinimize) {
      this.props.onMinimize();
    }
  };

  doStackPush = (name, value, level, index) => {
    const { stack } = this.state;
    const size = stack.stackSize();
    times(size - level)(() => stack.pop());
    stack.push({ title: name, value: value, index: index });
    this.setState({ stack });
  };

  render() {
    const { stack, editable } = this.state;
    const stackItems = stack.cloneArray();
    const { errorData, errorStatus } = this.props;

    return (
      <div style={{ paddingLeft: 5 }}>
        {stackItems.length > 0 && this.renderModal(stackItems[0].value)}
        <Grid columns={stackItems.length} divided padded="horizontally">
          <Grid.Row>
            {stackItems &&
              stackItems.map((table, index) => (
                <Grid.Column key={index}>
                  <EditableTable
                    values={table.value}
                    title={table.title}
                    onStackPush={this.doStackPush}
                    onStackPop={this.doStackPop}
                    onUpdate={this.doUpdateStack}
                    onDelete={this.doDeleteItem}
                    level={index + 1}
                    // disableEdit={stackItems.length === index + 1 ? false : true}
                    disableEdit={false}
                    edit={editable}
                  />
                </Grid.Column>
              ))}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorData: state.entities.subnets.errorResponseData,
    errorStatus: state.entities.subnets.errorResponseStatus,
  };
};

export default connect(mapStateToProps, null)(DynamicGrid);
