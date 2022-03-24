import { configureStore } from "@reduxjs/toolkit";
import  accountSlice  from "./slices/accountSlice";
import  productSlice  from "./slices/productSlice";

const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        products: productSlice.reducer
    }
})

export default store;