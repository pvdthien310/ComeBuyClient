import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import requestProdApi from '../../api/requestProductAPI';

export const doDistribution = createAsyncThunk('request/doDistribution', async (data, { rejectedWithValue }) => {
    const response = await requestProdApi.doDistribution(data);
    if (!response) {
        return rejectedWithValue('Distribution failed');
    }
    return response.data;
});

export const requestSlice = createSlice({
    name: 'request',
    initialState: {
        requestList: [],
        loading: false,
    },
    extraReducers: {
        [doDistribution.pending]: (state) => {
            state.loading = true;
        },
        [doDistribution.fulfilled]: (state, action) => {
            state.loading = false;
            state.branchList = action.payload;
        },
        [doDistribution.rejected]: (state) => {
            state.loading = false;
        },
    },
});
