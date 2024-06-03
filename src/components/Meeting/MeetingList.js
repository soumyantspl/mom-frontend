import React, { useState, useEffect } from "react";
import Header from "../Common/Header/Header";
import Sidebar from "../Common/Sidebar/Sidebar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate, Navigate, Link } from "react-router-dom";
import MeetingHeader from "../Common/Header/MeetingHeader";
//import ButtonToolbar from 'react-bootstrap/ButtonGroup';
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import "./style/meetings-css.css";
import { fetchMeetingList } from "../../redux/actions/meetingActions.js/listMeetingAction";
import LoaderButton from "../Common/LoaderButton";
import Loader from "../Common/Loader";

const MeetingList = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const authData = useSelector((state) => state.auth);
  const meetingData = useSelector((state) => state.meeting);
  const [filter, setfilter] = useState(false);
  const [searchData, setSearchData] = useState({
    searchKey: "",
    page: 1,
    limit: 20,
    order: 1,
  });

  // const showFilter = () => {
  //   setfilter(true);
  //   console.log(filter);
  // };
  //  console.log(filter);
  const isLogIn = false;
  useEffect(() => {
    document.title = "Meeting List";
    // if (isLogIn) {
    //   navigate("/dashboard");
    // }
    console.log("repeat------------------------");
    const payload = {
      page: searchData.page,
      order: searchData.order,
      limit: searchData.limit,
      organizationId: userData.organizationId,
    };
    if(searchData.searchKey!==""){
      payload["searchKey"]=searchData.searchKey
    }
    console.log("payload in meetinglist----------34-------", payload);
    
    dispatch(fetchMeetingList(payload));
  },[searchData.searchKey,searchData.order, searchData.page, searchData.limit]);
  console.log(
    "meetingData---------------------->>>>>>>>>>>>>>>>>>>>>>>",
    meetingData
  );

  const handleChange = (e) => {
    console.log("on change------------------->>>>>>", e.target);
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value,
    });
    console.log("->>>>>>>66666666666666666",searchData)




    
    const payload = {
      page: searchData.page,
      order: searchData.order,
      limit: searchData.limit,
      organizationId: userData.organizationId,
    };
  if(searchData.searchKey!==""){
    payload["searchKey"]=searchData.searchKey
  }
  console.log("payload in meetinglist-------------12----", payload);
    dispatch(fetchMeetingList(payload));
  };

  return (
    <div>
      <Header />
      <MeetingHeader />
      <Sidebar />
      {!meetingData.loading && meetingData.meetingList.length!==0? (
        <div className="main-content">
          <div className="meeting-page ">
            <div className="meeting-header-text">
              <div>
                <h4>Meetings</h4>
              </div>
              <div>
                <button
                  className="btn rounded-pill add-btn Mom-btn d-flex align-items-center justify-content-center"
                  id="open-form-btn"
                  onClick={(e) => setfilter(true)}
                >
                  <p> Filter</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-funnel filter-svg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
                  </svg>
                </button>
              </div>
            </div>

            {filter ? <FilterComponent setfilter={setfilter} /> : null}
          </div>

          <div className="mt-2 table-box">
            <div className="tbl-text-search">
              <div className="left-tbl-text">
                <p>Showing 1 to 2 of 2 entries</p>
              </div>
              <div className="search-box">
                <input
                  type="search"
                  placeholder="Search"
                  onChange={handleChange}
                  name="searchKey"
                  value={searchData.searchKey}
                />
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

            <table className="mt-4 table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Meeting Date & Time</th>
                  <th scope="col">Meeting Title</th>
                  <th scope="col">Attendees</th>
                  <th scope="col">RSVP Confirmation</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action Due</th>
                  <th scope="col" className="action-col">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td data-label="Meeting Date & Time">
                    09 Feb 2024
                    <p className="detail-date-time">11:00 AM</p>
                  </td>
                  <td data-label="Meeting Title">
                    Friday morning meeting
                    <div className="respond-button">
                      <button className="respond-action">Yes</button>
                      <button className="respond-action">No</button>
                      <button className="respond-action">May Be</button>
                    </div>
                  </td>
                  <td data-label="Attendees" className="cursor-pointer">
                    <div className="attendees">
                      <div className="attendee-list">SL</div>
                      <div className="attendee-list">PK</div>
                      <div className="attendee-list">RB</div>
                      <div className="attendee-list">YH</div>
                      <div className="attendee-list">DB</div>
                      <p className="plus-more-text m-0">+5 More</p>
                    </div>
                  </td>
                  <td data-label="RSVP Confirmation">
                    <p>10 Attendees</p>
                    <p className="detail-date-time">5 Yes, 1 No, 5 Awaiting</p>
                  </td>
                  <td data-label="Status">
                    <span className="badge bg-success bg-opacity-10 text-success">
                      Scheduled
                    </span>
                    {/* <Button variant="success"  size="sm" style={{fontWeight:"bold"}} >Scheduled</Button> */}
                  </td>
                  <td data-label="Action Due">0/0</td>
                  <td data-label="Action">
                    <div className="d-inline-block menu-dropdown custom-dropdown">
                      <Dropdown>
                        <Dropdown.Toggle>
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
                          <Dropdown.Item href="#/action-2">
                            <Link
                              to="/viewMeetingDetails"
                              style={{ textDecoration: "none", color: "black" }}
                            >
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
                              View Meeting Details
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-1">
                            <Link
                              to="/meeting/write-minutes"
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg "
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-pencil-square me-2"
                                viewBox="0 0 16 16"
                              >
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path
                                  fill-rule="evenodd"
                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                />
                              </svg>
                              Write Minutes
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-3">
                            <Link
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-pencil-square me-2"
                                viewBox="0 0 16 16"
                              >
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path
                                  fill-rule="evenodd"
                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                />
                              </svg>
                              Edit Meeting
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item eventKey="4">
                            <Link
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="17"
                                fill="currentColor"
                                className="bi bi-x-circle me-2"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                              </svg>
                              Cancel Meeting
                            </Link>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>

                      {/* {buttonStatus ? <VariantsExample /> : null} */}

                      <div
                        aria-labelledby="dropdownBasic1"
                        className="list-dropdown"
                      >
                        <div className="dropdown-divider"></div>
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
          </div>
        </div>
      ) : (
        <div className="main-content">
          <div
            className="meeting-page "
            style={{ textAlign: "center", paddingTop: 280 }}
          >
            <Loader />
          </div>
        </div>
      )}
    </div>
  );
};

