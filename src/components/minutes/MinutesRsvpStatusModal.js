
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-bootstrap/Modal";
import AttendeeRsvpTable from "../Meeting/AttendeeRsvpTable";
import MinutesAcceptRejectStatusTable from "./MinutesAcceptRejectStatusTable";
const MinutesRsvpStatusModal = (props) => {
  console.log(props);
  const { attendees } = props;
//   console.log(attendees);

//   const rsvpObject = {};
//   attendees.map((attendee) => {
//     console.log(attendee);
//     if (rsvpObject[attendee.rsvp]) {
//       rsvpObject[attendee.rsvp] = [...rsvpObject[attendee.rsvp], attendee];
//     } else {
//       rsvpObject[attendee.rsvp] = [attendee];
//     }
//   });

//   console.log(rsvpObject);

  return (
    <>
      <Modal
        show={props.IsMinutesRsvpStatusModal}
        onHide={(e) => props.setIsMinutesRsvpStatusModal(false)}
        
      >
        <Modal.Dialog>
          {/* <Modal.Title> */}
          <div className="modal-header attendees-modal">
            <div>
              <h4 className="modal-title">{props.status} by</h4>
            </div>
            <div>
           
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={(e) => props.setIsMinutesRsvpStatusModal(false)}
              ></button>
            </div>
          </div>

          <Modal.Body  className="attendees-popup modal-margin">
        
             <MinutesAcceptRejectStatusTable attendeesData={props.attendees} status={props.status}/> 
             
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

export default MinutesRsvpStatusModal;
