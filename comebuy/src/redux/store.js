import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "./slices/accountSlice";
import { featureSlice } from "./slices/featureSlice";
import { productSlice } from "./slices/productSlice";
import { invoiceSlice } from "./slices/invoiceSlice";
import { branchSlice } from "./slices/branchSlice";
import { productImageSlice } from "./slices/productImageSlice";
import { cartSlice } from "./slices/cartSlice";

const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        product: productSlice.reducer,
        feature: featureSlice.reducer,
        invoice: invoiceSlice.reducer,
        branch: branchSlice.reducer,
        productImage: productImageSlice.reducer,
        cart: cartSlice.reducer
    },
})

export default store;