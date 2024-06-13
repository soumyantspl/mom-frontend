import React from "react";
// @ts-ignore
import Header from "../Common/Header/Header";
// @ts-ignore
import MeetingHeader from "../Common/Header/MeetingHeader";
// @ts-ignore
import Sidebar from "../Common/Sidebar/Sidebar";
import "./style/meetings-css.css";
const ViewMeeting = () => {
  return (
    <>
      {/* <Header />
        <MeetingHeader />
        <Sidebar /> */}
       
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
            <div className="col-md-4">
              <label className="mb-1">Meeting Mode</label>
            </div>
            <div className="col-md-4">
              <p>Physical Meeting</p>
            </div>
          </div>
        </div>

        <div className="form-group mb-2">
          <div className="row">
            <div className="col-md-4">
              <label className="mb-1">Location</label>
            </div>
            <div className="col-md-8">
              <p>NTSPL, 5th Floor, Conference room</p>
            </div>
          </div>
        </div>

        <div className="form-group mb-2">
          <div className="row">
            <div className="col-md-4">
              <label className="mb-1">Meeting Link</label>
            </div>
            <div className="col-md-8">
              <p>https://meet.google.com/hkv-hxsf-whf</p>
            </div>
          </div>
        </div>

        <div className="form-group mb-2">
          <div className="row">
            <div className="col-md-4">
              <label className="mb-1">Date & Time</label>
            </div>
            <div className="col-md-8">
              <p>03 Jan 2024 , 5:40 PM to 7:00 PM</p>
            </div>
          </div>
        </div>

        <div className="form-group mb-2">
          <div className="row align-items-center">
            <div className="col-md-4">
              <label className="pb-1"> Attendee(s) </label>
            </div>
            <div className="col-md-8">
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
                  <div className="col-md-4">
                    <label className="mt-1 mb-1">Agenda Title</label>
                  </div>
                  <div className="col-md-8">
                    <p> Agenda Item 1</p>
                  </div>
                </div>
              </div>

              <div className=" pb-3 form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label className="mt-2 topic">Topic to Discuss</label>
                  </div>
                  <div className="col-md-8">
                    <p className="mb-2">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Modi molestiae architecto tempora quibusdam magni illum
                      numquam quae, quidem omnis consectetur.{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div className=" form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label className="mt-1 mb-1">Timeline</label>
                  </div>
                  <div className="col-md-8">
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
                  <div className="col-md-4">
                    <label className="mt-1 mb-1">Agenda Title</label>
                  </div>
                  <div className="col-md-8">
                    <p> Agenda Item 2</p>
                  </div>
                </div>
              </div>

              <div className=" pb-3 form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label className="mt-2 topic">Topic to Discuss</label>
                  </div>
                  <div className="col-md-8">
                    <p className="mb-2">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Modi molestiae architecto tempora quibusdam magni illum
                      numquam quae, quidem omnis consectetur.{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div className=" form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label className="mt-1 mb-1">Timeline</label>
                  </div>
                  <div className="col-md-8">
                    <p> 30 Min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    
 </>
  );
};

export default ViewMeeting;
