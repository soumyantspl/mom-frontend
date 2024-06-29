import { setInValidUser } from "../authActions/authAction";
import {
  FAIL_REQUEST,
  MAKE_REQUEST,
  CREATE_MINUTE_RESPONSE,SET_FINAL_MINUTES_DATA
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

export const createMinutes = (payload, accessToken) => {
  console.log(payload, accessToken);
  return (dispatch) => {
    dispatch(makeRequest());

    const webApiUrl = `${process.env.REACT_APP_API_URL}/api/V1/minute/createMinutes`;
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

    // const bodyPayload = {
    //   organizationId: payload.organizationId,
    // };
    axios
      .post(webApiUrl, payload, headerObject)
      .then((res) => {
        const resData = res.data;
        console.log("resData-------------------------------->", resData);
        if (resData.data?.isInValidUser) {
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
       
          dispatch(createMinuteResponse(resData));
        
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
        toast.error(constantMessages.serverErrorMessage, {
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

export const createMinuteResponse = (data) => {
  return {
    type: CREATE_MINUTE_RESPONSE,
    payload: data,
  };
};



export const setFinalMinuteData = (data) => {
    return {
      type: SET_FINAL_MINUTES_DATA,
      payload: data,
    };
  };
