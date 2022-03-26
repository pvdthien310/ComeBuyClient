import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        productList: [],
        loading: false
    },
    reducers: {
        productListChange: (state, action) => {
            state.productList = action.payload;
        },
        productLoadingChange: (state, action) => {
            state.loading = action.payload;
        },
        addProduct: (state, action) => {
            state.productList.push(action.payload)
        }

    }
})