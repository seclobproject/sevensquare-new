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
      "http://localhost:6001/api/wallet/transactions",
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
  async ({referenceId, userId, transId}) => {
    const token = localStorage.getItem("userInfo");
    const parsedData = JSON.parse(token);

    const config = {
      headers: {
        Authorization: `Bearer ${parsedData.access_token}`,
        "content-type": "application/json",
      },
    };

    const response = await axios.post(
      "http://localhost:6001/api/wallet/verify-transaction",
      { referenceId, userId, transId },
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
      "http://localhost:6001/api/wallet/all-transactions",
      config
    );
    
    return response.data;

  }
);

export const fetchTransactionReducer = fetchTransactionSlice.reducer;
export const verifyTransactionReducer = verifyTransactionSlice.reducer;
