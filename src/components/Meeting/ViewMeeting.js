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
const ViewMeeting = (props) => {
  const accessToken = localStorage.getItem("accessToken");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const dispatch = useDispatch();
  const meetingRoomData = useSelector((state) => state.meetingRoom);
  const meetingData = useSelector((state) => state.meeting);
  return (
    <>
      {/* <Header />
        <MeetingHeader />
        <Sidebar /> */}
      {/* {meetingData.singleMeetingDetails?(  < NoDataFound />):(  < NoDataFound />)}
       */}

      {!meetingData.isLoading && !meetingData.singleMeetingDetails  ? (
        <form className="mt-2 details-form details-form-right  col-padding-none">
          <div className="form-group mb-2">
            <div className="row">
              <NoDataFound />
            </div>
          </div>
        </form>
      ) : !meetingData.isLoading && meetingData.singleMeetingDetails  ? (
        <form className="mt-2 details-form details-form-right  col-padding-none">
          <div className="form-group mb-2">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <label className="mb-1">Title</label>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <p>Tuesday Morning Meeting</p>
              </div>
            </div>
          </div>

          <div className="form-group mb-2">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <label className="mb-1">Meeting Mode</label>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <p>Physical Meeting</p>
              </div>
            </div>
          </div>

          <div className="form-group mb-2">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <label className="mb-1">Location</label>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <p>NTSPL, 5th Floor, Conference room</p>
              </div>
            </div>
          </div>

          <div className="form-group mb-2">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <label className="mb-1">Meeting Link</label>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <p>https://meet.google.com/hkv-hxsf-whf</p>
              </div>
            </div>
          </div>

          <div className="form-group mb-2">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <label className="mb-1">Date & Time</label>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <p>03 Jan 2024 , 5:40 PM to 7:00 PM</p>
              </div>
            </div>
          </div>

          <div className="form-group mb-2">
            <div className="row align-items-center">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <label className="pb-1"> Attendee(s) </label>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <div className="attendees">
                  <div className="attendee-list">PK</div>
                  <div className="attendee-list">SL</div>
                  <div className="attendee-list">RB</div>
                  <div className="attendee-list">YH</div>
                  <div className="attendee-list">DB </div>
                  <p className="m-0">+5 More</p>
                </div>
              </div>
            </div>
          </div>

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
  );
};

export default ViewMeeting;
