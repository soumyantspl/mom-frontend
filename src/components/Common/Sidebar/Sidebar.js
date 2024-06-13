import React, { useEffect, useState } from "react";
import ntsplWhiteLogo from "../../../assets/images/Ntspl-Logo-white.png";
import meetingLogo from "../../../assets/images/meeting_logo.png";
import meeting2Logo from "../../../assets/images/meeting2.svg";
import actionLogo from "../../../assets/images/clipboard_839860.png";
import settingLogo from "../../../assets/images/setting.png";
import { useNavigate, Navigate, Link } from "react-router-dom";
import "./Sidebar.css"
console.log("-------------------", window.location.pathname);

const Sidebar = () => {
  const [currentPath, setCurrentPath] = useState("");
  const [hover, setHover] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(true);
  const [isNewPage, setIsNewPage] = useState(true);
  const paths=["/alerts","/meetingRoom","/unit","/designation","/department","/organization","/configuration","/employee"]

  useEffect(() => {
   
    setCurrentPath(window.location.pathname);
  //  setIsNewPage(false);
    paths.includes(currentPath)?setIsSubMenuOpen(true):setIsSubMenuOpen(false)
   // paths.includes(currentPath)?setIsNewPage(false):setIsSubMenuOpen(true)
  }, [currentPath]);
  console.log("isSubMenuOpen-------------------", isSubMenuOpen);

  return (
    <div>
      <div className="sidebar">
        <div className="mt-4 top-logo">
          <Link to="/meeting/meeting-list">
            <div className="ntspl-logo">
              <img src={ntsplWhiteLogo} />
            </div>
          </Link>
          <div className="sidebar-close" />
          {/* <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="#ffff"
    className="bi bi-x"
    viewBox="0 0 16 16"
  >
    <path
      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
    />
  </svg>  */}
        </div>

        <ul className="sidebar-content">
          <div className="create-meet-sidebar">
            <a href="/meeting/agenda">
              <li className="active-menu">
                <img className="meeting-logo" src={meetingLogo} />
                Create Meeting
              </li>
            </a>
          </div>

          <a href="/meeting/agenda">
            <li className="sidebar-create-meeting">
              <img className="meeting-logo" src={meetingLogo} />
              Create Meeting
            </li>
          </a>

          <Link to="/meeting-list" className="link" >
            <li className={currentPath == "/meetingList" ? "active-menu" : ""}>
              <img className="meeting-logo" src={meetingLogo} />
              Meetings
            </li>
          </Link>

          <Link to="/action-list" className="link">
            <li className={currentPath == "/actionList" ? "active-menu" : ""}>
              <img className="clipboard" src={actionLogo} />
              Actions
            </li>
          </Link>

          <Link to="" className="link">
            <li
              className={currentPath == "manage" ? "active-menu" : ""}
              onClick={() => {
                setIsSubMenuOpen(!isSubMenuOpen);
              }}
            >
              <img className="clipboard" src={settingLogo} />
              <div className="manage-dropdown">
                <div>Manage</div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#ffff"
                    className="bi bi-caret-down-fill drop-icon"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </div>
              </div>
            </li>
            {isSubMenuOpen  ? (
              <ul className="sub-setting">
                <Link to="/alerts" className="link">
                  <li
                    className={currentPath == "/alerts" ? "active-menu" : ""}
                    // onClick={() => {
                    //   setIsSubMenuOpen(true);
                    // }}
                  >
                    - Alerts
                  </li>
                </Link>
                <Link to="/meeting-room" className="link">
                  <li
                     className={currentPath == "/meetingRoom" ? "active-menu" : ""}
         
                  >
                    - Meeting Rooms
                  </li>
                </Link>
                <Link to="/employee" className="link">
                  <li
                     className={currentPath == "/employee" ? "active-menu" : ""}
         
                  >
                    - Employees
                  </li>
                </Link>

                <Link to="/configuration" className="link">
                  <li className={currentPath == "/configuration" ? "active-menu" : ""}>
                    - Configuration
                  </li>
                </Link>

                <Link to="/unit" className="link">
                  <li
                    className={currentPath == "/unit" ? "active-menu" : ""}
                  >
                    - Units
                  </li>
                </Link>
                <Link to="/organization" className="link">
                  <li
                     className={currentPath == "/organization" ? "active-menu" : ""}
                  >
                    - Organisations
                  </li>
                </Link>
                <Link to="/department" className="link">
                  <li
                    className={currentPath == "/department" ? "active-menu" : ""}
                  >
                    - Departments
                  </li>
                </Link>
                <Link to="/designation" className="link">
                  <li
                    className={currentPath == "/designation" ? "active-menu" : ""}
                  >
                    - Designations
                  </li>
                </Link>
              </ul>
            ) : null}
          </Link>
        </ul>

        <img className="meeting-img" src={meeting2Logo} alt="" />
      </div>
    </div>
  );
};

export default Sidebar;
