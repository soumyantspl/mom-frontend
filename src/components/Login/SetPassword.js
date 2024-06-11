import React, { useState, useEffect } from "react";
import "./style/OtpVerify.css";
import ntsplLogo from "../../assets/images/ntspl_logo.png";
import LoginImage from "./LoginImage";
import {
  reSendOtp,
  setPassword,
  updateIsSuccess,
  updateOtpProcessed,
} from "../../redux/actions/authActions/authAction";
import { useSelector, useDispatch } from "react-redux";
import * as constantMessages from "../../constants/constatntMessages";
import LoaderButton from "../Common/LoaderButton";
import { useNavigate, Navigate, Link } from "react-router-dom";
import Alert from "../Common/Alert";
import Timer from "../Common/Timer";

const SetPassword = (props) => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    input1: null,
    input2: null,
    input3: null,
    input4: null,
    input5: null,
    input6: null,
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const isLogIn = false;
  useEffect(() => {
    document.title = "Set Password : Meeting Plus";
    const inputId = document.getElementById(parseInt(1));
    inputId.focus();
    if (isLogIn) {
      navigate("/dashboard");
    }
    if (!authData.email) {
      navigate("/login");
    }
  }, []);

  const handleChange = (e) => {
    setErrors({});
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
      errors.message = "OTP must be a number";
    }

    otp.push(data.input1);

    if (!data.input2) {
      errors.otp = "OTP is required";
    } else if (isNaN(data.input2)) {
      errors.otp = "OTP must be a number";
    }
    otp.push(data.input2);
    if (!data.input3) {
      errors.otp = "OTP is required";
    } else if (isNaN(data.input3)) {
      errors.otp = "OTP must be a number";
    }
    otp.push(data.input3);
    if (!data.input4) {
      errors.otp = "OTP is required";
    } else if (isNaN(data.input4)) {
      errors.otp = "OTP must be a number";
    }
    otp.push(data.input4);
    if (!data.input5) {
      errors.otp = "OTP is required";
    } else if (isNaN(data.input5)) {
      errors.otp = "OTP must be a number";
    }
    otp.push(data.input5);

    if (!data.input6) {
      errors.otp = "OTP is required";
    } else if (isNaN(data.input6)) {
      errors.otp = "OTP must be a number";
    }

    if (!data.input6) {
      errors.otp = "OTP is required";
    } else if (isNaN(data.input6)) {
      errors.otp = "OTP must be a number";
    }

    otp.push(data.input6);
    if (otp.length !== 6) {
      errors.message = "OTP must be of 6 digits";
    }
    const otpData = otp.join("");
    console.log("test--------------------", otpData);

    const regularExpression =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!data.confirmPassword.trim()) {
      errors.confirmPassword = constantMessages.confirmPasswordRequired;
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = constantMessages.confirmAndMainPasswordMatch;
    }

    if (!data.password.trim()) {
      errors.password = constantMessages.passwordRequired;
    } else if (!regularExpression.test(data.password)) {
      errors.password = constantMessages.passwordRegex;
    }
    return {
      errors,
      otpData,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors?.errors);
    if (Object.keys(newErrors.errors).length === 0) {
      // Form submission logic here
      const otp = newErrors.otpData;
      dispatch(
        setPassword({ email: authData.email, otp, password: formData.password })
      );
      console.log("Form submitted successfully!");
    } else {
      console.log(`Form submission failed
       due to validation errors.`);
    }
  };

  const resendOtpAction = (e) => {
    if (authData.email) {
      dispatch(reSendOtp(authData.email));
    } else {
      errors.message = constantMessages.emailRequired;
      setErrors(errors);
    }
  };
  const showPassword = (id) => {
    var x = document.getElementById(id);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  const fieldValidationCheck=(e)=>{
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
  }
  return (
    <section className="otp-varify set-pswrd">
      {authData.isOtpVerifiedSuccess && authData.isSuccess ? (
        <Navigate to="/login-by-password" />
      ) : null}

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="loginform-container">
              <img src={ntsplLogo} className="ntspl-logo" alt="logo" />
              <form onSubmit={handleSubmit}>
                <div className="text">
                  <h4>Welcome to Meeting Plus</h4>
                  <p>Set Password</p>
                </div>

                <div className="form-group">
                  <div className="otp-Check">
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
                          onBlur={fieldValidationCheck}
                          value={formData.input1}
                          autocomplete="off"
                          id={1}
                        />
                      </div>

                      <div className="digit">
                        <input
                          type="text"
                          name="input2"
                          maxLength={1}
                          onChange={handleChange}
                          onBlur={fieldValidationCheck}
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
                          onBlur={fieldValidationCheck}
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
                          onBlur={fieldValidationCheck}
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
                          onBlur={fieldValidationCheck}
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
                          onBlur={fieldValidationCheck}
                          value={formData.input6}
                          autocomplete="off"
                          id={6}
                        />
                      </div>
                    </div>
                    {errors.otp && (
                      <span className="error-message">{errors.otp}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <div className="pwd-group">
                    <label className="mb-1">
                      Password <span>*</span>
                    </label>
                    <div className="inner-group">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-eye-slash"
                        viewBox="0 0 16 16"
                        onClick={() => showPassword("password")}
                      >
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                      </svg>
                      <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        onBlur={fieldValidationCheck}
                        value={formData.password}
                      />
                    </div>
                  </div>
                  {errors.password && (
                    <span className="error-message">{errors.password}</span>
                  )}
                </div>

                <div className="form-group">
                  <div className="cpwd-group">
                    <label className="mb-1">
                      Confirm Password <span>*</span>
                    </label>
                    <div className="inner-group">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-eye-slash"
                        viewBox="0 0 16 16"
                        onClick={() => showPassword("confirmPassword")}
                      >
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                      </svg>
                      <input
                        type="password"
                        placeholder="Enter Confirm Password"
                        name="confirmPassword"
                        id="confirmPassword"
                        onChange={handleChange}
                        onBlur={fieldValidationCheck}
                        value={formData.confirmPassword}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <span className="error-message">
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>
                  {authData.isOtpProcessed && authData.isSuccess ? (
                    <Alert
                      status={authData.isSuccess}
                      message={authData.message}
                    />
                  ) : authData.isOtpProcessed && !authData.isSuccess ? (
                    <Alert
                      status={authData.isSuccess}
                      message={authData.message}
                    />
                  ) : null}
                </div>
                {!authData.loading ? (
                  <button className="btn1" type="submit">
                    {" "}
                    OTP Verify
                  </button>
                ) : (
                  <LoaderButton />
                )}

                <div className="back-resend back-arrow">
                  <Link to="/login-by-password">
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
                          dispatch(updateIsSuccess(true));
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
                       
                       minutes={authData.isOtpProcessed && !authData.isSuccess?process.env.OTP_RESEND_TIME:process.env.CHECK_OTP_VALIDATION_TIME}
                      />
                    </span>
                  ) : (
                    <div className="resend">
                      <Link to="" onClick={resendOtpAction}>
                        Resend OTP
                      </Link>
                    </div>
                  )}



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

export default SetPassword;
