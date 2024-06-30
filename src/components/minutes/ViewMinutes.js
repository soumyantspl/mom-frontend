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
import { createMinutes } from "../../redux/actions/minuteActions/MinuteAction";

const ViewMinutes = (props) => {
  const location = useLocation();
  const stateData = location.state;
  console.log(stateData);
  const accessToken = localStorage.getItem("accessToken");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const dispatch = useDispatch();
  const meetingRoomData = useSelector((state) => state.meetingRoom);
  const minuteData = useSelector((state) => state.minute);
  const meetingData = useSelector((state) => state.meeting);
  const [isViewMeetingPage, setIsViewMeetingPage] = useState(false);
  console.log(minuteData.finalMinutesData);
  console.log("use effect------------------------------------");
  useEffect(() => {
    console.log("use effect------------------------------------");
    console.log(stateData);
   // dispatch(getSingleMeetingDetails(stateData.meetingId, accessToken));
    // dispatch()

    return () => {
      console.log("return useeffect--------------->>>>>>>>>>>>>>");

      dispatch(unSetSingleMeetingDetails);
    };
  }, []);
  console.log(meetingData);
  const submitAgendaDetails = () => {
    console.log(meetingData);
    dispatch(
      createMinutes(
        {
          minutes: minuteData.finalMinutesData.map(
            ({ uid, attendyType, ...keepAttrs }) => keepAttrs
          ),
        },
        meetingData.meetingDetails._id,
        accessToken
      )
    );
  };
  console.log(minuteData);
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
                <button className="Mom-btn" onClick={submitAgendaDetails}>
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
      {meetingData.meetingDetails ? (
        <form className="mt-2 details-form details-form-right">
          <div className="form-group mb-2">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <label className="mb-1">Title</label>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <p>{meetingData.meetingDetails?.title}</p>
              </div>
            </div>
          </div>

          <div className="form-group mb-2">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <label className="mb-1">Meeting Mode</label>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <p>{meetingData.meetingDetails?.mode}</p>
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
                  {meetingData.meetingDetails?.locationDetails
                    .isMeetingRoom === true
                    ? meetingData.meetingDetails?.roomDetail[0].location
                    : meetingData.meetingDetails?.locationDetails
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
                  {meetingData.meetingDetails?.link
                    ? meetingData.meetingDetails?.link
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
                    formatDateTimeFormat(meetingData.meetingDetails?.date)
                      .formattedDate
                  }{" "}
                  ,{meetingData.meetingDetails?.fromTime}{" "}
                  {getTimeSession(meetingData.meetingDetails?.fromTime)}{" "}
                  to {meetingData.meetingDetails?.toTime}{" "}
                  {getTimeSession(meetingData.meetingDetails.toTime)}
                </p>
              </div>
            </div>
          </div>

          {meetingData.meetingDetails.attendees.length !== 0 ? (
            <div className="row align-items-center">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <label className="pb-1"> Attendee(s) </label>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <div className="attendees">
                  {meetingData.meetingDetails?.attendees.map(
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
                    {meetingData.meetingDetails?.attendees.length > 5
                      ? `+${
                          meetingData.meetingDetails?.attendees.length - 5
                        } More`
                      : null}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
          <div className="minutes-border"></div>
          {meetingData?.agendasDetail?.length !== 0 ? (
            <div className="form-group agenda">
              <label className="mt-3 mb-3 add-agenda">
                <h4>Agenda(s)</h4>
                <div>
                  <button className="add-minutes Mom-btn">
                    <p>Add Agenda</p>
                  </button>
                </div>
              </label>
              {meetingData?.agendaDetails?.length !== 0 &&
                meetingData?.agendaDetails?.map((agenda, index) => {
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
                              <label className="mt-1 mb-1">Agenda Title</label>
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

                        {agenda?.minutesDetail?.length !== 0 ? (
                          <>
                            <div className=" minutes-border"></div>

                            {agenda?.minutesDetail?.map((minute, index) => {
                              return (
                                <>
                                  <div className=" form-group ">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <label className="mt-1 mb-1">
                                          Minutes {index + 1}
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <p> {minute.description}</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className=" form-group">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <label className="mt-1 mb-1">
                                          Due Date
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <p>
                                          {" "}
                                          {
                                            formatDateTimeFormat(
                                              minute?.dueDate
                                            ).formattedDate
                                          }
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className=" form-group">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <label className="mt-1 mb-1">
                                          Responsible Person
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <p>Prabhas Khamari</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className=" form-group">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <label className="mt-1 mb-1">
                                          Reassigned To
                                        </label>
                                      </div>
                                      <div className="col-md-8 detail ">
                                        {/* <p routerLink="/action-detail">Rakesh Baral</p> */}
                                        <p>Rakesh Baral</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-group mt-4">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <label className="mt-2 topic">
                                          Accepted By
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <div className="attendees mb-2">
                                          <div className="attendee-list">
                                            SL
                                          </div>
                                          <div className="attendee-list">
                                            PK
                                          </div>
                                          <div className="attendee-list">
                                            RB
                                          </div>
                                          <div className="attendee-list">
                                            YH
                                          </div>
                                          <div className="attendee-list">
                                            DB
                                          </div>
                                          <p className="plus-more-text m-0">
                                            +1 More
                                          </p>
                                        </div>
                                        <p>Accepted by 6/10 attendants</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-group mt-4">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <label className="mt-2 topic">
                                          Rejected By
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <div className="attendees mb-2">
                                          <div className="attendee-list">
                                            SL
                                          </div>
                                          <div className="attendee-list">
                                            PK
                                          </div>
                                        </div>
                                        <p>Rejected by 2/10 attendants</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="add-buttons">
                                    <div>
                                      <button className="add-minutes Mom-btn me-3">
                                        <p>Accept</p>
                                      </button>
                                    </div>

                                    <div>
                                      <button className="add-minutes Mom-btn me-3">
                                        <p>Request for Amendment</p>
                                      </button>
                                    </div>
                                    <div>
                                      <button className="reset">
                                        <p>Reject</p>
                                      </button>
                                    </div>

                                    <div className=" minutes-border"></div>
                                  </div>
                                  <div className="added-by">
                                    <div className="add-agenda">
                                      <p className="add-text">
                                        Amendment Requested By
                                      </p>
                                      <div className="attendee1 attendee-list">
                                        PK
                                      </div>
                                    </div>
                                    <div className="view">
                                      <p>View Details</p>
                                    </div>

                                    <div className="add-agenda">
                                      <div className="pe-2">
                                        <button className="add-minutes Mom-btn">
                                          <p>Accept</p>
                                        </button>
                                      </div>

                                      <div>
                                        <button className=" reset">
                                          <p>Reject</p>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : null}
        </form>
      ) : null}
    </>
  );
};

export default ViewMinutes;
