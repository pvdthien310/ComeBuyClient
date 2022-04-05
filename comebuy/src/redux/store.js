import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "./slices/accountSlice";
import { productSlice } from "./slices/productSlice";
import { invoiceSlice } from "./slices/invoiceSlice";

const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        product: productSlice.reducer,
        invoice: invoiceSlice.reducer
    },
})

export default store;