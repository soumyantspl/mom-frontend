import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import "./style/CreateMeeting.css";
import { Margin } from "../../../node_modules/@mui/icons-material/index";
const AddMeeting = (props) => {
  const [numAgenda, setNumAgenda] = useState(0);
  const [attendees, setAttendees] = useState([  ]);
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState("prevMeetingRadio");
  
  const submitMeetingDetails = (e) => {
    console.log("submitMeetingDetails--------------------------");
    e.preventDefault();
    setStep(2);
  };

  const submitAttendeeDetails = (e) => {
    e.preventDefault();
    setStep(3);
  };

  console.log(step);
  const agendas = [];

  const onAddAgenda = () => {
    setNumAgenda(numAgenda + 1);
  };
  const onRemoveAgenda = () => {
    setNumAgenda(numAgenda - 1);
  };

  for (var i = 0; i < numAgenda; i += 1) {
    agendas.push(<AgendaComponent key={i} number={i} />);
  }

  return (
    <div className="mt-2 details-form">
      {step == 1 ? (
        <form className="mt-0 details-form" onSubmit={submitMeetingDetails}>
          <div className="inner-detail-form">
            <div>
              <label className="mb-1" for="title">
                Title
              </label>
              <input type="text" placeholder="Enter Meeting Title" />
            </div>

            <div>
              <label className="mb-1">Meeting Mode</label>

              <div className="d-flex w-100">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label className="form-check-label" for="flexRadioDefault1">
                    Virtual Meeting
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label className="form-check-label" for="flexRadioDefault1">
                      Physical Meeting
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="mb-1" for="location">
                Location
              </label>

              <div className="d-flex w-100">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    checked
                    value="manually"
                    type="radio"
                    name="locationtype"
                    id="flexRadioDefault1"
                  />
                  <label className="form-check-label" for="locationtype">
                    Enter Manually
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      value="meetingroom"
                      type="radio"
                      name="locationtype"
                      id="flexRadioDefault1"
                    />
                    <label className="form-check-label" for="locationtype">
                      Select A Meeting Room
                    </label>
                  </div>
                </div>
              </div>

              <textarea
                className="mt-1"
                placeholder="Enter Location"
                name=""
                id=""
                cols="56"
                rows="3"
              ></textarea>

              <select>
                <option value="">Meeting Room 1</option>
                <option value="">Meeting Room 2</option>
                <option value="">Meeting Room 3</option>
              </select>
            </div>

            <div className="form-group">
              <label className="mb-1">Meeting Link</label>
              <input type="text" placeholder="Enter Meeting Link" />
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                  <div className="position-relative">
                    <label className="mb-1 input-date">Date</label>
                    <input type="date" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#fff"
                      className="bi bi-calendar3 calender"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                      <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                    </svg>
                  </div>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                  <div className="position-relative">
                    <label className="mb-1"> From Time</label>
                    <input type="time" className="input-time" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="#fff"
                      className="bi bi-stopwatch-fill time"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584l.013-.012.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354-.012.012A6.97 6.97 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0" />
                    </svg>
                  </div>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                  <div className="position-relative">
                    <label className="mb-1">To Time</label>
                    <input type="time" className="input-time2" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="#fff"
                      className="bi bi-stopwatch-fill time2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584l.013-.012.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354-.012.012A6.97 6.97 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="primary" type="submit" style={{margin:20}}>
              NEXT
            </Button>
          </div>
        </form>
      ) : step === 2 ? (
        <form className="mt-2 details-form" onSubmit={submitAttendeeDetails}>
          <div className="inner-detail-form">
            <label className="mb-1 people">Attendee(s)</label>
            <div className="d-flex people ">
                {attendees.length>0?   <div className="people-circle-add Mom-btn pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#fff"
                  className="bi bi-plus-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                  />
                </svg>
              </div>:null}
              <div className="people-circle">PK</div>
              <div className="people-circle-add Mom-btn pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#fff"
                  className="bi bi-plus-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                  />
                </svg>
              </div>
            </div>

            <div className="add-people-box show">
              <div className="form-group pb-3 border-bottom">
                <label className="mb-2">Select People</label>

                <div className="d-flex w-100">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      value="prevMeetingRadio"
                      onChange={() => setSelectedOption("prevMeetingRadio")}
                      checked
                    />
                    <label
                      className="mb-2 form-check-label"
                      for="flexRadioDefault1"
                    >
                      Select From Previous Meetings
                    </label>
                  </div>

                  <div className="form-check-inline">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="fromEmployeegRadio"
                        onChange={() => setSelectedOption("fromEmployeegRadio")}
                      />
                      <label
                        className=" mb-2 form-check-label"
                        for="flexRadioDefault1"
                      >
                        Select From Employees
                      </label>
                    </div>
                  </div>

                  <div className="form-check-inline">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="fromEmployeegRadio"
                       // checked={this.state.value === 1}
                        onChange={() => setSelectedOption("addNewPeople")}
                      />
                      <label
                        className=" mb-2 form-check-label"
                        for="flexRadioDefault1"
                      >
                        Add New People
                      </label>
                    </div>
                  </div>
                </div>
                </div>
                {selectedOption == "prevMeetingRadio" ? (
                  <select className="mb-2">
                    <option value="" disabled selected>
                      {" "}
                      Name / Email Address
                    </option>
                    <option value="prabhas@example.com">Prabhas Khamari</option>
                    <option value="debasis@example.com">Debasis Behera</option>
                    <option value="rakesh@example.com">Rakesh Baral</option>
                  </select>
                ) : selectedOption == "fromEmployeegRadio" ? (
                  <select className="mb-2">
                    <option value="" disabled selected>
                      {" "}
                      Name / Employee ID
                    </option>
                    <option value="prabhas@example.com">Prabhas Khamari</option>
                    <option value="debasis@example.com">Debasis Behera</option>
                    <option value="rakesh@example.com">Rakesh Baral</option>
                  </select>
                ) : (
                  <div className="form-group">
                    <label className="mb-1">Add New People</label>
                    <div className="row">
                      <div className="col-xl-6">
                        <input
                          type="text"
                          className="mb-2"
                          placeholder="Email"
                        />
                      </div>
                      <div className="col-xl-6">
                        <input type="text" placeholder="Name" />
                      </div>
                    </div>
                
            

              <div className="form-group d-flex ">
                <button
                  type="button"
                  className="btn rounded-pill add-btn Mom-btn d-flex align-items-center justify-content-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#fff"
                    className="bi bi-plus-circle pointer me-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                  <p> Add </p>
                </button>
              </div>
              </div>
                )}
            </div>
            <div style={{marginTop:20, display: "flex"}}>
            <Button variant="primary" onClick={(e) => setStep(1)} style={{margin:10}}>
              BACK
            </Button>
            <Button variant="primary" type="submit" style={{margin:10}}>
              NEXT
            </Button>
            </div>
           
          </div>
        </form>
      ) : (
        <form
          className="mt-2 details-form"
          onSubmit={() => submitMeetingDetails}
        >
          <div className="inner-detail-form">
            <div className="form-group mt-3 agenda">
              <label className="mb-1">Agenda Item</label>
              <div className="mt-2 mb-3 plus pointer">
                <button type="button" onClick={onAddAgenda}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    fill="#0564f3"
                    className="bi bi-plus-circle pointer"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                </button>
                {agendas.length > 0 ? (
                  <button type="button" onClick={onRemoveAgenda}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      fill="#0564f3"
                      className="bi bi-minus-circle pointer"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                  </button>
                ) : null}

                <div>Create Agenda Item</div>
              </div>
            </div>

            <div>
              <div id="inputFields">
                <div id="children-pane">{agendas}</div>
              </div>
              <div style={{marginTop:20, }}>
              <Button
                type="button"
                variant="primary"
                onClick={() => setStep(2)}
               
              >
                BACK
              </Button>
              <Button variant="primary" type="submit"  style={{margin:20}}>
                SUBMIT
              </Button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

const AgendaComponent = (props) => {
  const [open, setOpen] = useState(false);
  console.log("open---------------------------------", open);
  return (
    <div>
      <h2>
        <button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          type="button"
        >
          Agenda {props.number + 1}
        </button>
      </h2>
      <div>
        <Collapse in={open}>
          <div >
            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="mb-1">Agenda Title</label>
                </div>
                <div className="col-md-8">
                  <input type="text" placeholder="Enter agenda title here" />
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
                    name=""
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
                      value="15.00"
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

export default AddMeeting;
