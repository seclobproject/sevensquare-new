import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../Constant";

// Edit Profile
export const addBonus = createAsyncThunk(
  "addBonus",
  async ({ user_Id, formData }) => {
    console.log(formData);
      const note = formData.note;
      const amount = formData.amount;

    const token = localStorage.getItem("userInfo");
    const parsedData = JSON.parse(token);

    const config = {
      headers: {
        Authorization: `Bearer ${parsedData.access_token}`,
        "content-type": "application/json",
      },
    };

    const response = await axios.post(
      `${URL}/api/admin/add-bonus`,
      {
        user_Id,
        note,
        amount,
      },
      config
    );

    return response.data;
  }
);
