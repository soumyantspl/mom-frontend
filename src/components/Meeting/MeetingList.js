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
import { fetchMeetingList, updateRsvp } from "../../redux/actions/meetingActions.js/listMeetingAction";
import LoaderButton from "../Common/LoaderButton";
import Loader from "../Common/Loader";
import Alert from "../Common/Alert";
import MeetingDropDown from "./MeetingDropDown";
import FilterComponent from "./FilterComponent";
const MeetingList = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const authData = useSelector((state) => state.auth);
  const meetingData = useSelector((state) => state.meeting);
  const [filter, setfilter] = useState(false);
  const [optionArray, setOptionArray] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [searchData, setSearchData] = useState({
    searchKey: "",
    page: 1,
    limit: 5,
    order: 1,
    filterData: {},
  });

  const filterData = (data) => {
    console.log(data);
    setSearchData({
      ...searchData,
      filterData: data,
    });
  };
  //  console.log(filter);
  const isLogIn = false;
  useEffect(() => {
    document.title = "Meeting List";
    // if (isLogIn) {
    //   navigate("/dashboard");
    // }
    console.log("repeat------------------------", searchData);
    const payload = {
      page: searchData.page,
      order: searchData.order,
      limit: searchData.limit,
      organizationId: userData.organizationId,
      meetingStatus: searchData.filterData?.meetingStatus,
      toDate: searchData.filterData?.toDate,
      fromDate: searchData.filterData?.fromDate,
      attendeeId: searchData.filterData?.attendeeId,
    };
    if (searchData.searchKey !== "") {
      payload["searchKey"] = searchData.searchKey;
      setSearchData({
        ...searchData,
        page: 1,
      });
      payload.page = 1;
    }
    console.log("payload in meetinglist----------34-------", payload);

    dispatch(fetchMeetingList(payload));
  }, [
    searchData.searchKey,
    searchData.order,
    searchData.page,
    searchData.limit,
    searchData.filterData,
    meetingData.isRsvpUpdated
  ]);
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
    console.log("->>>>>>>66666666666666666", searchData);

    // const payload = {
    //   page: searchData.page,
    //   order: searchData.order,
    //   limit: searchData.limit,
    //   organizationId: userData.organizationId,
    // };
    // if (searchData.searchKey !== "") {
    //   payload["searchKey"] = searchData.searchKey;
    // }
    // console.log("payload in meetinglist-------------12----", payload);
    // // dispatch(fetchMeetingList(payload));
  };

  const totalOption = Math.round(meetingData.totalCount / 5 + 0.5);
  const totalPage = Math.round(meetingData.totalCount / searchData.limit + 0.5);
  const totalPageArray = Array(totalPage).fill();
  console.log(
    "totalOption-------------------->",
    meetingData.totalCount / searchData.limit + 0.5,
    totalOption
  );
  //const fromDataCount= searchData.page===1?searchData.limit+meetingData.meetingList.length
  const fromDataCount = (searchData.page - 1) * searchData.limit + 1;
  const toDataCount =
    (searchData.page - 1) * searchData.limit + meetingData.meetingList?.length;
  //searchData.limit+meetingData.meetingList.length
  const totalCount = meetingData.totalCount;
  console.log(fromDataCount, toDataCount, totalCount);

  const customName = (fullname) => {
    const nameArray = fullname.split(" ");
    console.log(
      "nameArray=================================================",
      nameArray
    );
    let result;

    if (nameArray.length > 1) {
      result =
        nameArray[0].charAt(0).toUpperCase() +
        nameArray[nameArray.length - 1].charAt(0).toUpperCase();
    } else {
      result = nameArray[0].charAt(0).toUpperCase();
    }
    console.log(
      "result---------------------------------->>>>>>>>>>>>>",
      result
    );
    return result;
  };

  const checkRsvpCount = (attendees) => {
    let yesCount = 0;
    let noCount = 0;
    let pendingCount = 0;

    attendees.map((item) => {
      item.rsvp === "YES"
        ? (yesCount = yesCount + 1)
        : item.rsvp === "NO"
        ? (noCount = noCount + 1)
        : (pendingCount = pendingCount + 1);
    });

    return `${yesCount} Yes, ${noCount} No, ${pendingCount} Awaiting`;
  };

  const formatDateTimeFormat = (date) => {
    console.log(date);
    const sourceDate = new Date(date).toDateString();
    const sourceTime = new Date(date).toLocaleTimeString();
    // The above yields e.g. 'Mon Jan 06 2020'

    const [, month, day, year] = sourceDate.split(" ");
    const formattedDate = [day, month, year].join(" ");
    console.log(formattedDate);

    const [hour, minute, second] = sourceTime.split(" ")[0].split(":");
    const formattedTime =
      [hour, minute].join(":") + " " + sourceTime.split(" ")[1];
    return {
      formattedTime,
      formattedDate,
    };
  };
  console.log("repeat------------------------", searchData);
  return (
    <div>
      <Header />
      <MeetingHeader />
      <Sidebar />

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

          {filter ? (
            <FilterComponent setfilter={setfilter} filterData={filterData} />
          ) : null}
        </div>

        <div className="mt-2 table-box">
          <div className="tbl-text-search">
            <div className="left-tbl-text">
              <p>
                Showing {fromDataCount} to {toDataCount} of {totalCount} entries
              </p>
            </div>
            <div className="search-box">
              <input
                type="search"
                placeholder="Meeting Title"
                onChange={handleChange}
                name="searchKey"
                value={searchData.searchKey}
                autoComplete="off"
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
          {!meetingData.loading &&
          meetingData.meetingList?.length !== 0 &&
          meetingData.isSuccess ? (
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
                {meetingData.meetingList.map((meeting, index) => {
                  return (
                    <tr>
                      <td data-label="Meeting Date & Time">
                        {formatDateTimeFormat(meeting.date).formattedDate}
                        <p className="detail-date-time">
                          {formatDateTimeFormat(meeting.date).formattedTime}
                        </p>
                      </td>
                      <td data-label="Meeting Title">
                        {meeting.title}

                        <div className="respond-button">
                          {meeting.rsvp === "YES" ? (
                            <button disabled className="respond-action">
                              {" "}
                              <>&#x2713; </>Yes
                            </button>
                          ) : (
                            <button className="respond-action" onClick={()=>{dispatch(updateRsvp("YES",meeting._id))}}> Yes</button>
                          )}

                          {meeting.rsvp === "NO" ? (
                            <button disabled className="respond-action">
                              {" "}
                              <>&#x2713; </>No
                            </button>
                          ) : (
                            <button className="respond-action" onClick={()=>{dispatch(updateRsvp("NO",meeting._id))}}> No</button>
                          )}

                          {meeting.rsvp === "MAYBE" ? (
                            <button disabled className="respond-action">
                              {" "}
                              <>&#x2713; </>May Be
                            </button>
                          ) : (
                            <button className="respond-action" onClick={()=>{dispatch(updateRsvp("MAYBE",meeting._id))}}> May Be</button>
                          )}

                          {/* <button className="respond-action" onClick={dispatch(updateRsvp("YES"))}>Yes</button>
                            <button className="respond-action" onClick={dispatch(updateRsvp("NO"))}>No</button>
                            <button className="respond-action" onClick={dispatch(updateRsvp("MAYBE"))}>May Be</button> */}
                        </div>
                      </td>
                      <td data-label="Attendees" className="cursor-pointer">
                        <div className="attendees">
                          {meeting.attendees &&
                            meeting.attendees
                              .filter((item, index) => index < 5)
                              .map((attendee, index) => {
                                return (
                                  <div className="attendee-list">
                                    {customName(attendee.name)}
                                  </div>
                                );
                              })}
                        </div>

                        {/* <div className="attendee-list">PK</div>
                          <div className="attendee-list">RB</div>
                          <div className="attendee-list">YH</div>
                          <div className="attendee-list">DB</div> */}
                        <p className="plus-more-text m-0">
                          {meeting.attendees.length > 5
                            ? `+${meeting.attendees.length - 5} More`
                            : null}
                        </p>
                      </td>
                      <td data-label="RSVP Confirmation">
                        <p>{meeting.attendees.length} Attendees</p>
                        <p className="detail-date-time">
                          {checkRsvpCount(meeting.attendees)}
                        </p>
                      </td>
                      <td data-label="Status">
                        <span
                          className={
                            meeting.meetingStatus.status === "due" ||
                            meeting.meetingStatus.status === "scheduled" ||
                            meeting.meetingStatus.status === "rescheduled"
                              ? "badge bg-success bg-opacity-10 text-success"
                              : meeting.meetingStatus.status === "closed"
                              ? "badge bg-primary bg-opacity-10 text-success"
                              : "badge bg-danger bg-opacity-10 text-success"
                          }
                        >
                          {meeting.meetingStatus.status
                            .charAt(0)
                            .toUpperCase() +
                            meeting.meetingStatus.status.slice(1)}
                        </span>
                        {/* <Button variant="success"  size="sm" style={{fontWeight:"bold"}} >Scheduled</Button> */}
                      </td>
                      <td data-label="Action Due">
                        {
                          meeting.actionDetail.filter((item) => item.isComplete)
                            .length
                        }
                        /{meeting.actionDetail.length}
                      </td>
                      <td data-label="Action">
                        <div className="d-inline-block menu-dropdown custom-dropdown">
                          <Dropdown>
                            <MeetingDropDown
                              status={meeting.meetingStatus.status}
                            />
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
                  );
                })}
              </tbody>
            </table>
          ) : !meetingData.loading && meetingData.meetingList?.length === 0 ? (
            <div>
              <Alert message="No Data Found !" status={false} />
              <button
                onClick={(e) => {
                  setSearchData({
                    ...searchData,
                    searchKey: "",
                  });
                }}
              >
                Back
              </button>
            </div>
          ) : (
            <div
              className="meeting-page "
              style={{ textAlign: "center", paddingTop: 280 }}
            >
              <Loader />
            </div>
          )}
          {totalCount <= 1 ? null : (
            <div className="tbl-bottom">
              <div className="left-tbl-bottom">
                {searchData.page !== 1 ? (
                  <button
                    className="left-arrow"
                    onClick={(e) =>
                      setSearchData({
                        ...searchData,
                        page: searchData.page - 1,
                      })
                    }
                  >
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
                ) : null}
                <ul>
                  {totalPageArray?.length &&
                    totalPageArray.map((_, option) => {
                      console.log("option-----------------------", option);
                      return (
                        <li
                          //  className="selected-page"
                          className={
                            option + 1 === searchData.page
                              ? "selected-page"
                              : null
                          }
                          onClick={(e) => {
                            setSearchData({
                              ...searchData,
                              page: option + 1,
                            });
                          }}
                        >
                          {option + 1}
                        </li>
                      );
                    })}
                </ul>
                {totalPageArray?.length !== searchData.page ? (
                  <button
                    className="right-arrow"
                    onClick={(e) =>
                      setSearchData({
                        ...searchData,
                        page: searchData.page + 1,
                      })
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#fff"
                      // className="bi bi-chevron-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                      />
                    </svg>
                  </button>
                ) : null}
              </div>

              <div className="right-tbl-bottom">
                <p>Rows Per Page</p>
                <select
                  className="no-opt-box"
                  name="limit"
                  onChange={(e) =>
                    setSearchData({
                      ...searchData,
                      page: 1,
                      limit: e.target.value,
                    })
                  }
                  value={searchData.limit}
                >
                  {totalOption &&
                    Array(totalOption)
                      .fill()
                      .map((_, option) => {
                        console.log("option-----------------------", option);
                        return (
                          <option value={(option + 1) * 5}>
                            {(option + 1) * 5}
                          </option>
                        );
                      })}
                  {/* <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                  <option>50</option> */}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingList;
