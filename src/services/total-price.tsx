import IBurgerItem from "../interfaces/IBurgerItem";
import {AppRootState} from "../store";

export const totalPriceSelector = (state: AppRootState) => {
    const {
        cart: {
            bunItems,
            ingredientItems
        }
    } = state
    const bunAmount = bunItems.reduce((acc: number, item: IBurgerItem) => acc + item.price * item.quantity, 0);
    const ingredientAmount = ingredientItems.reduce((acc: number, item: IBurgerItem) => acc + item.price * item.quantity, 0);

    return bunAmount + ingredientAmount
}
