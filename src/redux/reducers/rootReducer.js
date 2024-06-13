import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./authReducers";
import { meetingReducer } from "./meetingReducer";
import { userReducer } from "./userReducer";
import { meetingRoomReducer } from "./meetingRoomReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  meeting: meetingReducer,
  user: userReducer,
  meetingRoom: meetingRoomReducer
});
