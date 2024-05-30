import React from "react";
import meetingLogo from "../../assets/images/meeting.png";
const LoginImage = () => {
    console.log(meetingLogo)
  return (
   
    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
    
        <div className="blue-box-cont">
          <div className="blue-box">
            <div className="slider-cont">
              <h2>Meeting Plus</h2>
              <h6>Where Meeting Become Meaningful</h6>
              <div className="white-box">
                <img
                  // @ts-ignore
                  src={ meetingLogo }
                  alt=""
                ></img>
              </div>
            </div>
          </div>
          <p className="copyright">&copy; 2024 NTSPL All Rights Reserved</p>
        </div>
        </div>
          
   
  );
};

export default LoginImage;
