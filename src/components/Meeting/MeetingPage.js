import React from "react";
import Header from "../Common/Header/Header";
import MeetingHeader from "../Common/Header/MeetingHeader";
import Sidebar from "../Common/Sidebar/Sidebar";
import AddMeeting from "./AddMeeting";
import './style/CreateMeeting.css'

const MeetingPage = () => {
  return (
    <div>
      <Header />
      <MeetingHeader />
      <Sidebar />
      <div className="main-content">
        <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 detail-col">
          <div className="meeting-header-text">
            <h4>Meeting Details</h4>
          </div>
          <AddMeeting />
        </div>
      </div>
    </div>
  );
};

export default MeetingPage;
