import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsersList = createAsyncThunk("fetchUsersList", async () => {
  const token = localStorage.getItem("userInfo");
  const parsedData = JSON.parse(token);

  const config = {
    headers: {
      Authorization: `Bearer ${parsedData.access_token}`,
      "content-type": "application/json",
    },
  };

  const response = await axios.get(
    "http://localhost:6001/api/users/get-users",
    config
  );
  return response.data;
});

//slice

export const getUserSlice = createSlice({
  name: "get-user",
  initialState: {
    loading: false,
    data: [],
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersList.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchUsersList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsersList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// -----------------------------------------

export const verifyUsers = createAsyncThunk("verifyUsers", async (userId) => {
  const token = localStorage.getItem("userInfo");
  const parsedData = JSON.parse(token);

  const config = {
    headers: {
      Authorization: `Bearer ${parsedData.access_token}`,
      "content-type": "application/json",
    },
  };

  const response = await axios.post(
    "http://localhost:6001/api/users/verify-user-payment",
    { userId },
    config
  );

  return response.data;
});

export const getVerifyUser = createSlice({
  name: "verify-User",
  initialState: {
    loading: false,
    data: [],
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(verifyUsers.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(verifyUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(verifyUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

//get user Details

export const userDetails = createAsyncThunk(
  "get-userDetails",
  async (userId) => {
    const token = localStorage.getItem("userInfo");
    const parsedData = JSON.parse(token);

    const config = {
      headers: {
        Authorization: `Bearer ${parsedData.access_token}`,
        "content-type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:6001/api/admin/get-profile",
        { userId },
        config
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

// --------------response

export const getUserDetails = createSlice({
  name: "user-Details",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(userDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const getUserReducer = getUserSlice.reducer;
export const verifyUserReducer = getVerifyUser.reducer;
export const getUserDetailReducer = getUserDetails.reducer;
