import axios from "axios";
import {
  CREATE_MEETING_RESPONSE,
  FAIL_REQUEST,
  GET_ATTENDEES_LIST,
  GET_MEETING_LIST,
  MAKE_REQUEST,
  MAKE_RSVP_UPDATE_REQUEST,
  UPDATE_RSVP,
  GET_CREATE_MEETING_STEPS,
  UPDATE_ISCREATE_MEETING_PROCESSED,
  SET_ATTENDEES,
  UPDATE_MEETING_RESPONSE,
} from "./actionTypes";
const accessToken = localStorage.getItem("accessToken");

// axios.defaults.headers = {
//   "Content-Type": "application/json",
//   Authorization: accessToken,
// };

export const makeRequest = () => {
  return {
    type: MAKE_REQUEST,
  };
};
export const failRequest = (err) => {
  return {
    type: FAIL_REQUEST,
    payload: err,
  };
};

export const fetchMeetingList = (payload) => {
  return (dispatch) => {
    dispatch(makeRequest());
    const webApiUrl = `${process.env.REACT_APP_API_URL}/api/V1/meeting/viewAllMeetings`;
    const headerObject = {
      headers: {
        "Content-Type": "application/json",
        Authorization: payload.accessToken,
      },
      params: {
        limit: payload.limit,
        page: payload.page,
        order: payload.order,
      },
    };
    console.log("webApiUrl----------------", webApiUrl);
    console.log("accessToken------------>>>>>", accessToken);
    // axios
    //   .post(webApiUrl, payload)
    const bodyPayload = {
      organizationId: payload.organizationId,
      searchKey: payload.searchKey ? payload.searchKey : undefined,
      meetingStatus: payload.meetingStatus ? payload.meetingStatus : undefined,
      toDate: payload.toDate ? payload.toDate : undefined,
      fromDate: payload.fromDate ? payload.fromDate : undefined,
      attendeeId: payload.attendeeId ? payload.attendeeId : undefined,
    };
    axios
      .post(webApiUrl, bodyPayload, headerObject)
      .then((result) => {
        console.log("result------------------------->>>>>>>", result);
        const resData = result.data;
        dispatch(getMeetingList(resData));
      })
      .catch((err) => {
        console.log("err------------------------->>>>>>>", err);
        dispatch(failRequest(err.message));
      });
  };
};

export const getMeetingList = (data) => {
  return {
    type: GET_MEETING_LIST,
    payload: data,
  };
};

export const fetchAttendeesList = (organizationId, token) => {
  console.log("accessToken------------>>>>>", token);
  return (dispatch) => {
    dispatch(makeRsvpRequest());
    const webApiUrl = `${process.env.REACT_APP_API_URL}/api/V1/meeting/listAttendeesFromPreviousMeeting/${organizationId}`;
    const headerObject = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    console.log("webApiUrl----------------", webApiUrl);
    axios
      .get(webApiUrl, headerObject)
      .then((result) => {
        console.log("result------------------------->>>>>>>", result);
        const resData = result.data;

        dispatch(getAttendeesList(resData));
      })
      .catch((err) => {
        console.log("err------------------------->>>>>>>", err);
        dispatch(failRequest(err.message));
      });
  };
};

export const getAttendeesList = (data) => {
  return {
    type: GET_ATTENDEES_LIST,
    payload: data,
  };
};
export const makeRsvpRequest = () => {
  return {
    type: MAKE_RSVP_UPDATE_REQUEST,
  };
};
export const updateRsvp = (rsvp, meetingId) => {
  return (dispatch) => {
    dispatch(makeRsvpRequest());
    const webApiUrl = `${process.env.REACT_APP_API_URL}/api/V1/meeting/updateRsvp/${meetingId}`;
    const headerObject = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };
    console.log("webApiUrl----------------", webApiUrl);
    console.log("accessToken------------>>>>>", accessToken);
    // axios
    //   .post(webApiUrl, payload)
    const bodyPayload = {
      rsvp,
    };
    axios
      .put(webApiUrl, bodyPayload, headerObject)
      .then((result) => {
        console.log("result------------------------->>>>>>>", result);
        const resData = result.data;

        dispatch(updateRsvpStatus(resData));
      })
      .catch((err) => {
        console.log("err------------------------->>>>>>>", err);
        dispatch(failRequest(err.message));
      });
  };
};

