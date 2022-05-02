import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartApi from './../../api/cartAPI';

export const getAllCart = createAsyncThunk(
    'cart/getAll',
    // Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
    async (data, { rejectWithValue }) => {
        const response = await cartApi.getAll()
        if (!response) {
            return rejectWithValue("Get All Failed");
        }
        else {
            return response.data;
        }
    }
);

export const branchSlice = createSlice({
    name: 'cart',
    initialState: {
        cartList: [],
        loading: false
    },
    reducers: {
        cartListChange: (state, action) => {
            state.cartList = action.payload;
        },
        cartLoadingChange: (state, action) => {
            state.loading = action.payload;
        },
        addCart: (state, action) => {
            state.cartList.push(action.payload)
        }

    },
    extraReducers: {
        [getAllCart.pending]: (state) => {
            state.loading = true;
        },
        [getAllCart.fulfilled]: (state, action) => {
            state.loading = false;
            state.branchList = action.payload;
        },
        [getAllCart.rejected]: (state, action) => {
            state.loading = false;
        },
    }
})