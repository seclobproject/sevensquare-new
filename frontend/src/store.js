import { configureStore } from "@reduxjs/toolkit";
import packageReducer from "./Slice/packageSlice";

export const store = configureStore({
  reducer: {
    packageReducer,
  },
});
