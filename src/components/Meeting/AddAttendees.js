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
  fetchAttendeesList,
  getAttendeesListFromPreviousMeeting,
  getAttendeesListfromEmployeeList,
  getCreateMeetingStep,
  loadCreateMeeting,
  updateMeetingDetails,
} from "../../redux/actions/meetingActions/MeetingAction";
import Loader from "../Common/Loader";
import * as constantMessages from "../../constants/constatntMessages";
import "../Login/style/Login.css";
import LoaderButton from "../Common/LoaderButton";
import {
  checkDuplicateUser,
  getEmployeeList,
} from "../../redux/actions/userAction/userAction";
import { customName } from "../../helpers/commonHelpers";
import CommonModal from "../Common/CommonModal";
import Alert from "../Common/Alert";
import RemoveAttendeesModal from "./RemoveAttendeesModal";

const AddAttendees = (props) => {
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
    attendeeId: null,
    name: "",
    email: "",
    //  attendeesData:[]
  });
  const [attendeesData, setAttendeesData] = useState([]);
 

  useEffect(() => {
    document.title = "Create Meeting: Meeting Plus";

    if (formData.attendyType === "fromPreviousMeeting") {
      dispatch(fetchAttendeesList(userData.organizationId, accessToken));
    }
    console.log(employeeData);
    if (employeeData.isDuplicateUser === false) {
      const newAttendee = {
        name: formData.name,
        email: formData.email,
        isEmployee: false,
        organizationId: userData.organizationId,
      };
      const newAttendeeData = [...attendeesData, newAttendee];
      setAttendeesData(newAttendeeData);
      setFormData({
        ...formData,
        name: "",
        email: "",
      });
    }
    // if(!employeeData.isDuplicateUser){
    //   dispatch(getCreateMeetingStep(userData.organizationId, accessToken));
    // }
   
    // console.log(meetingData.step);
    // setStep(meetingData.step + 1);

    // setAttendeesData(meetingData?.singleMeetingDetails?attendees)
  }, [meetingData.step,
     employeeData.isDuplicateUser
    ]);
