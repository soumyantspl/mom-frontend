import Header from "../Common/Header/Header";
import MeetingHeader from "../Common/Header/MeetingHeader";
import Sidebar from "../Common/Sidebar/Sidebar";
import React, { useState, useEffect } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getCreateMeetingStep,
  getSingleMeetingAgendaFullDetails,
  getSingleMeetingDetails,
  unSetSingleMeetingDetails,
  updateStep,
} from "../../redux/actions/meetingActions/MeetingAction";
import CreateMinutes from "./CreateMinutes";
import ViewMinutes from "./ViewMinutes";
import { useLocation } from "react-router-dom";
import "./minutes.css"
const MinutesPage = () => {
    const location = useLocation();
    const stateData = location.state;
    console.log(stateData);
    const accessToken = localStorage.getItem("accessToken");
    const userData = JSON.parse(localStorage.getItem("userData"));
    const dispatch = useDispatch();
    const meetingRoomData = useSelector((state) => state.meetingRoom);
    const meetingData = useSelector((state) => state.meeting);
    const [isViewMeetingPage, setIsViewMeetingPage] = useState(false);
    console.log(meetingData);
    console.log("use effect------------------------------------");

    useEffect(() => {
     
        console.log("use effect-------------------------------22-----");
      console.log(stateData);
      dispatch(getSingleMeetingAgendaFullDetails(stateData.meetingId, accessToken));
      // dispatch()
  
      return () => {
        console.log("return useeffect--------------->>>>>>>>>>>>>>");
  
       // dispatch(unSetSingleMeetingDetails);
      };
    }, []);
  return (
    <>
      <Header />
      <MeetingHeader />
      <Sidebar />
      <div className="main-content">
        <div className="row">
          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 detail-col">
           
            <CreateMinutes />
          </div>
          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 detail-col">
            <ViewMinutes />
          </div>
        </div>
      </div>
    </>
  );
};

export default MinutesPage;
