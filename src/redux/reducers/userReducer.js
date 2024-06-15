import {
  FETCH_SINGLE_USER,
  MAKE_REQUEST,
  FAIL_REQUEST,
  SET_EMPLOYEE_LIST,
  SET_DUPLICATE_USER_STATUS,
} from "../actions/userAction/actionTypes";

const initialObject = {
  loading: false,
  message: "",
  totalCount: 0,
  isSuccess: false,
  userData: null,
  employeeList: [],
  isDuplicateUser: false,
};

export const userReducer = (state = initialObject, action) => {
  console.log("----------------------->>>>>>", action);
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loading: true,
        isDuplicateUser:false
        // meetingList: []
      };
    case FAIL_REQUEST:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };

    case FETCH_SINGLE_USER:
      return {
        ...state,
        loading: false,
        //  loading: false,
        message: action.payload.message,
        userData: action.payload.data,
        isSuccess: action.payload.success,
      };

    case SET_EMPLOYEE_LIST:
      return {
        ...state,
        //  loading: false,
        message: action.payload.message,
        employeeList: action.payload.data.employeeData,
        isSuccess: action.payload.success,
      };

    case SET_DUPLICATE_USER_STATUS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        isSuccess: action.payload.success,
        isDuplicateUser: action.payload.data.isDuplicateUser,
      };

    default:
      return state;
  }
};
