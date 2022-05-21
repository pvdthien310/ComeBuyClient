import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FavoriteApi from './../../api/FavoriteAPI';

export const getAllFavorite = createAsyncThunk(
    'Favorite/getAll',
    // Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
    async (data, { rejectWithValue }) => {
        const response = await FavoriteApi.getAll()
        if (!response) {
            return rejectWithValue("Get All Failed");
        }
        else {
            return response.data;
        }
    }
);

export const updateFavorite = createAsyncThunk(
    'Favorite/updateFavorite',
    async (data, { rejectedWithValue }) => {
        const response = await FavoriteApi.updateFavorite(data)
        if (!response) {
            return rejectedWithValue("Updated failed !")
        } else {
            return response
        }
    }
);

export const deleteFavoriteById = createAsyncThunk(
    'Favorite/deleteFavoriteById',
    async (data, { rejectedWithValue }) => {
        const response = await FavoriteApi.deleteFavoriteById(data)
        if (!response) {
            return rejectedWithValue("Deleted failed !")
        } else {
            return response
        }
    }
);

export const addFavorite = createAsyncThunk(
    'Favorite/addFavorite',
    async (data, { rejectedWithValue }) => {
        const response = await FavoriteApi.addFavorite(data)
        if (!response) {
            return rejectedWithValue("Add Favorite failed")
        } else {
            return response
        }
    }
)

export const FavoriteSlice = createSlice({
    name: 'Favorite',
    initialState: {
        FavoriteList: [],
        loading: false
    },
    reducers: {
        FavoriteListChange: (state, action) => {
            state.FavoriteList = action.payload;
            localStorage.setItem('Favorite', JSON.stringify(action.payload))
        },
        FavoriteLoadingChange: (state, action) => {
            state.loading = action.payload;
        },
        addFavorite: (state, action) => {
            state.FavoriteList.push(action.payload)
        }

    },
    extraReducers: {
        [getAllFavorite.pending]: (state) => {
            state.loading = true;
        },
        [getAllFavorite.fulfilled]: (state, action) => {
            state.loading = false;
            state.branchList = action.payload;
        },
        [getAllFavorite.rejected]: (state, action) => {
            state.loading = false;
        },
        [updateFavorite.pending]: (state) => {
            state.loading = true;
            console.log(" pending...");
        },
        [updateFavorite.fulfilled]: (state, action) => {
            state.loading = false;
            console.log("fulfilled...");
        },
        [updateFavorite.rejected]: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
            console.log("rejected: " + state.errorMessage);
        },
        [deleteFavoriteById.pending]: (state) => {
            state.loading = true;
            console.log(" pending...");
        },
        [deleteFavoriteById.fulfilled]: (state, action) => {
            state.loading = false;
            console.log("fulfilled...");
        },
        [deleteFavoriteById.rejected]: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
            console.log("rejected: " + state.errorMessage);
        },
        [addFavorite.pending]: (state) => {
            state.loading = true;
            console.log(" pending...");
        },
        [addFavorite.fulfilled]: (state, action) => {
            state.loading = false;
            console.log("fulfilled...");
        },
        [addFavorite.rejected]: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
            console.log("rejected: " + state.errorMessage);
        },
    }
})