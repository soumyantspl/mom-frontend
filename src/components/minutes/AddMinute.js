import React, { useState, useEffect } from "react";
import * as constantMessages from "../../constants/constatntMessages";
import { useSelector, useDispatch } from "react-redux";
import { fetchAttendeesList } from "../../redux/actions/meetingActions/MeetingAction";
import {
  checkDuplicateUser,
  getEmployeeList,
} from "../../redux/actions/userAction/userAction";
import LoaderButton from "../Common/LoaderButton";
import { ToastContainer, toast } from "react-toastify";
import { setFinalMinuteData } from "../../redux/actions/minuteActions/MinuteAction";

const AddMinute = (props) => {
  console.log(props);
  const meetingData = useSelector((state) => state.meeting);
  const employeeData = useSelector((state) => state.user);
  const minutesDetails = useSelector((state) => state.minute);
  console.log(minutesDetails);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    description: "",
    date: "",
    priority: "",
    attendyType: "fromPreviousMeeting",
    responsiblePersonId: "",
    isAction: false,
    //attendeesData: null,
    name: "",
    email: "",
  });
  const [attendeesData, setAttendeesData] = useState([]);
  const [minuteData, setMinuteData] = useState([]);
  useEffect(() => {
    console.log("rrrrrrrrrrrrrrrrrrrrrrrrr");
    //  submitMinuteData();
    //   setAttendeesData(
    //     meetingData.singleMeetingDetails?.attendees?.map(
    //       ({ rsvp, ...keepAttrs }) => keepAttrs
    //     )
    //   );

    if (formData.attendyType === "fromPreviousMeeting") {
      dispatch(fetchAttendeesList(userData.organizationId, accessToken));
    }
  
    if (employeeData.isDuplicateUser === false) {
      const newMinute = {
        description: formData.description,
      };
      const newMinuteData = [...minuteData, newMinute];
      setAttendeesData(newMinuteData);
      //   setFormData({
      //     ...formData,
      //     name: "",
      //     email: "",
      //   });
    }
    // if(!employeeData.isDuplicateUser){
    //   dispatch(getCreateMeetingStep(userData.organizationId, accessToken));
    // }

    // console.log(meetingData.step);
    // setStep(meetingData.step + 1);

    // setAttendeesData(meetingData?.singleMeetingDetails?attendees)
console.log(meetingData.meetingDetails)
    let attendees = meetingData.meetingDetails?.attendees.map((attendee) => {
      attendee.id = attendee._id;
      attendee.status = "PENDING";
      delete attendee._id;
      delete attendee.rsvp;
      return attendee;
    });
    setAttendeesData(attendees);
   
  }, [employeeData.isDuplicateUser, props.trigger]);
  console.log(attendeesData)
  console.log(minuteData, meetingData, formData);
  const submitMinuteData = () => {
    console.log("call api", minuteData);
    if (minuteData.length !== 0) {
      console.log("tttttttttttttt");
      const newErrors = validateForm(formData);
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        console.log("uuuuuuuuuuu", minuteData);
      } else {
        console.log("not submited");
      }
    } else {
      console.log("rrrrrrrrrrrr");
      toast.error("Please add minutes first", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
      });
    }
  };

  const checkHandler = (e, uid) => {
    const { name, value, checked } = e.target;
    console.log(uid);
    console.log(checked);
    if (uid) {
      const modifiedMinutes = minuteData.map((obj) => {
        if (obj.uid === uid) {
          return { ...obj, isAction: checked };
        }
        return obj;
      });

      console.log(modifiedMinutes);
      setMinuteData(modifiedMinutes);

      dispatch(setFinalMinuteData(modifiedMinutes));
    } else {
      setFormData({
        ...formData,
        isAction: !formData.isAction,
      });
    }
  };

  const handleChange = (e, uid) => {
    setErrors({});
    const { name, value } = e.target;
    console.log(name, value);
    if (uid) {
      const modifiedMinutes = minuteData.map((obj) => {
        if (obj.uid === uid) {
          return { ...obj, [name]: value };
        }
        return obj;
      });

      console.log(modifiedMinutes);

      dispatch(setFinalMinuteData(modifiedMinutes));
      setMinuteData(modifiedMinutes);
    } else {
      setFormData({
        ...formData,
        //   index: props.index ,
        [name]: value,
      });
    }

    if (value === "fromEmployeeList") {
      const payload = {
        organizationId: userData.organizationId,
      };

      dispatch(getEmployeeList(payload, accessToken));
    }

    //     if (value === "addNewPeople") {
    //         setFormData({
    //             ...formData,
    // responsiblePersonId:null
    //         })

    //       }

    // const responsiblePerson = {
    //    personId:
    //     isEmployee: false,
    //     // organizationId: userData.organizationId,
    //   };
    // //   const newAttendeeData = [...attendeesData, newAttendee];
    //   setAttendeesData(newAttendee);
  };

  const validateMinuteTitle = () => {
    console.log(formData);
    const errors = {};
    if (!formData?.description.trim()) {
      console.log(formData);
      errors.description = constantMessages.titleRequired;
      // errors.index = formData.index;
    }
    setErrors(errors);
  };

  const dateFieldValidationCheck = (e) => {
    const errors = {};
   if (formData.date.trim()) {
      const currentDate = new Date();
      const inputDate = new Date(formData.date);
      let differenceInTime = inputDate.getTime() - currentDate.getTime();
      let differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
      if (differenceInDays < 0) {
        errors.date = constantMessages.invalidDate;
      }
    }
    setErrors(errors);
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
    // else {
    //   console.log("innnn", !formData.responsiblePersonId.trim());
    //   if (!formData.responsiblePersonId.trim()) {
    //     console.log("innnn2222222", !formData.responsiblePersonId.trim());
    //     errors.responsiblePersonId = constantMessages.responsiblePersonRequired;
    //   }
    // }

    if (!formData?.description.trim()) {
      console.log(formData);
      errors.description = constantMessages.titleRequired;
      // errors.index = formData.index;
    }

   
    if (formData.date.trim()) {
      const currentDate = new Date();
      const inputDate = new Date(formData.date);
      let differenceInTime = inputDate.getTime() - currentDate.getTime();
      let differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
      if (differenceInDays < 0) {
        errors.date = constantMessages.invalidDate;
      }
    }
    // if (!formData?.priority.trim()) {
    //   console.log(formData);
    //   errors.priority = constantMessages.priorityRequired;
    //   // errors.index = formData.index;
    // }

    console.log("errors----------------", errors);

    return errors;
  };

  const onAddMinute = () => {
    console.log(formData);
    console.log(minuteData);
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("inside form submit success");
      //   setFormData({
      //     ...formData,
      //     index: formData.index + 1,
      //   });
      const uid = Math.floor(100000 + Math.random() * 900000);
      const responsiblePersonId= formData.responsiblePersonId === "" && formData.name===""&& formData.email==="" ?userData._id:formData.responsiblePersonId;
      const newMinuteData = [
        ...minuteData,
        {
          createdById:userData._id,
          organizationId: userData.organizationId,
          agendaId: props.agenda._id,
          meetingId: meetingData?.singleMeetingDetails?._id?.toString(),
          attendees: attendeesData,
          description: formData.description,
          dueDate:  formData.date===""?new Date( meetingData?.singleMeetingDetails?.date):formData.date,
          priority: formData.priority===""?"LOW":formData.priority,
          isNewUser:formData.name!==""&& formData.email!=="" ?true:false,
          attendyType: formData.attendyType,
         assignedUserId:responsiblePersonId,
          isAction: formData.isAction,
          //attendeesData: null,
          name: formData.name,
          email: formData.email,
          uid,
        },
      ];
      setMinuteData(newMinuteData);

      dispatch(setFinalMinuteData(newMinuteData));

      setFormData({
        ...formData,
        description: " ",
        date: "",
        priority: "",
        attendyType: "fromPreviousMeeting",
        responsiblePersonId: "",
        isAction: false,
        //attendeesData: null,
        name: "",
        email: "",
      });
    } else {
      console.log("inside form submit errror");

      //setNumAgenda(numAgenda + 1);
    }
  };

  const onRemoveMinute = (uid) => {
    console.log(uid);
    // console.log(agendaIndex);
    console.log(minuteData);
    const filteredMinute = minuteData.filter((item) => item.uid !== uid);
    console.log(filteredMinute);
    setMinuteData(filteredMinute);
    dispatch(setFinalMinuteData(filteredMinute));
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



  return (
    <>
      <form className="addminutesboxfrom">
        <div
          className={
            props.isMinuteShow ? "mt-4 minutes-box show" : "mt-4 minutes-box"
          }
          // className="mt-4 minutes-box show"
        >
          <div className="form-group">
            <div className=" mt-1 mb-1 d-flex justify-content-between align-items-center">
              <label>Minutes</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  // value={formData.isAction}
                  id="flexCheckDefault"
                  name="isAction"
                  onChange={checkHandler}
                  //  checked={formData.isAction}
                  checked={formData.isAction}
                />
                <label
                  className="form-check-label"
                  id="flexCheckDefault"
                  for="flexCheckDefault"
                >
                  Add Action
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div>
                  <input
                    type="text"
                    placeholder="Enter minute description here"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={validateMinuteTitle}
                    autoComplete="off"
                  />

                  {errors.description ? (
                    <span className="error-message">{errors.description}</span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="add-action">
            <div className="form-group">
              <div className="position-relative">
                <label className="pb-2 input-date"> Due Date</label>
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

            <div className="form-group">
              <div className="position-relative">
                <label className="pb-2 input-date">Priority</label>
                <div>
                  <select name="priority" id="priority" onChange={handleChange}>
                    <option value="">Select Priority</option>
                    <option value="HIGH">High</option>
                    <option value="NORMAL">Normal</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>
              </div>
              {errors.priority ? (
                <span className="error-message">{errors.priority}</span>
              ) : null}
            </div>

            <div className="form-group pb-3 border-bottom">
              <label className="pb-2">Select Responsible Person</label>

              {/* <div className="pb-2 d-flex w-100">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  value="manually"
                  type="radio"
                  name="locationtype"
                  id="flexRadioDefault1"
                />
                <label className="form-check-label">
                  Select From Attendees
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
                  <label className="form-check-label">
                    Select From Employees
                  </label>
                </div>
              </div>
            </div> */}

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

              {formData.attendyType === "fromPreviousMeeting" ? (
                <select
                  className=""
                  // name="attendeesData"
                  // onChange={handleAttendeeChange}
                  // value={attendeeId}

                  onChange={handleChange}
                  name="responsiblePersonId"
                  value={formData.responsiblePersonId}
                >
                  <option value="" selected={true}>
                    {" "}
                    Name / Email Address
                  </option>
                  {meetingData.attendeesList &&
                    meetingData.attendeesList.map((attendee, index) => {
                      return (
                        <option key={index} value={attendee._id}>
                          {attendee.name} / {attendee.email}
                        </option>
                      );
                    })}
                </select>
              ) : formData.attendyType === "fromEmployeeList" ? (
                <select
                  className="mb-2"
                  onChange={handleChange}
                  name="responsiblePersonId"
                  value={formData.responsiblePersonId}
                >
                  <option value="" selected>
                    {" "}
                    Name / Employee ID
                  </option>
                  {employeeData.employeeList &&
                    employeeData.employeeList.map((employee, index) => {
                      return (
                        <option value={employee._id} key={index}>
                          {employee.name} / {employee.empId}
                        </option>
                      );
                    })}
                </select>
              ) : formData.attendyType === "addNewPeople" ? (
                <div>
                  <label className="mb-1">Add New People</label>
                  <div className="row">
                    <div className="col-xl-6 col-md-6">
                      <input
                        type="text"
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
                    <div className="col-xl-6 col-md-6 ">
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
              {/* {errors.responsiblePersonId && (
                <span className="error-message">
                  {errors.responsiblePersonId}
                </span>
              )} */}
            </div>

            {/* <div className="form-group m-0 d-flex ">
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
          </div> */}

            <div className="form-group m-0 d-flex ">
              {!employeeData.loading ? (
                <button
                  type="button"
                  className="btn rounded-pill add-btn Mom-btn d-flex align-items-center justify-content-center "
                  onClick={onAddMinute}
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
          </div>
        </div>
      </form>

      {props.isMinuteShow &&
        minutesDetails?.finalMinutesData?.length !== 0 &&
        minutesDetails?.finalMinutesData?.map((minute) => {
          return (
            <form className="addminutesboxfrom">
              <div
                // className={
                //   isMinuteShow ? "mt-4 minutes-box show" : "mt-4 minutes-box"
                // }
                className="mt-4 minutes-box show"
              >
                <div className="form-group">
                  <div className=" mt-1 mb-1 d-flex justify-content-between align-items-center">
                    <label>Minutes</label>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                       // value="isAction"
                        id="flexCheckDefault"
                        name="isAction"
                        onChange={(e) => checkHandler(e, minute.uid)}
                          checked={formData.isAction}
                      />
                      <label
                        className="form-check-label"
                        id="flexCheckDefault"
                        for="flexCheckDefault"
                      >
                        Add Action
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div>
                        <input
                          type="text"
                          placeholder="Enter minute description here"
                          name="description"
                          value={minute.description}
                          onChange={(e) => handleChange(e, minute.uid)}
                          onBlur={validateMinuteTitle}
                          autoComplete="off"
                        />

                        {/* {errors.title ? (
                          <span className="error-message">{errors.title}</span>
                        ) : null} */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="add-action">
                  <div className="form-group">
                    <div className="position-relative">
                      <label className="pb-2 input-date"> Due Date</label>
                      <input
                        type="date"
                        name="date"
                        value={minute.date}
                        onChange={(e) => handleChange(e, minute.uid)}
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
                    {/* {errors.date && (
                      <span className="error-message">{errors.date}</span>
                    )} */}
                  </div>

                  <div className="form-group">
                    <div className="position-relative">
                      <label className="pb-2 input-date">Priority</label>
                      <div>
                        <select
                          name="priority"
                          id="priority"
                          onChange={(e) => handleChange(e, minute.uid)}
                          value={minute.priority}
                        >
                          <option value="">Select Priority</option>
                          <option value="HIGH">High</option>
                          <option value="NORMAL">Normal</option>
                          <option value="LOW">Low</option>
                        </select>
                      </div>
                    </div>
                    {/* {errors.priority ? (
                      <span className="error-message">{errors.priority}</span>
                    ) : null} */}
                  </div>

                  <div className="form-group pb-3 border-bottom">
                    <label className="pb-2">Select Responsible Person</label>

                    {/* <div className="pb-2 d-flex w-100">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  value="manually"
                  type="radio"
                  name="locationtype"
                  id="flexRadioDefault1"
                />
                <label className="form-check-label">
                  Select From Attendees
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
                  <label className="form-check-label">
                    Select From Employees
                  </label>
                </div>
              </div>
            </div> */}

                    <div className="w-100">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="attendyType"
                          value="fromPreviousMeeting"
                          id="flexRadioDefault1"
                          onChange={(e) => handleChange(e, minute.uid)}
                          checked={minute.attendyType === "fromPreviousMeeting"}
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
                            onChange={(e) => handleChange(e, minute.uid)}
                            checked={minute.attendyType === "fromEmployeeList"}
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
                            checked={minute.attendyType === "addNewPeople"}
                            // checked={this.state.value === 1}
                            onChange={(e) => handleChange(e, minute.uid)}
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

                    {minute.attendyType === "fromPreviousMeeting" ? (
                      <select
                        className=""
                        // name="attendeesData"
                        // onChange={handleAttendeeChange}
                        // value={attendeeId}

                        onChange={(e) => handleChange(e, minute.uid)}
                        name="responsiblePersonId"
                        value={minute.responsiblePersonId}
                      >
                           {meetingData.attendeesList.find((employeeData)=>employeeData._id.toString()===minute.assignedUserId)?
                        <option selected value={minute.assignedUserId}>{meetingData.attendeesList.find((employeeData)=>employeeData._id.toString()===minute.assignedUserId)?.name} / {meetingData.attendeesList.find((employeeData)=>employeeData._id.toString()===minute.assignedUserId)?.email}</option>
                       : <option value="" selected>
                       {" "}
                       Name / Email Address
                     </option>}
                        {/* <option selected value={minute.assignedUserId}>{ meetingData.attendeesList.find((employeeData)=>employeeData._id.toString()===minute.assignedUserId)?.name} / { meetingData.attendeesList.find((employeeData)=>employeeData._id.toString()===minute.assignedUserId)?.email}</option> */}
                        {meetingData.attendeesList &&
                          meetingData.attendeesList.map((attendee, index) => {
                            <option>{minute.responsiblePersonId}</option>
                           
                            return (
                              <option key={index} value={attendee._id}>
                                {attendee.name} / {attendee.email}
                              </option>
                            );
                          })}
                      </select>
                    ) : minute.attendyType === "fromEmployeeList" ? (
                      <select
                        className="mb-2"
                        onChange={(e) => handleChange(e, minute.uid)}
                        name="responsiblePersonId"
                        value={minute.responsiblePersonId}
                      >
                       {employeeData.employeeList.find((employeeData)=>employeeData._id.toString()===minute.assignedUserId)?
                        <option selected value={minute.assignedUserId}>{employeeData.employeeList.find((employeeData)=>employeeData._id.toString()===minute.assignedUserId)?.name} / {employeeData.employeeList.find((employeeData)=>employeeData._id.toString()===minute.assignedUserId)?.empId}</option>
                       : <option value="" selected>
                       {" "}
                       Name / Employee ID
                     </option>}
                        {employeeData.employeeList &&
                          employeeData.employeeList.map((employee, index) => {
                           
                            
                             return (
                              <option value={employee._id} key={index}>
                                {employee.name} / {employee.empId}
                              </option>
                            );
                          })}
                      </select>
                    ) : minute.attendyType === "addNewPeople" ? (
                      <div>
                        <label className="mb-1">Add New People</label>
                        <div className="row">
                          <div className="col-xl-6 col-md-6">
                            <input
                              type="text"
                              autoComplete="off"
                              placeholder="Name"
                              name="name"
                              value={minute.name}
                              onChange={(e) => handleChange(e, minute.uid)}
                              onBlur={nameFieldValidationCheck}
                            />
                            {/* {errors.name && (
                              <span className="error-message">
                                {errors.name}
                              </span>
                            )} */}
                          </div>
                          <div className="col-xl-6 col-md-6 ">
                            <input
                              type="text"
                              placeholder="Email"
                              autoComplete="off"
                              name="email"
                              value={minute.email}
                              onBlur={emailFieldValidationCheck}
                              onChange={(e) => handleChange(e, minute.uid)}
                            />
                            {/* {errors.email && (
                              <span className="error-message">
                                {errors.email}
                              </span>
                            )} */}
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {/* {errors.responsiblePersonId && (
                      <span className="error-message">
                        {errors.responsiblePersonId}
                      </span>
                    )} */}
                  </div>

                  {/* <div className="form-group m-0 d-flex ">
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
          </div> */}

                  {/* <div className="form-group m-0 d-flex ">
                    {!employeeData.loading ? (
                      <button
                        type="button"
                        className="btn rounded-pill add-btn Mom-btn d-flex align-items-center justify-content-center "
                        onClick={onAddMinute}
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
                  </div> */}
                </div>
              </div>
            </form>
          );
        })}
    </>
  );
};

export default AddMinute;
