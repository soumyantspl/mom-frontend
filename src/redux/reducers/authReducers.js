import {
    OTP_SENT,
  FAIL_REQUEST,
  MAKE_REQUEST,
  UPDATE_ISSUCCESS
} from "../actions/authActions/actionTypes";

const initialObject = {
  loading: false,
  isOtpSend:false,
  userList: [],
  userObject: {},
  errorMessage: "",
  isSuccess:false,
  isOtpProcessed:false,
  variant:"",
  message:"",
  email:"",
  otp:null
};

export const authReducer = (state = initialObject, action) => {
  console.log("----------------------->>>>>>", action.payload);
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loading: true,
        isOtpProcessed:false
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
        variant:action.payload.variant,
        isOtpProcessed:true,
        loading: false,
        email:action.payload.email
      };
      
      case UPDATE_ISSUCCESS:
        return {
          ...state,
          isSuccess: action.payload,
          isOtpProcessed:false
        };

          // case SET_OTP:
          //   return {
          //     ...state,
          //     otp: action.payload,
          //   };

    default:
      return state;
  }
};
