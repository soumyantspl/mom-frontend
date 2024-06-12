
import { FETCH_SINGLE_USER,MAKE_REQUEST,FAIL_REQUEST } from "../actions/userAction/actionTypes";
  
  const initialObject = {
    loading: false,
    message: "",
    totalCount: 0,
    isSuccess: false,
    userData:null
  };
  
  export const userReducer = (state = initialObject, action) => {
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
  
   
      case FETCH_SINGLE_USER:
        return {
          ...state,
        //  loading: false,
          message: action.payload.message,
          userData: action.payload.data,
          isSuccess: action.payload.success,
        };
  
     
      default:
        return state;
    }
  };
  