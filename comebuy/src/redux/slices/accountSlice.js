import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import JWTApi from "../../API/JWTAPI";
import accountApi from "../../API/accountAPI";


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

export const register = createAsyncThunk("account/register", async ({ dataForReg, toast }) => {
  try {
    const response = await accountApi.register(dataForReg);
    toast.success("Register successfully")
  } catch (error) {
    console.log(error);
  }
})

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    user: {
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
    },
    loading: false,
    errorMessage: 'this is message'
  },
  extraReducers: {
    [register.pending]: (state, action) => {
      state.loading = true
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },

    [login.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    }
  }
})
