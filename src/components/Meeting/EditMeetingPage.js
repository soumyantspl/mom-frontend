import Header from "../Common/Header/Header";
import MeetingHeader from "../Common/Header/MeetingHeader";
import Sidebar from "../Common/Sidebar/Sidebar";
import "./style/CreateMeeting.css";
import React, { useState ,useEffect} from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./style/meetings-css.css";
import EditMeeting from "./EditMeeting";
import ViewEditMeeting from "./ViewEditMeeting";
const EditMeetingPage = () => {
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
            <EditMeeting />
          </div>
          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 detail-col">
            <div className="meeting-header-text">
              <h4>Meeting Preview</h4>
            </div>
            <ViewEditMeeting />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMeetingPage;
