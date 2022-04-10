import {combineReducers} from "@reduxjs/toolkit";
import ingredientItemsSlice from "./getIngredients";
import cartItemsSlice from "./cart";
import orderSlice from "./order";
import accountSlice from "./account";
import resetPasswordSlice from "./reset-password";

export const rootReducer = combineReducers({
    ingredients: ingredientItemsSlice.reducer,
    cart: cartItemsSlice.reducer,
    order: orderSlice.reducer,
    account: accountSlice.reducer,
    resetPassword: resetPasswordSlice.reducer,
})
