import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleMeetingDetails, unSetSingleMeetingDetails } from "../../redux/actions/meetingActions/MeetingAction";

const ViewEditMeeting = () => {

    const location = useLocation();
    const stateData = location.state;
    console.log(stateData);
    const accessToken = localStorage.getItem("accessToken");
    const userData = JSON.parse(localStorage.getItem("userData"));
    const dispatch = useDispatch();
    const meetingRoomData = useSelector((state) => state.meetingRoom);
    const meetingData = useSelector((state) => state.meeting);
    const [isViewMeetingPage, setIsViewMeetingPage] = useState(false);
    console.log(meetingData);
    useEffect(() => {
        console.log("use effect------------------------------------");
        console.log(stateData);
        dispatch(getSingleMeetingDetails(stateData.meetingId, accessToken));
        // dispatch()
    
        return () => {
          console.log("return useeffect--------------->>>>>>>>>>>>>>");
    
          dispatch(unSetSingleMeetingDetails);
        };
      }, []);

  return (
    <div>ViewEditMeeting</div>
  )
}

export default ViewEditMeeting