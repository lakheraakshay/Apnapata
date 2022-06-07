import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as servicesApi from "../../api/services";

export const createService = createAsyncThunk(
  "services/create",
  async payload => {
    const response = await servicesApi.createService(payload);
    return response.data;
  }
);

export const getAllContructions = createAsyncThunk(
  "services/constructions/all",
  async payload => {
    const response = await servicesApi.getAllConstruction(payload);
    return response.data
  }
)

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    values: {},
    error: "",
    constructions: [],
  },
  reducers: {
    update: (state, action) => {
      state.values = action.payload;
    }
  },
  extraReducers: {
    [createService.fulfilled]: state => {
      state.error = "";
      state.values = {};
    },
    [createService.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [getAllContructions.fulfilled]: (state, action) => {
      state.constructions = action.payload.data
    }
  }
});

export const servicesActions = servicesSlice.actions;
export default servicesSlice.reducer;