export const updateRsvpStatus = (data) => {
  return {
    type: UPDATE_RSVP,
    payload: data,
  };
};

export const createMeetingDetails = (payload, accessToken) => {
  return (dispatch) => {
    dispatch(makeRequest());
    const webApiUrl = `${process.env.REACT_APP_API_URL}/api/V1/meeting/createMeeting`;
    const headerObject = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };
    console.log("webApiUrl----------------", webApiUrl);
    console.log("accessToken------------>>>>>", accessToken);

    axios
      .post(webApiUrl, payload, headerObject)
      .then((result) => {
        console.log("result------------------------->>>>>>>", result);
        const resData = result.data;

        dispatch(createMeetingResponse(resData));
      })
      .catch((err) => {
        console.log("err------------------------->>>>>>>", err);
        dispatch(failRequest(err.message));
      });
  };
};

export const createMeetingResponse = (data) => {
  return {
    type: CREATE_MEETING_RESPONSE,
    payload: data,
  };
};

export const getCreateMeetingStep = (organizationId, accessToken) => {
  return (dispatch) => {
    // dispatch(makeRequest());
    const webApiUrl = `${process.env.REACT_APP_API_URL}/api/V1/meeting/getCreateMeetingStep/${organizationId}`;
    const headerObject = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };
    console.log("webApiUrl----------------", webApiUrl);
    console.log("accessToken------------>>>>>", accessToken);

    axios
      .get(webApiUrl, headerObject)
      .then((result) => {
        console.log("result------------------------->>>>>>>", result);
        const resData = result.data;

        dispatch(fetchCreateMeetingStep(resData));
      })
      .catch((err) => {
        console.log("err------------------------->>>>>>>", err);
        dispatch(failRequest(err.message));
      });
  };
};

export const fetchCreateMeetingStep = (data) => {
  return {
    type: GET_CREATE_MEETING_STEPS,
    payload: data,
  };
};

export const updateIsCreateMeetingProcessed = (data) => {
  return {
    type: UPDATE_ISCREATE_MEETING_PROCESSED,
    payload: data,
  };
};

export const updateMeetingDetails = (payload, accessToken) => {
  return (dispatch) => {
    // dispatch(makeRequest());
    const webApiUrl = `${process.env.REACT_APP_API_URL}/api/V1/meeting/updateMeeting/${payload.meetingId}`;
    const headerObject = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };
    console.log("webApiUrl----------------", webApiUrl);
    console.log("accessToken------------>>>>>", accessToken);

    const bodyPayload = {
      organizationId: payload.organizationId,
      attendees: payload.attendees,
      step:payload.step
    };
    axios
      .put(webApiUrl, bodyPayload, headerObject)
      .then((result) => {
        console.log("result------------------------->>>>>>>", result);
        const resData = result.data;

        dispatch(updateMeetingResponse(resData));
      })
      .catch((err) => {
        console.log("err------------------------->>>>>>>", err);
        dispatch(failRequest(err.message));
      });
  };
};

export const updateMeetingResponse = (data) => {
  return {
    type: UPDATE_MEETING_RESPONSE,
    payload: data,
  };
};

// export const getAttendeesListFromPreviousMeeting = (
//   organizationId,
//   accessToken
// ) => {
//   return (dispatch) => {
//     // dispatch(makeRequest());
//     const webApiUrl = `${process.env.REACT_APP_API_URL}/api/V1/meeting/listAttendeesFromPreviousMeeting/${organizationId}`;
//     const headerObject = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: accessToken,
//       },
//     };
//     console.log("webApiUrl----------------", webApiUrl);
//     console.log("accessToken------------>>>>>", accessToken);

//     axios
//       .get(webApiUrl, headerObject)
//       .then((result) => {
//         console.log("result------------------------->>>>>>>", result);
//         const resData = result.data;

//         dispatch(setAttendeesListFromPreviousMeeting(resData));
//       })
//       .catch((err) => {
//         console.log("err------------------------->>>>>>>", err);
//         dispatch(failRequest(err.message));
//       });
//   };
// };

// export const setAttendeesListFromPreviousMeeting = (data) => {
//   return {
//     type: SET_ATTENDEES,
//     payload: data,
//   };
// };
