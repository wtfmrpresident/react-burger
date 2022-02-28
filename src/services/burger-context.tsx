import React, {Dispatch} from "react";
import IBurgerItem from "../interfaces/IBurgerItem";
import {ICartActions} from "./cart-reducer";

interface IIngredientItems {
    ingredientItems: IBurgerItem[]
}

interface ICartItems {
    cartItemsState: IBurgerItem[],
    cartItemDispatcher: Dispatch<ICartActions>
}

export const IngredientItemsContext = React.createContext<IIngredientItems>({ingredientItems: []})
export const CartItemsContext = React.createContext<ICartItems>({
    cartItemDispatcher(value: ICartActions): void {
    }, cartItemsState: []})
