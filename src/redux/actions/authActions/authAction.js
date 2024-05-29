import {
  OTP_SENT,
  FAIL_REQUEST,
  MAKE_REQUEST,
  UPDATE_ISSUCCESS,
  OTP_VERIFIED,
} from "./actionTypes";
import axios from "axios";
import { toast } from "react-toastify";

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
export const isOtpSend = (data) => {
  return {
    type: OTP_SENT,
    payload: data,
  };
};

export const sendOtp = (email) => {
  return (dispatch) => {
    dispatch(makeRequest());
    const url = `${process.env.REACT_APP_API_URL}/api/V1/auth/sendOtp`;
    const payload = { email };
    axios
      .post(url, payload)
      .then((res) => {
        console.log("sendOtp action ----------------------------", res.data);
        const resData = res.data;
        let data;
        if (resData.success) {
          data = {
            ...resData,
            variant: "success",
            message: resData.message,
            email
          };
        } else {
          data = {
            ...resData,
            variant: "danger",
            message: resData.message,
            email
          };
        }
        dispatch(isOtpSend(data));
      })
      .catch((err) => {
        console.log("err-----------------------------------", err);
        dispatch(failRequest(err.message));
      });
  };
};

export const updateIsSuccess = (data) => {
  console.log("data--------------------------------", data);
  return {
    type: UPDATE_ISSUCCESS,
    payload: data,
  };
};


export const isOtpVerified = (data) => {
  console.log("data--------------------------------", data);
  return {
    type: OTP_VERIFIED,
    payload: data,
  };
};
export const verifyOtp = (payload) => {
  return (dispatch) => {
    dispatch(makeRequest());
    const url = `${process.env.REACT_APP_API_URL}/api/auth/verifyOtp`;
    axios
      .post(url, payload)
      .then((res) => {
        console.log("verifyOtp action ----------------------------", res.data);
        const resData = res.data;
        let data;
        if (resData.success) {
          data = {
            ...resData,
            variant: "success",
            message: resData.message,
          };
        } else {
          data = {
            ...resData,
            variant: "danger",
            message: resData.message,
          };
        }
        dispatch(isOtpVerified(data));
      })
      .catch((err) => {
        console.log("err-----------------------------------", err);
        dispatch(failRequest(err.message));
      });
  };
};
