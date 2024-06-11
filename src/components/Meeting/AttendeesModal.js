import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { customName } from "../../helpers/commonHelpers";

const AttendeesModal = (props) => {
  console.log(props);
  const { attendees } = props;
  console.log(attendees);
  return (
    <>
      <Modal
        show={props.IsModalOpen}
        onHide={(e) => props.setIsModalOpen(false)}
      >
        <Modal.Dialog>
          {/* <Modal.Title> */}
          <div className="modal-header attendees-modal">
            <div>
              <h4 className="modal-title">Attendees</h4>
            </div>
            <div>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={(e) => props.setIsModalOpen(false)}
              ></button>
            </div>
          </div>

          <Modal.Body>
            <div className="attendees-popup">
              {attendees &&
                attendees.map((attendee, index) => {
                  return (
                    <div className="attendee-content" key={index}>
                      {props.loginUserData?.userData?.isMeetingOrganiser ? (
                        <div className="check-attendee">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            className="form-check-input"
                            checked
                          />

                          <div className="attendee1 attendee-list sl" >
                            {" "}
                            {customName(attendee.name)}
                          </div>
                        </div>
                      ) : (
                        <div className="attendee-content" key={index} >
                          <div className="attendee1 attendee-list sl">
                            {" "}
                            {customName(attendee.name)}
                          </div>
                        </div>
                      )}

                      <div className="action-cmnt-text" >
                        <p className="detail-name">{attendee.name}</p>
                        {/* body > ngb-modal-window > div > div > div.modal-body.attendees-popup > div:nth-child(1) > div.action-cmnt-text >  */}
                        <p className="name-undertext comment-text">
                          {attendee.email}
                        </p>
                        {props.loginUserData?.userData?.isMeetingOrganiser ? (
                          <span className="permission">
                            With MOM write permission
                          </span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
            </div>
          </Modal.Body>

          {/* <Button variant="primary"> 
           Save changes 
          </Button> 
          <Button variant="secondary"> 
           Close 
          </Button>  */}
          <div className="">
            {props.loginUserData?.userData?.isMeetingOrganiser ? (
              <Modal.Footer>
                <button
                  type="button"
                  className="Mom-btn btn btn-secondary bg-primary border-primary"
                >
                  <p>Set MOM Write Permission</p>
                </button>
              </Modal.Footer>
            ) : null}
            {/* <button
                type="button"
                onClick={(e) => props.setIsModalOpen(false)}
                className="reset btn btn-secondary bg-white border-primary text-primary"
              >
                <p>Close</p>
              </button> */}
          </div>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default AttendeesModal;
