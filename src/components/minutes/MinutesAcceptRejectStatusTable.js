import React from "react";
import Table from "react-bootstrap/Table";
import { customName, formatDateTimeFormat } from "../../helpers/commonHelpers";

const MinutesAcceptRejectStatusTable = (props) => {
  console.log(props);
  const {attendeesData}=props
  let trData = [];
  console.log(attendeesData)
//   attendeesData.length &&
//   attendeesData.map((attendee, index) => {
   
// })
  

  return (
    <Table >
      
      <tbody>
       
        <tr>
          <td>
            {attendeesData?.length &&
              attendeesData.map((attendee, index) => {
                return (
                  <div className="attendee-content" key={index}>
                    <div  className="d-flex" key={index}>
                      <div className="check-attendee">
                      <div className=" attendee-list rb">
                        {" "}
                        {customName(attendee.name)}
                      </div>
                      </div>
                    </div>

                    <div className="action-cmnt-text">
                      <p className="detail-name">{attendee.name}</p>
                      {/* body > ngb-modal-window > div > div > div.modal-body.attendees-popup > div:nth-child(1) > div.action-cmnt-text >  */}
                      <p className="name-undertext comment-text">
                        {attendee.email}
                      </p>
                      <div className="date">{props.status} on -    {
                    formatDateTimeFormat(attendee?.updatedAt)
                      .formattedDate
                  }{" , "}{
                    formatDateTimeFormat(attendee?.updatedAt)
                      .formattedTime
                  }</div>
                    </div>
                  </div>
                );
              })}
          </td>
        </tr>
      </tbody>

    </Table>
  );
};

export default MinutesAcceptRejectStatusTable;
