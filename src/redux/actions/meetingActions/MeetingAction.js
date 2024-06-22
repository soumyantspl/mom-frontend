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
  LOAD_PREVIOUS_STEP,
  SET_SINGLE_MEETING_DETAILS,
  SET_MEETING_VIEW_PAGE,
  SET_CREATE_NEW_MEETING_PAGE,
  UNSET_SINGLE_MEETING_DETAILS,
  UPDATE_STEP
} from "./actionTypes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        if (resData.success) {
         
            dispatch(getSingleMeetingDetails(resData.data._id, accessToken));
          
          toast.success(resData.message, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
          });
          dispatch(createMeetingResponse(resData));
        } else {
          dispatch(failRequest(resData.message));
          toast.error(resData.message, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
          });
        }
      })
      .catch((err) => {
        console.log("err------------------------->>>>>>>", err);
        dispatch(failRequest(err.message));
        toast.error(err.message, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
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

export const updateMeetingDetails = (
  meetingId,
  bodyPayload,
  accessToken,
  isFrom
) => {
  return (dispatch) => {
    dispatch(makeRequest());
    const webApiUrl = `${process.env.REACT_APP_API_URL}/api/V1/meeting/updateMeeting/${meetingId}`;
    const headerObject = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };
    console.log("webApiUrl----------------", webApiUrl);
    console.log("accessToken------------>>>>>", accessToken);

    // const bodyPayload = {
    //   organizationId: payload.organizationId,
    //   attendees: payload.attendees,
    //   step:payload.step
    // };
    axios
      .put(webApiUrl, bodyPayload, headerObject)
      .then((result) => {
        console.log("result------------------------->>>>>>>", result);
        const resData = result.data;
        const message =
          isFrom === "addAttendee"
            ? "Attendees added successfully"
            : isFrom === "addAgenda"
            ? "Agendas added successfully"
            : resData.message;
        if (resData.success) {
          toast.success(message, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
          });
          dispatch(getSingleMeetingDetails(meetingId, accessToken));
          dispatch(updateMeetingResponse(resData));
        } else {
          toast.error(resData.message, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
          });
          dispatch(failRequest(resData.message));
        }
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

export const getSingleMeetingDetails = (meetingId, accessToken) => {
  return (dispatch) => {
    dispatch(makeRequest());
    const webApiUrl = `${process.env.REACT_APP_API_URL}/api/V1/meeting/viewMeeting/${meetingId}`;
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

        dispatch(setSingleMeetingDetails({data:resData.data,meetingId}));
      })
      .catch((err) => {
        console.log("err------------------------->>>>>>>", err);
        dispatch(failRequest(err.message));
      });
  };
};

export const setSingleMeetingDetails = (data) => {
  return {
    type: SET_SINGLE_MEETING_DETAILS,
    payload: data,
  };
};

export const unSetSingleMeetingDetails = () => {
  return {
    type: UNSET_SINGLE_MEETING_DETAILS,
   // payload: data,
  };
};
export const updateStep = (step) => {
  return {
    type:UPDATE_STEP,
   payload: step,
  };
};

export const loadCreateMeeting = (data) => {
  return {
    type: LOAD_PREVIOUS_STEP,
    payload: data,
  };
};
export const setMeetingViewPage = (data) => {
  return {
    type: SET_MEETING_VIEW_PAGE,
    payload: data,
  };
};



export const setCreateNewMeetingPage = (data) => {
  return {
    type: SET_CREATE_NEW_MEETING_PAGE,
    payload: data,
  };
};
