import React from "react";
import Table from "react-bootstrap/Table";
import { customName } from "../../helpers/commonHelpers";

const AttendeeRsvpTable = (props) => {
  console.log(props);
  let trData = [];
  for (const [key, value] of Object.entries(props.rsvpObject)) {
    console.log(`${key}: ${value}`);
    trData.push(
      <tbody>
        <tr>
          <th colspan="3">
            {key.charAt(0).toUpperCase() + key.toLowerCase().slice(1)}
          </th>
        </tr>
        <tr>
          <td>
            {value.length &&
              value.map((attendee, index) => {
                return (
                  <div className="attendee-content" key={index}>
                    <div className="" key={index}>
                      <div className="attendee-list">
                        {" "}
                        {customName(attendee.name)}
                      </div>
                    </div>

                    <div className="action-cmnt-text">
                      <p className="detail-name">{attendee.name}</p>
                      {/* body > ngb-modal-window > div > div > div.modal-body.attendees-popup > div:nth-child(1) > div.action-cmnt-text >  */}
                      <p className="name-undertext comment-text">
                        {attendee.email}
                      </p>
                    </div>
                  </div>
                );
              })}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <Table striped bordered>
      {trData}
    </Table>
  );
};

export default AttendeeRsvpTable;
