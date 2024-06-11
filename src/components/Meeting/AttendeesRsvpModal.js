import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-bootstrap/Modal";
import AttendeeRsvpTable from "./AttendeeRsvpTable";
const AttendeesRsvpModal = (props) => {
  console.log(props);
  const { attendees } = props;
  console.log(attendees);

  const rsvpObject = {};
  attendees.map((attendee) => {
    console.log(attendee);
    if (rsvpObject[attendee.rsvp]) {
      rsvpObject[attendee.rsvp] = [...rsvpObject[attendee.rsvp], attendee];
    } else {
      rsvpObject[attendee.rsvp] = [attendee];
    }
  });

  console.log(rsvpObject);

  return (
    <>
      <Modal
        show={props.IsRsvpModalOpen}
        onHide={(e) => props.setIsRsvpModalOpen(false)}
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
                onClick={(e) => props.setIsRsvpModalOpen(false)}
              ></button>
            </div>
          </div>

          <Modal.Body>
            <div className="attendees-popup">
            <AttendeeRsvpTable rsvpObject={rsvpObject}/>
              {/* {attendees?.length !== 0 &&
                attendees
                  .filter((attendee) => attendee.rsvp === "YES")
                  .map((item) => {
                    return <CommonTable rsvpObject={rsvpObject}/>
                  })}

              {attendees?.length !== 0 &&
                attendees
                  .filter((attendee) => attendee.rsvp === "NO")
                  .map((item) => {
                    return item.name;
                  })}

              {attendees?.length !== 0 &&
                attendees
                  .filter((attendee) => attendee.rsvp === "MAYBE")
                  .map((item) => {
                    return item.name;
                  })}
              {attendees?.length !== 0 &&
                attendees
                  .filter((attendee) => attendee.rsvp === "WAITING")
                  .map((item) => {
                    return item.name;
                  })} */}
              {/* return (
                    <div className="attendee-content" key={index}>
                      <div className="check-attendee">
                        {props.loginUserData?.userData?.isMeetingOrganiser ? (
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            className="form-check-input"
                            checked
                          />
                        ) : null}
                  <div className="attendee1 attendee-list sl">
                          {" "}
                          {customName(attendee.name)}
                        </div>
                      </div>

                      <div className="action-cmnt-text">
                        <p className="detail-name">{attendee.name}</p>
                        <p className="detail-name">{attendee.email}</p>
                        <p className="name-undertext comment-text"></p>
                        {props.loginUserData?.userData?.isMeetingOrganiser ? (
                          <span className="permission">
                            With MOM write permission
                          </span>
                        ) : (
                          <span>
                            RSVP :
                            {attendee.rsvp.charAt(0) +
                              attendee.rsvp.slice(1).toLowerCase()}
                          </span>
                        )}
                      </div>
                    </div>
                  ); */}
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="primary"> 
           Save changes 
          </Button> 
          <Button variant="secondary"> 
           Close 
          </Button>  */}
       
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default AttendeesRsvpModal;
