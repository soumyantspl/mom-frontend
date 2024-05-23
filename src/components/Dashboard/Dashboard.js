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
import Navbar from "../Common/Navbar/Navbar";

const Dashboard = () => {
  const isLogIn = true;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogIn) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }, []);
  console.log("inside--------------");

  console.log(configData.baseUrl);
  return (
    <div>
      <Navbar />
    </div>
  )
};

export default Dashboard;
