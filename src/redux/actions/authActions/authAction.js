import {
  OTP_SENT,
  FAIL_REQUEST,
  MAKE_REQUEST,
  UPDATE_ISSUCCESS,
  OTP_VERIFIED,
  UPDATE_OTP_PROCESSED,
  PROCESSS_LOGOUT,
  OTP_RESENT,
  SET_PASSWORD,
  LOGIN_SUCCESS,
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

export const sendOtp = (email,isSetPassword) => {
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
            email,
            isSetPassword
          };
        } else {
          data = {
            ...resData,
            variant: "danger",
            message: resData.message,
            email,
            isSetPassword
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
  console.log('payload in action----------------',payload)
  return (dispatch) => {
    dispatch(makeRequest());
    const url = `${process.env.REACT_APP_API_URL}/api/V1/auth/verifyOtp`;
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
          const {token, userData} = resData.data;
          console.error('resData ------------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>',resData)
          console.error('token ------------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>',resData.data.token,token)
          localStorage.setItem("accessToken", token);
          localStorage.setItem("userData", JSON.stringify(userData));
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


export const updateOtpProcessed = (status) => {
  console.log("status--------------------------------", status);
  return {
    type: UPDATE_OTP_PROCESSED,
    payload:status
  };
};

export const logOut = () => {
  
  return {
    type: PROCESSS_LOGOUT
  };
};






export const reSendOtp = (email) => {
  return (dispatch) => {
    dispatch(makeRequest());
    const url = `${process.env.REACT_APP_API_URL}/api/V1/auth/reSendOtp`;
    const payload = { email };
    axios
      .post(url, payload)
      .then((res) => {
        console.log("resendOtp action ----------------------------", res.data);
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
        dispatch(isOtpReSend(data));
      })
      .catch((err) => {
        console.log("err-----------------------------------", err);
        dispatch(failRequest(err.message));
      });
  };
};

export const isOtpReSend = (data) => {
  return {
    type: OTP_RESENT,
    payload: data,
  };
};


export const setPassword = (payload) => {
  console.log('payload in setPassword action----------------',payload)
  return (dispatch) => {
    dispatch(makeRequest());
    const url = `${process.env.REACT_APP_API_URL}/api/V1/auth/setPassword`;
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
        dispatch(isPasswordSet(data));
      })
      .catch((err) => {
        console.log("err-----------------------------------", err);
        dispatch(failRequest(err.message));
      });
  };
};


export const isPasswordSet = (data) => {
  return {
    type: SET_PASSWORD,
    payload: data,
  };
};




export const logInByPassword = (payload) => {
  console.log('payload in logInByPassword action----------------',payload)
  return (dispatch) => {
    dispatch(makeRequest());
    const url = `${process.env.REACT_APP_API_URL}/api/V1/auth/signInByPassword`;
    axios
      .post(url, payload)
      .then((res) => {
        console.log("logInByPassword action ----------------------------", res.data);
        const resData = res.data;
        let data;
        if (resData.success) {
          const {token, userData} = resData.data;
          console.error('resData ------------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>',resData)
          console.error('token ------------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>',resData.data.token,token)
          localStorage.setItem("accessToken", token);
          localStorage.setItem("userData", JSON.stringify(userData));
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
        dispatch(isLogInSuccess(data));
      })
      .catch((err) => {
        console.log("err-----------------------------------", err);
        dispatch(failRequest(err.message));
      });
  };
};


export const isLogInSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

