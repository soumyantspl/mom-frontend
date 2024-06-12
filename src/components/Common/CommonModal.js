import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const CommonModal = (props) => {
  console.log(props);
  const [show, setShow] = useState(false);

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
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.message}</Modal.Body>
        <Modal.Footer>

        <Button  variant="light"
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

export default CommonModal;
