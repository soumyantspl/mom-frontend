import React, { useState } from "react";

const Alert = (props) => {
  const [show, setShow] = useState(true);
  if (props.timeoutSeconds !== 0) {
    console.log('inside time out-------',props.timeoutSeconds)
    setTimeout(() => setShow(false), props.timeoutSeconds);
  }
  console.log('outside time out-------',props.timeoutSeconds)
  console.log(show);
  return (
    <>
      {show ? (
        <div>
          {props.status ? (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              {props.message}
              {/* <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button> */}
            </div>
          ) : (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              {props.message}
              {/* <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button> */}
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Alert;
