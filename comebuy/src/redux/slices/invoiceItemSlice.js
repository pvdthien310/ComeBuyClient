import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import invoiceItemAPI from '../../api/invoiceItemAPI';

export const addInvoiceItem = createAsyncThunk('invoiceItem/addInvoiceItem', async (data, { rejectWithValue }) => {
    try {
        const response = await invoiceItemAPI.addInvoiceItem(data);
        if (!response) {
            return rejectWithValue();
        }
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const invoiceItemSlice = createSlice({
    name: 'invoiceItem',
    initialState: {
        invoiceItemList: [],
        loading: false,
    },
    extraReducers: {
        // [updateInvoice.pending]: (state) => {
        //     state.loading = true;
        // },
        // [updateInvoice.fulfilled]: (state, action) => {
        //     state.loading = false;
        // },
        // [updateInvoice.rejected]: (state, action) => {
        //     state.loading = false;
        // },
        [addInvoiceItem.pending]: (state) => {
            state.loading = true;
        },
        [addInvoiceItem.fulfilled]: (state) => {
            state.loading = false;
        },
        [addInvoiceItem.rejected]: (state) => {
            state.loading = false;
        },
    },
});
