import React, { useState, useEffect } from "react";
import Collapse from "react-bootstrap/Collapse";

const AgendaComponent = (props) => {
  console.log("props---------------------------------", props);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    time: 0,
    index: props.number,
  });
  console.log("open---------------------------------", open);

  console.log("formData---------------------------------", formData);
  useEffect(() => {
    document.title = "Create Meeting: Meeting Plus";

    props.agendaData(formData);
  }, []);

  const handleChange = (e,index) => {
    // dispatch(updateIsCreateMeetingProcessed(false));
    setErrors({});
    //  dispatch(updateOtpProcessed(false));
    //  console.log("9999999999999999999999999999999999999", authData);
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      index: props.number + 1,
      [name]: value,
    });
    // props.agendaData(formData)
  };

  const onHandleBlur = (e,index) => {
    console.log(index)
    // dispatch(updateIsCreateMeetingProcessed(false));
   // setErrors({});
    //  dispatch(updateOtpProcessed(false));
    //  console.log("9999999999999999999999999999999999999", authData);
    const { name, value } = e.target;
    console.log(name, value);
    // setFormData({
    //   ...formData,
    //   [name]: value,
    // });
    // props.agendaData(formData);
  };

  return (
    <div className="agenda-background">
      <h2>
        <button
          className=""
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          type="button"
        >
          Agenda {props.number + 1}
        </button>
      </h2>
      <div className="open-div">
        <Collapse in={open}>
          <div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="mb-1">Agenda Title</label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    placeholder="Enter agenda title here"
                    name="title"
                    value={formData.title}
                    onChange={(e)=>handleChange(e)}
                    onBlur={(e)=>onHandleBlur(e)}
                    autoComplete="off"
                  />
                </div>
                {props.errorData.errors?.title && (
                  <span className="error-message">
                    {props.errorData.errors.title}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="mb-1">
                    What are the topic to discuss ?
                  </label>
                </div>
                <div className="col-md-8">
                  <textarea
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    onBlur={() => {
                      props.agendaData(formData);
                    }}
                    autoComplete="off"
                    placeholder="Enter issue to discuss..."
                    id=""
                    cols="56"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="form-group m-0">
              <div className="row">
                <div className="col-md-4">
                  <label className="mb-1">
                    How long will this agenda item take to discuss?
                  </label>
                </div>
                <div className="col-md-8">
                  <div className="time-taken">
                    <input
                      max="360"
                      min="0"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      onBlur={() => {
                        props.agendaData(formData);
                      }}
                      // autoComplete="off"
                      required="required"
                      type="number"
                      autocomplete="off"
                    />
                    <div className="minute_box">mins</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};
export default AgendaComponent;
