import Header from "../Common/Header/Header";
import MeetingHeader from "../Common/Header/MeetingHeader";
import Sidebar from "../Common/Sidebar/Sidebar";
import "./style/CreateMeeting.css";
import React, { useState ,useEffect} from "react";
import { useNavigate, Navigate, Link ,useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./style/meetings-css.css";
import EditMeeting from "./EditMeeting";
import ViewEditMeeting from "./ViewEditMeeting";
import { getSingleMeetingDetails, unSetSingleMeetingDetails } from "../../redux/actions/meetingActions/MeetingAction";
import ViewMeeting from "./ViewMeeting";
const EditMeetingPage = () => {
  const location = useLocation();
  const stateData = location.state;
  console.log(stateData);
  const accessToken = localStorage.getItem("accessToken");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const meetingData = useSelector((state) => state.meeting);
  const dispatch = useDispatch();
  console.log("before use effect------------------------------------");
  useEffect(() => {
    console.log("use effect------------------------------------");
    console.log(stateData);
    dispatch(getSingleMeetingDetails(stateData.meetingId, accessToken));
    // dispatch()

    return () => {
      console.log("return useeffect--------------->>>>>>>>>>>>>>");

      dispatch(unSetSingleMeetingDetails());
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
            <div className="meeting-header-text">
              <h4>Meeting Details</h4>
            </div>
            <EditMeeting />
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

export default EditMeetingPage;
