import React from "react";
import ReactModal from "react-modal";
import ReactJson from "react-json-view";
import { Modal } from "react-bootstrap";
import { Segment, Button } from "semantic-ui-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Servers from "./../servers";
import { splitOf } from "../../services/utilityService";
import "./styles.css";

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//   },
// };

class ModalItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      showModal: true,
      data: props.data,
      submitted: false,
      type: props.elementType,
      displayType: props.displayType,
    };
  }

  getBgColor = (text) => {
    let color = "white";
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
    return color;
  };

  stringinfy = (object) => {
    return `${object}`;
  };

  render() {
    const overlayClassName = this.state.showModal
      ? "modal fade show"
      : "modal fade";

    console.log("Modal item data", this.props.data, typeof this.props.data);
    return (
      <div>
        <ReactModal
          //className="Modal modal-dialog modal-content"
          bodyOpenClassName="modal-open"
          overlayClassName={overlayClassName}
          ariaHideApp={false}
          isOpen={this.state.showModal}
        >
          <Modal.Header>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.displayType !== "confirm" && (
              <Segment style={{ overflow: "auto", maxHeight: 400 }}>
                {this.state.displayType === "json" && (
                  <ReactJson
                    name={this.props.name}
                    src={this.props.data}
                    theme="summerfruit:inverted"
                    iconStyle="triangle"
                    displayDataTypes={false}
                    displayObjectSize={false}
                    collapsed={false}
                    enableClipboard={false}
                  />
                )}
                {this.state.displayType === "text" && (
                  <>
                    {this.state.copied && (
                      <span style={{ float: "right", color: "red" }}>
                        copied to clipboard!
                      </span>
                    )}
                    {this.state.copied && <br />}
                    <CopyToClipboard
                      text={this.props.data}
                      onCopy={() => this.setState({ copied: true })}
                    >
                      <Button
                        icon="copy"
                        color={this.state.copied ? "grey" : "blue"}
                        size="mini"
                        floated="right"
                      />
                    </CopyToClipboard>
                    {this.state.copied && <br />}
                    <>
                      {this.props.data &&
                        splitOf(this.stringinfy(this.props.data), "\n").map(
                          (row, index) => (
                            <p
                              className="font-family"
                              style={{
                                fontWeight: 1000,
                                background: this.getBgColor(row),
                              }}
                              key={index}
                            >
                              {row}
                            </p>
                          )
                        )}
                    </>
                  </>
                )}
                {this.state.displayType === "serverSelect" && (
                  <Servers
                    onClose={() => {
                      this.setState({ showModal: false });
                      this.props.onCloseModal();
                    }}
                  />
                )}
              </Segment>
            )}
            {this.state.displayType === "confirm" && this.props.deleteObject && (
              <Segment style={{ overflow: "auto", maxHeight: 400 }}>
                <ReactJson
                  name={this.props.name}
                  src={this.props.deleteObject}
                  theme="summerfruit:inverted"
                  iconStyle="triangle"
                  displayDataTypes={false}
                  displayObjectSize={false}
                  collapsed={true}
                  enableClipboard={false}
                />
              </Segment>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              primary
              onClick={() => {
                this.setState({ showModal: false });
                this.props.onCloseModal();
              }}
            >
              Close
            </Button>
            {this.props.submit && (
              <Button
                negative
                disabled={this.state.submitted}
                onClick={() => {
                  this.setState({ submitted: true });
                  this.props.onSubmit();
                }}
              >
                {this.props.submitText ? this.props.submitText : "Submit"}
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

export default ModalItem;
