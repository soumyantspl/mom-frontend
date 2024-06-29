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
import AttendeesDetails from "./AttendeesDetails";
import NoDataFound from "../Common/NoDataFound";
import Loader from "../Common/Loader";
import Alert from "../Common/Alert";
import { logOut } from "../../redux/actions/authActions/authAction";

const ViewMeetingDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  const navigate = useNavigate();
  if (authData.isInValidUser) {
    console.log("innnnnnnnnnnnnnnnnnnnnnnnnnnn")
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("rememberMe");
    dispatch(logOut())
    navigate("/login");
  }
  const stateData = location.state;
  console.log(stateData);
  const accessToken = localStorage.getItem("accessToken");
  const userData = JSON.parse(localStorage.getItem("userData"));

  const meetingRoomData = useSelector((state) => state.meetingRoom);
  const meetingData = useSelector((state) => state.meeting);
  const employeeData = useSelector((state) => state.user);

  // if (employeeData?.userData === null) {
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("userData");
  //   localStorage.removeItem("rememberMe");
  //   navigate("/login");
  // }
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
  console.log(meetingData.singleMeetingDetails);
  return (
    <>
      <Header />
      <MeetingHeader />
      <Sidebar />
      {meetingData.singleMeetingDetails !== null ? (
        <div className="main-content">
          <div className="row">
            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 detail-col">
              <div className="meeting-header-text">
                <h4>Meeting Details</h4>
              </div>

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
                          ? meetingData.singleMeetingDetails?.roomDetail[0]
                              .location
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
                          formatDateTimeFormat(
                            meetingData.singleMeetingDetails?.date
                          ).formattedDate
                        }{" "}
                        ,{meetingData.singleMeetingDetails?.fromTime}{" "}
                        {getTimeSession(
                          meetingData.singleMeetingDetails?.fromTime
                        )}{" "}
                        to {meetingData.singleMeetingDetails?.toTime}{" "}
                        {getTimeSession(
                          meetingData.singleMeetingDetails.toTime
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {meetingData.singleMeetingDetails?.attendees.length > 0 ? (
                  <div className="form-group mb-2">
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
                            {meetingData.singleMeetingDetails?.attendees
                              .length > 5
                              ? `+${
                                  meetingData.singleMeetingDetails?.attendees
                                    .length - 5
                                } More`
                              : null}
                          </p>
                        </div>
                      </div>
                    </div>
                    <AttendeesDetails
                      attendeesData={meetingData.singleMeetingDetails}
                    />
                  </div>
                ) : (
                  <>
                    <Alert
                      status={"info"}
                      message={"No Attendee Added"}
                      timeoutSeconds={0}
                    />
                    <div className="mt-3 agenda-box-border no-data-img">
                    
                      <NoDataFound dataType={"attendee"}/>
                    </div>
                  </>
                )}
              </form>
            </div>
            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 detail-col">
              <div className="meeting-header-text">
                <h4>Agenda Details</h4>
                {meetingData.singleMeetingDetails?.meetingStatus?.status!=="draft"?(
                <Link
                 className="btn rounded-pill add-btn Mom-btn d-flex align-items-center justify-content-center"
                id="open-form-btn"
              to="/edit-meeting"
              state={{ meetingId: stateData.meetingId,isMeetingDataUpdate:true,step:meetingData}}
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
                {/* <button
                className="btn rounded-pill add-btn Mom-btn d-flex align-items-center justify-content-center"
                id="open-form-btn"
               // onClick={(e) => setfilter(true)}
              > */}
                <p> Edit</p>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-square me-0 filter-svg"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
              {/* </button> */}
              </Link>
                ):null}
              </div>

              <form className="mt-2 details-form details-form-right">
                {meetingData.singleMeetingDetails?.agendasDetail.length !==
                0 ? (
                  <div className="form-group agenda">
                    <label className="mt-3 mb-3">
                      <h4>Agenda(s)</h4>
                    </label>
                    {meetingData.singleMeetingDetails?.agendasDetail.length !==
                      0 &&
                      meetingData.singleMeetingDetails?.agendasDetail.map(
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
                                      <label className="mt-1 mb-1">
                                        Timeline
                                      </label>
                                    </div>
                                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                                      <p> {agenda.timeLine} Mins</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </div>
                ) : (
                  <>
                    <Alert
                      status={"info"}
                      message={"No Agenda Added"}
                      timeoutSeconds={0}
                    />
                    <div className="mt-3 agenda-box-border no-data-img">
                      <NoDataFound dataType={"agenda"}/>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewMeetingDetails;
