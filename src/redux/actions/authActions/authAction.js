import { OTP_SENT, FAIL_REQUEST, MAKE_REQUEST } from "./actionTypes";
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
    const url = "http://localhost:8000/api/V1/auth/sendOtp";
    axios
      .post(url, { email })
      .then((res) => {
        console.log("sendOtp action ----------------------------", res.data);
        const resData = res.data;
        let data;
        if (resData.success) {
          data = {
            variant: "success",
            message: resData.message,
          };
        } else {
          data = {
            variant: "danger",
            message: resData.message,
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
