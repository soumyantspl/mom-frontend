import React from "react";
// @ts-ignore
import { Route, BrowserRouter as Router, Routes ,Navigate} from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import OtpVerify from "../components/Login/OtpVerify";
import LoginByOtp from "../components/Login/LogInByOtp";
import LogInByPassword from "../components/Login/LogInByPassword";
import SetPassword from "../components/Login/SetPassword";
import SignUp from "../components/SisnUp/signUp";
import MeetingList from "../components/Meeting/MeetingList";
import Sidebar from "../components/Common/Sidebar/Sidebar";
import Navbar from "../../node_modules/react-bootstrap/esm/Navbar";
// const isLoggedIn=true
// const CreateRoutes = () => (
//   <Router>
  
   
//     <Routes>
//     <Sidebar />
//       <Route exact path="/" element={<LoginByOtp />} />
//       <Route exact path="/dashboard" element={<Dashboard />} />
//       <Route exact path="/login" element={<LoginByOtp />} />
//       <Route exact path="/otpVerify" element={<OtpVerify />} />
//       <Route exact path="/logInByOtp" element={<LoginByOtp />} />
//       <Route exact path="/otpVerify" element={<OtpVerify />} />
//       <Route exact path="/logInByPassword" element={<LogInByPassword />} />
//       <Route exact path="/setPassword" element={<SetPassword />} />
//       <Route exact path="/signUp" element={<SignUp />} />
//       <Route exact path="/meetingList" element={<MeetingList />} />
//     </Routes>
//   </Router>
// );
// export default CreateRoutes;



const MainRoute = () => {
  return (
    <Router>
      
    <Routes>
   
      <Route exact path="/" element={<LoginByOtp />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/login" element={<LoginByOtp />} />
      <Route exact path="/otpVerify" element={<OtpVerify />} />
      <Route exact path="/logInByOtp" element={<LoginByOtp />} />
      <Route exact path="/otpVerify" element={<OtpVerify />} />
      <Route exact path="/logInByPassword" element={<LogInByPassword />} />
      <Route exact path="/setPassword" element={<SetPassword />} />
      <Route exact path="/signUp" element={<SignUp />} />
      <Route exact path="/meetingList" element={<MeetingList />} />
    </Routes>
  </Router>
  )
}

export default MainRoute
