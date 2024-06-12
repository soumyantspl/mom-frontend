import React, { useState } from "react";
// @ts-ignore
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
// @ts-ignore
import { useNavigate, Navigate, Link } from "react-router-dom";
import Header from "../Common/Header/Header";
import Sidebar from "../Common/Sidebar/Sidebar";
import MeetingHeader from "../Common/Header/MeetingHeader";
import "../Action/style/ActionDetails.css";

const ActionDetails = () => {
  const [modal, setModal] = useState(false);
  const [remark, setRemark] = useState("");

  const toggleModal = () => setModal(!modal);

  return (
    <div>
      <Header />
      <MeetingHeader />
      <Sidebar />
      <div className="main-content">
        <div className="action-details-page">
          <div className="meeting-header-text actionDetail-header">
            <div>
              <h4 className="mb-0">Actions</h4>
            </div>
            <div className="right-tbl-bottom">
              <a href="/">
                <button className="view-meeting Mom-btn">
                  <p>View Minutes</p>
                </button>
              </a>
            </div>
          </div>

          <div className="mt-3 mb-3 row details-container">
            <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="left-detailbox">
                <h4 className="Detailsheading">Details</h4>

                <div className="mt-3 form-group">
                  <div className="row">
                    <div className="col-md-4">
                      <label className="mb-1">Meeting Title</label>
                    </div>
                    <div className="col-md-8">
                      <p>Tuesday Morning Meeting</p>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-md-4">
                      <label className="mb-1">Held On</label>
                    </div>
                    <div className="col-md-4">
                      <p>03 Jan 2024</p>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-md-4">
                      <label className="mb-1">Action Description</label>
                    </div>
                    <div className="col-md-8">
                      <p>Subham needs to provide the content</p>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-md-4">
                      <label className="mb-1">Agenda</label>
                    </div>
                    <div className="col-md-8">
                      <p>Content needs to be provided</p>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-md-4">
                      <label className="mb-1">Action Due Date</label>
                    </div>
                    <div className="col-md-8">
                      <p>03 Jan 2024</p>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-md-4">
                      <label className="mb-1">Priority</label>
                    </div>
                    <div className="col-md-8">
                      <p>High</p>
                    </div>
                  </div>
                </div>

                <div className="complete-check">
                  <input type="checkbox" />
                  <label>Is Complete</label>
                </div>
                {/* Re-Assign Request */}
                <button className="add-btn Mom-btn mt-5" onClick={toggleModal}>
                  {" "}
                  <p>Request for Reassign</p>
                </button>
              </div>

              <div className="left-detailbox mt-3">
                <h4 className="Detailsheading">Action Activities</h4>
                <div className="form-group pt-4 m-0">
                  <div className="inner-notification req-by">
                    <div className="action-comment-circle sl me-3">SL</div>
                    <div className="text">
                      <div className="heading">
                        Action reassigned to Subham Lenka
                      </div>
                      <div className="date">04 Jan 2024, 09:52 AM</div>
                    </div>
                  </div>
                </div>
                <div className="form-group pt-4 m-0">
                  <div className="inner-notification req-by">
                    <div className="action-comment-circle yh me-3">YH</div>
                    <div className="text">
                      <div className="heading">
                        Reassign of action requested by Yamuna Hembram
                      </div>
                      <div className="date">04 Jan 2024, 09:52 AM</div>
                      <button className="reset mt-2">
                        <p>View Remark</p>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="form-group pt-4 m-0">
                  <div className="inner-notification req-by">
                    <div className="action-comment-circle rb me-3">RB</div>
                    <div className="text">
                      <div className="heading">
                        Reassign request accepted by Rakesh Baral
                      </div>
                      <div className="date">04 Jan 2024, 09:52 AM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 detail-right">
              <div className="right-detailbox">
                <h4 className="Detailsheading">Action Comments</h4>
                <div className="mt-3 action-comments">
                  <div className="action-commentsbox-1 cmnt-border-1">
                    <div className="action-comment-circle circle-1">
                      <p>SL</p>
                    </div>
                    <div className="action-cmnt-text">
                      <p className="detail-date-time">04/01/2024, 12:17:33</p>
                      <p className="detail-name">Subham Lenka</p>
                      <p className="name-undertext comment-text">
                        Page must contain three headings
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-2 action-comments">
                  <div className="action-commentsbox-1 cmnt-border-2">
                    <div className="action-comment-circle circle-2">
                      <p>YH</p>
                    </div>
                    <div className="action-cmnt-text">
                      <p className="detail-date-time">04/01/2024, 12:17:33</p>
                      <p className="detail-name">Subham Lenka</p>
                      <p className="name-undertext comment-text">
                        Page must contain three headings
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-2 action-comments">
                  <div className="action-commentsbox-1 cmnt-border-3">
                    <div className="action-comment-circle circle-3">
                      <p>PK</p>
                    </div>
                    <div className="action-cmnt-text">
                      <p className="detail-date-time">04/01/2024, 12:17:33</p>
                      <p className="detail-name">Subham Lenka</p>
                      <p className="name-undertext comment-text">
                        Page must contain three headings
                      </p>
                    </div>
                  </div>
                </div>

                <div className="add-comment-box">
                  <h4>Add Comment</h4>
                  <textarea
                    // @ts-ignore
                    cols="40"
                    // @ts-ignore
                    rows="3"
                    placeholder="Comments"
                  ></textarea>
                </div>
                <div className="detail-bottom-btn mt-3">
                  <button className="reset">
                    <p>Cancel</p>
                  </button>
                  <button className="add-btn Mom-btn">
                    <p>Add</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>
              Reassign Request Details
            </ModalHeader>
            <ModalBody>
              <h6>Request</h6>
              <textarea
                // @ts-ignore
                cols="40"
                // @ts-ignore
                rows="4"
                id="remark"
                name="remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                required
              />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleModal}>
                Close
              </Button>
              <Button color="primary" onClick={toggleModal}>
                Submit Request
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ActionDetails;
