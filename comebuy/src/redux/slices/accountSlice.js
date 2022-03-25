import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../API/AccountAPI"

export const register = createAsyncThunk("account/register", async ({ dataForReg, toast }) => {
    try {
        const response = await api.register(dataForReg);
        toast.success("Register successfully")
    } catch (error) {
        console.log(error);
    }
})

const accountSlice = createSlice({
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
        error: ''
    },
    extraReducers: {
        [register.pending]: (state, action) => {
            state.loading = true
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload
        },
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        }
    }
})

export default accountSlice.reducer;