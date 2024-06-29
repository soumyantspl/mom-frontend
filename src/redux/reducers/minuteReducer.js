import {
  FAIL_REQUEST,
  CREATE_MINUTE_RESPONSE,
  MAKE_REQUEST,
} from "../actions/minuteActions/actionTypes";

const initialObject = {
  loading: false,
  message: "",
  isSuccess: false,
  isMinutesCreated: false,
};

export const minuteReducer = (state = initialObject, action) => {
  console.log("----------------------->>>>>>", action);
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loading: true,
        // meetingList: []
      };
    case FAIL_REQUEST:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };

    case CREATE_MINUTE_RESPONSE:
      return {
        ...state,
         loading: false,
        message: action.payload.message,
        isMinutesCreated: action.payload.success,
        isSuccess: action.payload.success,
      };

    default:
      return state;
  }
};
