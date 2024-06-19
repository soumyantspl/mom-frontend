// import React, { useState } from "react";
// import "./style/Login.css";
// import configData from "../../config/config";
// import { useNavigate } from "react-router-dom";
// import otp-verify from "./otp-verify";
// import LogInByOtp from "./LogInByOtp";
// import LogInByPassword from "./LogInByPassword";
// import ntsplLogo from "../../assets/images/ntspl_logo.png";
// import SetPassword from "./SetPassword";

// const LogInContainer = () => {
//   console.log(configData.baseUrl);
//   const [isOtpSend, setIsOtpSend] = useState(false);
//   const [isSignInWithPassword, setIsSignInWithPassword] = useState(false);
//   const [isSetPassword, setIsSetPassword] = useState(false);
//   const navigate = useNavigate();

//   const submitOtp = (e) => {
//     e.preventDefault();
//     console.log("inputData------------", e.target.value);
//     // navigate("/otp-verify");
//     setIsOtpSend(true);
//   };

//   const setIsBackToSignIn = (value) => {
//     console.log('setIsBackToSignIn-------------',setIsBackToSignIn,value)
//     setIsOtpSend(false);
//     setIsSignInWithPassword(false);
//     setIsSetPassword(false);
//   };

//   console.log(
//     "isSignInWithPassword---------------------------",
//     isSignInWithPassword
//   );
//   return (
//     <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
//       {isOtpSend ? (
//         <otp-verify setIsOtpSend={setIsOtpSend} />
//       ) : isSignInWithPassword ? (
//         <LogInByPassword setIsSignInWithPassword={setIsSignInWithPassword} />
//       ) : isSetPassword ? (
//         <SetPassword setIsBackToSignIn={setIsBackToSignIn} />
//       ) : (
//         <LogInByOtp
//           setIsOtpSend={setIsOtpSend}
//           setIsSignInWithPassword={setIsSignInWithPassword}
//           setIsSetPassword={setIsSetPassword}
//         />
//       )}
//     </div>

//     // <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
//     //   {(isOtpSend) ? (
//     //     <otp-verify />
//     //   ) : (
//     //     <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
//     //       <div className="loginform-container">
//     //         <img
//     //           className="img-fluid"
//     //           // @ts-ignore
//     //           src={ntsplLogo}
//     //           alt="logo"
//     //         />
//     //         <form onSubmit={(e) => submitOtp(e)}>
//     //           <div className="text">
//     //             <h4>Welcome to Meeting Plus</h4>
//     //             <p>Enter your email id to logging in to your account</p>
//     //           </div>

//     //           <div className="form-group">
//     //             <div className="email-group">
//     //               <label className="mb-1">
//     //                 Email <span>*</span>
//     //               </label>
//     //               <div className="inner-group">
//     //                 <svg
//     //                   xmlns="http://www.w3.org/2000/svg"
//     //                   width="20"
//     //                   height="20"
//     //                   fill="currentColor"
//     //                   className="bi bi-envelope-at"
//     //                   viewBox="0 0 16 16"
//     //                 >
//     //                   <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
//     //                   <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
//     //                 </svg>
//     //                 <input type="email" placeholder="Type Your Email" />
//     //               </div>
//     //             </div>
//     //           </div>

//     //           <a href="otp-verify">
//     //             <button className="signin-btn1">Send OTP</button>
//     //           </a>

//     //           <div className="or">or</div>

//     //           <a href="user-login">
//     //             <button className="signin-btn2">Sign In With Password</button>
//     //           </a>

//     //           <div className="set-pwd">
//     //             <a href="reset-password">Set Password</a>
//     //           </div>
//     //         </form>
//     //       </div>
//     //     </div>
//     //   )}
//     // </div>
//   );
// };

// export default LogInContainer;