import {
    OTP_SENT,
  FAIL_REQUEST,
  MAKE_REQUEST,
} from "../actions/authActions/actionTypes";

const initialObject = {
  loading: true,
  isOtpSend:false,
  userList: [],
  userObject: {},
  errorMessage: "",
  isSuccess:false,
  variant:"success",
  message:""
};

export const authReducer = (state = initialObject, action) => {
  console.log("----------------------->>>>>>", action.payload);
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FAIL_REQUEST:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    // case GET_USER_LIST:
    //   return {
    //     ...state,
    //     loading: false,
    //     errorMessage: " ",
    //     userList: action.payload,
    //     userObject: {},
    //   };
   
    case OTP_SENT:
      return {
        ...state,
        errorMessage: action.payload.message,
        isSuccess: action.payload.success,
        message:action.payload.message,
        variant:action.payload.variant
      };
 

    default:
      return state;
  }
};
