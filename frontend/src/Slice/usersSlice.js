import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET your(admin) user details
export const fetchProfileDetails = createAsyncThunk("fetchProfileDetails", async () => {
  const token = localStorage.getItem("userInfo");
  const parsedData = JSON.parse(token);

  const config = {
    headers: {
      Authorization: `Bearer ${parsedData.access_token}`,
      "content-type": "application/json",
    },
  };

  const response = await axios.post(
    "https://sevensquaregroup.in/api/users/fetch-profile",
    {},
    config
  );
  return response.data;

});

export const fetchProfileSlice = createSlice({
  name: "fetch-profile",
  initialState: {
    loading: false,
    data: [],
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfileDetails.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchProfileDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProfileDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

//Fetch/get all users
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
    "https://sevensquaregroup.in/api/users/get-users",
    config
  );
  return response.data;
});

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

// Verify user

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
    "https://sevensquaregroup.in/api/users/verify-user-payment",
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

// -----------------------------------------

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
        "https://sevensquaregroup.in/api/admin/get-profile",
        { userId },
        config
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

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

// Add new user

export const addNewUser = createAsyncThunk("addNewUser", async (user) => {
  
  const response = await axios.post(
    "https://sevensquaregroup.in/api/users/add-user-to-all",
    {
      sponser: user.sponser,
      email: user.email,
      name: user.username,
      password: user.password,
      phone: user.phone,
      address: user.address,
      packageChosen: user.packageChosen,
    }
  );

  return response.data;
});

export const getAddNewUser = createSlice({
  name: "getAddNewUser",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// GET your(admin) user details
export const getUserById = createAsyncThunk("getUserById", async (userId) => {
  const token = localStorage.getItem("userInfo");
  const parsedData = JSON.parse(token);

  const id = userId;

  const config = {
    headers: {
      Authorization: `Bearer ${parsedData.access_token}`,
      "content-type": "application/json",
    },
  };

  const response = await axios.post(
    `https://sevensquaregroup.in/api/users/get-user-by-id/${id}`,
    config
  );
  return response.data;

});

export const getUserByIdSlice = createSlice({
  name: "fetch-user-by-id",
  initialState: {
    loading: false,
    data: [],
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfileDetails.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchProfileDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProfileDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const fetchProfileReducer = fetchProfileSlice.reducer;
export const getUserReducer = getUserSlice.reducer;
export const verifyUserReducer = getVerifyUser.reducer;
export const getUserDetailReducer = getUserDetails.reducer;
export const getAddNewUserReducer = getAddNewUser.reducer;
export const getUserByIdReducer = getUserByIdSlice.reducer;