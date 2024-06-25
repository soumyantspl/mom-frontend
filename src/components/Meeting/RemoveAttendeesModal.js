import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { customName } from "../../helpers/commonHelpers";

const RemoveAttendeesModal = (props) => {
  console.log(props);
  const [show, setShow] = useState(false);
  const { attendee } = props;
  const handleClose = () => {
    props.updateShow();
  };
  const handleSubmit = () => {
    props.handleSubmit();
  };
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
    Launch demo modal
  </Button> */}

      <Modal
        show={props.isModalOpen}
        onHide={(e) => props.setIsModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Attendee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="attendees-popup">
            <div className="attendee-content">
              <div className="attendee1 attendee-list sl">
                {" "}
                {attendee.name ? customName(attendee.name) : null}
              </div>

              <div className="action-cmnt-text">
                <p className="detail-name">{attendee.name}</p>
                {/* body > ngb-modal-window > div > div > div.modal-body.attendees-popup > div:nth-child(1) > div.action-cmnt-text >  */}
                <p className="name-undertext comment-text">{attendee.email}</p>
              </div>
            </div>
            <div className="action-cmnt-text">
              <p className="detail-name"> {props.message}</p>
              {/* body > ngb-modal-window > div > div > div.modal-body.attendees-popup > div:nth-child(1) > div.action-cmnt-text >  */}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="light"
            onClick={(e) => props.setIsModalOpen(false)}
            className="btn-light"
          >
            No
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {/* {props.buttonName} */}
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveAttendeesModal;
