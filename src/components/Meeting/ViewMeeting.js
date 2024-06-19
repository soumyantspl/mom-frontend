import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { Margin } from "../../../node_modules/@mui/icons-material/index";
import { getMeetingRoomList } from "../../redux/actions/meetingRoomAction.js/meetingRoomAction";
import { useSelector, useDispatch } from "react-redux";
import CommonStepper from "../Common/CommonStepper";
import CreateMeeting from "./CreateMeeting";
import {
  createMeetingDetails,
  getCreateMeetingStep,
  getSingleMeetingDetails,
  setMeetingViewPage,
  updateIsCreateMeetingProcessed,
} from "../../redux/actions/meetingActions/MeetingAction";
import Loader from "../Common/Loader";
import * as constantMessages from "../../constants/constatntMessages";
import "../Login/style/Login.css";
import LoaderButton from "../Common/LoaderButton";
import AddAttendees from "./AddAttendees";
import Alert from "../Common/Alert";
import AddAgendas from "./AddAgendas";
import NoDataFound from "../Common/NoDataFound";
import {
  customName,
  formatDateTimeFormat,
  getTimeSession,
} from "../../helpers/commonHelpers";
import Header from "../Common/Header/Header";
import MeetingHeader from "../Common/Header/MeetingHeader";
import Sidebar from "../Common/Sidebar/Sidebar";
import {
  Navigate,
  Link,
  useLocation,
  UNSAFE_NavigationContext,
} from "react-router-dom";

