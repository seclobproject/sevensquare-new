import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Redux action to get all the packages
export const fetchPackage = createAsyncThunk("fetchPackage", async () => {
  const token = localStorage.getItem("userInfo");
  const parsedData = JSON.parse(token);

  const config = {
    headers: {
      Authorization: `Bearer ${parsedData.access_token}`,
      "content-type": "application/json",
    },
  };

  const response = await axios.get(
    "http://localhost:6001/api/packages",
    config
  );
  return response.data.results;
});

const initialState = {
  loading: false,
  data: [],
  error: false,
};

export const packageSlice = createSlice({
  name: "package",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPackage.pending, (state) => {
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
////////////////////////////////////////////////////////////////////////
// post method

export const addNewPackage = createAsyncThunk(
  "addPackage",
  async (packageData) => {
    console.log(packageData);

    const token = localStorage.getItem("userInfo");
    const parsedData = JSON.parse(token);

    try {
      const response = await axios.post(
        "http://localhost:6001/api/packages/add-new-package",
        packageData,
        {
          headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log(data);

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// the slice

export const addPackageSlice = createSlice({
  name: "addPackage",
  initialState: {
    packages: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(addNewPackage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addNewPackage.fulfilled, (state, action) => {
      const newPackage = action.payload;
      state.packages.push(newPackage);
      state.loading = false;
    });

    builder.addCase(addNewPackage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// delete option

export const deletePackage = createAsyncThunk("deletePackage", async (id) => {
  const token = localStorage.getItem("userInfo");
  const parsedData = JSON.parse(token);

  try {
    const response = await axios.delete(
      `http://localhost:6001/api/packages/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${parsedData.access_token}`,
        },
      }
    );

    const data = response.data;
    console.log(data);

    return id;
  } catch (error) {
    throw new Error(error.message);
  }
});

// -----------------------slice

// export const deletePackageReducer = createSlice({
//   name: "deletePackage",
//   initialState: {
//     deletedPackageId: null,
//     loading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder.addCase(deletePackage.pending, (state) => {
//       state.loading = true;
//     });

//     builder.addCase(deletePackage.fulfilled, (state, action) => {
//       const deletedPackageId = action.payload;
//       state.deletedPackageId = deletedPackageId;
//       state.loading = false;

//       // updating.............
//       const updatedPackages = state.packages.filter(
//         (package) => package.id !== deletedPackageId
//       );
//       state.packages = updatedPackages;
//     });

//     builder.addCase(deletePackage.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.error.message;
//     });
//   },
// });

// -----------------------------------

export const packageReducer = packageSlice.reducer;
export const addPackageReducer = addPackageSlice.reducer;
// export const deletePackageReducer1 = deletePackageReducer.reducer;
