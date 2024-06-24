import React, { useState } from "react";
import Header from "../Common/Header/Header";
import Sidebar from "../Common/Sidebar/Sidebar";
import MeetingHeader from "../Common/Header/MeetingHeader";
import { Modal } from "bootstrap";

const CreateMinutes = () => {
  const [isMinuteShow, setIsMinuteShow] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState([false, false]);
  const toggleDropdown = (index) => {
    setDropdownOpen((prevState) =>
      prevState.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  return (
   <>
      {/* <Header />
      <MeetingHeader />
      <Sidebar /> */}
     <div className="meeting-header-text">
              <h4>Write Minutes</h4>
            </div>
              <div className="mt-2 details-form details-form-right">
                <div className="form-group">
                  <div className="agendas-header d-flex align-items-center justify-content-between">
                    <div>
                      <label className="mt-3 mb-3">
                        <h4>Agenda(s)</h4>
                      </label>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="#0564f3"
                        className="bi bi-plus-circle pointer"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-3 agenda-box-border">
                    <div className="form-group m-0">
                      <div className="topic-head p-2 d-flex align-items-center justify-content-between">
                        <div>
                          <label> Agenda 1</label>
                        </div>
                        <div>
                          <button
                            className="add-minutes Mom-btn"
                            onClick={() => setIsMinuteShow(!isMinuteShow)}
                          >
                            <p>Add Minutes</p>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className=" form-group">
                        <div className="row">
                          <div className="col-md-4">
                            <label className="mt-1 mb-1">Agenda Title</label>
                          </div>
                          <div className="col-md-8">
                            <p> Agenda Item 1</p>
                          </div>
                        </div>
                      </div>
                      <div className="  form-group">
                        <div className="row">
                          <div className="col-md-4">
                            <label className="mt-2 topic">
                              Topic to Discuss
                            </label>
                          </div>
                          <div className="col-md-8">
                            <p>
                              Lorem, ipsum dolor sit amet consectetur
                              adipisicing elit. Modi molestiae architecto
                              tempora quibusdam magni illum numquam quae, quidem
                              omnis consectetur.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className=" form-group m-0">
                        <div className="row">
                          <div className="col-md-4">
                            <label className="mt-1 mb-1">Timeline</label>
                          </div>
                          <div className="col-md-8">
                            <p> 30 Min</p>
                          </div>
                        </div>
                      </div>

                      <form className="addminutesboxfrom">
                        <div
                          className={
                            isMinuteShow
                              ? "mt-4 minutes-box show"
                              : "mt-4 minutes-box"
                          }
                        >
                          <div className="form-group">
                            <div className=" mt-1 mb-1 d-flex justify-content-between align-items-center">
                              <label>Minutes</label>

                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="flexCheckDefault"
                                />
                                <label className="form-check-label">
                                  Add Action
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12">
                                <div>
                                  <input type="text" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="add-action">
                            <div className="form-group">
                              <div className="position-relative">
                                <label className="pb-2 input-date">
                                  {" "}
                                  Due Date
                                </label>
                                <input type="date" />
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="#fff"
                                  className="bi bi-calendar3 calender"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                                  <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                </svg>
                              </div>
                            </div>

                            <div className="form-group">
                              <div className="position-relative">
                                <label className="pb-2 input-date">
                                  Priority
                                </label>
                                <div>
                                  <select name="" id="priority">
                                    <option value="">Select Priority</option>
                                    <option value="">High</option>
                                    <option value="">Normal</option>
                                    <option value="">Low</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="form-group pb-3 border-bottom">
                              <label className="pb-2">
                                Select Responsible Person
                              </label>

                              <div className="pb-2 d-flex w-100">
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    value="manually"
                                    type="radio"
                                    name="locationtype"
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    Select From Attendees
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      value="meetingroom"
                                      type="radio"
                                      name="locationtype"
                                      id="flexRadioDefault1"
                                    />
                                    <label className="form-check-label">
                                      Select From Employees
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <select className="mb-2">
                                <option value="" disabled selected>
                                  {" "}
                                  Name / Email Address
                                </option>
                                <option value="prabhas@example.com">
                                  Prabhas Khamari
                                </option>
                                <option value="debasis@example.com">
                                  Debasis Behera
                                </option>
                                <option value="rakesh@example.com">
                                  Rakesh Baral
                                </option>
                              </select>

                              <select className="mb-2">
                                <option value="" disabled selected>
                                  {" "}
                                  Name / Employee ID
                                </option>
                                <option value="prabhas@example.com">
                                  Prabhas Khamari
                                </option>
                                <option value="debasis@example.com">
                                  Debasis Behera
                                </option>
                                <option value="rakesh@example.com">
                                  Rakesh Baral
                                </option>
                              </select>
                            </div>

                            <div className="form-group">
                              <label className="pb-2">Add New People</label>
                              <div className="row">
                                <div className="col-xl-6">
                                  <input type="text" placeholder="Email" />
                                </div>
                                <div className="col-xl-6">
                                  <input type="text" placeholder="Name" />
                                </div>
                              </div>
                            </div>

                            <div className="form-group m-0 d-flex ">
                              <button
                                type="button"
                                className="btn rounded-pill add-btn Mom-btn d-flex align-items-center justify-content-center"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="#fff"
                                  className="bi bi-plus-circle pointer me-2"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                </svg>
                                <p> Add </p>
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 minutes-box">
                          <div className="form-group">
                            <div className=" mt-1 mb-1 d-flex justify-content-between align-items-center">
                              <label>Minutes</label>

                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="flexCheckDefault"
                                />
                                <label className="form-check-label">
                                  Add Action
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12">
                                <div>
                                  <input type="text" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="position-relative">
                              <label className="pb-2 input-date">
                                Due Date
                              </label>
                              <input type="date" />
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="#fff"
                                className="bi bi-calendar3 calender"
                                viewBox="0 0 16 16"
                              >
                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                              </svg>
                            </div>
                          </div>

                          <div className="form-group pb-3 border-bottom">
                            <label className="pb-2">
                              Select Responsible Person
                            </label>

                            <div className="pb-2 d-flex w-100">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault1"
                                  value="prevMeetingRadio"
                                />
                                <label className="mb-2 form-check-label">
                                  Select From Attendees
                                </label>
                              </div>

                              <div className="form-check-inline">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                    value="fromEmployeegRadio"
                                  />
                                  <label className=" mb-2 form-check-label">
                                    Select From Employees
                                  </label>
                                </div>
                              </div>
                            </div>

                            <select className="mb-2">
                              <option value="" disabled selected>
                                {" "}
                                Name / Email Address
                              </option>
                              <option value="prabhas@example.com">
                                Prabhas Khamari
                              </option>
                              <option value="debasis@example.com">
                                Debasis Behera
                              </option>
                              <option value="rakesh@example.com">
                                Rakesh Baral
                              </option>
                            </select>

                            <select className="mb-2">
                              <option value="" disabled selected>
                                {" "}
                                Name / Employee ID
                              </option>
                              <option value="prabhas@example.com">
                                Prabhas Khamari
                              </option>
                              <option value="debasis@example.com">
                                Debasis Behera
                              </option>
                              <option value="rakesh@example.com">
                                Rakesh Baral
                              </option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label className="pb-2">Add New People</label>
                            <div className="row">
                              <div className="col-xl-6">
                                <input
                                  type="text"
                                  placeholder="Email"
                                  className="pb-2"
                                />
                              </div>
                              <div className="col-xl-6">
                                <input type="text" placeholder="Name" />
                              </div>
                            </div>
                          </div>

                          <div className="form-group m-0 d-flex ">
                            <button
                              type="button"
                              className="btn rounded-pill add-btn Mom-btn d-flex align-items-center justify-content-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="#fff"
                                className="bi bi-plus-circle pointer me-2"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                              </svg>
                              <p> Add </p>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
</div>
</>
         
  );
};

export default CreateMinutes;
