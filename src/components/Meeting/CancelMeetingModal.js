import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const CancelMeetingModal = (props) => {
  console.log(props);
  const [show, setShow] = useState(false);
  const [remark, setRemark] = useState("");
  
  const handleClose = () => {
    props.updateShow();
  };
  const handleSubmit = () => {
    props.handleSubmit(remark);
    setRemark("")
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
       
          {/* <Modal.Title>{props.title}</Modal.Title> */}

          <div className="modal-header">
            <h4 className="modal-title">Meeting Cancellation Remark</h4>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
       
       
          {/* {props.message} */}
          <div className="modal-body delete-txt">
            <h6>Please provide your remarks regarding the cancellation</h6>
            <textarea
              cols="40"
              rows="4"
              id="remark"
              name="remark"
              onChange={(e)=>setRemark(e.target.value)}
              value={remark}
              placeholder="Enter your remarks here..."
              required
            ></textarea>
          </div>
       
       
       

        <div className="modal-footer">
            <button
              type="button"
              onClick={handleSubmit}
              className="Mom-btn btn btn-secondary bg-primary border-primary"
            >
              <p>Submit Remark</p>
            </button>
            <button
              type="button"
              onClick={(e) => props.setIsModalOpen(false)}
              className="reset btn btn-secondary bg-white border-primary text-primary"
            >
              <p>Close</p>
            </button>
          </div>



          {/* <Button
            variant="light"
            onClick={(e) => props.setIsModalOpen(false)}
            className="btn-light"
          >
            No
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
           
            Yes
          </Button> */}
        
      </Modal>
    </>
  );
};

export default CancelMeetingModal;
