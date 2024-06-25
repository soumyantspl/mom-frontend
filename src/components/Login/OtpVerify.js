import React, { useState, useEffect } from "react";
import "./style/OtpVerify.css";
import ntsplLogo from "../../assets/images/ntspl_logo.png";
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
import Alert from "../Common/Alert";
import Timer from "../Common/Timer";
const isLogIn = false;

const OtpVerify = () => {
  console.log(process.env);
  const [errors, setErrors] = useState({});
  const [isResendOtp, setIsResendOtp] = useState(false);
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
    document.title = "Verify OTP: Meeting Plus";
    const inputId = document.getElementById(parseInt(1));
    inputId.focus();
    if (isLogIn) {
      navigate("/dashboard");
    }
    if (!authData.email) {
      navigate("/login");
    }
  }, []);

  const resendOtpAction = (e) => {
    if (authData.email) {
      dispatch(reSendOtp(authData.email));
      setIsResendOtp(false);
      setFormData({
        ...formData,
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: "",
      });
    } else {
      errors.message = constantMessages.emailRequired;
      setErrors(errors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors?.errors);
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

  const handleChange = (e) => {
    dispatch(updateOtpProcessed(false));
    const { value, name, id } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const nextField = document.getElementById(parseInt(id) + 1);

    if (nextField && value.length === 1) {
      nextField.focus();
    }
  };

  const setResendOtp = (data) => {
    console.log(data);
    setIsResendOtp(true);
  };

  const otp = [];
  const validateForm = (data) => {
    dispatch(updateOtpProcessed(false));
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
    if (otp.length !== 6) {
      errors.message = "OTP must be of 6 digits";
    }
    const otpData = otp.join("");

    return {
      errors,
      otpData,
    };
  };
  const otpFieldValidationCheck = (e) => {
    const errors = {};
    // if (!formData.password) {
    //   errors.roomId = constantMessages.roomRequired;
    //   setErrors(errors);
    // }
    console.log(e.target.value)
    if (!e.target.value) {
      errors.message = "OTP is required";
    } else if (isNaN(e.target.value)) {
      errors.message = "OTP must be a number";
    }
    console.log(errors)
      setErrors(errors);
    
  };

  const fieldValidationCheck = (e) => {
    e.preventDefault();

    const newErrors = validateForm(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Form submission logic here

      console.log("Form submitted successfully!");
    } else {
      console.log(`Form submission failed
       due to validation errors.`);
    }
  };
  console.log(authData);
  return (
    <section className="otp-varify">
      {authData.isOtpVerifiedSuccess ? <Navigate to="/meeting-list" /> : null}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="loginform-container otp-page">
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
                        onBlur={otpFieldValidationCheck}
                        value={formData.input1}
                        autocomplete="off"
                        autofocus={true}
                        id={1}
                      />
                    </div>

                    <div className="digit">
                      <input
                        type="text"
                        name="input2"
                        maxLength={1}
                        onChange={handleChange}
                        onBlur={otpFieldValidationCheck}
                        value={formData.input2}
                        autocomplete="off"
                        id={2}
                      />
                    </div>
                    <div className="digit">
                      <input
                        type="text"
                        name="input3"
                        maxLength={1}
                        onChange={handleChange}
                        onBlur={otpFieldValidationCheck}
                        value={formData.input3}
                        autocomplete="off"
                        id={3}
                      />
                    </div>
                    <div className="digit">
                      <input
                        type="text"
                        name="input4"
                        maxLength={1}
                        onChange={handleChange}
                        onBlur={otpFieldValidationCheck}
                        value={formData.input4}
                        autocomplete="off"
                        id={4}
                      />
                    </div>
                    <div className="digit">
                      <input
                        type="text"
                        name="input5"
                        maxLength={1}
                        onChange={handleChange}
                        onBlur={otpFieldValidationCheck}
                        value={formData.input5}
                        autocomplete="off"
                        id={5}
                      />
                    </div>
                    <div className="digit">
                      <input
                        type="text"
                        name="input6"
                        maxLength={1}
                        onChange={handleChange}
                        onBlur={otpFieldValidationCheck}
                        value={formData.input6}
                        autocomplete="off"
                        id={6}
                      />
                    </div>
                  </div>
                  {errors.message && (
                    <span className="error-message">{errors.message}</span>
                  )}
{/* 
                  {authData.isOtpProcessed && authData.isSuccess ? (
                    <Alert
                      status={authData.isSuccess}
                      message={authData.message}
                      timeoutSeconds={0}
                    />
                  ) : authData.isOtpProcessed && !authData.isSuccess ? (
                    <Alert
                      status={authData.isSuccess}
                      message={authData.message}
                      timeoutSeconds={0}
                    />
                  ) : null} */}
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
                  {authData.isTimerOn ? (
                    <span>
                      {constantMessages.otpCountDownMessage}
                      <Timer
                        setResendOtp={setResendOtp}
                        minutes={
                          authData.isOtpProcessed && !authData.isSuccess
                            ? process.env.REACT_APP_OTP_RESEND_TIME
                            : process.env.REACT_APP_CHECK_OTP_VALIDATION_TIME
                        }
                      />
                    </span>
                  ) : (
                    <div className="resend">
                      <Link to="" onClick={resendOtpAction}>
                        Resend OTP
                      </Link>
                    </div>
                  )}
                  {/* {isResendOtp ? (
                    <div className="resend">
                      <Link to="" onClick={resendOtpAction}>
                        Resend OTP
                      </Link>
                    </div>
                  ) : authData.isTimerOn ? (
                    <span>
                      {constantMessages.otpCountDownMessage}
                      <Timer
                        minutes={process.env.CHECK_OTP_VALIDATION_TIME}
                      />
                    </span>
                  ) : null} */}
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
