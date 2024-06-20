import React from "react";

const AttendeesDetails = (props) => {
    console.log(props.attendeesData.attendees)
    const {attendees}=props.attendeesData
  return (
    <>
      <h4 className="meeting-header-text">Attendee(s)</h4>
      <form className="mt-2 details-form details-form-right">
        <div className="form-group mt-2">
          <div className="status-detail">
            <p className="rsvpStatus">Summary</p>
            <div className="respond-button">
              <button className="respond-action">2 Yes</button>
              <button className="respond-action">1 No</button>
              <button className="respond-action">1 May Be</button>
            </div>
          </div>

          <table className="mt-3 table">
            <thead>
              <tr>
                <th scope="col">Sl. No.</th>
                <th scope="col">Attendees</th>
                <th scope="col">RSVP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td data-label="Attendees">
                  <div className="attendees">
                    <div className="attendee-list">SL</div>
                    <span className="ms-2">Subham Lenka</span>
                  </div>
                </td>
                <td data-label="RSVP">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
};

export default AttendeesDetails;
