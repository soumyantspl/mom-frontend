import React,{useEffect} from "react";
import ntsplWhiteLogo from "../../../assets/images/Ntspl-Logo-white.png";
import meetingLogo from "../../../assets/images/meeting_logo.png";
import meeting2Logo from "../../../assets/images/meeting2.svg";
import actionLogo from "../../../assets/images/clipboard_839860.png";
import settingLogo from "../../../assets/images/setting.png";
import { useNavigate,Navigate, Link } from "react-router-dom";
console.log("-------------------",window.location.pathname );
let currentPath=window.location.pathname  
const Sidebar = () => {
//      useEffect(() => {
       
//   }, []);
  return (
    <div>
      <div className="sidebar">
        <div className="mt-4 top-logo">
          <a href="/meeting/meeting-list">
            <div className="ntspl-logo">
              <img src={ntsplWhiteLogo} />
            </div>
          </a>
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

          <Link to="/meetingList">
            <li className={currentPath=="/meetingList"?"active-menu":""}>
              <img className="meeting-logo" src={meetingLogo} />
              Meetings
            </li>
          </Link>

          <a href="actions">
          <li className={currentPath=="meetings"?"active-menu":""}>
              <img className="clipboard" src={actionLogo} />
              Actions
            </li>
          </a>

          <a href="">
          <li className={currentPath=="meetings"?"active-menu":""}>
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
          </a>
        </ul>

        <img className="meeting-img" src={meeting2Logo} alt="" />
      </div>
    </div>
  );
};

export default Sidebar;
