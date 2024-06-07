import React, { useState, useEffect } from "react";
import profileImage from "../../../assets/images/profile.png";
import "./Header.css";
// @ts-ignore
import { useNavigate, Navigate, Link } from "react-router-dom";
// @ts-ignore
import ButtonGroup from "react-bootstrap/ButtonGroup";
// @ts-ignore
import Dropdown from "react-bootstrap/Dropdown";
// @ts-ignore
import DropdownButton from "react-bootstrap/DropdownButton";
import { logOut } from "../../../redux/actions/authActions/authAction";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const [name, setName] = useState("");
  const [navigate, setNavigate] = useState(false);

  const dispatch = useDispatch();

  const userData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    dispatch(logOut());
    alert("You will be log out");
  };

  useEffect(() => {
    console.log("userData", userData);
    if (userData) {
      setName(userData?.name);
    }
  }, []);

  return (
    <section className="topbar">
      {/* {!accessToken?<Navigate to="/login" />:null} */}
      <div className="topbar-1">
        <div className="topbar1-content">
          <div className="d-flex align-items-center">
            <button className="ps-0 sidebar-open-btn ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="#000"
                className="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                />
              </svg>
            </button>
            <div className="meeting">Meeting Plus</div>
          </div>

          <div className="top-right-svg">
            <div className="create-meeting-button">
              <Link to="/createMeeting" style={{ textDecoration: "none" }}>
                <button className="Mom-btn">
                  <p>Create Meeting</p>
                </button>
              </Link>
            </div>

            <div className="line"></div>
            <Link to="notification">
              <div className="bell">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="#000"
                  className="bi bi-bell "
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                </svg>
                <span>15</span>
              </div>
            </Link>

            {/* <div className="d-inline-block custom-dropdown top-header-profile">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  id="dropdownBasic1"
                >
                  <div className="d-flex admin-box">
                    <img src={profileImage} className="user" />
                    <span>Priyanka</span>
                  </div>
                </button>
                <div aria-labelledby="dropdownBasic1">
                  <a href="my-profile">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person me-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                    </svg>
                    My Profile
                  </a>
                  <div className="dropdown-divider"></div>

                  <a href="/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-box-arrow-left me-2"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
                      />
                    </svg>
                    Logout
                  </a>
                </div> */}

            <Dropdown>
              <Dropdown.Toggle>
                <div className="d-flex admin-box">
                  <img src={profileImage} className="user" />
                  <span>{name}</span>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-3">
                  <Link
                    to="/meeting/meeting-detail"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person me-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                    </svg>
                    My Profile
                  </Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">
                  <Link
                    to="/logIn"
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={handleLogout}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-box-arrow-left me-2"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
                      />
                    </svg>
                    Logout
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
