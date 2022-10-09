import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import branchApi from '../../api/branchAPI';

export const getAllBranch = createAsyncThunk(
    'branch/getAll',
    // Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
    async (data, { rejectWithValue }) => {
        const response = await branchApi.getAll();
        if (!response) {
            return rejectWithValue('Get All Failed');
        }
        return response.data;
    },
);

export const getBranchAndTotalStock = createAsyncThunk(
    'branch//getAllBranch/getTotalStock',
    async (data, { rejectWithValue }) => {
        const response = await branchApi.getBranchAndTotalStock();
        if (!response) {
            return rejectWithValue('Get Branches and Total stock failed');
        }
        return response.data;
    },
);

export const branchSlice = createSlice({
    name: 'branch',
    initialState: {
        branchList: [],
        loading: false,
    },
    reducers: {
        branchListChange: (state, action) => {
            state.branchList = action.payload;
        },
        branchLoadingChange: (state, action) => {
            state.loading = action.payload;
        },
        addbranch: (state, action) => {
            state.branchList.push(action.payload);
        },
    },
    extraReducers: {
        [getAllBranch.pending]: (state) => {
            state.loading = true;
        },
        [getAllBranch.fulfilled]: (state, action) => {
            state.loading = false;
            state.branchList = action.payload;
        },
        [getAllBranch.rejected]: (state) => {
            state.loading = false;
        },
        [getBranchAndTotalStock.pending]: (state) => {
            state.loading = true;
        },
        [getBranchAndTotalStock.fulfilled]: (state, action) => {
            state.loading = false;
            state.branchList = action.payload;
        },
        [getBranchAndTotalStock.rejected]: (state) => {
            state.loading = false;
        },
    },
});
