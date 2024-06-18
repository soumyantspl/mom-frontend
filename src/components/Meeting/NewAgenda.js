import React, { useState, useEffect } from "react";
import Collapse from "react-bootstrap/Collapse";
import * as constantMessages from "../../constants/constatntMessages";

const NewAgenda = (props) => {
  console.log("props---------------------------------", props);
  const [open, setOpen] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    time: 0,
    // index: props.agenda.index,
  });






  const validateForm = () => {
    //  console.log(formData.title);
    const errors = {};

    if (!formData?.title.trim()) {
      errors.title = constantMessages.titleRequired;
    //  errors.index = formData.index;
    }

    if (!formData.time) {
      errors.time = constantMessages.timeRequired;
    //  errors.index = formData.index;
    }

    return errors;
  };

  const validateAgendaTitle = () => {
    console.log(formData)
    const errors = {};
    if (!formData?.title.trim()) {
        console.log(formData)
      errors.title = constantMessages.titleRequired;
      // errors.index = formData.index;
    }
    setErrors(errors);
  };
  const validateAgendaTime=()=>{
    console.log(formData)
    const errors = {};
    if (!formData.time) {
        errors.time = constantMessages.timeRequired;
      //  errors.index = formData.index;
      }
      setErrors(errors);
  }
  console.log(errors)
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
          Agenda
          {/* {props.agenda.index} */}
        </button>
        <button
          type="button"
          //onClick={()=>onRemoveAgenda(props.agenda.index)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            fill="#0564f3"
            className="bi-minus-circle bi bi-dash-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
          </svg>
          {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                fill="#0564f3"
                className="bi bi-minus-circle pointer"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg> */}
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
                    onChange={props.handleChange}
                    onBlur={
                      validateAgendaTitle
                    }
                    autoComplete="off"
                  />
               
                   {errors.title ? (
                      <span className="error-message">{errors.title}</span>
                    ):null}
                </div>
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
                    onChange={props.handleChange}
                    // onBlur={() => {
                    //   props.agendaData(formData);
                    // }}
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
                      onChange={props.handleChange}
                      onBlur={
                        validateAgendaTime
                      }
                      // autoComplete="off"
                      required="required"
                      type="number"
                      autocomplete="off"
                    />
                    <div className="minute_box">mins</div>
                  </div>
                  {errors.time && ( 
                  <span className="error-message">
                    {errors.time}
                  </span>
                 )}

                  {/* {props.errorData.index===props.agenda.index && props.errorData.time && ( 
                  <span className="error-message">
                    {props.errorData.time}
                  </span>
                 )} */}
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default NewAgenda;
