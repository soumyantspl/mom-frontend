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
              <h4 className="modal-title">RSVP</h4>
              <span>{props.rsvpCount}</span>
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
          <div className="attendees-popup modal-margin">
            <AttendeeRsvpTable rsvpObject={rsvpObject}/>
             </div>
          </Modal.Body>
        
            {/* <Button variant="primary"> 
           Save changes 
          </Button> 
          <Button variant="secondary"> 
           Close 
          </Button>  */}
       
       
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default AttendeesRsvpModal;
