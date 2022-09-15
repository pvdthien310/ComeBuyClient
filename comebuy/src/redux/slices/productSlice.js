import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productAPI from '../../api/productAPI';

export const getAllProduct = createAsyncThunk(
    'product/getAll',
    // Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
    async (data, { rejectWithValue }) => {
        const response = await productAPI.getAll();
        if (!response) {
            return rejectWithValue('Get All Failed');
        }
        // console.log(response)
        return response;
    },
);

export const editProduct = createAsyncThunk(
    'product/edit',
    // Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
    async (data, { rejectWithValue }) => {
        const response = await productAPI.edit(data);
        if (response.status !== 200 && response !== 'Product was updated successfully.') {
            return rejectWithValue('Get All Failed');
        }
        const response2 = await productAPI.getProductWithID(data.productID);
        if (response2.status !== 200) {
            return rejectWithValue('Get All Failed');
        }
        return response2.data;
    },
);

export const deleteProductByID = createAsyncThunk(
    'product/deletebyid',
    // Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
    async (productID, { rejectWithValue }) => {
        const response = await productAPI.deleteByID(productID);
        if (response.status !== 200) return rejectWithValue('Get All Failed');
        return productID;
    },
);

export const getProductWithID = createAsyncThunk('product/findOne', async (data, { rejectedWithValue }) => {
    const response = await productAPI.getProductWithID(data);
    if (!response) {
        return rejectedWithValue(' Find product failed');
    }
    return response.data;
});

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        productList: [],
        loading: false,
    },
    reducers: {
        productListChange: (state, action) => {
            state.productList = action.payload;
        },
        productLoadingChange: (state, action) => {
            state.loading = action.payload;
        },
        addProduct: (state, action) => {
            state.productList.push(action.payload);
        },
    },
    extraReducers: {
        [getAllProduct.pending]: (state) => {
            state.loading = true;
        },
        [getAllProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.productList = action.payload;
        },
        [getAllProduct.rejected]: (state) => {
            state.loading = false;
        },
        [editProduct.fulfilled]: (state, action) => {
            state.productList = state.productList.map((member) => {
                if (member.productID === action.payload.productID) return action.payload;
                return member;
            });
        },
        [editProduct.rejected]: (state) => {
            state.loading = false;
        },
        [getProductWithID.pending]: (state) => {
            state.loading = true;
            console.log('Start slice');
        },
        [getProductWithID.fulfilled]: (state) => {
            state.loading = false;
            console.log('Successfully');
        },
        [getProductWithID.rejected]: (state) => {
            state.loading = false;
        },
        [deleteProductByID.pending]: (state) => {
            state.loading = true;
            console.log('Start slice');
        },
        [deleteProductByID.fulfilled]: (state, action) => {
            state.productList = state.productList.filter((member) => member.productID !== action.payload);
            console.log('Successfully');
        },
        [deleteProductByID.rejected]: (state) => {
            state.loading = false;
        },
    },
});
