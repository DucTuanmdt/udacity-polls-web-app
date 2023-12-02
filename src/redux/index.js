import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import questionReducer from "./questionSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    question: questionReducer,
  },
});
