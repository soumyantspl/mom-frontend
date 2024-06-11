import React from "react";
import Table from "react-bootstrap/Table";
import { customName } from "../../helpers/commonHelpers";

// const p = {
//     "p1": "value1",
//     "p2": "value2",
//     "p3": "value3"
// };

//   return (
//     <div>
//       <h2>Seasons of the year</h2>
//       <ul>{seasonsList}</ul>
//     </div>
//   );
// }

// export default App;

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
                    <div className="attendee-content" key={index}>
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
                  //////////////////////////////////
                );
                //  return <p>{`${index+1} - ${attendee.name}  `}</p>;
              })}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <Table striped bordered hover>
      {trData}
    </Table>
  );
};

export default AttendeeRsvpTable;
