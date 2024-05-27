import React, { useState } from "react";
import Header from "../Common/Header/Header";
import Sidebar from "../Common/Sidebar/Sidebar";
import MeetingHeader from "../Common/Header/MeetingHeader";
import ActionDetails from "./ActionDetails";
import "./ActionList.css";

// const ActionList = () => {
//   const [filter, setfilter] = useState(false);
//   const showFilter = () => {
//     setfilter(true);
//     console.log(filter);
//   };

//   return (
//     <div>
//       <Header />
//       <Sidebar />
//       <div className="meeting-page">
//         <div className="meeting-header-text">
//           <div>
//             <h4>Actions</h4>
//           </div>
//           <div>
//             <button
//               type="button "
//               class="btn rounded-pill add-btn Mom-btn d-flex align-items-center justify-content-center"
//               id="open-form-btn"
//               onClick={(e) => showFilter()}
//             >
//               <p> Filter</p>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 fill="currentColor"
//                 className="bi bi-funnel filter-svg"
//                 viewBox="0 0 16 16"
//               >
//                 <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const ActionList = () => {
  const [filterAction, setFilterAction] = useState(false);

  const showFilterAction = () => {
    setFilterAction(true);
  };

  const hideFilterAction = () => {
    setFilterAction(false);
  };

  return (
    <div>
      <Header />
      <MeetingHeader />
      <Sidebar />
      <div className="main-content">
        <div className="Action-list-page">
          <div className="meeting-header-text">
            <div>
              <h4>Actions</h4>
            </div>
            <div>
              <button
                type="button"
                className="btn rounded-pill add-btn Mom-btn d-flex align-items-center justify-content-center"
                id="open-form-btn-meetinglist"
                onClick={showFilterAction}
              >
                <p>Filter</p>
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
          <div
            className={`filter ${filterAction ? "show" : ""}`}
            id="form-container"
          >
            <div className="filter-container">
              <h4 className="filterheader mb-0">Filter Meetings</h4>
              <button
                type="button"
                onClick={hideFilterAction}
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
                <input className="filter-date" type="date" id="to" name="" />
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
              <label>Filter By Meeting</label>
              <select className="fltr-opt" aria-placeholder="Select Attendee">
                <option></option>
                <option></option>
              </select>
              <br />
              <label>Filter By Attendee</label>
              <select className="fltr-opt" aria-placeholder="Select Attendee">
                <option></option>
                <option></option>
              </select>
              <br />
              <div
                className="container justify-content-center d-flex"
                style={{ paddingTop: "20px" }}
              >
                <button
                  type="button"
                  className="btn rounded-pill add-btn submit-btn d-flex align-items-center justify-content-center"
                >
                  <p>Submit</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ActionList;
