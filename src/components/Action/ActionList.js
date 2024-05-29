import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  // @ts-ignore
} from "reactstrap";
// @ts-ignore
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
// @ts-ignore
import { Link } from "react-router-dom";
import Header from "../Common/Header/Header";
import Sidebar from "../Common/Sidebar/Sidebar";
import MeetingHeader from "../Common/Header/MeetingHeader";
import ActionDetails from "./ActionDetails";
import "./ActionList.css";

const ActionList = () => {
  const [filterAction, setFilterAction] = useState(false);

  const showFilterAction = () => {
    setFilterAction(true);
  };



  const [modal, setModal] = useState(false);
  const [reassignDetailModal, setReassignDetailsModal] = useState(false)
  const [remark, setRemark] = useState("");

  const setReAssignRequestModalAction = () => {
    setModal(!modal);
  }



  const hideFilterAction = () => {
    setFilterAction(false);
  };

  const [dropdownOpen, setDropdownOpen] = useState([false, false]);

  const toggleModal = () => setModal(!modal);
  const toggleDropdown = (index) => {
    setDropdownOpen((prevState) =>
      prevState.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  const toggleModalT = () => setReassignDetailsModal(!reassignDetailModal)


  return (
    <div>
      <Header />
      <MeetingHeader />
      <Sidebar />
      <div className="main-content">
        <div className="Action-list-page">
          <div className="meeting-header-text">
            <div>
              <h4>Actions</h4>
            </div>
            <div>
              <button
                type="button"
                className="btn rounded-pill add-btn Mom-btn d-flex align-items-center justify-content-center"
                id="open-form-btn-meetinglist"
                onClick={showFilterAction}
              >
                <p>Filter</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-funnel filter-svg"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
                </svg>
              </button>
            </div>
          </div>
          <div
            className={`${filterAction ? "filter show" : "filter"}`}
            id="form-container"
          >
            <div className="filter-container">
              <h4 className="filterheader mb-0">Filter Meetings</h4>
              <button
                type="button"
                onClick={hideFilterAction}
                style={{ border: "none", padding: 0, margin: 0 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="currentColor"
                  className="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </button>
            </div>
            <form id="myForm">
              <label htmlFor="from">From Date</label>
              <div className="from-to">
                <input className="filter-date" type="date" id="from" name="" />
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
              <br />
              <label htmlFor="to">To Date</label>
              <div className="from-to">
                <input className="filter-date" type="date" id="to" name="" />
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
              <br />
              <label>Filter By Meeting</label>
              <select className="fltr-opt" aria-placeholder="Select Attendee">
                <option></option>
                <option></option>
              </select>
              <br />
              <label>Filter By Attendee</label>
              <select className="fltr-opt" aria-placeholder="Select Attendee">
                <option></option>
                <option></option>
              </select>
              <br />
              <div
                className="container justify-content-center d-flex"
                style={{ paddingTop: "20px" }}
              >
                <button
                  type="button"
                  className="btn rounded-pill add-btn submit-btn d-flex align-items-center justify-content-center"
                >
                  <p>Submit</p>
                </button>
              </div>
            </form>
          </div>
          <table className="mt-4 table table-bordered">
            <thead>
              <tr>
                <th scope="col">Due Date</th>
                <th scope="col">Description</th>
                <th scope="col">Owner</th>
                <th scope="col">Is Complete?</th>
                <th scope="col">Status</th>
                <th className="action-col" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  dueDate: "03 Jan 2024",
                  description: "Subham needs to provide the content",
                  owner: "SL",
                  isComplete: false,
                  status: "Completed",
                  statusClass: "success",
                },
                {
                  dueDate: "03 Jan 2024",
                  description: "Sonali will handle designing part",
                  owner: "SL",
                  isComplete: false,
                  status: "Pending",
                  statusClass: "primary",
                },
              ].map((task, index) => (
                <tr key={index}>
                  <td data-label="Due Date">{task.dueDate}</td>
                  <td data-label="Description">{task.description}</td>
                  <td data-label="Owner">
                    <div className="attendees">
                      <div className="attendee-list">{task.owner}</div>
                    </div>
                  </td>
                  <td data-label="Is Complete?" className="check-box">
                    <input type="checkbox" checked={task.isComplete} readOnly />
                  </td>
                  <td data-label="Status">
                    <span
                      className={`badge bg-${task.statusClass} bg-opacity-10 text-${task.statusClass}`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td data-label="Action">
                    <Dropdown
                      isOpen={dropdownOpen[index]}
                      toggle={() => toggleDropdown(index)}
                      className="d-inline-block menu-dropdown custom-dropdown"
                    >
                      <DropdownToggle className="btn btn-outline-primary" caret>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#000"
                          className="bi bi-three-dots-vertical"
                          viewBox="0 0 16 16"
                        >
                          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                        </svg>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>
                          <Link to="/ActionDetails">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="17"
                              height="17"
                              fill="currentColor"
                              className="bi bi-eye me-2"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                            </svg>
                            View Action Details
                          </Link>
                        </DropdownItem>
                        <DropdownItem onClick={setReAssignRequestModalAction}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            fill="currentColor"
                            className="bi bi-arrow-repeat me-2"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                            <path
                              fillRule="evenodd"
                              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                            />
                          </svg>
                          Request for Reassign
                          <Modal isOpen={modal} toggle={toggleModal}>
                            <ModalHeader toggle={toggleModal}>
                              Reassign Request Details
                            </ModalHeader>
                            <ModalBody>
                              <div className="modal-body delete-txt">
                                <h6>Reassign Detail</h6>
                                <textarea cols="40" rows="4" id="remark" name="remark" placeholder="" required></textarea>
                              </div>
                            </ModalBody>
                            <ModalFooter>
                              <Button color="secondary" className="reset btn btn-secondary bg-white border-primary text-primary" onClick={toggleModal}>
                                Close
                              </Button>
                              <Button color="primary" className="Mom-btn btn btn-secondary bg-primary border-primary" onClick={toggleModal}>
                                Submit Request
                              </Button>
                            </ModalFooter>
                          </Modal>
                        </DropdownItem>
                        <DropdownItem onClick={() => { setReassignDetailsModal(true) }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-arrow-repeat me-2"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                            <path
                              fillRule="evenodd"
                              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                            />
                          </svg>
                          Reassign
                          <Modal isOpen={reassignDetailModal} toggle={toggleModalT}>
                            <ModalHeader toggle={toggleModalT}>
                              Reassign
                            </ModalHeader>
                            <div className="modal-body">
                              <form>

                                <div className="minutes-box">
                                  <div className="form-group">
                                    <div className="position-relative">
                                      <label className="pb-2 input-date">Reason</label>
                                      <div>
                                        <textarea cols="40" rows="4" id="remark" name="remark" placeholder="" required></textarea>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <div className="position-relative">
                                      <label className="pb-2 input-date">Priority</label>
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
                                    <label className="pb-2">Select Responsible Person
                                    </label>

                                    <div className="pb-2 d-flex w-100">
                                      <div className="form-check form-check-inline">
                                        <input className="form-check-input" value="manually" type="radio" name="locationtype"
                                          id="flexRadioDefault1" />
                                        <label className="form-check-label"
                                          // @ts-ignore
                                          for="locationtype">
                                          Select From Attendees
                                        </label>
                                      </div>
                                      <div className="form-check form-check-inline">
                                        <div className="form-check">
                                          <input className="form-check-input" value="meetingroom" type="radio"
                                            name="locationtype" id="flexRadioDefault1" />

                                          <label className="form-check-label" for="locationtype">
                                            Select From Employees
                                          </label>
                                        </div>
                                      </div>

                                    </div>


                                    <select className="mb-2">
                                      <option value="" disabled selected> Name / Email Address
                                      </option>
                                      <option value="prabhas@example.com">Prabhas Khamari</option>
                                      <option value="debasis@example.com">Debasis Behera</option>
                                      <option value="rakesh@example.com">Rakesh Baral</option>
                                    </select>

                                    <select className="mb-2" >
                                      <option value="" disabled selected> Name / Employee ID
                                      </option>
                                      <option value="prabhas@example.com">Prabhas Khamari</option>
                                      <option value="debasis@example.com">Debasis Behera</option>
                                      <option value="rakesh@example.com">Rakesh Baral</option>
                                    </select>
                                  </div>

                                  <div className="form-group">
                                    <label className="pb-2">Add New People</label>
                                    <div className="row">
                                      <div className="col-xl-6">
                                        <input type="text" placeholder="Email" className="pb-2" />
                                      </div>
                                      <div className="col-xl-6">
                                        <input type="text" placeholder="Name" />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                              </form>
                            </div>
                            <ModalFooter>
                              <Button color="secondary" onClick={toggleModalT}>
                                Close
                              </Button>
                              <Button color="primary" onClick={toggleModalT}>
                                Submit Request
                              </Button>
                            </ModalFooter>
                          </Modal>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="tbl-bottom">
            <div className="left-tbl-bottom">
              <button className="left-arrow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                  />
                </svg>
              </button>
              <ul>
                <li>1</li>
                <li>2</li>
              </ul>
              <button className="right-arrow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#fff"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </button>
            </div>

            <div className="right-tbl-bottom">
              <p>Rows Per Page</p>
              <select className="no-opt-box">
                <option>20</option>
                <option>30</option>
                <option>40</option>
                <option>50</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="main-content"></div>
    </div>
  );
};
export default ActionList;
