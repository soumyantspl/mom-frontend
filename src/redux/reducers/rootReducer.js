
import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./authReducers";

export const rootReducer=combineReducers({auth:authReducer})