import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productAPI from "../../api/productAPI";

export const getAll = createAsyncThunk(
  'product/getAll',
  // Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
  async (data, { rejectWithValue }) => {
    const response = await productAPI.getAll()
    if (!response) {
      return rejectWithValue("Get All Failed");
    }
    else {
      return response;
    }
  }
);

export const editProduct = createAsyncThunk(
  'product/edit',
  // Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
  async (data, { rejectWithValue }) => {
    const response = await productAPI.edit(data)
    if (response.status != 200 && response != "Product was updated successfully.") {
      return rejectWithValue("Get All Failed");
    }
    else {
      return data;
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    productList: [],
    loading: false
  },
  reducers: {
    productListChange: (state, action) => {
      state.productList = action.payload;
    },
    productLoadingChange: (state, action) => {
      state.loading = action.payload;
    },
    addProduct: (state, action) => {
      state.productList.push(action.payload)
    }

  },
  extraReducers: {
    [getAll.pending]: (state) => {
      state.loading = true;
    },
    [getAll.fulfilled]: (state, action) => {
      state.loading = false;
      state.productList = action.payload;
    },
    [getAll.rejected]: (state, action) => {
      state.loading = false;
    },
    [editProduct.pending]: (state) => {
      /// Nothing
    },
    [editProduct.fulfilled]: (state, action) => {
      state.productList = state.productList.map(member => {
        if (member.productID == action.payload.productID)
          return action.payload
        else return member
      });
    },
    [editProduct.rejected]: (state, action) => {
      state.loading = false;
    }
  }
})