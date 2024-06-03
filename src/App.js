import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainRoute from "./config/route";
console.log("-------------------", window.location.pathname);
const App = () => {
  return (
    <div>
      <MainRoute />
    </div>
  );
};

export default App;
