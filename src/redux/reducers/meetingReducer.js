import {
  FAIL_REQUEST,
  GET_MEETING_LIST,
  MAKE_REQUEST,
} from "../actions/meetingActions.js/actionTypes";

const initialObject = {
  loading: false,
  meetingList: [],
  message: "",
  totalCount:0,
  isSuccess:false

};

export const meetingReducer = (state = initialObject, action) => {
  console.log("----------------------->>>>>>", action.payload);
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loading: true,
        meetingList: []
      };
    case FAIL_REQUEST:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };

    case GET_MEETING_LIST:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        meetingList: action.payload.data?.meetingData,
        totalCount:action.payload.data?.totalCount,
        isSuccess: action.payload.success
      };

    default:
      return state;
  }
};