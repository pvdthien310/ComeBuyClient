import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const currentUser = (state => state.account.user)
export const loading_user = (state) => state.account.loading
export const messageError = (state) => state.account.errorMessage
export const productListSelector = (state) => state.products.productList