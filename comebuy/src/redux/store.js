import { configureStore } from "@reduxjs/toolkit";
import AccountSlice from "./slices/accountSlice";

const store = configureStore({
    reducer: {
        account: AccountSlice,
    }
})

export default store;