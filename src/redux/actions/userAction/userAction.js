import { FETCH_SINGLE_USER, FAIL_REQUEST, MAKE_REQUEST, SET_EMPLOYEE_LIST } from "./actionTypes";
import axios from "axios";

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
        if (resData.success) {
          dispatch(fetchSingleUser(resData));
        }
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
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

        dispatch(setEmployeeList(resData));
      })
      .catch((err) => {
        console.log("err------------------------->>>>>>>", err);
        dispatch(failRequest(err.message));
      });
  };
};

export const setEmployeeList = (data) => {
  return {
    type: SET_EMPLOYEE_LIST,
    payload: data,
  };
};



