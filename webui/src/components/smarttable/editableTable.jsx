import React, { Component } from "react";
import { optionTypes } from "../../config/optionTypes.json";
import {
  optionData,
  optionDef,
  pools,
  reservations,
  mandatoryFields,
} from "../../config/objectTemplates.json";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Button, Dropdown, Label, Popup, List } from "semantic-ui-react";
import ArraySelectModal from "./arraySelectModal";
import MultipleChoice from "./multipleChoice";
import ModalItem from "./../common/modalItem";
import { getPallete } from "../../services/utilityService";

const boolOptions = [
  { key: "True", text: "true", value: true },
  { key: "False", text: "false", value: false },
];

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

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

const isArray = (item) => {
  if (typeof item === "object") {
    if (Object.prototype.toString.call(item) === "[object Array]") return true;
  }
  return false;
};

const emptyObjects = {
  "option-data": optionData,
  "option-def": optionDef,
  pools: pools,
  reservations: reservations,
};

const get3ColumArray = (subnetDict) => {
  const fields = [];

  for (const [key, value] of Object.entries(subnetDict)) {
    let fieldType = typeof value;

    if (isArray(value)) fields.push([key, "array", value]);
    else fields.push([key, fieldType, value]);
  }
  return fields;
};

class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: props.values,
      edit: props.edit ? props.edit : false,
      title: props.title,
      readOnly: props.readOnly,
      showModal: false,
      showConfirm: false,
      forceRender: true,
      level: props.level,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.values !== this.props.values) {
      this.setState({ values: this.props.values });
    }
    if (prevProps.title !== this.props.title) {
      this.setState({ title: this.props.title });
    }
  }

  renderValidationError = (type, name, key) => {
    let title = name;
    if (name.startsWith("+")) title = name.slice(2);

    const mandatory = mandatoryFields[title];

    let direction = "above";
    let typeInfo = "";

    if (type === "array" || type === "object") direction = "left";
    if (type === "array" || type === "object") typeInfo = type;

    if (mandatory && mandatory.includes(key)) {
      return (
        <Label basic color="red" pointing={direction}>
          {`${key} can't be empty ${typeInfo}`}
        </Label>
      );
    }
  };

  validateTable = (name, values) => {
    const mandatory = mandatoryFields[name];
    let errors = 0;
    let errorString = "";

    for (const [key, value] of Object.entries(values)) {
      if (mandatory && mandatory.includes(key)) {
        if (
          (typeof value === "string" && value === "") ||
          (typeof value === "number" && value === -1) ||
          (typeof value === "object" && isArray(value) && value.length === 0) ||
          (typeof value === "object" && !isArray(value) && isEmpty(value))
        ) {
          errors++;
          errorString += `${key}, `;
        }
      }
    }

    errorString = `fields [ ${errorString.slice(0, -2)} ] are mandatory!`;
    console.log("errorString", errorString);

    if (errors > 0) {
      toast.error(errorString);
      return false;
    }
    return true;
  };

  clientClassOptions = () => {
    let options = [];
    if (!this.props.clientClasses) return [];

    this.props.clientClasses.map((cc, index) => {
      options.push({
        key: index,
        text: cc["name"],
        value: cc["name"],
      });
    });

    return options;
  };

  updateValues = (name, value) => {
    // console.log(name, value);

    const values = { ...this.state.values };
    values[name] = value;
    if (this.isOptionData() && name === "code") {
      values["name"] = optionTypes[value].Name;
    }
    this.setState({ values });
  };

  isOptionData = () => {
    const { title } = this.props;

    if (title) {
      if (title.includes("option-data")) return true;
      else return false;
    } else return false;
  };

  renderModal = (elementType, name, data) => {
    const pallete = getPallete();
    return (
      <>
        {this.state.showModal === name && (
          <ArraySelectModal
            data={data}
            elementType={elementType}
            name={name}
            title={name}
            submit={false}
            onSelectItem={(arrayItem, index) => {
              this.props.onStackPush(name, arrayItem, this.props.level, index);
              this.setState({ showModal: false });
            }}
            onCloseModal={() => this.setState({ showModal: false })}
          />
        )}
        <Popup
          size="mini"
          trigger={
            <Button
              style={{
                background: `${pallete ? pallete["themeColor#1"] : "blue"}`,
                color: `${pallete ? pallete["themeColor#3"] : "white"}`,
              }}
              size="mini"
              // icon="eye"
              content={
                data.length <= 1
                  ? `${data.length} item`
                  : `${data.length} items`
              }
              compact
              // disabled={data.length === 0 ? true : false}
              onClick={() => {
                this.setState({ showModal: name });
              }}
            />
          }
        >
          Click to view
        </Popup>
      </>
    );
  };

  renderObject = (name, value) => {
    const data = get3ColumArray(value);
    return (
      <>
        <Popup
          hoverable
          trigger={
            <>
              <Button
                size="mini"
                basic
                icon="eye"
                onClick={() =>
                  this.props.onStackPush(name, value, this.props.level, -1)
                }
              />

              {isEmpty(value) &&
                this.renderValidationError("object", this.props.title, name)}
            </>
          }
        >
          <EditableTable values={data} readOnly={true} />
        </Popup>
      </>
    );
  };

  renderClientClass = (name, value, edit) => {
    if (edit) {
      return (
        <Dropdown
          placeholder="choose"
          basic
          selection
          multiple
          onChange={(e, { value }) => {
            this.updateValues(name, value);
          }}
          options={this.clientClassOptions()}
        />
      );
    }

    return (
      <List celled size="small">
        {value &&
          value.map((item, index) => <List.Item key={index}>{item}</List.Item>)}
      </List>
    );
  };

  renderIpList = (name, value, edit) => {
    if (edit) {
      return (
        <MultipleChoice
          value={value}
          onSubmit={(values) => this.updateValues(name, values)}
        />
      );
    }
    return (
      <List celled size="small">
        {value &&
          value.map((item, index) => <List.Item key={index}>{item}</List.Item>)}
      </List>
    );
  };

  renderArray = (name, value, edit) => {
    if (name === "client-classes") {
      return this.renderClientClass(name, value, edit);
    }

    if (name === "ip-addresses") {
      return this.renderIpList(name, value, edit);
    }

    if (value.length > 0 && typeof value[0] === "string") {
      return this.renderModal("string", name, { item: name });
    }

    return (
      <>
        {this.renderModal("object", name, value)}
        {!this.props.readOnly && (
          <Popup
            size="mini"
            trigger={
              <Button
                icon="plus"
                positive
                compact
                size="mini"
                // floated="right"
                onClick={() => {
                  this.props.onStackPush(
                    `+ ${name}`,
                    emptyObjects[name],
                    this.props.level,
                    -2
                  );
                  // this.props.onUpdate(this.props.level, this.state.values);
                }}
              />
            }
          >{`Add new ${
            name
              ? name.endsWith("es")
                ? name.slice(0, -2)
                : name.endsWith("s")
                ? name.slice(0, -1)
                : name
              : ""
          }`}</Popup>
        )}
        {value.length === 0 &&
          this.renderValidationError("array", this.props.title, name)}
      </>
    );
  };

  renderBoolean = (name, value, edit) => {
    if (edit) {
      return (
        <Dropdown
          placeholder="State"
          selection
          fluid
          onChange={(e, { value }) => {
            this.updateValues(name, value);
          }}
          value={value}
          options={boolOptions}
        />
      );
    }

    return <>{value ? "true" : "false"}</>;
  };

  renderOptionCode = (name, value, edit) => {
    if (edit) {
      return (
        <Dropdown
          placeholder="choose"
          basic
          selection
          fluid
          onChange={(e, { value }) => {
            this.updateValues(name, parseInt(value));
          }}
          options={createCodeOptions()}
        />
      );
    }
    return <>{value}</>;
  };

  renderNumber = (name, value, edit) => {
    if (this.isOptionData() && name === "code") {
      return this.renderOptionCode(name, value, edit);
    }
    if (edit) {
      return (
        <>
          <div className="ui mini input " style={{ width: "100%" }}>
            <input
              type="text"
              value={value > 0 ? value : ""}
              placeholder={value > 0 ? value : ""}
              onChange={(e) => {
                this.updateValues(name, parseInt(e.target.value) || -1);
              }}
            ></input>
          </div>
          {value === -1 &&
            this.renderValidationError("number", this.props.title, name)}
        </>
      );
    }
    return <>{value}</>;
  };
  renderString = (name, value, edit) => {
    if (this.isOptionData() && name === "name") {
      return <>{value}</>;
    }

    if (edit) {
      return (
        <>
          <div className="ui mini input" style={{ width: "100%" }}>
            <input
              type="text"
              value={value}
              placeholder={value}
              onChange={(e) => {
                this.updateValues(name, e.target.value);
              }}
            ></input>
          </div>
          {value === "" &&
            this.renderValidationError("string", this.props.title, name)}
        </>
      );
    }
    return <>{value} </>;
  };

  renderValue = (row, edit) => {
    const [name, type, value] = row;

    return (
      <>
        {type === "string" && this.renderString(name, value, edit)}
        {type === "number" && this.renderNumber(name, value, edit)}
        {type === "boolean" && this.renderBoolean(name, value, edit)}
        {type === "array" && this.renderArray(name, value, edit)}
        {type === "object" && this.renderObject(name, value)}
      </>
    );
  };

  renderSideButtons = (values, edit) => {
    const pallete = getPallete();
    return (
      <Button.Group size="mini" vertical>
        <Popup
          size="mini"
          trigger={
            <Button
              icon="minus"
              color="blue"
              style={{
                background: `${pallete ? pallete["themeColor#1"] : "teal"}`,
              }}
              compact
              onClick={() => {
                this.props.onStackPop(this.props.level);
              }}
            />
          }
        >
          minimize
        </Popup>
        {!edit && (
          <Popup
            size="mini"
            trigger={
              <Button
                icon="edit"
                // style={{
                //   background: `${pallete ? pallete["themeColor#3"] : "teal"}`,
                //   color: `${pallete ? pallete["themeColor#1"] : "teal"}`,
                // }}
                color="grey"
                compact
                onClick={() => {
                  this.setState({ edit: true });
                }}
                disabled={this.props.disableEdit}
              />
            }
          >
            edit
          </Popup>
        )}
        {edit && (
          <Popup
            size="mini"
            trigger={
              <Button
                color="green"
                icon="check"
                compact
                onClick={() => {
                  if (this.validateTable(this.props.title, values)) {
                    this.setState({ edit: false });
                    this.props.onUpdate(this.props.level, values);
                  }
                }}
              />
            }
          >
            update
          </Popup>
        )}
        <Popup
          size="mini"
          trigger={
            <Button
              icon="trash"
              color="red"
              compact
              floated="right"
              size="mini"
              onClick={() => {
                if (this.props.title.startsWith("+")) {
                  this.props.onStackPop(this.props.level);
                } else {
                  // alert(`Delete ${this.props.title}?`);
                  this.setState({ showConfirm: true });
                }
              }}
            />
          }
        >
          delete
        </Popup>
        )
      </Button.Group>
    );
  };

  renderHeaders = () => {
    return (
      <thead className="ui mini">
        <tr className="">
          <th style={{ width: "22%" }}>item</th>
          <th style={{ width: "21%" }}>data type</th>
          <th style={{ width: "56%" }}>value</th>
        </tr>
      </thead>
    );
  };

  renderTopRibbon = (labelColor) => {
    return (
      <Label
        // style={{ height: "50%" }}
        attached="top left"
        style={{
          background: labelColor,
          color: "white",
        }}
        size="small"
        ribbon
      >
        {this.props.title}
      </Label>
    );
  };

  render() {
    const { edit, values, title, readOnly, showConfirm } = this.state;

    // input to this component will always be an object and here this
    // object will be converted to array of 3 column objects.
    const valueArray = get3ColumArray(values);
    const pallete = getPallete();

    // existing object: grey, new object: green.
    let labelColor = pallete ? pallete["themeColor#1"] : "grey";
    // if (title) {
    //   labelColor = this.props.title.startsWith("+") ? "green" : labelColor;
    // }

    // read only objects are the ones which will show on hover. It doesn't
    // require any buttons.
    const tableClass = this.props.readOnly ? "table" : "table-left";

    return (
      <>
        {showConfirm && (
          <ModalItem
            data={`Confirm delete ${this.props.title}?`}
            displayType="confirm"
            name={`${
              this.props.title === "subnet" ? values.subnet : this.props.title
            }`}
            title={`Confirm delete ${this.props.title}?`}
            submit={true}
            deleteObject={values}
            onSubmit={() => {
              this.props.onDelete(this.props.level);
              this.setState({ showConfirm: false });
            }}
            onCloseModal={() => {
              this.setState({ showConfirm: false });
            }}
          />
        )}
        {!readOnly && !showConfirm && this.renderTopRibbon(labelColor)}
        <div>
          <div className={tableClass}>
            <table className="ui celled grey table-striped table-fixed table">
              {this.renderHeaders()}
              <tbody className="ui mini ">
                {valueArray &&
                  valueArray.map((row, key) => (
                    <tr className="" key={key}>
                      <td className="">{row[0]}</td>
                      <td className="">{row[1]}</td>
                      <td className="td">{this.renderValue(row, edit)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="ui mini buttons-right">
            {!readOnly && this.renderSideButtons(values, edit)}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clientClasses: state.entities.subnets.clientClasses,
  };
};

export default connect(mapStateToProps, null)(EditableTable);
