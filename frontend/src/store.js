import { configureStore } from "@reduxjs/toolkit";
import { addPackageReducer, packageReducer, packageForAllReducer } from "./Slice/packageSlice";
import userReducer from "./Slice/authSlice";
import {
  getUserReducer,
  verifyUserReducer,
  getUserDetailReducer,
  getAddNewUserReducer
} from "./Slice/usersSlice";
import { fetchTransactionReducer, verifyTransactionReducer } from "./Slice/transactionSlice";

export const store = configureStore({
  reducer: {
    packageReducer,
    userLogin: userReducer,
    addPackageReducer,
    getUserReducer,
    verifyUserReducer,
    getUserDetailReducer,
    packageForAllReducer,
    getAddNewUserReducer,
    fetchTransactionReducer,
    verifyTransactionReducer
  },
});
