import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTransactions = createAsyncThunk(
  "fetchTransactions",
  async () => {
    const token = localStorage.getItem("userInfo");
    const parsedData = JSON.parse(token);

    const config = {
      headers: {
        Authorization: `Bearer ${parsedData.access_token}`,
        "content-type": "application/json",
      },
    };

    const response = await axios.get(
      "https://sevensquaregroup.in/api/wallet/transactions",
      config
    );
    return response.data;
  }
);

export const fetchTransactionSlice = createSlice({
  name: "get-user",
  initialState: {
    loading: false,
    data: [],
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const verifyTransaction = createAsyncThunk(
  "verify-transaction",
  async ({ userId, transId }) => {
    const token = localStorage.getItem("userInfo");
    const parsedData = JSON.parse(token);

    const config = {
      headers: {
        Authorization: `Bearer ${parsedData.access_token}`,
        "content-type": "application/json",
      },
    };

    const response = await axios.post(
      "https://sevensquaregroup.in/api/wallet/verify-transaction",
      { userId, transId },
      config
    );

    return response.data;
  }
);

export const verifyTransactionSlice = createSlice({
  name: "get-user",
  initialState: {
    loading: false,
    data: [],
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(verifyTransaction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(verifyTransaction.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(verifyTransaction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const rejectTransaction = createAsyncThunk(
  "reject-transaction",
  async ({ userId, transId }) => {
    const token = localStorage.getItem("userInfo");
    const parsedData = JSON.parse(token);

    const config = {
      headers: {
        Authorization: `Bearer ${parsedData.access_token}`,
        "content-type": "application/json",
      },
    };

    const response = await axios.post(
      "https://sevensquaregroup.in/api/wallet/reject-transaction",
      { userId, transId },
      config
    );

    return response.data;
  }
);

export const getAllTransactions = createAsyncThunk(
  "getAllTransactions",
  async () => {
    const token = localStorage.getItem("userInfo");
    const parsedData = JSON.parse(token);

    const config = {
      headers: {
        Authorization: `Bearer ${parsedData.access_token}`,
        "content-type": "application/json",
      },
    };

    const response = await axios.get(
      "https://sevensquaregroup.in/api/wallet/all-transactions",
      config
    );

    return response.data;
  }
);

export const fetchTransactionReducer = fetchTransactionSlice.reducer;
export const verifyTransactionReducer = verifyTransactionSlice.reducer;
