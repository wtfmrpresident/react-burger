import React, {Dispatch, SetStateAction} from "react";
import IBurgerItem from "../interfaces/IBurgerItem";
import {ICartActions} from "./cart-reducer";

interface IIngredientItems {
    ingredientItems: IBurgerItem[]
}

interface ICartItems {
    cartItemsState: IBurgerItem[],
    cartItemDispatcher: (Dispatch<ICartActions>)
}

interface ICartTotal {
    totalPrice: number | null,
    setTotalPrice: (Dispatch<SetStateAction<number | null>>)
}

export const IngredientItemsContext = React.createContext<IIngredientItems>({ingredientItems: []})
export const CartItemsContext = React.createContext<ICartItems>({
    cartItemDispatcher(value: ICartActions): void {
    }, cartItemsState: []})

export const CartTotalContext = React.createContext<ICartTotal>({
    setTotalPrice(value: ((prevState: (number | null)) => (number | null)) | number | null): void {
    }, totalPrice: null})
