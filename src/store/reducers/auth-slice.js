import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../../api/auth";

export const signup = createAsyncThunk("auth/signup", async (payload) => {
  const response = await authApi.signup(payload);
  console.log("Res: ", response);
  return response.data;
});

export const sendOtpToPhoneNumber = createAsyncThunk(
  "auth/sendOtpToPhoneNumber",
  async (payload) => {
    const response = await authApi.sendOtpToPhoneNumber(payload);
    return response.data;
  }
);

export const sendOtpToEmail = createAsyncThunk(
  "auth/sentOtpToEmail",
  async (payload) => {
    console.log(payload)
    const response = await authApi.sendOtpToEmail(payload);
    return response.data;
  }
);

export const verifyPhoneNumber = createAsyncThunk(
  "auth/verifyPhoneNumber",
  async (payload) => {
    console.log("Payload: ", payload);
    const response = await authApi.verifyPhoneNumber(payload);
    console.log(response);
    return response.data;
  }
);

export const userExists = createAsyncThunk(
  "auth/userExists",
  async (payload) => {
    console.log("Payload: ", payload);
    const response = await authApi.userExists(payload);
    console.log(response);
    return response;
  }
);

export const loginWithEmail = createAsyncThunk(
  "auth/loginWithEmail",
  async (payload) => {
    console.log("Payload: ", payload);
    const response = await authApi.loginWithEmail(payload);
    console.log("REsponse: ", response);
    return response;
  }
);

export const loginWithPhoneNumber = createAsyncThunk(
  "auth/loginWithPhoneNumber",
  async (payload) => {
    console.log("Payload: ", payload);
    const response = await authApi.loginWithPhoneNumber(payload);
    console.log(response);
    return response.data;
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    userName: null,
    authTokens: null,
    isAuthenticated: false,
    isPhoneVerified: false,
    error: null,
    message: null
  },
  reducers: {
    loginOnLoad: (state) => {
      if (localStorage.getItem("authTokens")) {
        state.isAuthenticated = true;
        state.authTokens = JSON.parse(localStorage.getItem("authTokens"))
        state.userName = localStorage.getItem("userName");
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userName = null;
      state.authTokens = null;
      localStorage.removeItem("authTokens")
      localStorage.removeItem("userName");
    },
  },
  extraReducers: {
    [loginWithEmail.pending]: (state) => {
      state.error = null;
    },
    [loginWithEmail.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      const { tokens: {accessToken, refreshToken}, user: {name} } = action.payload.data.data;
      state.userName = name;
      state.authTokens = { accessToken, refreshToken }  
      state.isPhoneVerified = true;
      state.error = null;
      localStorage.setItem("authTokens", JSON.stringify(state.authTokens))
      localStorage.setItem("userName", state.userName);
    },
    [loginWithEmail.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [signup.pending]: (state) => {
      state.error = null;
      state.message = null;
    },
    [signup.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      const { token: {accessToken, refreshToken}, user: {name, isPhoneVerified} } = action.payload.data;
      state.userName = name;
      state.accessToken = { accessToken, refreshToken }
      state.isPhoneVerified = isPhoneVerified;
      state.error = null;
      localStorage.setItem("authTokens", JSON.stringify(state.authTokens))
      localStorage.setItem("userName", state.userName);
    },
    [signup.rejected]: (state, action) => {
      console.log("Signup", action)
      state.error = action.error.message;
    },
    // ** Handling otp **
    [sendOtpToPhoneNumber.pending]: (state) => {
      state.error = null;
    },
    [sendOtpToPhoneNumber.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [sendOtpToPhoneNumber.fulfilled]: (state, action) => {
      state.error = null;
      state.message = action.payload.message;
    },
    [verifyPhoneNumber.pending]: (state) => {
      state.error = null;
    },
    [verifyPhoneNumber.rejected]: (state, action) => {
      state.error = action.error.message;
      state.message = null;
    },
    [verifyPhoneNumber.fulfilled]: (state, action) => {
      state.error = null;
      state.message = action.payload.message;
    },
    [sendOtpToEmail.pending]: (state) => {
      state.error = null;
    },
    [sendOtpToEmail.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [sendOtpToEmail.fulfilled]: (state, action) => {
      state.error = null;
      state.message = action.payload.message || "OTP sent to your email";
    },
    [userExists.pending]: (state) => {
      state.error = null;
    },
    [userExists.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [userExists.fulfilled]: (state, action) => {
      state.error = null;
      state.message = action.payload.message;
    },
    [loginWithEmail.pending]: (state) => {
      state.error = null;
      state.message = null;
    },
    [loginWithPhoneNumber.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [loginWithPhoneNumber.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      console.log("action data", action.payload.data)
      const { tokens: {accessToken, refreshToken}, user: {name, isPhoneVerified} } = action.payload.data;
      state.userName = name;
      state.authTokens = { accessToken, refreshToken}
      state.isPhoneVerified = isPhoneVerified;
      state.error = null;
      localStorage.setItem("access_token", state.access_token);
      localStorage.setItem("userName", state.userName);
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
