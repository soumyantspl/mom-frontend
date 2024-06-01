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
} from "../actions/authActions/actionTypes";


const initialObject = {
  loading: false,
  isOtpSend: false,
  userList: [],
  userObject: {},
  errorMessage: "",
  isSuccess: false,
  isOtpProcessed: false,
  variant: "",
  message: "",
  email: "",
  otp: null,
  isOtpVerifiedSuccess: false,
  isSetPassword: false,
  isLogInSuccess:false,
  isTimerOn:true
};

export const authReducer = (state = initialObject, action) => {
  console.log("----------------------->>>>>>", action.payload);
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loading: true,
        isOtpProcessed: false,
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
        message: action.payload.message,
        variant: action.payload.variant,
        isOtpProcessed: true,
        loading: false,
        email: action.payload.email,
        isSetPassword: action.payload.isSetPassword,
        isLogInProcessed:true,
        isTimerOn:true
      };

    case UPDATE_ISSUCCESS:
      return {
        ...state,
        isSuccess: action.payload,
        isOtpProcessed: false,
        isOtpVerifiedSuccess: false,
  
      };

    case OTP_RESENT:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        isSuccess: action.payload.success,
        isOtpProcessed: true,
        isSetPassword: action.payload.isSetPassword
      };

    // case SET_OTP:
    //   return {
    //     ...state,
    //     otp: action.payload,
    //   };

    case OTP_VERIFIED:
      return {
        ...state,
        isOtpVerifiedSuccess: action.payload.success,
        isSuccess: false,
        isOtpProcessed: true,
        data: action.payload.data,
        message: action.payload.message,
        loading: false,
      };
    case UPDATE_OTP_PROCESSED:
      return {
        ...state,
        isOtpProcessed: action.payload,
        isOtpVerifiedSuccess:false,
        isLogInProcessed:false
      };
    case PROCESSS_LOGOUT:
      return {
        ...state,
        isOtpProcessed: false,
        loading: false,
        isOtpVerifiedSuccess: false,
        isSetPassword: false,
        isLogInSuccess:false,
        isSuccess: false,
        isLogInProcessed:false,
      };

    case SET_PASSWORD:
      return {
        ...state,
        message: action.payload.message,
        isSuccess: action.payload.success,
        loading: false,
        isOtpProcessed: true,
        isOtpVerifiedSuccess: action.payload.success,
        isSetPassword:false
        
      };

    case LOGIN_PROCESS:
      return {
        ...state,
        isLogInSuccess:action.payload.success,
        loading: false,
        isLogInProcessed:true,
        isSuccess: action.payload.success,
        message: action.payload.message,
        isOtpProcessed: false,
    
      };

    default:
      return state;
  }
};
