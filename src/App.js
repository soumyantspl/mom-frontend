import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateRoutes from "./config/route";

const App = () => {
  const chekUserLogin = false;
  const checkClass = chekUserLogin ? "main-content" : "login-no-padding";
  return (
    <div className={checkClass}>
      <CreateRoutes />
    </div>
  );
};

export default App;