const ViewMeeting = (props) => {
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
    console.log(stateData);
    if (stateData?.isViewMeetingPage) {
      setIsViewMeetingPage(stateData.isViewMeetingPage);
      // setFormData({
      //   ...formData,
      //   isViewMeetingPage: isViewMeetingPage,
      // });
      console.log("is dispatched->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      dispatch(getSingleMeetingDetails(stateData.meetingId, accessToken));
    }
   

  //  dispatch(setMeetingViewPage(true, meetingData.meetingId));
    // document.title = "View Meeting: Meeting Plus";
    console.log("is dispatched->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    // if (meetingData.meetingId) {
    //   console.log(
    //     "is dispatched->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>in>"
    //   );
    //   dispatch(getSingleMeetingDetails(meetingData.meetingId, accessToken));
    // }
     return () => {
      // Anything in here is fired on component unmount.
      console.log("component un mount");
     // dispatch(updateIsSuccess(false));
    };
  }, [meetingData.meetingId, meetingData.step]);
  console.log(meetingData);
  return (
    <>
      {isViewMeetingPage ? (
        <>
          <Header />
          <MeetingHeader />
          <Sidebar />
          <div className="main-content">
          <div className="meeting-page ">
          {!meetingData.isLoading && !meetingData.singleMeetingDetails ? (
        <form className="mt-2 details-form details-form-right">
          <div className="form-group mb-2">
            <div className="row">
              <NoDataFound />
            </div>
          </div>
        </form>
      ) : !meetingData.isLoading && meetingData.singleMeetingDetails ? (
        <form className="mt-2 details-form details-form-right">
          <div className="form-group mb-2">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <label className="mb-1">Title</label>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <p>{meetingData.singleMeetingDetails.title}</p>
              </div>
            </div>
          </div>

          <div className="form-group mb-2">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <label className="mb-1">Meeting Mode</label>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <p>{meetingData.singleMeetingDetails.mode}</p>
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
                  {meetingData.singleMeetingDetails.locationDetails
                    .isMeetingRoom
                    ? meetingData.singleMeetingDetails.locationDetails
                        .roomDetail.location
                    : meetingData.singleMeetingDetails.locationDetails.location}
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
                  {meetingData.singleMeetingDetails.link
                    ? meetingData.singleMeetingDetails.link
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
                    formatDateTimeFormat(meetingData.singleMeetingDetails.date)
                      .formattedDate
                  }{" "}
                  ,{meetingData.singleMeetingDetails.fromTime}{" "}
                  {getTimeSession(meetingData.singleMeetingDetails.fromTime)} to{" "}
                  {meetingData.singleMeetingDetails.toTime}{" "}
                  {getTimeSession(meetingData.singleMeetingDetails.toTime)}
                </p>
              </div>
            </div>
          </div>
          {meetingData.singleMeetingDetails.attendees.length > 0 ? (
            <div className="form-group mb-2">
              <div className="row align-items-center">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                  <label className="pb-1"> Attendee(s) </label>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                  <div className="attendees">
                    {meetingData.singleMeetingDetails.attendees.map(
                      (attendee) => {
                        return (
                          // <div > {customName(attendee.name)}</div>
                          <>
                            {/* <div>{customName(attendee)}</div>  */}
                            <div className="attendee-list">{attendee.name}</div>
                          </>
                        );
                      }
                    )}
                    {/* <p className="m-0">+5 More</p> */}
                    <p className="m-0">
                      {meetingData.singleMeetingDetails.attendees.length > 5
                        ? `+${
                            meetingData.singleMeetingDetails.attendees.length -
                            5
                          } More`
                        : null}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {/* {meetingData.singleMeetingDetails.agendasDetail.length > 0 ? ( */}
          <div className="form-group agenda">
            <label className="mt-3 mb-3">
              <h4>Agenda(s)</h4>
            </label>

            <div className="mt-3 agenda-box-border">
              <div className="form-group">
                <div className="row">
                  <div className="col-12">
                    <label className="mt-1 p-3 topic-head"> Agenda 1</label>
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
                      <p> Agenda Item 1</p>
                    </div>
                  </div>
                </div>

                <div className=" pb-3 form-group">
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <label className="mt-2 topic">Topic to Discuss</label>
                    </div>
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                      <p className="mb-2">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Modi molestiae architecto tempora quibusdam magni
                        illum numquam quae, quidem omnis consectetur.{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div className=" form-group">
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <label className="mt-1 mb-1">Timeline</label>
                    </div>
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                      <p> 30 Min</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 agenda-box-border">
              <div className="form-group">
                <div className="row">
                  <div className="col-12">
                    <label className="mt-1 p-3 topic-head"> Agenda 2</label>
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
                      <p> Agenda Item 2</p>
                    </div>
                  </div>
                </div>

                <div className=" pb-3 form-group">
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <label className="mt-2 topic">Topic to Discuss</label>
                    </div>
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                      <p className="mb-2">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Modi molestiae architecto tempora quibusdam magni
                        illum numquam quae, quidem omnis consectetur.{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div className=" form-group">
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <label className="mt-1 mb-1">Timeline</label>
                    </div>
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                      <p> 30 Min</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ) : null} */}
        </form>
      ) : (
        <form className="mt-2 details-form details-form-right">
          <div className="form-group mb-2 loader-icon">
            <div className="row">
              <Loader />
            </div>
          </div>
        </form>
      )}

            </div>
            </div>
        </>
      ) : (

    <>

      {!meetingData.isLoading && !meetingData.singleMeetingDetails ? (
        <form className="mt-2 details-form details-form-right">
          <div className="form-group mb-2">
            <div className="row">
              <NoDataFound />
            </div>
          </div>
        </form>
      ) : !meetingData.isLoading && meetingData.singleMeetingDetails ? (
        <form className="mt-2 details-form details-form-right">
          <div className="form-group mb-2">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <label className="mb-1">Title</label>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <p>{meetingData.singleMeetingDetails.title}</p>
              </div>
            </div>
          </div>

          <div className="form-group mb-2">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <label className="mb-1">Meeting Mode</label>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <p>{meetingData.singleMeetingDetails.mode}</p>
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
                  {meetingData.singleMeetingDetails.locationDetails
                    .isMeetingRoom===true
                    ? meetingData.singleMeetingDetails
                        .roomDetail[0].location
                    : meetingData.singleMeetingDetails.locationDetails.location}
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
                  {meetingData.singleMeetingDetails.link
                    ? meetingData.singleMeetingDetails.link
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
                    formatDateTimeFormat(meetingData.singleMeetingDetails.date)
                      .formattedDate
                  }{" "}
                  ,{meetingData.singleMeetingDetails.fromTime}{" "}
                  {getTimeSession(meetingData.singleMeetingDetails.fromTime)} to{" "}
                  {meetingData.singleMeetingDetails.toTime}{" "}
                  {getTimeSession(meetingData.singleMeetingDetails.toTime)}
                </p>
              </div>
            </div>
          </div>
          {meetingData.singleMeetingDetails.attendees.length > 0 ? (
            <div className="form-group mb-2">
              <div className="row align-items-center">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                  <label className="pb-1"> Attendee(s) </label>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                  <div className="attendees">
                    {meetingData.singleMeetingDetails.attendees.map(
                      (attendee) => {
                        return (
                          // <div > {customName(attendee.name)}</div>
                          <>
                            {/* <div>{customName(attendee)}</div> */}
                            <div className="attendee-list">{attendee.name}</div>
                          </>
                        );
                      }
                    )}
                    {/* <p className="m-0">+5 More</p> */}
                    <p className="m-0">
                      {meetingData.singleMeetingDetails.attendees.length > 5
                        ? `+${
                            meetingData.singleMeetingDetails.attendees.length -
                            5
                          } More`
                        : null}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {/* {meetingData.singleMeetingDetails.agendasDetail.length > 0 ? ( */}
          <div className="form-group agenda">
            <label className="mt-3 mb-3">
              <h4>Agenda(s)</h4>
            </label>

            <div className="mt-3 agenda-box-border">
              <div className="form-group">
                <div className="row">
                  <div className="col-12">
                    <label className="mt-1 p-3 topic-head"> Agenda 1</label>
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
                      <p> Agenda Item 1</p>
                    </div>
                  </div>
                </div>

                <div className=" pb-3 form-group">
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <label className="mt-2 topic">Topic to Discuss</label>
                    </div>
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                      <p className="mb-2">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Modi molestiae architecto tempora quibusdam magni
                        illum numquam quae, quidem omnis consectetur.{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div className=" form-group">
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <label className="mt-1 mb-1">Timeline</label>
                    </div>
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                      <p> 30 Min</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 agenda-box-border">
              <div className="form-group">
                <div className="row">
                  <div className="col-12">
                    <label className="mt-1 p-3 topic-head"> Agenda 2</label>
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
                      <p> Agenda Item 2</p>
                    </div>
                  </div>
                </div>

                <div className=" pb-3 form-group">
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <label className="mt-2 topic">Topic to Discuss</label>
                    </div>
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                      <p className="mb-2">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Modi molestiae architecto tempora quibusdam magni
                        illum numquam quae, quidem omnis consectetur.{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div className=" form-group">
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <label className="mt-1 mb-1">Timeline</label>
                    </div>
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                      <p> 30 Min</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ) : null} */}
        </form>
      ) : (
        <form className="mt-2 details-form details-form-right">
          <div className="form-group mb-2 loader-icon">
            <div className="row">
              <Loader />
            </div>
          </div>
        </form>
      )}
      </>
    )
  }
   
    </>
    
  );
};

export default ViewMeeting;
