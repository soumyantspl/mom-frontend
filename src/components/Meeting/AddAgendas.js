import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { Margin } from "../../../node_modules/@mui/icons-material/index";
import { getMeetingRoomList } from "../../redux/actions/meetingRoomAction.js/meetingRoomAction";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link, useLocation } from "react-router-dom";
import CommonStepper from "../Common/CommonStepper";
import CreateMeeting from "./CreateMeeting";
import {
  createMeetingDetails,
  getCreateMeetingStep,
  loadCreateMeeting,
  setCreateNewMeetingPage,
  updateIsCreateMeetingProcessed,
  updateMeetingDetails,
  updateStep,
} from "../../redux/actions/meetingActions/MeetingAction";
import Loader from "../Common/Loader";
import * as constantMessages from "../../constants/constatntMessages";
import "../Login/style/Login.css";
import LoaderButton from "../Common/LoaderButton";
import AddAttendees from "./AddAttendees";
import Alert from "../Common/Alert";
import AgendaComponent from "./AddAgendaComp";
import AddAgendaComp from "./AddAgendaComp";
import NewAgenda from "./NewAgenda";

const AddAgendas = () => {
  const accessToken = localStorage.getItem("accessToken");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const dispatch = useDispatch();
  const meetingRoomData = useSelector((state) => state.meetingRoom);
  const meetingData = useSelector((state) => state.meeting);
  const employeeData = useSelector((state) => state.user);
  //console.log(meetingRoomData);
  const [numAgenda, setNumAgenda] = useState(1);
  const [attendees, setAttendees] = useState([]);
  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState("prevMeetingRadio");
  const [isManualLocation, setIsManualLocation] = useState(true);
  const location = useLocation();
  console.log(location);
  const stateData = location.state;
  console.log(meetingData);
  const [removeAttendeeData, setRemoveAttendeeData] = useState({});
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: " ",
    topic: "",
    timeLine: "0",
    index: 0,
  });
  const [agendaData, setAgendaData] = useState([]);
  useEffect(() => {
    document.title = "Create Meeting: Meeting Plus";
    if (stateData.isMeetingDataUpdate || meetingData.isUpdateStep) {
      document.title = "Update Meeting: Meeting Plus";
      setAgendaData(
        meetingData?.singleMeetingDetails?.agendasDetail?.map((item) => {
          item.uid = Math.floor(100000 + Math.random() * 900000);
          return item;
        })
      );
    }
    // dispatch(setCreateNewMeetingPage(true))
  }, []);

  const submitAgendasDetails = (isSendNotification) => {
   
  //  e.preventDefault();
    console.log(isSendNotification)
    if (agendaData.length === 0) {
      const newErrors = validateForm(formData);
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        console.log("uuuuuuuuuuu");
        const errors = {};
        errors.addAgenda = constantMessages.addAgenda;
        //  errors.index = formData.index;
        setErrors(errors);
      }
    } else {
      const newAgendaData = agendaData.map((item) => {
        return {
          topic: item.topic,
          title: item.title,
          timeLine: item.timeLine.toString(),
        };
      });
      const meetingId = meetingData?.singleMeetingDetails?._id;
      const payload = {
        agendas: newAgendaData,
        organizationId: userData.organizationId,
        step: 3,
        meetingStatus: "scheduled",
        isUpdate:
          stateData.isMeetingDataUpdate &&
          meetingData.singleMeetingDetails.step === 3
            ? true
            : false,
      };
      console.log(payload);
      dispatch(
        updateMeetingDetails(
          meetingId,
          payload,
          accessToken,
          "addAgenda",
          stateData.isMeetingDataUpdate
        )
      );
      //setStep(3);
    }
  };

  const onAddAgenda = () => {
    console.log(formData);
    console.log(agendaData);
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("inside form submit success");
      //   setFormData({
      //     ...formData,
      //     index: formData.index + 1,
      //   });
      const uid = Math.floor(100000 + Math.random() * 900000);
      setAgendaData([
        ...agendaData,
        {
          topic: formData.topic,
          timeLine: formData.timeLine,
          title: formData.title,
          uid,
        },
      ]);
      setFormData({
        ...formData,
        title: " ",
        topic: "",
        timeLine: "0",
        index: 0,
      });

      setNumAgenda(numAgenda + 1);
    } else {
      console.log("inside form submit errror");

      //setNumAgenda(numAgenda + 1);
    }
  };

  const validateForm = () => {
    //  console.log(formData.title);
    const errors = {};

    if (!formData?.title.trim()) {
      errors.title = constantMessages.titleRequired;
      // errors.index = formData.index;
    }

    if (formData.timeLine > 365 || formData.timeLine < 0) {
      errors.timeLine = constantMessages.invalidTime;
    }

    return errors;
  };

  const onRemoveAgenda = (uid) => {
    console.log(uid);
    // console.log(agendaIndex);
    console.log(agendaData);
    const filteredAgenda = agendaData.filter((item) => item.uid !== uid);
    console.log(filteredAgenda);
    setAgendaData(filteredAgenda);
    // setAttendeesData(filteredAttendees);
    // setIsModalOpen(false);
    //   console.log(agendas);
    //  agendas.filter((item) => item.props.uid !== uid);
    // console.log(agendas);
    // console.log(numAgenda);
    // if (numAgenda !== 1) {
    //   setNumAgenda(numAgenda - 1);
    // }
  };

  const getAgendaData = (data) => {
    console.log(data);
    // setAgendaData([...agendaData, data]);
    setFormData({
      ...formData,
      title: data.title,
      topic: data.topic,
      timeLine: data.timeLine,
      // index: data.index,
    });
  };

  // for (var i = 0; i < numAgenda; i += 1) {
  //   agendas.push(
  //     <AgendaComponent
  //       key={i}
  //       number={i}
  //       agendaData={getAgendaData}
  //       errorData={errors}
  //       onRemoveAgenda={onRemoveAgenda}
  //       uid={Math.floor(100000 + Math.random() * 900000)}
  //     />
  //   );
  // }
  const handleChange = (e, uid) => {
    // dispatch(updateIsCreateMeetingProcessed(false));
    setErrors({});
    //  dispatch(updateOtpProcessed(false));
    //  console.log("9999999999999999999999999999999999999", authData);
    const { name, value } = e.target;
    console.log(name, value);

    // props.agendaData(formData)
    console.log(agendaData);
    if (uid) {
      const modifiedAgendas = agendaData.map((obj) => {
        if (obj.uid === uid) {
          return { ...obj, [name]: value };
        }
        return obj;
      });

      console.log(modifiedAgendas);
      setAgendaData(modifiedAgendas);
    } else {
      setFormData({
        ...formData,
        //   index: props.index ,
        [name]: value,
      });
    }
  };

  const [open, setOpen] = useState(true);
  const validateAgendaTitle = () => {
    console.log(formData);
    const errors = {};
    if (!formData?.title.trim()) {
      console.log(formData);
      errors.title = constantMessages.titleRequired;
      // errors.index = formData.index;
    }
    setErrors(errors);
  };
  const validateAgendaTime = () => {
    console.log(formData);
    const errors = {};

    if (formData.timeLine > 365 || formData.timeLine < 0) {
      errors.timeLine = constantMessages.invalidTime;
    }
    setErrors(errors);
  };
  console.log(agendaData);
  console.log(formData.topic);
  return (
    <form
      className="mt-2 details-form no-padding-2"
     // onSubmit={submitAgendasDetails}
    >
      <div className="inner-detail-form">
        <div className="form-group agenda">
          <label className="mb-1">Agenda Item</label>
        </div>

        <div>
          <div id="inputFields">
            <div id="children-pane">
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
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      fill="#0564f3"
                      className="bi-minus-circle bi bi-dash-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                    </svg> */}
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
                        <div className="mb-2">
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
                                onChange={handleChange}
                                onBlur={validateAgendaTitle}
                                autoComplete="off"
                              />

                              {errors.title ? (
                                <span className="error-message">
                                  {errors.title}
                                </span>
                              ) : null}
                            </div>
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
                              onChange={handleChange}
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
                                // max="360"
                                // min="0"
                                name="timeLine"
                                value={formData.timeLine}
                                onChange={handleChange}
                                onBlur={validateAgendaTime}
                                // autoComplete="off"
                                required="required"
                                type="number"
                                autocomplete="off"
                              />
                              <div className="minute_box">mins</div>
                            </div>
                            {errors.timeLine && (
                              <span className="error-message">
                                {errors.timeLine}
                              </span>
                            )}

                            {/* {props.errorData.index===props.agenda.index && props.errorData.time && ( 
                  <span className="error-message">
                    {props.errorData.time}
                  </span>
                 )} */}
                          </div>
                        </div>

                        <div className="mt-2 mb-3 plus pointer">
                          {/* <button type="button" onClick={onAddAgenda}>
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
            <div>Add Agenda</div> */}

                          <button
                            type="button"
                            className="btn rounded-pill add-btn Mom-btn d-flex align-items-center justify-content-center "
                            onClick={onAddAgenda}
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
                            <p> Add Agenda</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
              </div>

              {agendaData?.length !== 0
                ? agendaData?.map((agenda, index) => {
                    return (
                      <>
                        <br></br>

                        <div className="agenda-background">
                          <h2>
                            <button
                              className=""
                              onClick={() => setOpen(!open)}
                              aria-controls="example-collapse-text"
                              aria-expanded={open}
                              type="button"
                            >
                              Agenda {index + 1}
                            </button>
                            <button
                              type="button"
                              onClick={() => onRemoveAgenda(agenda.uid)}
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
                                      <label className="mb-1">
                                        Agenda Title
                                      </label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        type="text"
                                        placeholder="Enter agenda title here"
                                        name="title"
                                        value={agenda.title}
                                        //  readonly={true}
                                        onChange={(e) =>
                                          handleChange(e, agenda.uid)
                                        }
                                        // onBlur={
                                        //   validateAgendaTitle
                                        // }
                                        autoComplete="off"
                                      />

                                      {/* {errors.title ? (
                      <span className="error-message">{errors.title}</span>
                    ):null} */}
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
                                        value={agenda.topic}
                                        onChange={(e) =>
                                          handleChange(e, agenda.uid)
                                        }
                                        // onChange={handleChange}
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
                                        How long will this agenda item take to
                                        discuss?
                                      </label>
                                    </div>
                                    <div className="col-md-8">
                                      <div className="time-taken">
                                        <input
                                          // max="360"
                                          // min="0"
                                          name="timeLine"
                                          value={agenda.timeLine}
                                          onChange={(e) =>
                                            handleChange(e, agenda.uid)
                                          }
                                          // onChange={handleChange}
                                          // onBlur={
                                          //   validateAgendaTime
                                          // }
                                          // autoComplete="off"
                                          required="required"
                                          type="number"
                                          autocomplete="off"
                                        />
                                        <div className="minute_box">mins</div>
                                      </div>

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
                      </>
                    );
                  })
                : null}

              {/* <NewAgenda  agendaData={getAgendaData} /> */}
              {/* {agendaData.map((agenda, i) => {
                return (
                  <AgendaComponent
                    key={i}
                    agenda={agenda}
                    index={i}
                    // agendaData={getAgendaData}
                    // errorData={errors}
                    // onRemoveAgenda={onRemoveAgenda}
                  />
                );
              })} */}
            </div>
          </div>
          {errors.addAgenda ? (
            <span className="error-message">{errors.addAgenda}</span>
          ) : null}
          <div className="button-outer" style={{ marginTop: 20 }}>
            {/* <Button
            type="button"
            variant="primary"
            onClick={() => setStep(2)}
          >
            Back
          </Button> */}

            {/* {meetingData.isCreateMeetingProcessed && meetingData.step === 3 ? (
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
            ) : null} */}

            <button
              className="btn-light"
              onClick={(e) => dispatch(updateStep(1, true))}
            >
              <p>Back</p>
            </button>
            {!meetingData.loading ? (
              <>
                {stateData.isMeetingDataUpdate ? (
                  <button
                    className="create-meeting-button Mom-btn"
                    type="submit"
                  >
                    <p>Update </p>
                  </button>
                ) : (
                  <>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                      >
                        Save
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item type="submit" onClick={()=>submitAgendasDetails(false)}>Save</Dropdown.Item>
                        <Dropdown.Item type="submit" onClick={()=>submitAgendasDetails(true)}>
                          Save and Notification
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                )}
              </>
            ) : (
              <LoaderButton />
            )}
          </div>
          <div></div>
        </div>
      </div>
    </form>
  );
};

export default AddAgendas;
