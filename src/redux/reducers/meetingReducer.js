import {
  CREATE_MEETING_RESPONSE,
  FAIL_REQUEST,
  GET_ATTENDEES_LIST,
  GET_CREATE_MEETING_STEPS,
  GET_MEETING_LIST,
  MAKE_REQUEST,
  MAKE_RSVP_UPDATE_REQUEST,
  UPDATE_RSVP,
} from "../actions/meetingActions/actionTypes";

const initialObject = {
  loading: false,
  meetingList: [],
  message: "",
  totalCount: 0,
  isSuccess: false,
  statusData: ["closed", "scheduled", "rescheduled", "cancelled"],
  attendeesList: [],
  isRsvpUpdated: false,
  singleMeetingDetails: null,
  step: 0,
};

export const meetingReducer = (state = initialObject, action) => {
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

    case GET_MEETING_LIST:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        meetingList: action.payload.data?.meetingData,
        totalCount: action.payload.data?.totalCount,
        isSuccess: action.payload.success,
      };
    case GET_ATTENDEES_LIST:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        attendeesList: action.payload.data,
        isSuccess: action.payload.success,
      };

    case MAKE_RSVP_UPDATE_REQUEST:
      return {
        ...state,
        isRsvpUpdated: false,
        // meetingList: []
      };

    case UPDATE_RSVP:
      return {
        ...state,
        //  loading: false,
        message: action.payload.message,
        isRsvpUpdated: action.payload.success,
      };

    case CREATE_MEETING_RESPONSE:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        isSuccess: action.payload.success,
      };

    case GET_CREATE_MEETING_STEPS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        isSuccess: action.payload.success,
        singleMeetingDetails: action.payload.data,
        step: action.payload.data.step,
      };

    // case UPDATE_STEP:
    //   return {
    //     ...state,
    //     //  loading: false,
    //    step:action.payload
    //   };
    default:
      return state;
  }
};
