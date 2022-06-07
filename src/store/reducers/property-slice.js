import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as propertyApi from "../../api/property";

export const createProperty = createAsyncThunk(
  "property/create",
  async (payload) => {
    console.log("payload create: ", payload);
    const response = await propertyApi.createProperty(payload);
    console.log("response create: ", response);
    return response.data;
  }
);

export const getProperties = createAsyncThunk(
  "properties/get",
  async (payload) => {
    const response = await propertyApi.getProperties(payload);
    return response.data;
  }
);

export const getProperty = createAsyncThunk("property/get", async (payload) => {
  console.log("property payload: ", payload);
  const response = await propertyApi.getProperty(payload);
  return response.data;
});

export const getPropertyType = createAsyncThunk('/propertyType/all', async () => {
  const response = await propertyApi.getPropertyType();
  return response.data;
})

export const getAreaUnit = createAsyncThunk(
  "property/areaunit",
  async (_, { __, dispatch }) => {
    dispatch(getAmenit());
    const response = await fetch(
      "https://apnapata.herokuapp.com/api/v1/areaunit/all?status=true"
    )
      .then((res) => res.json())
      .then((data) => data.data);
    return response;
  }
);

export const getAmenit = createAsyncThunk("property/aminities", async () => {
  const response = await fetch(
    "https://apnapata.herokuapp.com/api/v1/amenities_nearBy/all?status=true"
  )
    .then((res) => res.json())
    .then((data) => data.data);
  return response;
});

export const PostPropertySlice = createSlice({
  name: "property",
  initialState: {
    values: {},
    error: "",
    properties: [],
    property: {},
    propertyType: [],
    forSubmit: {},
    areaUnits: [],
    amenities: [],
    nearby: [],
  },
  reducers: {
    update: (state, action) => {
      state.values = {
        ...state.values,
        next:
          state.values.next < action.payload.next
            ? action.payload.next
            : state.values.next,
        ...action.payload,
      };
    },
    updateLocationsForSubmit: (state, action) => {
      state.forSubmit = {
        ...action.payload,
      };
    },
  },
  extraReducers: {
    [createProperty.pending]: (state, action) => {
      console.log("payload: ", action);
      state.error = "";
    },
    [createProperty.fulfilled]: (state, action) => {
      console.log("payload: ", action);
      state.values = {};
      state.error = "";
    },
    [createProperty.rejected]: (state, action) => {
      console.log("payload: ", action);
      state.error = action.error.message;
    },
    [getProperties.fulfilled]: (state, action) => {
      state.properties = action.payload.data;
    },
    [getProperty.pending]: (state, action) => {
      console.log("action", action);
      state.property = {};
    },
    [getProperty.fulfilled]: (state, action) => {
      console.log(action);
      state.property = action.payload.data;
    },
    [getProperty.rejected]: (state, action) => {
      console.log("action", action);
      state.error = action.error.message;
    },
    [getPropertyType.fulfilled]: (state, action) => {
      state.propertyType = action.payload.data;
      state.error = "";
    },
    [getPropertyType.rejected]: (state, action) => {
      state.error = action.error.message;
      state.propertyType = [];
    },
    [getAreaUnit.fulfilled]: (state, { payload }) => {
      const temp = [""];
      payload.forEach((data) => temp.push(data.name));
      state.areaUnits = temp;
    },
    [getAmenit.fulfilled]: (state, { payload }) => {
      const nearby = [];
      const ameni = [];
      payload.forEach((item) => {
        if (item.type === "NearBy") {
          nearby.push({ name: item.name, _id: item._id });
        } else {
          ameni.push({ name: item.name, _id: item._id });
        }
      });
      state.amenities = ameni;
      state.nearby = nearby;
    },
  },
});

export const postPropertyActions = PostPropertySlice.actions;
export default PostPropertySlice.reducer;
