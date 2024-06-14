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
  getAttendeesListFromPreviousMeeting,
  getCreateMeetingStep,
} from "../../redux/actions/meetingActions/MeetingAction";
import Loader from "../Common/Loader";
import * as constantMessages from "../../constants/constatntMessages";
import "../Login/style/Login.css";
import LoaderButton from "../Common/LoaderButton";

const AddAttendees = (props) => {
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
    attendyType: "fromPreviousMeeting",
  });

  useEffect(() => {
    document.title = "Create Meeting: Meeting Plus";

    if (formData.attendyType === "fromPreviousMeeting") {
      const payload = {
        limit: 1000,
        page: 1,
        order: 1,
        organizationId: userData.organizationId,
      };

      dispatch(
        getAttendeesListFromPreviousMeeting(
          userData.organizationId,
          accessToken
        )
      );
    }

    // dispatch(getCreateMeetingStep(userData.organizationId, accessToken));
    // console.log(meetingData.step);
    // setStep(meetingData.step + 1);
  }, [meetingData.step]);

  const submitAttendeeDetails = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleChange = (e) => {
    // dispatch(updateIsCreateMeetingProcessed(false));
    setErrors({});
    //  dispatch(updateOtpProcessed(false));
    //  console.log("9999999999999999999999999999999999999", authData);
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });

    if (value === "fromPreviousMeeting") {
      const payload = {
        limit: 1000,
        page: 1,
        order: 1,
        organizationId: userData.organizationId,
      };

      dispatch(
        getAttendeesListFromPreviousMeeting(
          userData.organizationId,
          accessToken
        )
      );
    }

    // if (value === "fromEmployeeList") {
    //   const payload = {
    //     limit: 1000,
    //     page: 1,
    //     order: 1,
    //     organizationId: userData.organizationId,
    //   };

    //   dispatch(getAttendeesListfromEmployeeList(payload, accessToken));
    // }
  };

  return (
    <>
      <form className="mt-0 p-0 details-form" onSubmit={submitAttendeeDetails}>
        <div className="inner-detail-form">
          <label className="mb-1 people">Attendee(s)</label>
          <div className="d-flex people ">
            {attendees.length > 0 ? (
              <>
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
                {attendees.map((attendee) => {
                  return <div className="people-circle">PK</div>;
                })}
              </>
            ) : null}
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
            <div className="pt-3 pb-3 border-bottom">
              <label className="mb-2">Select People</label>

              <div className="d-flex w-100">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="attendyType"
                    value="fromPreviousMeeting"
                    id="flexRadioDefault1"
                    onChange={handleChange}
                    checked={formData.attendyType === "fromPreviousMeeting"}
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
                      name="attendyType"
                      value="fromEmployeeList"
                      id="flexRadioDefault1"
                      onChange={handleChange}
                      checked={formData.attendyType === "fromEmployeeList"}
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
                      name="attendyType"
                      value="addNewPeople"
                      id="flexRadioDefault1"
                      checked={formData.attendyType === "addNewPeople"}
                      // checked={this.state.value === 1}
                      onChange={handleChange}
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
            {formData.attendyType == "fromPreviousMeeting" ? (
              <select className="mb-2">
                <option value="" disabled selected>
                  {" "}
                  Name / Email Address
                </option>
                {meetingData.attendeesList &&
                  meetingData.attendeesList.map((attendee) => {
                    return (
                      <option value={attendee._id}>{attendee.name}</option>
                    );
                  })}
              </select>
            ) : formData.attendyType == "fromEmployeeList" ? (
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
                    <input type="text" className="mb-2" placeholder="Email" />
                  </div>
                  <div className="col-xl-6">
                    <input type="text" placeholder="Name" />
                  </div>
                </div>

                <div className="form-group d-flex ">
                  <button
                    type="button"
                    className="btn rounded-pill add-btn Mom-btn d-flex align-items-center justify-content-center "
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
          <div
            style={{
              marginTop: 20,
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* <Button
                variant="primary"
                onClick={(e) => setStep(1)}
                style={{ margin: 10 }}
              >
                Back
              </Button> */}
            <Button
              variant="primary"
              type="submit"
              class="btn-primary"
              onClick={(e) => setStep(2)}
            >
              Next
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddAttendees;
