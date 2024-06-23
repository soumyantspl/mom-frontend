import Header from "../Common/Header/Header";
import MeetingHeader from "../Common/Header/MeetingHeader";
import Sidebar from "../Common/Sidebar/Sidebar";
import AddMeeting from "./AddMeeting";
import "./style/CreateMeeting.css";
import ViewMeeting from "./ViewMeeting";
import React, { useState ,useEffect} from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./style/meetings-css.css";
import { getCreateMeetingStep, updateStep } from "../../redux/actions/meetingActions/MeetingAction";
const MeetingPage = () => {
  const accessToken = localStorage.getItem("accessToken");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const meetingData = useSelector((state) => state.meeting);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Create Meeting: Meeting Plus";
    // if (meetingData.checkStep) {
    //   dispatch(getCreateMeetingStep(userData.organizationId, accessToken));
    // }
   
    console.log(meetingData.step);
    return()=>{
      dispatch(updateStep(0,false))
    }
  }, []);
  return (
    <>
      <Header />
      <MeetingHeader />
      <Sidebar />
      <div className="main-content">
        <div className="row">
          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 detail-col">
            <div className="meeting-header-text">
              <h4>Meeting Details</h4>
            </div>
            <AddMeeting />
          </div>
          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 detail-col">
            <div className="meeting-header-text">
              <h4>Meeting Preview</h4>
            </div>
            <ViewMeeting />
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingPage;
