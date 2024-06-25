import { RememberMe } from "../../../../node_modules/@mui/icons-material/index";
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
  LOGIN_PROCESS,
  OTP_SENT_FOR_LOGIN_BY_OTP,
  UPDATE_TIMER,
} from "./actionTypes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
export const isOtpSendForLogInByOtp = (data) => {
  return {
    type: OTP_SENT_FOR_LOGIN_BY_OTP,
    payload: data,
  };
};

export const updateTimer = (data) => {
  return {
    type: UPDATE_TIMER,
    payload: data,
  };
};

export const sendOtp = (email, isSetPassword) => {
  return (dispatch) => {
    dispatch(makeRequest());
    const url = `${process.env.REACT_APP_API_URL}/api/V1/auth/sendOtp`;
    const payload = { email };
    axios
      .post(url, payload)
      .then((res) => {
        const resData = res.data;
        let data;

        // if (resData.success) {
        //   toast.success(message, {
        //     position: "bottom-left",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        //     // transition: Bounce,
        //   });
        //   dispatch(updateMeetingResponse(resData));
        // } else {
        //   toast.error(resData.message, {
        //     position: "bottom-left",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        //     // transition: Bounce,
        //   });
        //   dispatch(failRequest(resData.message));
        // }








        if (resData.success) {
          data = {
            ...resData,
            variant: "success",
            message: resData.message,
            email,
            isSetPassword: true,
          };
          toast.success( resData.message, {
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
        } else {
          data = {
            ...resData,
            variant: "danger",
            message: resData.message,
            email,
            isSetPassword: false,
          };
          toast.error( resData.message, {
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
        if (isSetPassword) {
          dispatch(isOtpSendForSetPassword(data));
        } else {
          dispatch(isOtpSendForLogInByOtp(data));
        }
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
        toast.error( err.message, {
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

export const isOtpSendForSetPassword = (data) => {
  return {
    type: OTP_SENT,
    payload: data,
  };
};

export const updateIsSuccess = (data) => {
  return {
    type: UPDATE_ISSUCCESS,
    payload: data,
  };
};

export const isOtpVerified = (data) => {
  return {
    type: OTP_VERIFIED,
    payload: data,
  };
};
export const verifyOtp = (payload) => {
  return (dispatch) => {
    dispatch(makeRequest());
    const url = `${process.env.REACT_APP_API_URL}/api/V1/auth/verifyOtp`;
    axios
      .post(url, payload)
      .then((res) => {
        const resData = res.data;
        let data;
        if (resData.success) {
          data = {
            ...resData,
            variant: "success",
            message: resData.message,
          };
          const { token, userData } = resData.data;
          console.log('------------------------>>>>>>>>>>>',token)
          localStorage.setItem("accessToken", token);
          localStorage.setItem("userData", JSON.stringify(userData));
          toast.success( resData.message, {
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
        } else {
          data = {
            ...resData,
            variant: "danger",
            message: resData.message,
          };
          toast.error( resData.message, {
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
        dispatch(isOtpVerified(data));
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
        toast.error( err.message, {
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

export const updateOtpProcessed = (status) => {
  return {
    type: UPDATE_OTP_PROCESSED,
    payload: status,
  };
};

export const logOut = () => {
  return {
    type: PROCESSS_LOGOUT,
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
        const resData = res.data;
        let data;
        if (resData.success) {
          data = {
            ...resData,
            variant: "success",
            message: resData.message,
            email,
          };
          toast.success( resData.message, {
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
        } else {
          data = {
            ...resData,
            variant: "danger",
            message: resData.message,
            email,
          };
          toast.error( resData.message, {
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
        dispatch(isOtpReSend(data));
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
        toast.error( err.message, {
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

export const isOtpReSend = (data) => {
  return {
    type: OTP_RESENT,
    payload: data,
  };
};

export const setPassword = (payload) => {
  return (dispatch) => {
    dispatch(makeRequest());
    const url = `${process.env.REACT_APP_API_URL}/api/V1/auth/setPassword`;
    axios
      .post(url, payload)
      .then((res) => {
        const resData = res.data;
        let data;
        if (resData.success) {
          data = {
            ...resData,
            variant: "success",
            message: resData.message,
          };
          toast.success( resData.message, {
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
        } else {
          data = {
            ...resData,
            variant: "danger",
            message: resData.message,
          };
          toast.error( resData.message, {
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
        dispatch(isPasswordSet(data));
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
        toast.error( err.message, {
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

export const isPasswordSet = (data) => {
  return {
    type: SET_PASSWORD,
    payload: data,
  };
};

export const logInByPassword = (payload,rememberMe) => {
  return (dispatch) => {
    dispatch(makeRequest());
    const url = `${process.env.REACT_APP_API_URL}/api/V1/auth/signInByPassword`;
    axios
      .post(url, payload)
      .then((res) => {
        const resData = res.data;
        let data;
        if (resData.success) {
          const { token, userData } = resData.data;
          localStorage.setItem("accessToken", token);
          localStorage.setItem("userData", JSON.stringify(userData));
          if(rememberMe){
            localStorage.setItem("rememberMe", true);
          }
          data = {
            ...resData,
            variant: "success",
            message: resData.message,
            userData
          };
          toast.success( resData.message, {
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
        } else {
          data = {
            ...resData,
            variant: "danger",
            message: resData.message,
          };
          toast.error( resData.message, {
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
        dispatch(isLogInProcess(data));
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
        toast.error( err.message, {
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

export const isLogInProcess = (data) => {
  return {
    type: LOGIN_PROCESS,
    payload: data,
  };
};


