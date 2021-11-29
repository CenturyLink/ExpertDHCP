import React, { Component } from "react";
import ReactTable from "react-table-6";
import CheckBoxItem from "./common/checkBoxItem";
import "react-table-6/react-table.css";
import { connect } from "react-redux";
import IdleTimer from "react-idle-timer";
import ReactTooltip from "react-tooltip";
import ReactCountdownClock from "react-countdown-clock";
import {
  getPallete,
  getDumpColumnDef,
  splitOf,
} from "../services/utilityService";

import {
  getDumpCollectionStatus,
  trigger,
  terminate,
  getRows,
  getRowCount,
  changeContext,
} from "./../store/dhcpdump";
import { Button, Input, Popup, Segment, Statistic } from "semantic-ui-react";
import ModalItem from "./common/modalItem";

const pallete = getPallete();

const columnOrder = getDumpColumnDef();

const allItems = [...Array(18).keys()];

const isArray = (item) => {
  if (typeof item === "object") {
    if (Object.prototype.toString.call(item) === "[object Array]") return true;
  }
  return false;
};

class DHCPDump extends Component {
  constructor(props) {
    super(props);
    this.idleTimer = null;
    this.onAction = this._onAction.bind(this);
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);

    this.state = {
      userActive: true, // false when user is idle even after timeout
      showTimer: false, // true if user is idle for a while
      polling: false, // true indicate keep on fetching row counts
      triggered: props.triggered, // dhcp dump collection triggered or not
      columns: [],
      contents: [],
      loadedRows: false, // rows recieved or not
      selected: -1, // selected row
      displayItems: allItems, // which all items to be displayed based on filter
      apiStarted: false,
      showModal: false, // show modal or not
      boxes: [], // filter boxes
      offset: 0,
      count: 10,
      rowCount: 0,
      expandRow: false, // expand the row
      expandRows: {}, // which all rows to be expanded
    };
  }

  componentWillMount = () => {
    this.props.getDumpStatus();
  };

  componentDidMount = () => {
    this.props.getRowCount();

    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      clearInterval(this.interval);
      // return (ev.returnValue = "Are you sure you want to close?");
    });

    // if (this.props.triggered) {
    this.interval = setInterval(this.props.getRowCount, 3000);
    // }
  };

  componentWillUnmount = () => {
    window.removeEventListener("beforeunload", () => {});
    clearInterval(this.interval);
    this.setState({ polling: false });
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.rows !== prevProps.rows) {
      if (isArray(this.props.rows) && this.props.rows.length > 0) {
        this.setState({ loadedRows: true });
        this.createOptions();
        this.createTableContents(
          this.createDataFrame(this.props.rows),
          this.state.displayItems
        );
      }
    }

    if (this.props.triggered !== prevProps.triggered) {
      this.setState({ triggered: this.props.triggered });

      // if (!this.props.triggered) {
      //   clearInterval(this.interval);
      //   this.setState({ polling: false });
      // } else {
      //   this.interval = setInterval(this.props.getRowCount, 3000);
      //   this.setState({ polling: true });
      // }
    }

    if (this.props.apiStarted !== prevProps.apiStarted) {
      this.setState({ apiStarted: this.props.apiStarted });
    }
    if (this.props.rowCount !== prevProps.rowCount) {
      this.setState({ rowCount: this.props.rowCount });
    }
  }

  createOptions = () => {
    const options = [];
    options.push({ id: -1, name: "all", value: true });
    options.push({ id: 0, name: "time", value: false });
    options.push({ id: 1, name: "ip", value: false });
    options.push({ id: 2, name: "option", value: false });
    options.push({ id: 3, name: "logs", value: false });

    try {
      if (isArray(this.props.rows) && this.props.rows.length > 0) {
        const keys = Object.keys(this.props.rows[0]);
        let index = 4;
        for (let key of keys.slice(2, -2)) {
          options.push({
            id: index,
            name: key.toLowerCase(),
            value: false,
          });
          index += 1;
        }
      }
    } catch (error) {
      console.log("Exception in DhcpDump [createOptions]", error);
    }
    this.setState({ boxes: options });
    return options;
  };

  startPolling = () => {
    if (this.state.polling) {
      clearInterval(this.interval);
      this.setState({ polling: false });
    }

    if (this.props.triggered) {
      this.interval = setInterval(this.props.getRowCount, 1000);
      this.setState({ polling: true });
    }
  };

  stopPolling = () => {
    clearInterval(this.interval);
    this.setState({ polling: false });
  };

  handleCheckBoxChange = (boxId) => {
    const boxes = [...this.state.boxes];
    try {
      if (boxId === -1 && boxes[0].value === false) {
        for (let i = 1; i < 18; i++) {
          boxes[i].value = false;
        }
      } else {
        boxes[0].value = false;
      }

      for (const box of boxes) {
        if (box.id === boxId) {
          box.value = !box.value;
        }
      }

      if (isArray(this.props.rows) && this.props.rows.length > 0) {
        this.setState({ boxes });
        // this.props.changeContext("boxes", boxes);
        this.createTableContents(
          this.createDataFrame(this.props.rows),
          // readString(csvInput).data,
          this.itemsTodisplay(boxes)
        );
      }
    } catch (error) {
      console.log("Exception in DhcpDump[handleCheckBoxChange]", error);
    }
  };

  isBoxEnabled = (id) => {
    const box = this.state.boxes.filter((bx) => bx.id === id);
    return box[0].value;
  };

  itemsTodisplay = (boxes) => {
    try {
      if (boxes[0].value === true) {
        return allItems;
      } else {
        const items = [];
        for (let box of boxes) {
          if (box.value === true) items.push(box.id);
        }
        return items;
      }
    } catch (error) {
      console.log("Exception in DhcpDump[itemsTodisplay]", error);
      return allItems;
    }
  };

  getBgColor = (text) => {
    let color = "white";
    try {
      if (text) {
        if (text.includes("DHCP4_SUBNET_SELECTION_FAILED")) {
          color = "#FCC1C8";
        } else if (text.includes("DHCP4_BUFFER_RECEIVED")) {
          color = "#C3FAC0";
        } else if (text.includes("DHCP4_PACKET_RECEIVED")) {
          color = "#E1FAC5";
        } else if (text.includes("DHCP4_PACKET_SEND")) {
          color = "#ABF8E9";
        }
      }
    } catch (error) {
      console.log("Exception in DhcpDump[getBgColor]", error);
    }
    return color;
  };

  renderRow = (state, rowInfo, column, instance) => {
    if (typeof rowInfo !== "undefined") {
      return {
        onClick: (e, handleOriginal) => {
          const expandRows = { ...this.state.expandRows };

          if (expandRows[rowInfo.index]) expandRows[rowInfo.index] = false;
          else expandRows[rowInfo.index] = true;

          this.setState({
            selected: rowInfo.index,
            expandRow: !this.state.expandRow,
            expandRows,
          });

          if (handleOriginal) {
            handleOriginal();
          }
        },
        onDoubleClick: (e, handleOriginal) => {
          if (handleOriginal) {
            handleOriginal();
          }
        },
        style: {
          //"#194D33"
          background: this.state.expandRows[rowInfo.index]
            ? pallete["themeColor#1"]
            : "white",
          color: this.state.expandRows[rowInfo.index] ? "white" : "black",
        },
      };
    } else {
      return {
        onClick: (e, handleOriginal) => {
          if (handleOriginal) {
            handleOriginal();
          }
        },
        style: {
          background: "white",
          color: "black",
        },
      };
    }
  };

  getPacketStatus = (option, logs) => {
    let status = "--";

    try {
      if (option && option.toLowerCase().includes("dhcpnak")) {
        status = "KO";
      }
      if (option && option.toLowerCase().includes("dhcpack")) {
        status = "OK";
      }
    } catch (error) {
      console.log("Exception in DhcpDump[getPacketStatus]", error);
    }
    return status;
  };

  getCellColor = (row) => {
    let color = null;
    const value = row.value;
    // avoid color for selected rows to improve readability
    // if (this.state.expandRows[row.index]) return null;

    try {
      if (
        value &&
        typeof value === "string" &&
        value.toLowerCase().includes("dhcpnak")
      ) {
        color = "red";
      }
      if (
        value &&
        typeof value === "string" &&
        value.toLowerCase().includes("dhcpack")
      ) {
        color = "green";
      }
    } catch (error) {
      console.log("Exception in DhcpDump[getCellColor]", error);
    }
    return color;
  };

  filterColumn = (filter, row) => {
    try {
      if (filter.id === "status") {
        if (filter.value === "all") {
          return true;
        } else if (filter.value === "both") {
          if (row[filter.id] === "OK" || row[filter.id] === "KO") return true;
        } else {
          return row[filter.id] === filter.value;
        }
      } else {
        return row[filter.id]
          ? row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
          : false;
      }
    } catch (error) {
      console.log("Exception in DhcpDump[filterColumn]", error);
      return true;
    }
  };

  createTableContents = (data, displayItems) => {
    console.log("data, displayItems", data, displayItems);
    let columns = [
      {
        Header: "",
        accessor: "status",
        width: 70,
        filterable: true,
        filterMethod: (filter, row) => {
          return this.filterColumn(filter, row);
        },
        Filter: ({ filter, onChange }) => (
          <select
            onChange={(event) => {
              onChange(event.target.value);
            }}
            style={{ width: "100%" }}
            value={filter ? filter.value : "all"}
          >
            <option value="all">ALL</option>
            <option value="OK">OK</option>
            <option value="KO">KO</option>
            <option value="both">BOTH</option>
          </select>
        ),
        Cell: (row) => (
          <div
            style={{
              width: "100%",
              height: "100%",
              color:
                row.value === "OK"
                  ? "green"
                  : row.value === "KO"
                  ? "red"
                  : null,
              // fontWeight: "bold",
              borderRadius: "2px",
            }}
          >
            {row.value}
            <div
              style={{
                height: "100%",
                borderRadius: "2px",
                transition: "all .2s ease-out",
              }}
            />
          </div>
        ),
      },
    ];
    let contents = [];

    const header_list = [];
    const selectedColumns = [];

    try {
      for (let col of displayItems) {
        selectedColumns.push(columnOrder[col]);
      }

      for (let i of selectedColumns) {
        header_list.push({ data: data[0][i[0]], width: i[1] });
      }
    } catch (error) {
      console.log("Exception in DhcpDump[createTableContents] #1", error);
    }

    console.log("header_list,selectedColumns", header_list, selectedColumns);

    let item;

    try {
      for (let head of header_list) {
        if (head.data === "LOGS") {
          item = {
            Header: head.data,
            accessor: head.data.toLowerCase(),
            width: head.width,
            filterable: true,
            filterMethod: (filter, row) => {
              return this.filterColumn(filter, row);
            },
            Cell: (col) => (
              // <span data-tip={content}>
              <table className="ui basic ">
                <thead className="ui mini"></thead>

                <tbody className="ui mini ">
                  {this.state.expandRows[col.index] &&
                    col.value &&
                    splitOf(col.value, "\n").map((log, key) => (
                      <tr
                        className=""
                        key={key}
                        style={{
                          color: this.getBgColor(log),
                          whiteSpace: "unset",
                        }}
                      >
                        <td className="">{log}</td>
                      </tr>
                    ))}
                  {!this.state.expandRows[col.index] && (
                    <tr className="">
                      <td className="">{col.value}</td>
                    </tr>
                  )}
                </tbody>
              </table>
              // </span>
            ),
          };
        } else {
          item = {
            Header: head.data,
            accessor: head.data.toLowerCase(),
            width: head.width,
            filterable: true,
            filterMethod: (filter, row) => {
              return this.filterColumn(filter, row);
            },
            Cell: (row) => {
              // const content = this.state.expandRow
              //   ? "Click to close"
              //   : "Click to expand";

              return (
                // <span
                //   data-tip={content}
                //   style={{ color: this.getCellColor(row) }}
                // >
                <>{row.value}</>
                // </span>
              );
            },
          };
        }
        columns.push(item);
      }
    } catch (error) {
      console.log("Exception in DhcpDump[createTableContents] #2", error);
    }

    try {
      for (let content of data.slice(1)) {
        const temp = { status: this.getPacketStatus(content[16], content[17]) };
        for (let index of selectedColumns) {
          temp[data[0][index[0]].toLowerCase()] = content[index[0]];
        }
        contents.push(temp);
      }
      this.setState({ columns, contents });
    } catch (error) {
      console.log("Exception in DhcpDump[createTableContents] #3", error);
    }
  };

  createDataFrame = (rows) => {
    let contents = [];

    try {
      if (rows.length < 1) {
        return [];
      }

      contents.push(Object.keys(rows[0]));

      for (let item of rows) {
        contents.push(Object.values(item));
      }
    } catch (error) {
      console.log("Exception in DhcpDump[createDataFrame]", error);
    }

    return contents;
  };

  getRowStyle = (rowIndex) => {
    if (this.state.expandRow[rowIndex]) {
      return {
        cursor: "pointer",
        whiteSpace: "unset",
      };
    } else {
      return {
        cursor: "pointer",
      };
    }
  };

  renderCell = (state, rowInfo, column, instance) => {
    // console.log("renderCell", rowInfo.index);
    return {
      onDoubleClick: (e, handleOriginal) => {
        if (typeof rowInfo !== "undefined") {
          this.setState({
            showModal: true,
            selectedRow: rowInfo.original,
            selectedColumn: column,
          });
        }
      },
      onClick: (e, handleOriginal) => {
        // IMPORTANT! React-Table uses onClick internally to trigger
        // events like expanding SubComponents and pivots.
        // By default a custom 'onClick' handler will override this functionality.
        // If you want to fire the original onClick handler, call the
        // 'handleOriginal' function.

        if (handleOriginal) {
          handleOriginal();
        }
      },

      style: this.getRowStyle(rowInfo ? rowInfo.index : -1),
    };
  };

  _onAction(e) {
    // console.log("user did something", e);
    // if (!this.state.userActive) {
    //   this.setState({ userActive: true });
    //   if (this.props.triggered) {
    //     this.interval = setInterval(this.props.getRowCount, 1000);
    //   }
    // }
    if (this.state.showTimer) this.setState({ showTimer: false });
  }

  _onActive(e) {
    // console.log("user is active", e);
    if (!this.state.userActive) {
      this.setState({ userActive: true });
      this.interval = setInterval(this.props.getRowCount, 3000);
    }
    if (this.state.showTimer) this.setState({ showTimer: false });
    // console.log("time remaining", this.idleTimer.getRemainingTime());
  }

  _onIdle(e) {
    // console.log("user is idle", e);
    // if (this.state.triggered)
    this.setState({ showTimer: true });

    // console.log("last active", this.idleTimer.getLastActiveTime());
  }

  onTimerComplete = () => {
    if (this.state.userActive) {
      this.setState({ userActive: false });
    }
    clearInterval(this.interval);
    this.setState({ showTimer: false, polling: false });
  };

  splitContents = (content) => {
    try {
      let splited_content = splitOf(content, "\n")
        .map((line, index) => `${index + 1}. ${line}`)
        .join("\n");
      return splited_content;
    } catch (error) {
      console.log("Exception in DhcpDump[createDataFrame]", error);
      return content;
    }
  };

  render() {
    const {
      contents,
      columns,
      boxes,
      loadedRows,
      apiStarted,
      offset,
      count,
      selectedRow,
      selectedColumn,
      showModal,
      rowCount,
    } = this.state;

    if (showModal) {
      return (
        <ModalItem
          data={selectedRow[selectedColumn.id]}
          displayType="text"
          name={"dump"}
          title={selectedColumn.id}
          submit={false}
          onCloseModal={() => this.setState({ showModal: false })}
        />
      );
    }
    return (
      <>
        <div>
          <IdleTimer
            ref={(ref) => {
              this.idleTimer = ref;
            }}
            element={document}
            onActive={this.onActive}
            onIdle={this.onIdle}
            onAction={this.onAction}
            debounce={250}
            timeout={1000 * 30}
          />
          {/* your app here */}

          <br />
          <div className="row">
            <div className="col-2">
              <Statistic color="green" size="small">
                <Statistic.Value>
                  {JSON.stringify(this.props.rowCount)}
                </Statistic.Value>
                <Statistic.Label>Packets Captured</Statistic.Label>
              </Statistic>
            </div>

            <div className="col">
              {this.state.showTimer && (
                <ReactCountdownClock
                  seconds={30}
                  color="green"
                  alpha={0.4}
                  size={50}
                  showMilliseconds={false}
                  onComplete={this.onTimerComplete}
                />
              )}
            </div>
          </div>

          <br />

          <div>
            {/* {!this.state.polling && (
              <Button
                size="mini"
                color="red"
                icon="play"
                disabled={!this.props.triggered}
                onClick={this.startPolling}
              />
            )}
            {this.state.polling && (
              <Button
                size="mini"
                color="red"
                icon="pause"
                onClick={this.stopPolling}
              />
            )} */}
            <Input
              style={{ width: "8%", paddingRight: 2 }}
              label="offset"
              value={offset}
              size="mini"
              labelPosition="left corner"
              floated="right"
              onChange={(e) => {
                this.setState({ offset: e.target.value });
              }}
            />
            <Input
              style={{ width: "8%", paddingRight: 4 }}
              label="count"
              value={count}
              size="mini"
              labelPosition="left corner"
              onChange={(e) => {
                this.setState({ count: e.target.value });
              }}
            />
            {!apiStarted && (
              <Button
                onClick={() => {
                  this.props.getRows(parseInt(offset), parseInt(count));
                }}
                content="get rows"
                size="mini"
                style={{
                  background: `${pallete ? pallete["themeColor#1"] : "green"}`,
                  color: `${pallete ? pallete["themeColor#3"] : "green"}`,
                }}
              />
            )}
            {apiStarted && (
              <Button
                loading
                style={{
                  background: `${pallete ? pallete["themeColor#1"] : "green"}`,
                  color: `${pallete ? pallete["themeColor#3"] : "green"}`,
                }}
                size="mini"
              >
                Loading
              </Button>
            )}
            <Button
              onClick={() => {
                this.props.terminate();
              }}
              content="stop"
              size="mini"
              negative
              floated="right"
              disabled={this.state.triggered ? false : true}
            />
            <Button
              onClick={() => this.props.trigger()}
              content={"trigger"}
              size="mini"
              style={{
                background: `${pallete ? pallete["themeColor#1"] : "green"}`,
                color: `${pallete ? pallete["themeColor#3"] : "green"}`,
              }}
              floated="right"
              disabled={this.state.triggered ? true : false}
            />
          </div>
          <br />
          <div>
            {loadedRows && (
              <>
                <div>
                  <Popup
                    flowing
                    trigger={
                      <Button
                        icon="filter"
                        content="Filter"
                        size="mini"
                        color="grey"
                      />
                    }
                    on="click"
                  >
                    <Segment style={{ overflow: "auto", maxHeight: 200 }}>
                      {boxes.map((box) => (
                        <CheckBoxItem
                          key={box.id}
                          onChangeItem={this.handleCheckBoxChange}
                          item={box}
                        />
                      ))}
                    </Segment>
                  </Popup>
                </div>
                <br />
                <div>
                  <ReactTooltip
                    place="bottom"
                    type="light"
                    effect="float"
                    // backgroundColor="teal"
                    // arrowColor="black"
                  />
                  <ReactTable
                    data={contents}
                    // data={dummyRows}
                    columns={columns}
                    pageSizeOptions={[5, 6, 7, 8, 9, 10, 15, 20, 25, 50]}
                    pageSize={this.props.context.pageSize}
                    onPageSizeChange={(pageSize) => {
                      this.props.changeContext("pageSize", pageSize);
                    }}
                    style={{
                      fontSize: "11px",
                      color: `${pallete ? pallete["themeColor#3"] : "white"}`,
                      // fontWeight: "bold",
                      background: `${
                        pallete ? pallete["themeColor#1"] : "teal"
                      }`,
                    }}
                    className="ReactTable"
                    getTrProps={this.renderRow}
                    getTdProps={this.renderCell}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    triggered: state.entities.dhcpdump.triggered,
    rows: state.entities.dhcpdump.rows,
    rowCount: state.entities.dhcpdump.rowCount,
    apiStarted: state.entities.dhcpdump.loading,
    context: state.entities.dhcpdump.context,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDumpStatus: () => {
      dispatch(getDumpCollectionStatus());
    },
    trigger: () => {
      dispatch(trigger());
    },
    terminate: () => {
      dispatch(terminate());
    },
    getRows: (offset, count) => {
      dispatch(getRows(offset, count));
    },
    getRowCount: () => {
      dispatch(getRowCount());
    },
    changeContext: (item, value) => {
      dispatch(changeContext(item, value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DHCPDump);
