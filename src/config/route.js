import React from "react";
// @ts-ignore
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import OtpVerify from "../components/Login/OtpVerify";
import LoginByOtp from "../components/Login/LogInByOtp";
import LogInByPassword from "../components/Login/LogInByPassword";
import SetPassword from "../components/Login/SetPassword";
import SignUp from "../components/SignUp/signUp";
import MeetingList from "../components/Meeting/MeetingList";
import Sidebar from "../components/Common/Sidebar/Sidebar";
import Navbar from "../../node_modules/react-bootstrap/esm/Navbar";
import ActionList from "../components/Action/ActionList";
import Alert from "../components/Setting/Alert/Alert";
import MeetingRoom from "../components/Setting/MeetingRoom/MeetingRoom";
import Employee from "../components/Setting/Employee/Employee";
import Configuration from "../components/Setting/Configuration/Configuration";
import Organization from "../components/Setting/Organization/Organization";
import Unit from "../components/Setting/Unit/Unit";
import Department from "../components/Setting/Department/Department";
import Designation from "../components/Setting/Designation/Designation";
import CreateMeeting from "../components/Meeting/CreateMeeting";
import MeetingPage from "../components/Meeting/MeetingPage";
import ViewMeeting from "../components/Meeting/ViewMeeting";
import { ToastContainer, toast } from 'react-toastify';

const MainRoute = () => {
  return (
    <div>
 <Router>
      <Routes>
        <Route exact path="/" element={<LoginByOtp />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/login" element={<LoginByOtp />}  title="LoginByOtp"/>
        <Route exact path="/otp-verify" element={<OtpVerify />} />
        <Route exact path="/log-in-by-otp" element={<LoginByOtp />}  title="LoginByOtp"/>
        <Route exact path="/otp-verify" element={<OtpVerify />} />
        <Route exact path="/login-by-password" element={<LogInByPassword />} />
        <Route exact path="/set-password" element={<SetPassword />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/meeting-list" element={<MeetingList />} />
        <Route exact path="/action-list" element={<ActionList />} />
        <Route exact path="/alerts" element={<Alert />} />
        <Route exact path="/meeting-room" element={<MeetingRoom />} />
        <Route exact path="/employee" element={<Employee />} />
        <Route exact path="/configuration" element={<Configuration />} />
        <Route exact path="/organization" element={<Organization />} />
        <Route exact path="/unit" element={<Unit />} />
        <Route exact path="/department" element={<Department />} />
        <Route exact path="/designation" element={<Designation />} />
        <Route exact path="/create-meeting" element={<MeetingPage />} />
        <Route exact path="/view-meeting-details" element={<ViewMeeting />} />
      </Routes>
    </Router>
      <ToastContainer className="toast-position" position="bottom-right" />
    </div>
   
  );
};

export default MainRoute;
