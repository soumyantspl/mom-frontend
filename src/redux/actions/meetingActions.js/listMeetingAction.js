import axios from "axios";
import { FAIL_REQUEST, GET_MEETING_LIST, MAKE_REQUEST } from "./actionTypes";
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
        Authorization: accessToken,
      },
      params: {
        limit: payload.limit,
        page: payload.page,
        order: payload.order
      },
    };
    console.log("webApiUrl----------------", webApiUrl);
    console.log("accessToken------------>>>>>", accessToken);
    // axios
    //   .post(webApiUrl, payload)
const bodyPayload={
    organizationId:payload.organizationId,
    searchKey:payload.searchKey?payload.searchKey:undefined
}
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
