import { FETCH_SINGLE_USER, FAIL_REQUEST, MAKE_REQUEST, SET_EMPLOYEE_LIST, SET_DUPLICATE_USER_STATUS } from "./actionTypes";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { setInValidUser } from "../authActions/authAction";
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
export const fetchSingleUser = (data) => {
  return {
    type: FETCH_SINGLE_USER,
    payload: data,
  };
};

export const viewSingleUser = (userId,accessToken) => {
    console.log("userId----------------",userId)
  return (dispatch) => {
    dispatch(makeRequest());

    const url = `${process.env.REACT_APP_API_URL}/api/V1/employee/viewSingleEmployee/${userId}`;
    const headerObject = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };
    axios
      .get(url, headerObject)
      .then((res) => {
       
        const resData = res.data;
        console.log("resData-------------------------------->",resData)
        let data;
        if(resData.data?.isInValidUser){
          dispatch(setInValidUser(true));
          // toast.error(resData.message, {
          //   position: "top-right",
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "colored",
          //   // transition: Bounce,
          // });
        }
        if (resData.success) {
          dispatch(fetchSingleUser(resData));
        }
        else{
          dispatch(fetchSingleUser(resData));
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

export const getEmployeeList = (
  payload,
  accessToken
) => {
  return (dispatch) => {
    // dispatch(makeRequest());
    const webApiUrl = `${process.env.REACT_APP_API_URL}/api/V1/employee/listEmployee`;
    const headerObject = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };
    console.log("webApiUrl----------------", webApiUrl);
    console.log("accessToken------------>>>>>", accessToken);

    axios
      .post(webApiUrl,payload, headerObject)
      .then((result) => {
        console.log("result------------------------->>>>>>>", result);
        const resData = result.data;
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
        dispatch(setEmployeeList(resData));
      })
      .catch((err) => {
        console.log("err------------------------->>>>>>>", err);
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

export const setEmployeeList = (data) => {
  return {
    type: SET_EMPLOYEE_LIST,
    payload: data,
  };
};

export const checkDuplicateUser = (payload,accessToken) => {
  return (dispatch) => {
    dispatch(makeRequest());
    const webApiUrl = `${process.env.REACT_APP_API_URL}/api/V1/employee/checkDuplicateUser`;
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
        if (resData.success) {
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
        // else{
        //   toast.success("", {
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
        // }
        dispatch(setDuplicateUserStatus(resData));
       
      })
      .catch((err) => {
       
        console.log("err------------------------->>>>>>>", err);
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

export const setDuplicateUserStatus = (data) => {
  return {
    type: SET_DUPLICATE_USER_STATUS,
    payload: data,
  };
};




