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
import AgendaComponent from "./AgendaComponent";

const AddAgendas = () => {
  const accessToken = localStorage.getItem("accessToken");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const dispatch = useDispatch();
  const meetingRoomData = useSelector((state) => state.meetingRoom);
  const meetingData = useSelector((state) => state.meeting);
  const employeeData = useSelector((state) => state.user);
  console.log(meetingRoomData);
  const [numAgenda, setNumAgenda] = useState(0);
  const [attendees, setAttendees] = useState([]);
  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState("prevMeetingRadio");
  const [isManualLocation, setIsManualLocation] = useState(true);

  const [removeAttendeeData, setRemoveAttendeeData] = useState({});
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: " ",
    topic: "",
    time: 0,
    index:0
  });
  const [agendaData, setAgendaData] = useState([]);
  useEffect(() => {
    document.title = "Create Meeting: Meeting Plus";
  }, []);

  const submitAgendasDetails = (e) => {
    e.preventDefault();
    //   const payload = {
    //     meetingId: meetingData?.singleMeetingDetails?._id,
    //     attendees: attendeesData,
    //     organizationId: userData.organizationId,
    //     step: meetingData?.singleMeetingDetails?.step + 1,
    //   };
    //   dispatch(updateMeetingDetails(payload, accessToken));
    //  setStep(3);
  };

  const agendas = [];

  const onAddAgenda = () => {
    console.log(formData);
      setAgendaData([...agendaData, formData]);
      setNumAgenda(numAgenda + 1);
    // if (agendaData.length !== 0) {
    //console.log(numAgenda, " ----", agendaData[numAgenda-1]);
    //  const formData = agendaData[numAgenda-1];
    // const newErrors = validateForm(formData);
    // setErrors(newErrors);

    // if (Object.keys(newErrors).length === 0) {
    //   setNumAgenda(numAgenda + 1);
    // } else {
    //   setNumAgenda(numAgenda + 1);
    // }
  };

  const validateForm = (formData) => {
    console.log(formData.title);
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = constantMessages.titleRequired;
    }

    if (!formData.time.trim()) {
      errors.time = constantMessages.timeRequired;
    }

    return errors;
  };

  const onRemoveAgenda = () => {
    setNumAgenda(numAgenda - 1);
  };

  const getAgendaData = (data) => {
    console.log(data);
    // setAgendaData([...agendaData, data]);
    setFormData({
      ...formData,
      title: data.title,
      topic: data.topic,
      time: data.time,
      index:data.index
    });
  };

  for (var i = 0; i < numAgenda; i += 1) {
    agendas.push(
      <AgendaComponent
        key={i}
        number={i}
        agendaData={getAgendaData}
        errorData={errors}
      />
    );
  }
  console.log(agendaData);
  console.log(agendas);
  return (
    <form className="mt-2 details-form" onSubmit={() => submitAgendasDetails}>
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
          <div className="d-flex align-items-center" style={{ marginTop: 20 }}>
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
  );
};

export default AddAgendas;
