import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../Constant";

// Redux action to get user
export const fetchPins = createAsyncThunk("fetchPins", async () => {
  const token = localStorage.getItem("userInfo");
  const parsedData = JSON.parse(token);

  const config = {
    headers: {
      Authorization: `Bearer ${parsedData.access_token}`,
      "content-type": "application/json",
    },
  };

  const response = await axios.get(
    `${URL}/api/admin/get-all-pins`,
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
      state.data = null;
      state.error = false;
    });
    builder.addCase(fetchPins.fulfilled, (state, action) => {
      state.pending = true;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchPins.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.error = true;
    });
  },
});

export const fetchPinsReducer = fetchPinsSlice.reducer;
