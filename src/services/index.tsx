import {combineReducers} from "redux";
import ingredientItemsReducer from "./ingredient-items";
import cartItemsReducer from "./cart"

export const rootReducer = combineReducers({
    ingredients: ingredientItemsReducer,
    cart: cartItemsReducer
})
