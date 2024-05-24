import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainRoute from "./config/route";
import Header from "./components/Common/Header/Header";
import Sidebar from "./components/Common/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import { useNavigate, Link, Navigate } from "react-router-dom";

console.log("-------------------", window.location.pathname);
let currentPath = window.location.pathname;
let isUserLoggedin = false;
const checkClass = isUserLoggedin ? "main-content" : "login-no-padding";

const App = () => {
  return (
    <div>
      <MainRoute />
    </div>
  );
};

export default App;
