import { configureStore } from "@reduxjs/toolkit";
import { addPackageReducer, packageReducer } from "./Slice/packageSlice";
import userReducer from "./Slice/authSlice";
import {
  getUserReducer,
  verifyUserReducer,
  getUserDetailReducer,
} from "./Slice/usersSlice";

export const store = configureStore({
  reducer: {
    packageReducer,
    userLogin: userReducer,
    addPackageReducer,
    getUserReducer,
    verifyUserReducer,
    getUserDetailReducer,
  },
});
