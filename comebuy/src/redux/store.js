import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "./slices/accountSlice";
import { FeatureSlice } from "./slices/featureSlice";
import { productSlice } from "./slices/productSlice";

const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        product: productSlice.reducer,
        feature: FeatureSlice.reducer
    },
})

export default store;