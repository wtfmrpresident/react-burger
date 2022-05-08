import {combineReducers} from "@reduxjs/toolkit";
import ingredientItemsSlice from "./get-ingredients";
import cartItemsSlice from "./cart";
import orderSlice from "./order";
import accountSlice from "./account";
import resetPasswordSlice from "./reset-password";
import orderSocketSlice from "./order-socket";

export const rootReducer = combineReducers({
    ingredients: ingredientItemsSlice.reducer,
    cart: cartItemsSlice.reducer,
    order: orderSlice.reducer,
    account: accountSlice.reducer,
    resetPassword: resetPasswordSlice.reducer,
    orderSocket: orderSocketSlice.reducer,
})
