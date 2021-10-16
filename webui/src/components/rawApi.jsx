import React, { Component } from "react";
import { connect } from "react-redux";
import { getRawApis } from "../services/apiService";
import ReactJson from "react-json-view";
import CheckBoxItem from "./common/checkBoxItem";
import { fireApi, changeApi } from "../store/rawapi";
import { getPallete } from "../services/utilityService";

import {
  Dropdown,
  Button,
  TextArea,
  Form,
  Label,
  Segment,
  Header,
} from "semantic-ui-react";

const MODULE_NAME = "RawAPI";

const pallete = getPallete();

const apis = getRawApis();
const apiColors = {
  GET: "blue",
  POST: "green",
  DELETE: "red",
  PUT: "black",
};

function isValidJson(json) {
  try {
    JSON.parse(json);
    return true;
  } catch (e) {
    return false;
  }
}

class RawAPI extends Component {
  state = {
    value: this.props.currentApi ? this.props.currentApi.id : "",
    apiMethod: this.props.currentApi ? this.props.currentApi.method : "GET",
    apiUrl: this.props.currentApi ? this.props.currentApi.endpoint : "",
    apiDesc: this.props.currentApi ? this.props.currentApi.desc : "",
    apiInput: this.props.currentInput ? this.props.currentInput : null,
    apiOutput: this.props.currentOutput ? this.props.currentOutput : null,
    InvalidJson: false,
    InvalidJsonError: "",
    boxes: [
      { id: 1, name: "data type", value: false },
      { id: 2, name: "object size", value: false },
      { id: 3, name: "collapsed", value: true },
      { id: 4, name: "clip board", value: false },
    ],
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.processing !== prevProps.processing) {
      //update apiOutput only if 'KO'/'OK'. Ignore error cases.
      console.log(MODULE_NAME + ": " + "API call processed");
      if (this.props.status === "success") {
        this.setState({ apiOutput: this.props.output });
      } else if (this.props.status === "failed") {
        this.setState({ apiOutput: this.props.output });
      }
      this.props.changeApiDetails("NO_CHANGE", "NO_CHANGE", this.props.output);
    }
  };

  handleCheckBoxChange = (boxId) => {
    const boxes = [...this.state.boxes];
    for (const box of boxes) {
      if (box.id === boxId) {
        box.value = !box.value;
      }
    }
    this.setState({ boxes });
  };

  isBoxEnabled = (id) => {
    const box = this.state.boxes.filter((bx) => bx.id === id);
    return box[0].value;
  };

  handleChange = (e, { value }) => {
    let selectedApi = {};
    if (apis) selectedApi = apis.find((api) => api.id === value);
    const apiMethod = selectedApi.method;
    const apiUrl = selectedApi.endpoint;
    const apiDesc = selectedApi.desc;
    this.props.changeApiDetails(selectedApi, null, null);
    this.setState({
      value,
      apiMethod,
      apiUrl,
      apiDesc,
      apiOutput: null,
      apiInput: null,
    });
  };

  handleTextChange = (e, { value }) => {
    if (this.state.InvalidJson)
      this.setState({ InvalidJson: false, InvalidJsonError: "" });

    this.prettyPrint();
    const apiInput = value;
    this.setState({ apiInput });
    let api = {};
    if (apis) api = apis.find((api) => api.id === this.state.value);
    this.props.changeApiDetails(api, apiInput, null);
  };

  handleSubmit = () => {
    const { apiInput, apiMethod, apiUrl } = this.state;

    if (apiMethod === "POST" && (!isValidJson(apiInput) || !apiInput)) {
      alert("Enter a valid JSON");
    } else {
      console.log(MODULE_NAME + ": " + "firing API. URL: ", apiUrl);
      this.props.fireAPI(apiUrl, apiMethod, JSON.parse(apiInput));
    }
  };

  coloredJson = (match, pIndent, pKey, pVal, pEnd) => {
    var key = "<span class=json-key>";
    var val = "<span class=json-value>";
    var str = "<span class=json-string>";
    var r = pIndent || "";
    if (pKey) r = r + key + pKey.replace(/[": ]/g, "") + "</span>: ";
    if (pVal) r = r + (pVal[0] == '"' ? str : val) + pVal + "</span>";
    return r + (pEnd || "");
  };

  prettyPrint = () => {
    // let jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/gm;
    try {
      var ugly = document.getElementById("myTextArea").value;
      var obj = JSON.parse(ugly);

      var pretty = JSON.stringify(obj, undefined, 4);
      document.getElementById("myTextArea").value = pretty;
    } catch (e) {
      this.setState({ InvalidJson: true, InvalidJsonError: e.message });
    }
  };

  createApiOptions = () => {
    let apiOptions = [];
    for (let api of apis) {
      let item = {
        key: api.id,
        value: api.id,
        text: api.text,
      };
      apiOptions.push(item);
    }
    return apiOptions;
  };

  render() {
    const {
      value,
      apiMethod,
      apiUrl,
      inputValue,
      apiOutput,
      boxes,
      InvalidJson,
      InvalidJsonError,
    } = this.state;

    const apiOptions = this.createApiOptions();

    return (
      <>
        <br />
        <div>
          <div className="row">
            <div className="col">
              <Dropdown
                placeholder="Choose API"
                name="api"
                onChange={this.handleChange}
                selection
                options={apiOptions}
                value={value}
              />
            </div>
          </div>
          {value && apiMethod === "POST" && (
            <>
              <br />
              <div class="row">
                <div
                  class="col-10"
                  spellCheck={false}
                  style={{ fontFamily: "Arial" }}
                >
                  <Form>
                    <TextArea
                      as={"textarea"}
                      id="myTextArea"
                      rows="8"
                      placeholder="Place JSON input here"
                      value={inputValue}
                      onChange={this.handleTextChange}
                    />
                  </Form>
                </div>
                <div class="col">
                  <Button
                    // color={InvalidJson ? "red" : "green"}

                    size="mini"
                    style={{
                      cursor: "none",
                      background: `${
                        InvalidJson
                          ? pallete
                            ? pallete["negativeBtn"]
                            : "red"
                          : pallete
                          ? pallete["themeColor#1"]
                          : "green"
                      }`,
                      color: `${pallete ? pallete["themeColor#3"] : "green"}`,
                    }}
                    // onClick={this.prettyPrint}
                  >
                    {InvalidJson ? "Invalid JSON" : "Valid JSON"}
                  </Button>
                </div>
              </div>
            </>
          )}
          {InvalidJson && (
            <div className="row">
              <div className="col">
                <Label
                  basic
                  style={{
                    color: `${pallete ? pallete["negativeBtn"] : "red"}`,
                  }}
                  pointing
                >
                  {InvalidJsonError}
                </Label>
              </div>
            </div>
          )}
          <br />
          <div className="row">
            <div className="col">
              {value && (
                <>
                  {!this.props.processing && (
                    <Button
                      color={apiColors[apiMethod]}
                      onClick={this.handleSubmit}
                    >
                      {apiMethod}
                    </Button>
                  )}
                  {this.props.processing && (
                    <Button loading color={apiColors[apiMethod]}>
                      Loading
                    </Button>
                  )}
                  <Button basic color="black" style={{ cursor: "auto" }}>
                    {apiUrl}
                  </Button>
                </>
              )}
            </div>
          </div>
          <br />
          {apiOutput && (
            <>
              <div className="row">
                <div className="col">
                  <Header dividing content="Response" size="small" />
                </div>
              </div>
              <br />
              <div className="row">
                {boxes &&
                  boxes.map((box, index) => (
                    <div className="col" key={index}>
                      <CheckBoxItem
                        key={box.id}
                        onChangeItem={this.handleCheckBoxChange}
                        item={box}
                      />
                    </div>
                  ))}
                <div className="col-6"></div>
              </div>
              <div className="row">
                <div className="col">
                  <Segment
                    style={{
                      overflow: "auto",
                      height: this.isBoxEnabled(3) ? "30vh" : "80vh",
                    }}
                  >
                    <ReactJson
                      name={false}
                      src={apiOutput}
                      theme="summerfruit:inverted"
                      iconStyle="triangle"
                      displayDataTypes={this.isBoxEnabled(1)}
                      displayObjectSize={this.isBoxEnabled(2)}
                      collapsed={this.isBoxEnabled(3)}
                      enableClipboard={this.isBoxEnabled(4)}
                    />
                  </Segment>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    processing: state.entities.rawapi.processing,
    status: state.entities.rawapi.status,
    output: state.entities.rawapi.output,
    currentApi: state.entities.rawapi.currentApi,
    currentInput: state.entities.rawapi.currentInput,
    currentOutput: state.entities.rawapi.currentOutput,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fireAPI: (apiUrl, apiMethod, apiInput) => {
      dispatch(fireApi(apiUrl, apiMethod, apiInput));
    },
    changeApiDetails: (api, input, output) => {
      dispatch(changeApi(api, input, output));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RawAPI);
