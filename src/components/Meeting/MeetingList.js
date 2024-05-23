import React, { useState } from "react";
import Header from "../Common/Header/Header";
import Sidebar from "../Common/Sidebar/Sidebar";

const MeetingList = () => {
  const [filter, setfilter] = useState(false);
  const showFilter = () => {
    setfilter(true);
    console.log(filter);
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="meeting-page">
        <div className="meeting-header-text">
          <div>
            <h4>Meetings</h4>
          </div>
          <div>
            <button
              type="button "
              class="btn rounded-pill add-btn Mom-btn d-flex align-items-center justify-content-center"
              id="open-form-btn"
              onClick={(e) => showFilter()}
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
      </div>
    </div>
  );
};

export default MeetingList;
