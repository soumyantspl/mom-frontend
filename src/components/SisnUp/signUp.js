import React from "react";
import LoginImage from "../Login/LoginImage";
import ntsplLogo from "../../assets/images/ntspl_logo.png";

const signUp = () => {
  return (
    <section className="otp-varify">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="loginform-container">
              <img src={ntsplLogo} className="ntspl-logo" />
            </div>
          </div>

          <LoginImage />
        </div>
      </div>
    </section>
  );
};

export default signUp;
