import React from "react";
import "./Dashboard.css";
import configData from "../../config/config";
import ntsplLogo from "../../assets/images/ntspl_logo.png";
import { useEffect, useState } from "react";
import meetingLogo from "../../assets/images/meeting.png";
//import { Route, BrowserRouter as Router, Redirect, Link } from 'react-router-dom';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
  Redirect,
  useNavigate,
} from "react-router-dom";
import Navbar from "../Common/Header/Header";
import Sidebar from "../Common/Sidebar/Sidebar";
import Header from "../Common/Header/Header";
import LoginByOtp from "../Login/LogInByOtp";
import MeetingList from "../Meeting/MeetingList";

const Dashboard = () => {
   const isLogIn = true
//  const navigate = useNavigate();
//   useEffect(() => {
//     if (!isLogIn) {
//       navigate("/login");
//     } else {
//       navigate("/dashboard");
//     }
//   }, []);
//   console.log("inside--------------");

//   console.log(configData.baseUrl);
  return (
    <div>
       {!isLogIn?<Navigate to="/" />:null}
      <Header />
      <Sidebar />
      
      {/* <MeetingList /> */}
    </div>
  );
};

export default Dashboard;
