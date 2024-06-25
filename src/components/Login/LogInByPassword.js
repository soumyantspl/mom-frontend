import React, { useState, useEffect } from "react";
import "./style/LogInByPassword.css";
import ntsplLogo from "../../assets/images/ntspl_logo.png";
import {
  Navigate,
  Link,
  useLocation,
  UNSAFE_NavigationContext,
} from "react-router-dom";
import LoginImage from "./LoginImage";
import {
  logInByPassword,
  sendOtp,
  updateIsSuccess,
  updateOtpProcessed,
} from "../../redux/actions/authActions/authAction";
import { useSelector, useDispatch } from "react-redux";
import Alert from "../Common/Alert";
import * as constantMessages from "../../constants/constatntMessages";
import LoaderButton from "../Common/LoaderButton";
//import Toast from "../Common/Toast";

const LogInByPassword = (props) => {
  const location = useLocation();
  const stateData = location.state;
  console.log(stateData);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [isSetPassword, setIsSetPassword] = useState(false);

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
    e.preventDefault();

    const newErrors = validateForm(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Form submission logic here
      if (isSetPassword) {
        dispatch(sendOtp(formData.email, isSetPassword));
        setIsSetPassword(false);
      } else {
        dispatch(
          logInByPassword(
            {
              email: formData.email,
              password: formData.password,
            },
            rememberMe
          )
        );
        setIsSetPassword(false);
      }
      console.log("Form submitted successfully!");
    } else {
      console.log(`Form submission failed
       due to validation errors.`);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.email.trim()) {
      errors.email = constantMessages.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = constantMessages.invalidEmail;
    }
    if (!isSetPassword) {
      const regularExpression =
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!data.password.trim()) {
        errors.password = constantMessages.passwordRequired;
      } else if (!regularExpression.test(data.password)) {
        errors.password = constantMessages.passwordRegex;
      }
    }
    return errors;
  };

  const dispatch = useDispatch();

  const authData = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = "Log In By Password: Meeting Plus";
    console.log(formData);
    console.log(stateData);
    if (stateData?.email) {
      setFormData({
        ...formData,
        email: stateData.email,
      });
    }
    return () => {
      // Anything in here is fired on component unmount.
      console.log("component un mount");
      dispatch(updateIsSuccess(false));
    };
  }, []);

  const showPassword = (id) => {
    var x = document.getElementById(id);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  // const fieldValidationCheck = (e) => {
  //   e.preventDefault();

  //   const newErrors = validateForm(formData);
  //   setErrors(newErrors);
  //   if (Object.keys(newErrors).length === 0) {
  //     // Form submission logic here

  //     console.log("Form submitted successfully!");
  //   } else {
  //     console.log(`Form submission failed
  //      due to validation errors.`);
  //   }
  // };


  const passwordFieldValidationCheck = (e) => {
    const errors = {};
    // if (!formData.password) {
    //   errors.roomId = constantMessages.roomRequired;
    //   setErrors(errors);
    // }
    if (!isSetPassword) {
      const regularExpression =
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!formData.password.trim()) {
        errors.password = constantMessages.passwordRequired;
      } else if (!regularExpression.test(formData.password)) {
        errors.password = constantMessages.passwordRegex;
      }
      setErrors(errors);
    }
  };

  
  const emailFieldValidationCheck = (e) => {
    const errors = {};
    // if (!formData.password) {
    //   errors.roomId = constantMessages.roomRequired;
    //   setErrors(errors);
    // }
    // if (!formData.password) {
      if (!formData.email.trim()) {
        errors.email = constantMessages.emailRequired;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = constantMessages.invalidEmail;
      }
      setErrors(errors);
   // }
  };



  return (
    <section className="sign-in">
      {authData.isLogInSuccess ? <Navigate to="/meeting-list" /> : null}
      {authData.isSetPassword && authData.isOtpProcessed ? (
        <Navigate to="/set-password" />
      ) : null}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="loginform-container by-password">
              <img src={ntsplLogo} className="ntspl-logo" alt="logo" />

              <form onSubmit={handleSubmit}>
                <div className="text">
                  <h4>Welcome to Meeting Plus</h4>
                  <p>Enter email & password to logging in to your account</p>
                </div>
                {/* {authData.isOtpVerifiedSuccess && authData.isOtpProcessed ? (
                  <Alert
                    status={authData.isSuccess}
                    message={authData.message}
                    timeoutSeconds={0}
                  />
                ) : null} */}
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
                        value={formData.email}
                        autocomplete="off"
                        onChange={handleChange}
                        onBlur={emailFieldValidationCheck}
                        name="email"
                      />
                    </div>
                    {errors.email && (
                      <span className="error-message">{errors.email}</span>
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
                        placeholder="Type Your Password"
                        value={formData.password}
                        autocomplete="off"
                        onChange={handleChange}
                        onBlur={passwordFieldValidationCheck}
                        name="password"
                        id="password"
                      />
                    </div>
                    {errors.password && (
                      <span className="error-message">{errors.password}</span>
                    )}
                  </div>
                </div>

                <div className="remember-forgot-pwd">
                  <div className="remember">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    Remember
                  </div>
                  <div className="set-pwd">
                    {/* <Link to="/set-password" > Forgot Password ?</Link> */}
                    <button
                      disabled={authData.loading}
                      type="submit"
                      className="signin-btn2"
                      onClick={() => setIsSetPassword(true)}
                    >
                      Forgot Password ?
                    </button>
                  </div>
                </div>
                {/* {authData.isLogInProcessed && !authData.isSuccess ? (
                  <Alert
                    status={authData.isSuccess}
                    message={authData.message}
                    timeoutSeconds={0}
                  />
                ) : null} */}
                {/* {authData.isOtpProcessed && !authData.isSuccess ? (
                  <Alert
                    status={authData.isSuccess}
                    message={authData.message}
                     timeoutSeconds={0}
                  />
                ) : null} */}
                {/* <a href="/meeting/meeting-list">
                  <button className="login-btn" >Sign In</button>
                </a> */}
                {!authData.loading ? (
                  <button
                  disabled={authData.loading}
                    className="signin-btn1"
                    type="submit"
                    onClick={() => setIsSetPassword(false)}
                  >
                    Sign In
                  </button>
                ) : (
                  <LoaderButton />
                )}

                <div className="account">Don't have an account ?</div>

                <Link to={!authData.loading?"/sign-up":"#"}>
                  <button   disabled={true} className="signup-btn">Sign Up</button>
                </Link>

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
                        if(!authData.loading){
                          dispatch(updateIsSuccess(false));
                        }
                      }}
                    >
                      Back to Sign In
                    </span>
                  </div>
                </Link>
              </form>
            </div>
          </div>

          <LoginImage />
        </div>
      </div>
    </section>
  );
};

export default LogInByPassword;
