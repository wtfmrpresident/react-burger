import React, {Dispatch, SetStateAction} from "react";
import IBurgerItem from "../interfaces/IBurgerItem";

interface IIngredientItems {
    ingredientItems: IBurgerItem[]
}

interface ICartTotal {
    totalPrice: number | null,
    setTotalPrice: (Dispatch<SetStateAction<number | null>>)
}

export const CartTotalContext = React.createContext<ICartTotal>({
    setTotalPrice(value: ((prevState: (number | null)) => (number | null)) | number | null): void {
    }, totalPrice: null})
