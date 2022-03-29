import {combineReducers} from "redux";
import ingredientItemsReducer from "./getIngredients";
import cartItemsReducer from "./cart";
import orderReducer from "./order";
import accountReducer from "./account";
import resetPasswordReducer from "./reset-password";

export const rootReducer = combineReducers({
    ingredients: ingredientItemsReducer,
    cart: cartItemsReducer,
    order: orderReducer,
    account: accountReducer,
    resetPassword: resetPasswordReducer,
})
