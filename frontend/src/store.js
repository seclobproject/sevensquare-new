import { configureStore } from "@reduxjs/toolkit";
import packageReducer from "./Slice/packageSlice";
import userReducer from "./Slice/authSlice";

export const store = configureStore({
  reducer: {
    packageReducer,
    userLogin: userReducer,
  },
});
