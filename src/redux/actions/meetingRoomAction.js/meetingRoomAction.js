import { setInValidUser } from "../authActions/authAction";
import {
  FAIL_REQUEST,
  MAKE_REQUEST,
  GET_MEETING_ROOM_LIST,
} from "./actionTypes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import * as constantMessages from "../../../constants/constatntMessages";

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
export const fetchMeetingRoomList = (data) => {
  return {
    type: GET_MEETING_ROOM_LIST,
    payload: data,
  };
};

export const getMeetingRoomList = (payload, accessToken) => {
   console.log(payload, accessToken);
  return (dispatch) => {
    dispatch(makeRequest());

    const webApiUrl = `${process.env.REACT_APP_API_URL}/api/V1/room/viewRooms`;
    const headerObject = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      params: {
        limit: payload.limit,
        page: payload.page,
        order: payload.order,
      },
    };
    // console.log("webApiUrl----------------", webApiUrl);
    // console.log("accessToken------------>>>>>", accessToken);
 
    const bodyPayload = {
      organizationId: payload.organizationId,
    };
    axios
      .post(webApiUrl, bodyPayload, headerObject)
      .then((res) => {
        const resData = res.data;
        console.log("resData-------------------------------->", resData);
        if(resData.data?.isInValidUser){
          dispatch(setInValidUser(true));
          toast.error(resData.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            // transition: Bounce,
          });
        }
        dispatch(fetchMeetingRoomList(resData));
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
        toast.error( constantMessages.serverErrorMessage, {
          position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          // transition: Bounce,
        });
      });
  };
};
