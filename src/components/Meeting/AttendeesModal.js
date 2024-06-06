import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { customName } from "../../helpers/commonHelpers";

const AttendeesModal = (props) => {
  console.log(props.attendees);
  const { attendees } = props;
  console.log(attendees);
  return (
    <>
      <Modal
        show={props.IsModalOpen}
        onHide={(e) => props.setIsModalOpen(false)}
      >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>
              <div className="modal-header">
                <h4 className="modal-title">Attendees</h4>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={(e) => props.setIsModalOpen(false)}
                ></button>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-body attendees-popup">
              {attendees &&
                attendees.map((attendee) => {
                  return (
                    <div className="attendee-content">
                      <div className="check-attendee">
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          className="form-check-input"
                          checked
                        />
                        <div className="attendee1 attendee-list sl">
                          {" "}
                          {customName(attendee.name)}
                        </div>
                      </div>
                      <div className="action-cmnt-text">
                        <p className="detail-name">{attendee.name}</p>
                        <p className="name-undertext comment-text"></p>
                        <p className="permission">With MOM write permission</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="primary"> 
           Save changes 
          </Button> 
          <Button variant="secondary"> 
           Close 
          </Button>  */}
            <div className="modal-footer">
              <button
                type="button"
                className="Mom-btn btn btn-secondary bg-primary border-primary"
              >
                <p>Set MOM Write Permission</p>
              </button>
              {/* <button
                type="button"
                onClick={(e) => props.setIsModalOpen(false)}
                className="reset btn btn-secondary bg-white border-primary text-primary"
              >
                <p>Close</p>
              </button> */}
            </div>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default AttendeesModal;
