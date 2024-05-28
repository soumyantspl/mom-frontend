import Toast from "react-bootstrap/Toast";

function ToastBar(props) {
  return (
    <>
      <Toast className="d-inline-block m-1" bg={props.variant}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body className={props.variant === "Dark" && "text-white"}>
          {props.message}
        </Toast.Body>
      </Toast>
    </>
  );
}

export default ToastBar;
