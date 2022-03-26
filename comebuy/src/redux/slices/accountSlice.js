import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import JWTApi from "../../API/JWTAPI";
import accountApi from "../../API/accountAPI";


export const login = createAsyncThunk(
  // Tên action
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
    errorMessage : "this is message"
  },
  reducers: {
    accountChange: (state, action) => {
      state.user = action.payload;
    },
    accountLoadingChange: (state, action) => {
      state.loading = action.payload;
    },

  },
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(login.pending, (state) => {
      // Bật trạng thái loading
      state.loading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(login.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.loading = false;
      state.user = action.payload;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(login.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.loading = false;
      state.errorMessage = action.payload;
    });
  },
})