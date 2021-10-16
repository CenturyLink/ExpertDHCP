import React from "react";
import ReactModal from "react-modal";
import { Modal } from "react-bootstrap";
import { Segment, Button } from "semantic-ui-react";
import FilterList from "./filterList";
import "./styles.css";

class ArraySelectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      data: props.data,
      submitted: false,
    };
  }

  getList = (name, data) => {
    const data_list = [];
    if (!data) data = [];
    if (name === "reservations") {
      data.map((item, index) => {
        data_list.push({
          id: index,
          label: `IP: ${item["ip-address"]}, MAC: ${item["hw-address"]}`,
          header: `IP: ${item["ip-address"]}`,
          desc: `MAC: ${item["hw-address"]}`,
        });
      });
    } else if (name === "option-data") {
      data.map((item, index) => {
        data_list.push({
          id: index,
          label: `CODE: ${item["code"]}, NAME: ${item["name"]}`,
          header: `CODE: ${item["code"]}`,
          desc: `NAME: ${item["name"]}`,
        });
      });
    } else if (name === "pools") {
      //DATA: {item["option-data"]}, POOL: {item["pool"]}
      data.map((item, index) => {
        data_list.push({
          id: index,
          label: `DATA: ${item["option-data"]}, POOL: ${item["pool"]}`,
          header: `DATA: ${item["option-data"]}`,
          desc: `POOL: ${item["pool"]}`,
        });
      });
    } else {
    }
    return data_list;
  };

  handleOnSelect = (index) => {
    this.setState({ showModal: false });
    this.props.onSelectItem(this.props.data[index], index);
  };

  render() {
    const data_list = this.getList(this.props.name, this.props.data);
    const overlayClassName = this.state.showModal
      ? "modal fade show"
      : "modal fade";
    return (
      <div>
        <ReactModal
          className="modal-dialog modal-content"
          bodyOpenClassName="modal-open"
          overlayClassName={overlayClassName}
          ariaHideApp={false}
          isOpen={this.state.showModal}
        >
          <Modal.Header>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Segment style={{ overflow: "auto", maxHeight: 400 }}>
              <FilterList
                elements={data_list}
                onSelectItem={this.handleOnSelect}
              />
            </Segment>
          </Modal.Body>
          <Modal.Footer>
            <Button
              negative
              onClick={() => {
                this.setState({ showModal: false });
                this.props.onCloseModal();
              }}
            >
              Cancel
            </Button>
            {this.props.submit && (
              <Button
                primary
                disabled={this.state.submitted}
                onClick={() => {
                  this.setState({ submitted: true });
                  this.props.onSubmit();
                }}
              >
                Submit
              </Button>
            )}
          </Modal.Footer>
        </ReactModal>
        <div
          className={
            this.state.showModal ? "modal-backdrop fade show" : "display: none;"
          }
        />
      </div>
    );
  }
}

export default ArraySelectModal;
