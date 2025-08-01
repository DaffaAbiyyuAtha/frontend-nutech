import auth from "./auth";
import profile from "./profile";
import buying from "./buying";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  auth,
  profile,
  buying,
});

export default reducer;