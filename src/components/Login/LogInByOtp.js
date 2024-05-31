  import React, { useState, useEffect } from "react";
import "./style/Login.css";
import configData from "../../config/config";
import ntsplLogo from "../../assets/images/ntspl_logo.png";
import { useNavigate, Navigate, Link } from "react-router-dom";
import LoginImage from "./LoginImage";
import { useSelector, useDispatch } from "react-redux";
import {
  sendOtp,
  updateOtpProcessed,
} from "../../redux/actions/authActions/authAction";
import * as constantMessages from "../../constants/constatntMessages";

import ToastBar from "../Common/ToastBar";
import { ToastContainer, toast } from "react-toastify";
import LoaderButton from "../Common/LoaderButton";
import { Button } from "bootstrap";
import Alert from "../Common/Alert";

const LoginByOtp = (props) => {
  console.log(configData.baseUrl);
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  console.log("auth data--------------------1234", authData);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [otpStatus, setOtpStatus] = useState(false);
  const [isOtpProcessed, setIsOtpProcessed] = useState(false);
  const [isSetPasswordSuccess, setIsSetPasswordSuccess] = useState(false);
  const [isSetPassword, setIsSetPassword] = useState(false);

  const [errors, setErrors] = useState({});

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const userObject = {  };
  //   console.log(userObject)
  //   dispatch(sendOtp(email))
  //   navigate('/user')
  // };
  useEffect(() => {
    document.title = "Log In: Meeting Plus";
  }, []);
  const handleChange = (e) => {
    setErrors({});
    dispatch(updateOtpProcessed(false));
    console.log("9999999999999999999999999999999999999", authData);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    console.log(
      "E---------isSetPassword------------------------->>>>>>>>>>",
      isSetPassword
    );
    e.preventDefault();

    const newErrors = validateForm(formData);
    setErrors(newErrors);
    dispatch(updateOtpProcessed(false));
    if (Object.keys(newErrors).length === 0) {
      // Form submission logic here
      setIsOtpProcessed(true);
      dispatch(sendOtp(formData.email, isSetPassword));
      console.log("Form submitted successfully!");
    } else {
      console.log(`Form submission failed
       due to validation errors.`);
    }
  };
  console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", formData);

  const validateForm = (data) => {
    const errors = {};

    if (!data.email.trim()) {
      errors.email = constantMessages.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = constantMessages.invalidEmail;
    }

    return errors;
  };

  const [isOtpSend, setIsOtpSend] = useState(false);
  const [isSignInWithPassword, setIsSignInWithPassword] = useState(false);


  const submitOtp = (e) => {
    e.preventDefault();
    console.log("inputData------------", e.target.value);
    // navigate("/otp-verify");
    setIsOtpSend(true);
    props.setIsOtpSend(true);
  };
  console.log(isOtpSend);

  const isLogIn = false;
  // const navigate = useNavigate();
  // useEffect(() => {
  //   console.log("isLogIn-----------------",process.env)
  //   if (!isLogIn) {
  //     navigate("/login");
  //   } else {
  //     navigate("/dashboard");
  //   }
  // }, []);
  console.log("inside--------------");
  return (
    <section className="sign-in login-page">
      {isLogIn ? <Navigate to="/dashboard" /> : null}
      {authData.isSuccess && !authData.isSetPassword ? (
        <Navigate to="/otp-verify" />
      ) : null}
      {authData.isSuccess && authData.isSetPassword ? (
        <Navigate to="/set-password" />
      ) : null}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="loginform-container">
              <img
                className="img-fluid"
                // @ts-ignore
                src={ntsplLogo}
                alt="logo"
              />
              <form onSubmit={handleSubmit}>
                <div className="text">
                  <h4>Welcome to Meeting Plus</h4>
                  <p>Enter your email id to logging in to your account</p>
                </div>

                <div className="form-group">
                  <div className="email-group">
                    <label className="mb-1">
                      Email <span>*</span>
                    </label>
                    <div className="inner-group">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-envelope-at"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
                        <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Type Your Email"
                        name="email"
                        onChange={handleChange}
                       // onBlur={validateForm}
                        value={formData.email}
                        autocomplete="off"
                      />
                    </div>
                    {errors.email && (
                      <span className="error-message">{errors.email}</span>
                    )}
                    {/* {authData.isOtpProcessed ? (
                      <span className="error-message">{authData.message}</span>
                    ) : // <ToastBar message={authData.message} variant={authData.variant} />
                    null} */}
                    {authData.isOtpProcessed?
                    <Alert status={authData.isSuccess} message={authData.message}  />:null}
                  </div>
                </div>
                {!authData.loading ? (
                  <button className="signin-btn1" type="submit"  onClick={() => setIsSetPassword(false)}>
                    Send OTP
                  </button>
                ) : (
                  <LoaderButton />
                )}

                <div className="or">or</div>

                <Link to="/login-by-password">
                  <button
                    className="signin-btn2"
                    // onClick={() => props.setIsSignInWithPassword(true)}
                  >
                    Sign In With Password
                  </button>
                </Link>

                <div className="set-pwd">
                  <button
                    type="submit"
                    className="signin-btn2"
                    onClick={() => setIsSetPassword(true)}
                  >
                    Set Password
                  </button>
                </div>
              </form>
            </div>
          </div>

          <LoginImage />
          <ToastContainer />
        </div>
      </div>
    </section>
  );
};

export default LoginByOtp;
