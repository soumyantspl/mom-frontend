import React from "react";
import Table from "react-bootstrap/Table";

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
    console.log(props.rsvpObject)
  let trData = [];
  for (const [key, value] of Object.entries(props.rsvpObject)) {
    console.log(`${key}: ${value}`);
    trData.push(
      <tr>
        <td>{key.charAt(0).toUpperCase()+key.toLowerCase().slice(1)}</td>
        <td>
          {value.length&&value.map((attendee,index) => {
           return <p>{`${index+1} - ${attendee.name}  `}</p>;
          })}
        </td>
      </tr>
    );
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Rsvp </th>
          <th>Attendees</th>
        </tr>
      </thead>
      <tbody>{trData}</tbody>
    </Table>
  );
};

export default AttendeeRsvpTable;
