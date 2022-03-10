import {combineReducers} from "redux";
import ingredientItemsReducer from "./ingredient-items";
import cartItemsReducer from "./cart"
import orderReducer from "./order"

export const rootReducer = combineReducers({
    ingredients: ingredientItemsReducer,
    cart: cartItemsReducer,
    order: orderReducer,
})
