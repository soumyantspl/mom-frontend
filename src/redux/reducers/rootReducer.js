
import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./authReducers";
import { meetingReducer } from "./meetingReducer";

export const rootReducer=combineReducers({auth:authReducer,meeting:meetingReducer})