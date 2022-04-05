import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import invoiceAPI from "../../api/invoiceAPI";

export const getAll = createAsyncThunk(
    'invoice/getAll',
    // Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
    async (data, { rejectWithValue }) => {
        const response = await invoiceAPI.getAll()
        if (!response) {
            return rejectWithValue("Get All Failed");
        }
        else {
            return response;
        }
    }
);

export const updateInvoice = createAsyncThunk(
    'invoice/updateInvoice',
    async (invoiceID, { rejectedWithValue }) => {
        const response = await invoiceAPI.updateInvoice(invoiceID)
        if (!response) {
            return rejectedWithValue("Updated failed !")
        } else {
            return response
        }
    }
);

export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState: {
        invoiceList: [],
        loading: false
    },
    reducers: {
        invoiceListChange: (state, action) => {
            state.invoiceList = action.payload;
        },
        invoiceLoadingChange: (state, action) => {
            state.loading = action.payload;
        },
        addInvoice: (state, action) => {
            state.invoiceList.push(action.payload)
        },
        // updateInvoice: (state, action) => {
        //     for (let i = 0; i < state.invoiceList.length; i++) {
        //         if (state.invoiceList[i].invoiceID === action.payload.invoiceID) {

        //         }
        //     }
        // }

    },
    extraReducers: {
        [getAll.pending]: (state) => {
            state.loading = true;
        },
        [getAll.fulfilled]: (state, action) => {
            state.loading = false;
            state.invoiceList = action.payload;
        },
        [getAll.rejected]: (state, action) => {
            state.loading = false;
        }
    }
})