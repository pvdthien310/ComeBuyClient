import { createSlice } from "@reduxjs/toolkit";

export default accountSlice = createSlice({
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
        loading: false
    },
    reducers: {
        accountChange: (state, action) => {
            state.user = action.payload;
        },
        accountLoadingChange: (state, action) => {
            state.loading = action.payload;
        },

    }
})