console.log(meetingData)
  const submitAttendeeDetails = (e) => {
    e.preventDefault();
    console.log("sssssssssssssss", attendeesData);
    if (attendeesData.length === 0) {
      const newErrors = validateForm(formData);
      console.log(newErrors);
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        console.log("uuuuuuuuuuu");
        const errors = {};
        errors.addAttendee = constantMessages.addAttendee;
        //  errors.index = formData.index;
        setErrors(errors);
      }
    } else {
      const meetingId = meetingData?.singleMeetingDetails?._id;
      console.log(attendeesData)
  
      const payload = {
        attendees: attendeesData,
        organizationId: userData.organizationId,
        step: meetingData?.singleMeetingDetails?.step + 1,
        meetingStatus:meetingData?.singleMeetingDetails?.meetingStatus.status
      };
      dispatch(updateMeetingDetails(meetingId, payload, accessToken,"addAttendee"));
    }
    //  setStep(3);
  };

  const addAttendee = async (e) => {
    // const attenId = e.target.value;
    // const user = userlist.find(u => u.id === userId);
    console.log(employeeData.employeeList)
    console.log(meetingData.attendeeList)
    let attendeeList=[]
    if(employeeData.employeeList){
      const newEmpList=employeeData.employeeList.map((item)=>{
        return {
          _id:item._id,
          name:item.name,
          email:item.email
        }
      })
      attendeeList=[...attendeeList,...newEmpList]
    }
    if(meetingData.attendeesList){
      attendeeList=[...attendeeList,...meetingData.attendeesList]
    }
   // const attendeeList=[...employeeData.employeeList,...meetingData?.attendeeList]
    console.log(attendeeList)
    if (formData.attendyType === "addNewPeople") {
      const newErrors = validateForm(formData);
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        if (attendeesData.length > 0) {
          const attendeeFound = attendeesData.find(
            (u) => u.email === formData.email
          );
          console.log(attendeeFound);
          if (attendeeFound) {
            const errors = {};
            errors.duplicateAttendee = constantMessages.duplicateAttendee;
            setErrors(errors);
            return errors;
          }
        }

        console.log(
          "duplicate----------------------------------------------------------------------"
        );

        const payload = {
          organizationId: userData.organizationId,
          email: formData.email,
        };
        // await checkDuplicateUser(payload);
        dispatch(checkDuplicateUser(payload, accessToken));
        console.log(employeeData);
        console.log("duplicate222222222");
      }
      //  addNewPeople();
    } else {
      if (formData.attendeeId) {
        console.log(formData.attendeeId )
        if (attendeesData.length > 0) {
          console.log(attendeesData);
          const attendeeFound = attendeesData.find(
            (u) => u._id === formData.attendeeId 
          );
          console.log(attendeeFound);
          if (attendeeFound) {
            const errors = {};
            errors.duplicateAttendee = constantMessages.duplicateAttendee;
            setErrors(errors);
            return errors;
          }
        }
        console.log(meetingData.attendeesList)
        let newAttendee = attendeeList.find(
          (u) => u._id === formData.attendeeId 
        );
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",attendeesData,formData.attendeeId)
        newAttendee.isEmployee = true;
       // newAttendee.id=newAttendee._id
      //  delete newAttendee._id
      
        console.log(newAttendee);
        //  const newAttendee = e.target.value;
        const newAttendeeData = [...attendeesData, newAttendee];
        setAttendeesData(newAttendeeData);
      }
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (formData.attendyType === "addNewPeople") {
      const regularExpression = /^[A-Za-z\s]+$/; //returns true if matched, vaidates for a-z and A-Z and white space
      if (!formData.name.trim()) {
        errors.name = constantMessages.nameRequired;
      } else if (!regularExpression.test(formData.name)) {
        errors.name = constantMessages.invalidName;
      }

      if (!formData.email.trim()) {
        errors.email = constantMessages.emailRequired;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = constantMessages.invalidEmail;
      }
    }
    return errors;
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
      dispatch(fetchAttendeesList(userData.organizationId, accessToken));
    }

    if (value === "fromEmployeeList") {
      const payload = {
        organizationId: userData.organizationId,
      };

      dispatch(getEmployeeList(payload, accessToken));
    }
  };

  const nameFieldValidationCheck = (e) => {
    console.log("on blur");
    const errors = {};
    // if (!formData.password) {
    //   errors.roomId = constantMessages.roomRequired;
    //   setErrors(errors);
    // }
    const regularExpression = /^[A-Za-z\s]+$/; //returns true if matched, vaidates for a-z and A-Z and white space
    if (!formData.name.trim()) {
      errors.name = constantMessages.nameRequired;
    } else if (!regularExpression.test(formData.name)) {
      errors.name = constantMessages.invalidName;
    }
    setErrors(errors);
  };

  const emailFieldValidationCheck = (e) => {
    const errors = {};
    // if (!formData.password) {
    //   errors.roomId = constantMessages.roomRequired;
    //   setErrors(errors);
    // }
    // if (!formData.password) {
    if (!formData.email.trim()) {
      errors.email = constantMessages.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = constantMessages.invalidEmail;
    }

    setErrors(errors);
    // }
  };

  const removeAttendee = (e) => {
    console.log(removeAttendeeData);
    const filteredAttendees = attendeesData.filter(
      (item) => item.email !== removeAttendeeData.email
    );
    console.log(filteredAttendees);
    setAttendeesData(filteredAttendees);
    setIsModalOpen(false);
    setFormData({
      ...formData,attendeeId:null
    })
  };

  console.log(
    attendeesData,
    formData,
    meetingData,
    employeeData
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <form className="m-0 p-0 details-form" onSubmit={submitAttendeeDetails}>
        <RemoveAttendeesModal
          message={constantMessages.deleteAttendeeMessage}
          title={"Remove"}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          handleSubmit={removeAttendee}
          buttonName={"Remove"}
          attendee={removeAttendeeData}
        />
        <div className="inner-detail-form">
          <label className="mb-1 people">Attendee(s)</label>
          <div className="d-flex people ">
            {attendeesData.length > 0 ? (
              <>
                {/* <div className="people-circle-add Mom-btn pointer">
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
                </div> */}
                {attendeesData.map((attendee, index) => {
                  return (
                    <div className="attendee-content" key={index}>
                      <div
                        className="attendee1 attendee-list sl"
                        // className="people-circle"
                        onClick={() => {
                          setIsModalOpen(true);
                          setRemoveAttendeeData(attendee);
                        }}
                      >
                        {customName(attendee.name)}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : null}
            {/* <div className="people-circle-add Mom-btn pointer">
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
            </div> */}
          </div>

          <div className="add-people-box show">
            <div className="pt-3 pb-3">
              <label className="mb-2">Select People</label>

              <div className="w-100">
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
                     id="flexRadioDefault1"
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
                      id="flexRadioDefault2"
                      onChange={handleChange}
                      checked={formData.attendyType === "fromEmployeeList"}
                    />
                    <label
                      className=" mb-2 form-check-label"
                      for="flexRadioDefault2"
                       id="flexRadioDefault2"
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
                      id="flexRadioDefault3"
                      checked={formData.attendyType === "addNewPeople"}
                      // checked={this.state.value === 1}
                      onChange={handleChange}
                    />
                    <label
                      className=" mb-2 form-check-label"
                      for="flexRadioDefault3"
                       id="flexRadioDefault3"
                    >
                      Add New People
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {formData.attendyType === "fromPreviousMeeting" ? (
              <select
                className=""
                // name="attendeesData"
                // onChange={handleAttendeeChange}
                // value={attendeeId}

                onChange={handleChange}
                name="attendeeId"
                value={formData.attendeeId}
              >
                <option value="" disabled selected={true}>
                  {" "}
                  Name / Email Address
                </option>
                {meetingData.attendeesList &&
                  meetingData.attendeesList.map((attendee) => {
                    return (
                      <option value={attendee._id}>
                        {attendee.name} / {attendee.email}
                      </option>
                    );
                  })}
              </select>
            ) : formData.attendyType === "fromEmployeeList" ? (
              <select
                className="mb-2"
                onChange={handleChange}
                name="attendeeId"
                value={formData.attendeeId}
              >
                <option value="" disabled selected>
                  {" "}
                  Name / Employee ID
                </option>
                {employeeData.employeeList &&
                  employeeData.employeeList.map((employee) => {
                    return (
                      <option value={employee._id}>
                        {employee.name} / {employee.empId}
                      </option>
                    );
                  })}
              </select>
            ) : formData.attendyType === "addNewPeople" ? (
              <div className="form-group">
                <label className="mb-1">Add New People</label>
                <div className="row">
                  <div className="col-xl-6">
                    <input
                      type="text"
                      className="mb-2"
                      autoComplete="off"
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={nameFieldValidationCheck}
                    />
                    {errors.name && (
                      <span className="error-message">{errors.name}</span>
                    )}
                  </div>
                  <div className="col-xl-6">
                    <input
                      type="text"
                      placeholder="Email"
                      autoComplete="off"
                      name="email"
                      value={formData.email}
                      onBlur={emailFieldValidationCheck}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <span className="error-message">{errors.email}</span>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
            {errors.duplicateAttendee && (
              <span className="error-message">{errors.duplicateAttendee}</span>
            )}
            <div className="form-group d-flex atd-button">
              {!employeeData.loading ? (
                <button
                  type="button"
                  className="btn rounded-pill add-btn Mom-btn d-flex align-items-center justify-content-center "
                  onClick={addAttendee}
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
              ) : (
                <LoaderButton />
              )}
            </div>
            {/* {employeeData.isDuplicateUser === true ? (
              <div className="mb-3 col-padding-none">
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                    <div className="position-relative ">
                      <Alert
                        status={employeeData.isSuccess ? false : true}
                        message={employeeData.message}
                        timeoutSeconds={0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : meetingData.isCreateMeetingProcessed &&
              meetingData.step == 2 ? (
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
              {errors.addAttendee && (
            <span className="error-message">{errors.addAttendee}</span>
          )}
          </div>
          <div className="button-outer"
          
          >
        
          {!meetingData.loading ? (
            <>
              {/* <Button
                
                type="submit"
                className="create-meeting-button Mom-btn"
                onClick={(e) => setStep(2)}
              >
                Next
              </Button> */}
              <button
                    className="create-meeting-button Mom-btn"
                    type="submit"
                  >
                    <p>Next</p>
                  </button>
            </>
          ) : (
            <LoaderButton />
          )}
          {/* <Button
            variant="primary"
            class="btn-primary"
            onClick={(e) => dispatch(loadCreateMeeting(0))}
          >
            Back
          </Button> */}
        </div>
        </div>
      </form>
    </>
  );
};

export default AddAttendees;
