import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchAttendeesList } from "../../redux/actions/meetingActions/MeetingAction";

// FILTER COMPONENT
const FilterComponent = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const meetingData = useSelector((state) => state.meeting);
  const localStorageData = JSON.parse(localStorage.getItem("userData"));
  const [searchData, setSearchData] = useState({
    toDate: "",
    fromDate: "",
    attendeeId: "",
    meetingStatus: "",
  });

  useEffect(() => {
    setSearchData({
      ...props.initData,
    });
    dispatch(fetchAttendeesList(userData.organizationId, accessToken));
 
  }, []);

  const handleChange = (e) => {
    console.log("on change------------------->>>>>>", e.target);
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value,
    });
  };
  console.log("on change--------filter----------->>>>>>", searchData);

  const handleSubmit = (e) => {
    e.preventDefault(e);

    props.setfilter(false);

    props.filterData(searchData);
    setSearchData({
      ...searchData,
    });
  };

  const handleReset = (e) => {
    e.preventDefault(e);

    setSearchData({
      toDate: "",
      fromDate: "",
      attendeeId: "",
      meetingStatus: "",
    });

    props.filterData({
      toDate: "",
      fromDate: "",
      attendeeId: "",
      meetingStatus: "",
    });
  };

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

      <form id="myForm" onSubmit={handleSubmit}>
        <label htmlFor="from">From Date</label>
        <div className="from-to">
          <input
            className="filter-date"
            type="date"
            id="from"
            onChange={handleChange}
            name="fromDate"
            value={searchData.fromDate}
          />
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#fff"
            className="bi bi-calendar3 calender"
            viewBox="0 0 16 16"
          >
            <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
            <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
          </svg> */}
        </div>
        <br />
        <label htmlFor="to">To Date</label>
        <div className="from-to">
          <input
            className="filter-date"
            type="date"
            id=""
            onChange={handleChange}
            name="toDate"
            value={searchData.toDate}
          />

          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#fff"
            className="bi bi-calendar3 calender"
            viewBox="0 0 16 16"
          >
            <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
            <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
          </svg> */}
        </div>
        <br />
        <label>Attendee(s)</label>
        <select
          className="fltr-opt"
          aria-placeholder="Select Attendee"
          onChange={handleChange}
          name="attendeeId"
          value={searchData.attendeeId}
        >
          <option>Select Attendee(s)</option>
          {meetingData.attendeesList &&
            meetingData.attendeesList.map((attendee) => {
              return <option value={attendee._id}>{attendee.name}</option>;
            })}
        </select>
        <br />
        <label>Status</label>
        <select
          className="fltr-opt"
          aria-placeholder="Select Status"
          onChange={handleChange}
          name="meetingStatus"
          value={searchData.meetingStatus}
        >
          <option>Select Status</option>
          {meetingData.statusData &&
            meetingData.statusData.map((status) => {
              return (
                <option value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              );
            })}
        </select>
        <div className="mt-2 form-btm-btn">
          <button className="reset" type="reset" onClick={handleReset}>
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

export default FilterComponent;
