import {
    FAIL_REQUEST,
    GET_MEETING_ROOM_LIST,
    MAKE_REQUEST
   
  } from "../actions/meetingRoomAction.js/actionTypes";
  
  const initialObject = {
    loading: false,
    message: "",
    totalCount: 0,
    isSuccess: false,
    meetingRoomList:[]
  };
  
  export const meetingRoomReducer = (state = initialObject, action) => {
    console.log("----------------------->>>>>>", action);
    switch (action.type) {
      case MAKE_REQUEST:
        return {
          ...state,
        //  loading: true,
          // meetingList: []
        };
      case FAIL_REQUEST:
        return {
          ...state,
          loading: false,
          message: action.payload.message,
        };
  
   
      case GET_MEETING_ROOM_LIST:
        return {
          ...state,
        //  loading: false,
          message: action.payload.message,
          meetingRoomList: action.payload.data.roomsDatas,
          isSuccess: action.payload.success,
        };
  
     
      default:
        return state;
    }
  };
  