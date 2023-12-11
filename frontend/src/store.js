import { configureStore } from "@reduxjs/toolkit";
import {
  addPackageReducer,
  packageReducer,
  packageForAllReducer,
} from "./Slice/packageSlice";
import userReducer from "./Slice/authSlice";
import {
  fetchProfileReducer,
  getUserReducer,
  verifyUserReducer,
  getUserDetailReducer,
  getAddNewUserReducer,
  getUserByIdReducer,
} from "./Slice/usersSlice";
import {
  fetchTransactionReducer,
  verifyTransactionReducer,
  rejectTransactionReducer,
} from "./Slice/transactionSlice";
import { fetchPinsReducer } from "./Slice/pinSlice";

export const store = configureStore({
  reducer: {
    fetchProfileReducer,
    packageReducer,
    userLogin: userReducer,
    addPackageReducer,
    getUserReducer,
    verifyUserReducer,
    getUserDetailReducer,
    packageForAllReducer,
    getAddNewUserReducer,
    fetchTransactionReducer,
    verifyTransactionReducer,
    rejectTransactionReducer,
    getUserByIdReducer,
    fetchPinsReducer,
  },
});
