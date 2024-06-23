import React from "react";
import NoDataFound from "../Common/NoDataFound";
import { checkRsvpCount, convertFirstLetterOfFullNameToCapital, convertFirstLetterToCapital, customName } from "../../helpers/commonHelpers";
import Alert from "../Common/Alert";

const AttendeesDetails = (props) => {
  console.log(props.attendeesData.attendees);
  const { attendees } = props.attendeesData;
  return (
    <>
      <h4 className="meeting-header-text">Attendee(s)</h4>
      <form className="mt-2 details-form details-form-right">
        <div className="form-group mt-2">
          <div className="status-detail">
            <p className="rsvpStatus">Summary</p>
            <div className="respond-button">
              <button className="respond-action" disabled>{ checkRsvpCount(attendees).yesCount} Yes</button>
              <button className="respond-action" disabled>{ checkRsvpCount(attendees).noCount} No</button>
              <button className="respond-action" disabled>{ checkRsvpCount(attendees).mayBeCount} May Be</button>
              <button className="respond-action" disabled>{ checkRsvpCount(attendees).pendingCount} Awaiting</button>
              {/* <p>{attendees.length} Attendees</p>
                        <p className="detail-date-time">
                          {checkRsvpCount(attendees)}
                        </p> */}
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
              {attendees.length !== 0 ? (
              <>
              {attendees.map((attendee,index)=>{
                return (
                  <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td data-label="Attendees">
                    <div className="attendees">
                      <div className="attendee-list"> {customName(attendee.name)}</div>
                      <span className="ms-2">{convertFirstLetterOfFullNameToCapital(attendee.name)}</span>
                    </div>
                  </td>
                  <td data-label="RSVP">{convertFirstLetterToCapital(attendee.rsvp)}</td>
                </tr>
                )
              })}
              </>         
             
             
             

              ) : (
                <>
                  <Alert
                        status={false}
                        message={"No Attendee Added"}
                        timeoutSeconds={0}
                      />
                 <div className="mt-3 agenda-box-border">
                 
                  <NoDataFound />
                </div>
                </>
               
              )}
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
};

export default AttendeesDetails;
