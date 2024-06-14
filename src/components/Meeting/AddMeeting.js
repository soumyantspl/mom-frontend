import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { Margin } from "../../../node_modules/@mui/icons-material/index";
import { getMeetingRoomList } from "../../redux/actions/meetingRoomAction.js/meetingRoomAction";
import { useSelector, useDispatch } from "react-redux";
import CommonStepper from "../Common/CommonStepper";
import CreateMeeting from "./CreateMeeting";
import {
  createMeetingDetails,
  getCreateMeetingStep,
  updateIsCreateMeetingProcessed,
} from "../../redux/actions/meetingActions/MeetingAction";
import Loader from "../Common/Loader";
import * as constantMessages from "../../constants/constatntMessages";
import "../Login/style/Login.css";
import LoaderButton from "../Common/LoaderButton";
import AddAttendees from "./AddAttendees";
import Alert from "../Common/Alert";

const AddMeeting = (props) => {
  const accessToken = localStorage.getItem("accessToken");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const dispatch = useDispatch();
  const meetingRoomData = useSelector((state) => state.meetingRoom);
  const meetingData = useSelector((state) => state.meeting);
  console.log(meetingRoomData);
  const [numAgenda, setNumAgenda] = useState(0);
  const [attendees, setAttendees] = useState([]);
  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState("prevMeetingRadio");
  const [isManualLocation, setIsManualLocation] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    mode: "physical",
    location: "manual",
    date: "",
    link: "",
    fromTime: "",
    toTime: "",
    roomId: null,
    locationData: "",
  });

  useEffect(() => {
    document.title = "Create Meeting: Meeting Plus";

    dispatch(getCreateMeetingStep(userData.organizationId, accessToken));
    console.log(meetingData.step);
    setStep(meetingData.step + 1);
  }, [meetingData.step]);

  console.log(step);

  const submitMeetingDetails = (e) => {
    console.log("submitMeetingDetails------------------------------");
    e.preventDefault();

    const newErrors = validateForm(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      let locationDetails = {};
      if (formData.location === "meetingroom") {
        locationDetails["isMeetingRoom"] = true;
        locationDetails["roomId"] = formData.roomId;
      } else {
        locationDetails["isMeetingRoom"] = false;
        locationDetails["location"] = formData.locationData;
      }

      const payload = {
        date: new Date(formData.date),
        locationDetails,
        organizationId: userData.organizationId,
        mode: formData.mode.toUpperCase(),
        fromTime: formData.fromTime,
        toTime: formData.toTime,
        title: formData.title,
      };
      console.log(payload);
      dispatch(createMeetingDetails(payload, accessToken));
      if (meetingData.isSuccess) {
        setStep(2);
      }
      console.log("Form submitted successfully!");
    } else {
      console.log(`Form submission failed
       due to validation errors.`);
    }
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

  const handleChange = (e) => {
    dispatch(updateIsCreateMeetingProcessed(false))
    setErrors({});
    //  dispatch(updateOtpProcessed(false));
    //  console.log("9999999999999999999999999999999999999", authData);
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });

    if (value === "meetingroom") {
      const payload = {
        limit: 1000,
        page: 1,
        order: 1,
        organizationId: userData.organizationId,
      };

      dispatch(getMeetingRoomList(payload, accessToken));
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.title.trim()) {
      errors.title = constantMessages.titleRequired;
    }

    if (!data.date.trim()) {
      errors.date = constantMessages.dateRequired;
    }
    if (!data.fromTime.trim()) {
      errors.fromTime = constantMessages.timeRequired;
    }
    if (!data.toTime.trim()) {
      errors.toTime = constantMessages.timeRequired;
    }

    if (data.location === "meetingroom") {
      if (!data.roomId.trim()) {
        errors.roomId = constantMessages.roomRequired;
      }
    } else {
      if (!data.locationData.trim()) {
        errors.locationData = constantMessages.locationRequired;
      }
    }

    const regexp =
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (formData.link.trim()) {
      if (!regexp.test(formData.link.trim())) {
        errors.link = constantMessages.invalidLink;
      }
    }

    return errors;
  };

  const fromDateFieldValidationCheck = (e) => {
    const errors = {};
    if (!formData.fromTime.trim()) {
      errors.fromTime = constantMessages.timeRequired;
      setErrors(errors);
    }
  };

  const locationDetailsFieldValidationCheck = (e) => {
    const errors = {};
    if (!formData.locationData.trim()) {
      errors.locationData = constantMessages.locationRequired;
      setErrors(errors);
    }
  };
  const toDateFieldValidationCheck = (e) => {
    const errors = {};
    if (!formData.toTime.trim()) {
      errors.toTime = constantMessages.timeRequired;
      setErrors(errors);
    }
  };

  const dateFieldValidationCheck = (e) => {
    const errors = {};
    if (!formData.date.trim()) {
      errors.date = constantMessages.dateRequired;
      setErrors(errors);
    }
  };

  const titleFieldValidationCheck = (e) => {
    const errors = {};
    if (!formData.title.trim()) {
      errors.title = constantMessages.titleRequired;
      setErrors(errors);
    }
  };

  const meetinRoomFieldValidationCheck = (e) => {
    const errors = {};
    if (!formData.roomId) {
      errors.roomId = constantMessages.roomRequired;
      setErrors(errors);
    }
  };

  const urlFieldValidationCheck = (e) => {
    const errors = {};
    var regexp =
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (formData.link.trim()) {
      if (!regexp.test(formData.link.trim())) {
        errors.link = constantMessages.invalidLink;
        setErrors(errors);
      }
    }
  };

  // const fieldValidationCheck = (e) => {
  //   e.preventDefault();

  //   const newErrors = validateForm(formData);
  //   setErrors(newErrors);
  //   if (Object.keys(newErrors).length === 0) {
  //     // Form submission logic here

  //     console.log("Form submitted successfully!");
  //   } else {
  //     console.log(`Form submission failed
  //      due to validation errors.`);
  //   }
  // };

  console.log("formData------------------------", formData);
  console.log(meetingData);
  return (
    <div className="mt-2 details-form add-meetings">
      <CommonStepper step={meetingData.step} />
      <br></br>
      {/* {!meetingData.loading ? (
        <> */}
      {meetingData.step + 1 == 1 ? (
        <form className="mt-0 p-0 details-form" onSubmit={submitMeetingDetails}>
          <div className="inner-detail-form">
            <div className="mb-3">
              <label className="mb-1" for="title">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter Meeting Title"
                onBlur={titleFieldValidationCheck}
              />
              {errors.title && (
                <span className="error-message">{errors.title}</span>
              )}
            </div>

            <div className="mb-3">
              <label className="mb-1">Meeting Mode</label>

              <div className="d-flex w-100">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="mode"
                    value="virtual"
                    onChange={handleChange}
                    checked={formData.mode === "virtual"}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Virtual Meeting
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="mode"
                      value="physical"
                      onChange={handleChange}
                      checked={formData.mode === "physical"}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Physical Meeting
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="mb-1" for="location">
                Location
              </label>

              <div className="d-flex w-100">
                <div className="form-check form-check-inline">
                  {}
                  <input
                    id="flexRadioDefault1"
                    className="form-check-input"
                    type="radio"
                    name="location"
                    value="manual"
                    onChange={handleChange}
                    checked={formData.location === "manual"}
                  />
                  <label className="form-check-label" for="locationtype">
                    Enter Manually
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <div className="form-check">
                    <input
                      id="flexRadioDefault1"
                      className="form-check-input"
                      type="radio"
                      name="location"
                      value="meetingroom"
                      onChange={handleChange}
                      checked={formData.location === "meetingroom"}
                      onBlur={meetinRoomFieldValidationCheck}
                    />
                    <label className="form-check-label" for="locationtype">
                      Select A Meeting Room
                    </label>
                  </div>
                </div>
              </div>
              {formData.location !== "meetingroom" ? (
                <textarea
                  className="mt-1"
                  placeholder="Enter Location"
                  id=""
                  cols="56"
                  rows="3"
                  onChange={handleChange}
                  name="locationData"
                  value={formData.locationData}
                  onBlur={locationDetailsFieldValidationCheck}
                ></textarea>
              ) : (
                // <select
                //   name="roomId"
                //   onChange={handleChange}
                //   value={formData.limit}
                // >
                //   <option value="">Meeting Room 1</option>
                //   <option value="">Meeting Room 2</option>
                //   <option value="">Meeting Room 3</option>
                // </select>

                <select
                  onChange={handleChange}
                  name="roomId"
                  value={formData.roomId}
                >
                  <option>Select Room</option>
                  {meetingRoomData?.meetingRoomList.length &&
                    meetingRoomData?.meetingRoomList.map((room) => {
                      return (
                        <option value={room._id}>
                          {room.title.charAt(0).toUpperCase() +
                            room.title.slice(1)}
                        </option>
                      );
                    })}
                </select>
              )}
              {errors.roomId && (
                <span className="error-message">{errors.roomId}</span>
              )}
              {errors.locationData && (
                <span className="error-message">{errors.locationData}</span>
              )}
            </div>

            <div className="mb-3">
              <label className="mb-1">Meeting Link</label>
              <input
                type="text"
                placeholder="Enter Meeting Link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                onBlur={urlFieldValidationCheck}
                autoComplete="off"
              />
              {errors.link && (
                <span className="error-message">{errors.link}</span>
              )}
            </div>

            <div className="mb-3 col-padding-none">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                  <div className="position-relative ">
                    <label className="mb-1 input-date">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      onBlur={dateFieldValidationCheck}
                    />
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
                  {errors.date && (
                    <span className="error-message">{errors.date}</span>
                  )}
                </div>

                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                  <div className="position-relative ms-3">
                    <label className="mb-1"> From Time</label>
                    <input
                      type="time"
                      className="input-time"
                      name="fromTime"
                      value={formData.fromTime}
                      onChange={handleChange}
                      onBlur={fromDateFieldValidationCheck}
                    />
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
                  {errors.fromTime && (
                    <span className="error-message">{errors.fromTime}</span>
                  )}
                </div>

                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                  <div className="position-relative ms-3">
                    <label className="mb-1">To Time</label>
                    <input
                      type="time"
                      className="input-time2"
                      name="toTime"
                      value={formData.toTime}
                      onChange={handleChange}
                      onBlur={toDateFieldValidationCheck}
                    />
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
                  {errors.toTime && (
                    <span className="error-message">{errors.toTime}</span>
                  )}
                </div>
              </div>
            </div>
            {/* <Button
                  variant="primary"
                  type="submit"
                  class="add-btn Mom-btn"
                  //  onClick={(e) => setStep(2)}
                >
                  Next
                </Button> */}

            {!meetingData.loading ? (
              // <div className="create-meeting-button">
              //   <Button
              //     variant="primary"
              //     type="submit"
              //     className="Mom-btn"
              //     //  onClick={() => setIsSetPassword(false)}
              //   >
              //     Next
              //   </Button>
              <>
                <div className="create-meeting-button create-meet-btn">
                  {meetingData.isCreateMeetingProcessed ? (
                    <div className="mb-3 col-padding-none">
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                          <div className="position-relative ">
                            <Alert
                              status={meetingData.isSuccess}
                              message={meetingData.message}
                              timeoutSeconds={0}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <button
                    className="create-meeting-button Mom-btn"
                    type="submit"
                  >
                    <p>Next</p>
                  </button>
                </div>
              </>
            ) : (
              // </div>
              <LoaderButton />
            )}
          </div>
        </form>
      ) : meetingData.step + 1 === 2 ? (
        <>
          <AddAttendees />
        </>
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
                <div>Create Agenda Item</div>
                {agendas.length > 0 ? (
                  <button type="button" onClick={onRemoveAgenda}>
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
                ) : null}
                {/* <div>Remove Agenda Item</div> */}
              </div>
            </div>

            <div>
              <div id="inputFields">
                <div id="children-pane">{agendas}</div>
              </div>
              <div
                className="d-flex align-items-center"
                style={{ marginTop: 20 }}
              >
                {/* <Button
                  type="button"
                  variant="primary"
                  onClick={() => setStep(2)}
                >
                  Back
                </Button> */}
                <Button
                  variant="primary"
                  type="submit"
                  style={{ margin: 20 }}
                  onClick={(e) => setStep(3)}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}
      {/* </>
      ) : (
        <div
          className="meeting-page"
          style={{ textAlign: "center", paddingTop: 20 }}
        >
          <Loader />
        </div>
      )} */}
    </div>
  );
};

const AgendaComponent = (props) => {
  const [open, setOpen] = useState(false);
  console.log("open---------------------------------", open);
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
