import { createSelector } from "@reduxjs/toolkit";

export const currentUser = (state) => state.account.user
//export const productListSelector = (state) => state.products.productList