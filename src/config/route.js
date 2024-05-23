import React from "react";
// @ts-ignore
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Login/Login";
import OtpVerify from "../components/Login/OtpVerify";
import LoginByOtp from "../components/Login/LogInByOtp";
import LogInByPassword from "../components/Login/LogInByPassword";
import SetPassword from "../components/Login/SetPassword";
import SignUp from "../components/SisnUp/signUp";
import MeetingList from "../components/Meeting/MeetingList";
const CreateRoutes = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<MeetingList />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/login" element={<LoginByOtp />} />
      <Route exact path="/otpVerify" element={<OtpVerify />} />
      <Route exact path="/logInByOtp" element={<LoginByOtp />} />
      <Route exact path="/otpVerify" element={<OtpVerify />} />
      <Route exact path="/logInByPassword" element={<LogInByPassword />} />
      <Route exact path="/setPassword" element={<SetPassword />} />
      <Route exact path="/signUp" element={<SignUp />} />
    </Routes>
  </Router>
);
export default CreateRoutes;
