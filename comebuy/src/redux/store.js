import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "./slices/accountSlice";
import { featureSlice } from "./slices/featureSlice";
import { productSlice } from "./slices/productSlice";
import { invoiceSlice } from "./slices/invoiceSlice";
import { productImageSlice } from "./slices/productImageSlice";

const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        product: productSlice.reducer,
        feature: featureSlice.reducer,
        invoice: invoiceSlice.reducer,
        productImage: productImageSlice.reducer
    },
})

export default store;