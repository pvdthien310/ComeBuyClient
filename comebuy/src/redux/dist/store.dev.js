"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _accountSlice = require("./slices/accountSlice");

var _featureSlice = require("./slices/featureSlice");

var _productSlice = require("./slices/productSlice");

var _invoiceSlice = require("./slices/invoiceSlice");

var _branchSlice = require("./slices/branchSlice");

var _productImageSlice = require("./slices/productImageSlice");

var _cartSlice = require("./slices/cartSlice");

var _favoriteSlice = require("./slices/favoriteSlice");

var _stockSlice = require("./slices/stockSlice");

var _requestSlice = require("./slices/requestSlice");

var store = (0, _toolkit.configureStore)({
  reducer: {
    account: _accountSlice.accountSlice.reducer,
    product: _productSlice.productSlice.reducer,
    feature: _featureSlice.featureSlice.reducer,
    invoice: _invoiceSlice.invoiceSlice.reducer,
    branch: _branchSlice.branchSlice.reducer,
    productImage: _productImageSlice.productImageSlice.reducer,
    cart: _cartSlice.cartSlice.reducer,
    favorite: _favoriteSlice.favoriteSlice.reducer,
    stock: _stockSlice.stockSlice.reducer,
    request: _requestSlice.requestSlice.reducer
  }
});
var _default = store;
exports["default"] = _default;