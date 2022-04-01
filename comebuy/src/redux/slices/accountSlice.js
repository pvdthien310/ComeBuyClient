import { createSlice, createAsyncThunk, isFulfilled } from "@reduxjs/toolkit";

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
      return jsonData;
    }
  }
);

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
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isSignedIn = true
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    }
  }
})
