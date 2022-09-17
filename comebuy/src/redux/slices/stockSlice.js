import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import stockApi from '../../api/stockAPI';

export const dealRemain = createAsyncThunk('stock/dealRemain', async (data, { rejectedWithValue }) => {
    const response = await stockApi.dealRemain(data);
    if (!response) {
        return rejectedWithValue('Updated failed !');
    }
    return response;
});

export const stockSlice = createSlice({
    name: 'stock',
    initialState: {
        stockList: [],
        loading: false,
    },
    reducers: {
        branchListChange: (state, action) => {
            state.stockList = action.payload;
        },
        stockLoadingChange: (state, action) => {
            state.loading = action.payload;
        },
        addStock: (state, action) => {
            state.stockList.push(action.payload);
        },
    },
    extraReducers: {
        [dealRemain.pending]: (state) => {
            state.loading = true;
        },
        [dealRemain.fulfilled]: (state, action) => {
            state.loading = false;
            state.branchList = action.payload;
        },
        [dealRemain.rejected]: (state) => {
            state.loading = false;
        },
    },
});
