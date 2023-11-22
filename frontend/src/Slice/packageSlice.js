import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Redux action to get all the packages
export const fetchPackage = createAsyncThunk("fetchPackage", async () => {
  const response = await axios.get("/api/packages");
  return response.data;
});

const initialState = {
  loading: false,
  data: null,
  error: false,
};

export const packageSlice = createSlice({
  name: "package",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPackage.pending, (state, action) => {
      state.loading = true;
      state.data = null;
      state.error = false;
    });
    builder.addCase(fetchPackage.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchPackage.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.error = true;
    });
  },
});

export default packageSlice.reducer;
