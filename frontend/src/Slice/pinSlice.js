import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Redux action to get user
export const fetchPins = createAsyncThunk("fetchPins", async () => {
    
  const config = {
    headers: { "content-type": "application/json" },
  };

  const response = await axios.post(
    "http://localhost:6001/api/admin/get-all-pins",
    config
  );

  return response.data;
});

const fetchPinsSlice = createSlice({
  name: "fetchPins",
  initialState: {
    loading: false,
    data: [],
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPins.pending, (state) => {
      state.pending = true;
      state.userInfo = null;
      state.error = false;
    });
    builder.addCase(fetchPins.fulfilled, (state, action) => {
      state.pending = true;
      state.userInfo = action.payload;
      state.error = false;
    });
    builder.addCase(fetchPins.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.error = true;
    });
  },
});

export const fetchPinsReducer = fetchPinsSlice.reducer;