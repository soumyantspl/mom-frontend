import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate, Link } from "react-router-dom";
import {
  getSingleMeetingDetails,
  unSetSingleMeetingDetails,
} from "../../redux/actions/meetingActions/MeetingAction";
import Header from "../Common/Header/Header";
import MeetingHeader from "../Common/Header/MeetingHeader";
import Sidebar from "../Common/Sidebar/Sidebar";
import {
  customName,
  formatDateTimeFormat,
  getTimeSession,
} from "../../helpers/commonHelpers";
import NoDataFound from "../Common/NoDataFound";
import Loader from "../Common/Loader";
import Alert from "../Common/Alert";

const ViewMinutes = () => {
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
  console.log("use effect------------------------------------");
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
  console.log(meetingData.singleMeetingWithAgendaDetails);
 // const {}
  return (
    <>
      <div className="save-meet-head">
        <div className="meeting-header-text">
          <h4>Meeting Preview</h4>
        </div>

        <div className="save-meet-btn">
          <div className="row">
            <div className="col">
              <div className="d-inline-block">
                <button
                  type="button"
                  className="btn Mom-btn"
                  id="dropdownBasic1"
                >
                  <p>Save Meeting</p>
                </button>
                {/* <div aria-labelledby="dropdownBasic1">
                  <button>Save Meeting</button>
                  <button>Save Meeting and Notification</button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {meetingData.singleMeetingDetails ? (
        <form className="mt-2 details-form details-form-right">
          <div className="form-group mb-2">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <label className="mb-1">Title</label>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <p>{meetingData.singleMeetingDetails?.title}</p>
              </div>
            </div>
          </div>

          <div className="form-group mb-2">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <label className="mb-1">Meeting Mode</label>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <p>{meetingData.singleMeetingDetails?.mode}</p>
              </div>
            </div>
          </div>

          <div className="form-group mb-2">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <label className="mb-1">Location</label>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <p>
                  {meetingData.singleMeetingDetails?.locationDetails
                    .isMeetingRoom === true
                    ? meetingData.singleMeetingDetails?.roomDetail[0].location
                    : meetingData.singleMeetingDetails?.locationDetails
                        .location}
                </p>
              </div>
            </div>
          </div>

          <div className="form-group mb-2">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <label className="mb-1">Meeting Link</label>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <p>
                  {meetingData.singleMeetingDetails?.link
                    ? meetingData.singleMeetingDetails?.link
                    : "NA"}
                </p>
              </div>
            </div>
          </div>

          <div className="form-group mb-2">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <label className="mb-1">Date & Time</label>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <p>
                  {
                    formatDateTimeFormat(meetingData.singleMeetingDetails?.date)
                      .formattedDate
                  }{" "}
                  ,{meetingData.singleMeetingDetails?.fromTime}{" "}
                  {getTimeSession(meetingData.singleMeetingDetails?.fromTime)}{" "}
                  to {meetingData.singleMeetingDetails?.toTime}{" "}
                  {getTimeSession(meetingData.singleMeetingDetails.toTime)}
                </p>
              </div>
            </div>
          </div>

          {meetingData.singleMeetingDetails.attendees.length !== 0 ? (
            <div className="row align-items-center">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <label className="pb-1"> Attendee(s) </label>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <div className="attendees">
                  {meetingData.singleMeetingDetails?.attendees.map(
                    (attendee) => {
                      return (
                        // <div > {customName(attendee.name)}</div>
                        <>
                          {/* <div>{customName(attendee)}</div> */}
                          <div className="attendee-list">
                            {customName(attendee.name)}
                          </div>
                        </>
                      );
                    }
                  )}
                  {/* <p className="m-0">+5 More</p> */}
                  <p className="m-0">
                    {meetingData.singleMeetingDetails?.attendees.length > 5
                      ? `+${
                          meetingData.singleMeetingDetails?.attendees.length - 5
                        } More`
                      : null}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
          <div className="minutes-border"></div>
          {meetingData.singleMeetingDetails.agendasDetail.length !== 0 ? (
            <div className="form-group agenda">
              <label className="mt-3 mb-3 add-agenda">
                <h4>Agenda(s)</h4>
                <div>
                  <button className="add-minutes Mom-btn">
                    <p>Add Agenda</p>
                  </button>
                </div>
              </label>
              {meetingData.singleMeetingDetails.agendasDetail.length !== 0 &&
                meetingData.singleMeetingDetails.agendasDetail.map(
                  (agenda, index) => {
                    return (
                      <div className="mt-3 agenda-box-border">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-12">
                              <label className="mt-1 p-3 topic-head">
                                {" "}
                                Agenda {index + 1}
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="p-3">
                          <div className="pb-3 form-group">
                            <div className="row">
                              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                <label className="mt-1 mb-1">
                                  Agenda Title
                                </label>
                              </div>
                              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                                <p> {agenda.title}</p>
                              </div>
                            </div>
                          </div>

                          <div className=" pb-3 form-group">
                            <div className="row">
                              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                <label className="mt-2 topic">
                                  Topic to Discuss
                                </label>
                              </div>
                              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                                <p className="mb-2">{agenda.topic} </p>
                              </div>
                            </div>
                          </div>

                          <div className=" form-group">
                            <div className="row">
                              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                <label className="mt-1 mb-1">Timeline</label>
                              </div>
                              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                                <p> {agenda.timeLine} Min</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          ) : null}
        </form>
      ) : null}
    </>
  );
};

export default ViewMinutes;
