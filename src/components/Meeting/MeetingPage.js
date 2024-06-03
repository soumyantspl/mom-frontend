import Header from "../Common/Header/Header";
import MeetingHeader from "../Common/Header/MeetingHeader";
import Sidebar from "../Common/Sidebar/Sidebar";
import AddMeeting from "./AddMeeting";
import "./style/CreateMeeting.css";
import ViewMeeting from "./ViewMeeting";
import React, { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate, Navigate, Link } from "react-router-dom";
import "./style/meetings-css.css";
const MeetingPage = () => {
  return (
    <div>
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
            <div>
              <div className="meeting-header-text">
                <h4>Meeting Preview</h4>
              </div>
            </div>

            <ViewMeeting />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingPage;
