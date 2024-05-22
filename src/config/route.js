import React from "react";
// @ts-ignore
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Login/Login";
import OtpVerify from "../components/Login/OtpVerify";
const CreateRoutes = () => (
  <Router>
    <Routes>
     
      <Route exact path="/" element={<Dashboard/>} />
      <Route exact path="/dashboard"element={<Dashboard/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/otpVerify" element={<OtpVerify/>}/>
    </Routes>
  </Router>
);
export default CreateRoutes;
