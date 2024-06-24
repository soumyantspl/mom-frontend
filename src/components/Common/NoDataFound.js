import React from "react";
import noDataFound from "../../assets/images/No-data-found.svg";
import noAgendaFound from "../../assets/images/No-agenda-found.svg";
//import noAttendeeFound from "../../assets/images/No-data-found.svg";
const NoDataFound = (props) => {
  return (
    <div className="white-box">
      {props.dataType === "agenda" ? (
        <img
          // @ts-ignore
          src={noAgendaFound}
          alt=""
        ></img>
      ) : props.dataType === "attendee" ? (
        <img
          // @ts-ignore
          src={noDataFound}
          alt=""
        ></img>
      ) : (
        <img
          // @ts-ignore
          src={noDataFound}
          alt=""
        ></img>
      )}
    </div>
  );
};

export default NoDataFound;
