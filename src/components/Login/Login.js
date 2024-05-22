import React from "react";
import "./style/Login.css";
import configData from "../../config/config";
import LoginContainer from "./LoginContainer";
import LoginImage from "./LoginImage";

const Login = () => {
  console.log(configData.baseUrl);
  return (
    <section className="sign-in">
      <div className="container-fluid">
        <div className="row">
          <LoginContainer />
          <LoginImage />
        </div>
      </div>
    </section>
  );
};

export default Login;


