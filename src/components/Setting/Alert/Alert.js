import React from "react";
import Header from "../../Common/Header/Header";
import Sidebar from "../../Common/Sidebar/Sidebar";
import MeetingHeader from "../../Common/Header/MeetingHeader";
import "./alert.css";

const Alert = () => {
  return (
    <div>
      <Header />
      <MeetingHeader />
      <Sidebar />
      <div className="main-content">
        <section className="meeting">
          <div className="meeting-page">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pe-0 ps-0">
                <div className="meeting-header-text">
                  <h4 className="mb-2">Alerts</h4>
                </div>
                <form className="details-form">
                  <div className=" pb-3 alert-box alert-box-border">
                    <label className="checkbox-container pb-3 d-flex">
                      Send Meeting Reminders
                    </label>

                    <div className="d-flex">
                      <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12 pe-0 ps-0">
                        <div className="me-3 alert-send-time">
                          <input
                            type="number"
                            max="360"
                            min="0"
                            value="12"
                            id="quantity"
                            name=""
                            className="custom-width-input"
                          />
                          hour
                        </div>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 pe-0 ps-0">
                        <div className="alert-send-time pe-2">
                          <input
                            type="number"
                            max="360"
                            min="0"
                            value="15"
                            id="quantity"
                            name=""
                            className="custom-width-input"
                          />
                          min
                        </div>
                        <div>
                          <p>before meeting</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <button className="send-email Mom-btn">
                        <p>Send Email Now</p>
                      </button>
                    </div>
                  </div>

                  <div className=" mt-3 alert-box">
                    <label className="checkbox-container pb-3 d-flex">
                      Chase Up Actions Every
                    </label>

                    <div>
                      <div className="alert-send-time">
                        <input
                          type="number"
                          max="360"
                          min="0"
                          value="10"
                          id="quantity"
                          name=""
                          className="custom-width-input"
                        />
                      </div>
                      <div>
                        <p>days</p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <button className="send-email Mom-btn">
                        <p>Send Email Now</p>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Alert;
