import Toast from "react-bootstrap/Toast";
import React, { useState } from 'react';

function ToastBar(props) {
    const [show, setShow] = useState(true);
  return (
    <>
          <Toast className="d-inline-block m-1"onClose={() => setShow(false)} show={show} delay={2000} autohide bg={props.variant}>
      {/* <Toast className="d-inline-block m-1" bg={props.variant}> */}
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
         
         
        </Toast.Header>
        <Toast.Body className={props.variant === "Dark" && "text-white"}>
          {props.message}
        </Toast.Body>
      </Toast>
    </>
  );
}

export default ToastBar;