// FILTER COMPONENT
const FilterComponent = (props) => {
  return (
    <div className="filter show" id="form-container">
      <div className="filter-container">
        <h4 className="filterheading mb-0">Filter Meetings</h4>
        <button
          type="button"
          onClick={(e) => props.setfilter(false)}
          style={{ border: "none", padding: 0, margin: 0 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </button>
      </div>

      <form id="myForm">
        <label htmlFor="from">From Date</label>
        <div className="from-to">
          <input className="filter-date" type="date" id="from" name="" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#fff"
            className="bi bi-calendar3 calender"
            viewBox="0 0 16 16"
          >
            <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
            <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
          </svg>
        </div>
        <br />
        <label htmlFor="to">To Date</label>
        <div className="from-to">
          <input className="filter-date" type="date" id="" name=" " />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#fff"
            className="bi bi-calendar3 calender"
            viewBox="0 0 16 16"
          >
            <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
            <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
          </svg>
        </div>
        <br />
        <label>Attendee(s)</label>
        <select className="fltr-opt" aria-placeholder="Select Attendee">
          <option>Select Attendee(s)</option>
          <option></option>
        </select>
        <br />
        <label>Status</label>
        <select className="fltr-opt" aria-placeholder="Select Status">
          <option>Select Status</option>
          <option>Due</option>
        </select>
        <div className="mt-2 form-btm-btn">
          <button className="reset">
            <p>Reset</p>
          </button>
          <button className="add-btn Mom-btn">
            <p>Filter</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MeetingList;
