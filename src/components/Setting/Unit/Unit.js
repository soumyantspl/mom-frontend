import React, { useEffect, useState } from "react";
import Header from "../../Common/Header/Header";
import Sidebar from "../../Common/Sidebar/Sidebar";
import MeetingHeader from "../../Common/Header/MeetingHeader";
import "../Unit/style/unit.css";
import axios from "../../../../node_modules/axios/index";
import Alert from "../../Common/Alert";
import { Modal, Button, Table, Dropdown } from "react-bootstrap";

const Unit = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData.id;
  const organizationId = userData.organizationId;
  const accessToken = localStorage.getItem("accessToken");
  console.log("UserData-->>", userData);
  console.log("accessToken--->>", accessToken);
  const [unitData, setUnitData] = useState({
    name: "",
    address: "",
    organizationId,
  });
  console.log("unitData---->>", unitData);
  const [formValues, setFormValues] = useState({ name: "", address: "" });
  const [errors, setErrors] = useState({ name: "", address: "" });
  // const [apiResponse, setApiResponse] = useState("");

  const [apiResData1, setApiResData1] = useState({
    isSuccess1: false,
    message1: "",
  });
  console.log("apiResData-->", apiResData1);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (apiResData1) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [apiResData1]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUnitData({
      ...unitData,
      [name]: value,
    });
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let isValid = true;
    let errors = {};
    if (!formValues.name.trim()) {
      errors.name = "Unit Name is required";
      isValid = false;
    }
    if (!formValues.address.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (validate()) {
        console.log("Form submitted", formValues);
        const response = await axios.post(
          "http://localhost:8000/api/V1/unit/createUnit",
          {
            ...unitData,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken,
            },
          }
        );
        console.log("Unit created successfully:", response.data.message);
        setApiResData1({
          ...apiResData1,
          isSuccess1: response.data.success,
          message1: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error creating unit:", error.response.data.message);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  return (
    <div>
      <Header />
      <MeetingHeader />
      <Sidebar />
      <div className="main-content">
        <div className="Action-list-page input-width">
          <div className="meeting-header-text">
            <h4>Add Units</h4>
          </div>
          <div className="mt-2 table-box">
            <form className="meeting-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="mb-1">
                  Unit Name<span className="star-mark"> *</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Unit Name"
                  onChange={handleChange}
                  value={formValues.name}
                />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>
              <div className="form-group">
                <label className="mb-1">
                  Unit Address
                  <span className="star-mark"> *</span>
                </label>
                <textarea
                  name="address"
                  cols="3"
                  rows="3"
                  placeholder="Enter Unit Address"
                  onChange={handleChange}
                  value={formValues.address}
                ></textarea>
                {errors.address && (
                  <span className="error-message">{errors.address}</span>
                )}
              </div>

              <button className="save Mom-btn" type="submit">
                <p>Submit</p>
              </button>
            </form>
            <div>
              {showAlert && apiResData1 && apiResData1.message1 && (
                <Alert
                  status={apiResData1.isSuccess1}
                  message={apiResData1.message1}
                />
              )}
            </div>
          </div>
          {/* ////////////////////////// */}
          <div className="meeting-header-text">
            <h4>Manage Units</h4>
          </div>
          {/* <div className="mt-2 table-box">
            <div className="tbl-text-search">
              <div className="left-tbl-text">
                <p>Showing 1 to 2 of 2 entries</p>
              </div>
              <div className="search-box">
                <input type="search" placeholder="search" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="#4F2CC8"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </div>
            </div>
            <table className="mt-4 table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Unit Name</th>
                  <th scope="col">Unit Address</th>
                  <th scope="col" className="action-col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Unit Name">
                    NTSPL
                    <div className="organiser">Meeting Organiser</div>
                  </td>
                  <td data-label="Unit Address">DLF,Cybercity</td>
                  <td data-label="Action">
                    <div className="d-inline-block menu-dropdown custom-dropdown">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        id="dropdownBasic1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#000"
                          className="bi bi-three-dots-vertical"
                          viewBox="0 0 16 16"
                        >
                          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                        </svg>
                      </button>
                      <div aria-labelledby="dropdownBasic1">
                        <button>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="17"
                              height="17"
                              fill="currentColor"
                              className="bi bi-eye me-2"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                            </svg>
                            View{" "}
                          </a>
                        </button>
                        <button>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="me-2 bi bi-pencil-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path
                                fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                              />
                            </svg>
                            Edit{" "}
                          </a>
                        </button>
                        <button>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="me-2 bi bi-trash3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>
                            Delete
                          </a>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td data-label="Unit Name">NTSPL</td>
                  <td data-label="Unit Address">Patia</td>
                  <td data-label="Action">
                    <div className="d-inline-block menu-dropdown custom-dropdown">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        id="dropdownBasic1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#000"
                          className="bi bi-three-dots-vertical"
                          viewBox="0 0 16 16"
                        >
                          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                        </svg>
                      </button>
                      <div aria-labelledby="dropdownBasic1">
                        <button>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="17"
                              height="17"
                              fill="currentColor"
                              className="bi bi-eye me-2"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                            </svg>
                            View{" "}
                          </a>
                        </button>
                        <button>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="me-2 bi bi-pencil-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path
                                fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                              />
                            </svg>
                            Edit{" "}
                          </a>
                        </button>
                        <button>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="me-2 bi bi-trash3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>
                            Delete
                          </a>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="tbl-bottom">
              <div className="left-tbl-bottom">
                <button className="left-arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                    />
                  </svg>
                </button>
                <ul>
                  <li>1</li>
                  <li>2</li>
                </ul>
                <button className="right-arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#fff"
                    className="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                    />
                  </svg>
                </button>
              </div>

              <div className="right-tbl-bottom">
                <p>Rows Per Page</p>
                <select className="no-opt-box">
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                  <option>50</option>
                </select>
              </div>
            </div>
          </div> */}
          <div>
            <div className="meeting-header-text">
              <h4>Manage Organization</h4>
            </div>
            <div className="mt-2 table-box">
              <div className="tbl-text-search">
                <div className="left-tbl-text">
                  <p>Showing 1 to 2 of 2 entries</p>
                </div>
                <div className="search-box">
                  <input type="search" placeholder="search" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#4F2CC8"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </div>
              </div>

              <Table className="mt-4 table table-bordered">
                <thead>
                  <tr>
                    <th>Organization Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Details</th>
                    <th>Logo</th>
                    <th className="action-col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Nexus Technoware Solution Pvt. Ltd.</td>
                    <td>{/* Dynamic content here */}</td>
                    <td>082600 03333</td>
                    <td>DLF Cyber City,BBSR</td>
                    <td></td>
                    <td></td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="outline-primary"
                          id="dropdown-basic"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="#000"
                            className="bi bi-three-dots-vertical"
                            viewBox="0 0 16 16"
                          >
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                          </svg>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={handleShow}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="17"
                              height="17"
                              fill="currentColor"
                              className="bi bi-eye me-2"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                            </svg>
                            View
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="me-2 bi bi-pencil-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path
                                fillRule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                              />
                            </svg>
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="me-2 bi bi-trash3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                </tbody>
              </Table>

              <div className="tbl-bottom">
                <div className="left-tbl-bottom">
                  <button className="left-arrow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                      />
                    </svg>
                  </button>
                  <ul>
                    <li>1</li>
                    <li>2</li>
                  </ul>
                  <button className="right-arrow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#fff"
                      className="bi bi-chevron-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                      />
                    </svg>
                  </button>
                </div>

                <div className="right-tbl-bottom">
                  <p>Rows Per Page</p>
                  <select className="no-opt-box">
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                </div>
              </div>
            </div>

            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>View Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>Organization details go here...</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unit;
