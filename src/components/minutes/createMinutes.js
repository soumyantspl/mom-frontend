import React, { useState } from "react";
import Header from "../Common/Header/Header";
import Sidebar from "../Common/Sidebar/Sidebar";
import MeetingHeader from "../Common/Header/MeetingHeader";
import { Modal } from "bootstrap";
import { logOut } from "../../redux/actions/authActions/authAction";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AddMinute from "./AddMinute";

const CreateMinutes = () => {
  const dispatch = useDispatch();
  const employeeData = useSelector((state) => state.user);
  const authData = useSelector((state) => state.auth);
  const meetingData = useSelector((state) => state.meeting);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  if (authData.isInValidUser) {
    console.log("innnnnnnnnnnnnnnnnnnnnnnnnnnn");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("rememberMe");
    dispatch(logOut());
    navigate("/login");
  }
  const [isMinuteShow, setIsMinuteShow] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState([false, false]);
  const toggleDropdown = (index) => {
    setDropdownOpen((prevState) =>
      prevState.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  // const submitAgendasDetails = (e) => {
  //   e.preventDefault();

  //   if (minuteData.length === 0) {
  //     const newErrors = validateForm(formData);
  //     setErrors(newErrors);

  //     if (Object.keys(newErrors).length === 0) {
  //       console.log("uuuuuuuuuuu");
  //       const errors = {};
  //       errors.addAgenda = constantMessages.addAgenda;
  //       //  errors.index = formData.index;
  //       setErrors(errors);
  //     }
  //   } else {
  //     const newMinuteData = minuteData.map((item) => {
  //       return {
         
  //         title: item.title
  //       };
  //     });
  //     const meetingId = meetingData?.meetingDetail?._id;
  //     const payload = {
  //       sendNotification:true,
  //       minutes: newMinuteData,
  //       organizationId: userData.organizationId,
  //       //isUpdate:false
  //     };
  //     console.log(payload);
  //     // dispatch(
  //     //   createNewMinutes(
  //     //     meetingId,
  //     //     payload,
  //     //     accessToken
  //     //   )
  //     // );
  //     //setStep(3);
  //   }
  // };









console.log(meetingData)
  return (
    <>
      {/* <Header />
      <MeetingHeader />
      <Sidebar /> */}
      <div className="meeting-header-text">
        <h4>Write Minutes</h4>
      </div>
      <div className="mt-2 details-form details-form-right">
        <div className="form-group">
          <div className="agendas-header d-flex align-items-center justify-content-between">
            <div>
              <label className="mt-3 mb-3">
                <h4>Agenda(s)</h4>
              </label>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="#0564f3"
                className="bi bi-plus-circle pointer"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </div>
          </div>
          {meetingData?.agendaDetails?.length>0 && meetingData?.agendaDetails?.map((agenda,index)=>{

         return (
          <div className="mt-3 agenda-box-border" key={index}>
            <div className="form-group m-0">
              <div className="topic-head p-2 d-flex align-items-center justify-content-between">
                <div>
                  <label> Agenda {index+1}</label>
                </div>
                <div>
                  <button
                    className="add-minutes Mom-btn"
                    onClick={() => setIsMinuteShow(!isMinuteShow)}
                  >
                    <p>Add Minutes</p>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className=" form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label className="mt-1 mb-1">Agenda Title</label>
                  </div>
                  <div className="col-md-8">
                    <p> {agenda.title}</p>
                  </div>
                </div>
              </div>
              <div className="  form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label className="mt-2 topic">Topic to Discuss</label>
                  </div>
                  <div className="col-md-8">
                    <p>
                    {agenda.topic}{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className=" form-group m-0">
                <div className="row">
                  <div className="col-md-4">
                    <label className="mt-1 mb-1">Timeline</label>
                  </div>
                  <div className="col-md-8">
                    <p>  {agenda.timeLine===""?0:agenda.timeLine} Mins</p>
                  </div>
                </div>
              </div>
              {isMinuteShow?( <AddMinute />):null}
            </div>
           
           
          </div>
         )
          })}
        </div>
      </div>
    </>
  );
};

export default CreateMinutes;
