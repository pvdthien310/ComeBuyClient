import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import JWTApi from "../../api/JWTAPI";
import accountApi from "../../api/accountAPI";

const defaultUser = {
  "userID": "00000000-0000-0000-0000-000000000000",
  "name": "kkk",
  "dob": "kk",
  "avatar": "kk",
  "phoneNumber": "kkk",
  "email": "test.com",
  "password": "xxxxxxxxxxxxxxxxxxxx",
  "bio": "kkk",
  "address": "kk",
  "role": "kk",
  "sex": "kk"
}


export const login = createAsyncThunk(
  'account/login',
  // Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
  async (data, { rejectWithValue }) => {
    const response = await JWTApi.login(data.email, data.password)
    if (!response.accessToken) {
      return rejectWithValue("Login Failed");
    }
    else {
      const jsonData = await accountApi.getAccountbyEmail(data.email)
      localStorage.setItem('idUser', jsonData.userID);
      localStorage.setItem('role', jsonData.role);
      return jsonData;
    }
  }
);

export const getAccountWithID = createAsyncThunk(
  'account/findOne',
  async (data, { rejectedWithValue }) => {
    const response = await accountApi.getAccountWithID(data)
    if (!response) {
      return rejectedWithValue(" Find account failed")
    } else {
      return response.data
    }
  }
)

export const register = createAsyncThunk(
  "account/register",
  async ({ dataForReg }, { rejectWithValue }) => {
    try {
      const response = await accountApi.register(dataForReg);
      if (response.data === "Account existed!") {
        return rejectWithValue(false);
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  })

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    user: defaultUser,
    loading: false,
    errorMessage: 'this is message',
    isSignedIn: false,
    //isEmailExisted: false,
    isRegSuccess: false
  },
  reducers: {
    logout: (state) => {
      state.isSignedIn = false;
      state.user = defaultUser;
    },
  },
  extraReducers: {
    [register.pending]: (state, action) => {
      state.loading = true
      //state.isEmailExisted = false
      state.isRegSuccess = false
      console.log("Pending -  isSuccess = " + state.isRegSuccess);
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      //state.isEmailExisted = false;
      state.isRegSuccess = true;
      console.log("Fulfilled -  isSuccess = " + state.isRegSuccess);
      console.log("Registered successfully");
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
      //state.isEmailExisted = true;
      state.isRegSuccess = false;
      console.log("Rejected -  isSuccess = " + state.isRegSuccess);
      console.log("Email existed");
    },
    [login.pending]: (state) => {
      state.loading = true;
      console.log("Pending -  isSigning = " + state.isSignedIn);
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isSignedIn = true
      localStorage.setItem("role", state.user.role)
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
      console.log("Rejected -  isSigning = " + state.isSignedIn);
    },
    [getAccountWithID.pending]: (state, action) => {
      state.loading = true
      //state.isEmailExisted = false
      state.isRegSuccess = false
      console.log("Pending -  isSuccess = " + state.isRegSuccess);
    },
    [getAccountWithID.fulfilled]: (state, action) => {
      state.loading = false;
      // state.user = action.payload;
      //state.isEmailExisted = false;
      state.isRegSuccess = true;
      console.log("Fulfilled -  isSuccess = " + state.isRegSuccess);
      console.log("Registered successfully");
    },
    [getAccountWithID.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
      //state.isEmailExisted = true;
      state.isRegSuccess = false;
      console.log("can not find");
    },
  }
})
