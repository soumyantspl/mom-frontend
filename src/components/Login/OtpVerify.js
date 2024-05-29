import React, { useState, useEffect } from "react";
import "./style/OtpVerify.css";
import ntsplLogo from "../../assets/images/ntspl_logo.png";
import meetingImage from "../../assets/images/meeting.png";
import { useNavigate, Navigate, Link } from "react-router-dom";
import LoginImage from "./LoginImage";
import { useSelector, useDispatch } from "react-redux";
import {
  reSendOtp,
  updateIsSuccess,
  updateOtpProcessed,
  verifyOtp,
} from "../../redux/actions/authActions/authAction";
import LoaderButton from "../Common/LoaderButton";
import * as constantMessages from "../../constants/constatntMessages";
const isLogIn = false;

console.log("inside--------------");
const OtpVerify = (props) => {
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    input1: null,
    input2: null,
    input3: null,
    input4: null,
    input5: null,
    input6: null,
  });
  const authData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Verify OTP";
    if (isLogIn) {
      navigate("/dashboard");
    }
  }, []);

  const resendOtpAction = (e) => {
    if (authData.email) {
      dispatch(reSendOtp(authData.email));
    } else {
      errors.message = constantMessages.emailRequired;
      setErrors(errors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors?.errors);
    console.log(
      "FINAL OTP--------------------------------",
      newErrors.otpData,
      authData
    );
    if (Object.keys(newErrors.errors).length === 0) {
      // Form submission logic here
      const otp = newErrors.otpData;

      // setIsOtpProcessed(true);
      dispatch(verifyOtp({ email: authData.email, otp }));
      console.log("Form submitted successfully!");
    } else {
      console.log(`Form submission failed
       due to validation errors.`);
    }
  };
  console.log(isOtpVerified);
  const handleChange = (e) => {
    dispatch(updateOtpProcessed(false));
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const otp = [];
  const validateForm = (data) => {
    dispatch(updateOtpProcessed(false));
    console.log("data-------------------", data);
    const errors = {};
    if (!authData.email) {
      errors.message = constantMessages.emailRequired;
    }
    if (!data.input1) {
      errors.message = "OTP is required";
    } else if (isNaN(data.input1)) {
      console.log("in -------------1");
      errors.message = "OTP must be a number";
    }

    otp.push(data.input1);

    if (!data.input2) {
      errors.message = "OTP is required";
    } else if (isNaN(data.input2)) {
      console.log("in -------------1");
      errors.message = "OTP must be a number";
    }
    otp.push(data.input2);
    if (!data.input3) {
      errors.message = "OTP is required";
    } else if (isNaN(data.input3)) {
      errors.message = "OTP must be a number";
    }
    otp.push(data.input3);
    if (!data.input4) {
      errors.message = "OTP is required";
    } else if (isNaN(data.input4)) {
      errors.message = "OTP must be a number";
    }
    otp.push(data.input4);
    if (!data.input5) {
      errors.message = "OTP is required";
    } else if (isNaN(data.input5)) {
      errors.message = "OTP must be a number";
    }
    otp.push(data.input5);

    if (!data.input6) {
      errors.message = "OTP is required";
    } else if (isNaN(data.input6)) {
      errors.message = "OTP must be a number";
    }
    otp.push(data.input6);
    console.log("otp--------------------------------11111", otp);
    if (otp.length !== 6) {
      errors.message = "OTP must be of 6 digits";
    }
    const otpData = otp.join("");
    console.log("test--------------------", otpData);

    return {
      errors,
      otpData,
    };
  };

  return (
    <section className="otp-varify">
      {authData.isOtpVerifiedSuccess ? <Navigate to="/meetingList" /> : null}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="loginform-container">
              <img
                className="ntspl-logo"
                // @ts-ignore
                src={ntsplLogo}
                alt="logo"
              />

              <form onSubmit={handleSubmit}>
                <div className="text">
                  <h4>Welcome to Meeting Plus</h4>
                  <p>Check your email for OTP</p>
                </div>

                <div className="form-group">
                  <label className="mb-1">
                    Enter Your 6 Digit OTP <span>*</span>
                  </label>
                  <div className="pincode">
                    <div className="digit">
                      <input
                        type="text"
                        name="input1"
                        maxLength={1}
                        onChange={handleChange}
                        value={formData.input1}
                      />
                    </div>

                    <div className="digit">
                      <input
                        type="text"
                        name="input2"
                        maxLength={1}
                        onChange={handleChange}
                        value={formData.input2}
                      />
                    </div>
                    <div className="digit">
                      <input
                        type="text"
                        name="input3"
                        maxLength={1}
                        onChange={handleChange}
                        value={formData.input3}
                      />
                    </div>
                    <div className="digit">
                      <input
                        type="text"
                        name="input4"
                        maxLength={1}
                        onChange={handleChange}
                        value={formData.input4}
                      />
                    </div>
                    <div className="digit">
                      <input
                        type="text"
                        name="input5"
                        maxLength={1}
                        onChange={handleChange}
                        value={formData.input5}
                      />
                    </div>
                    <div className="digit">
                      <input
                        type="text"
                        name="input6"
                        maxLength={1}
                        onChange={handleChange}
                        value={formData.input6}
                      />
                    </div>
                  </div>
                  {errors.message && (
                    <span className="error-message">{errors.message}</span>
                  )}
                  {authData.isOtpProcessed && authData.isSuccess ? (
                    <span className="error-message" style={{ color: "green" }}>
                      {authData.message}
                    </span>
                  ) : authData.isOtpProcessed && !authData.isSuccess ? (
                    <span className="error-message">{authData.message}</span>
                  ) : null}
                </div>
                {!authData.loading ? (
                  <button className="btn1" type="submit">
                    {" "}
                    Verify
                  </button>
                ) : (
                  <LoaderButton />
                )}

                <div className="back-resend back-arrow">
                  <Link to="/login">
                    <div className="back">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#0b77e8"
                        className="bi bi-arrow-left"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                        />
                      </svg>
                      <span
                        onClick={() => {
                          dispatch(updateIsSuccess(false));
                        }}
                      >
                        Back to Sign In
                      </span>
                    </div>
                  </Link>

                  <div className="resend">
                    <Link to="" onClick={resendOtpAction}>
                      Resend OTP
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <LoginImage />
        </div>
      </div>
    </section>
  );
};

export default OtpVerify;
