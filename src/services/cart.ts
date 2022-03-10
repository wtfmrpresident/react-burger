import IBurgerItem from "../interfaces/IBurgerItem";
import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";

interface ICartItemsState {
    bunItems: IBurgerItem[]
    ingredientItems: IBurgerItem[]
    dragIndex?: number,
    hoverIndex?: number
}

interface IMoveIngredientAction {
    item: IBurgerItem,
    dragIndex: number,
    hoverIndex: number
}

const initialState: ICartItemsState = {
    bunItems: [],
    ingredientItems: [],
}

function isBunAlreadyInCart(cartItems: IBurgerItem[]): boolean {
    return cartItems.some((cartItem) => cartItem.type === 'bun')
}

function replacedBun(cartItems: IBurgerItem[], item: IBurgerItem): IBurgerItem[] {
    const cart = [...cartItems]

    // Не даем добавлять несколько булочек, вместо этого меняем одну на другую
    if (cart && isBunAlreadyInCart(cartItems)) {
        const currentTopBunIndex = cart.findIndex((cartItem: IBurgerItem) => cartItem.subtype === 'top')
        if (currentTopBunIndex !== -1) {
            cart.splice(currentTopBunIndex, 1)
        }

        const currentBottomBunIndex = cart.findIndex((cartItem: IBurgerItem) => cartItem.subtype === 'bottom')
        if (currentBottomBunIndex !== -1) {
            cart.splice(currentBottomBunIndex, 1)
        }
    }

    const bunTop: IBurgerItem = {...item, name: item.name + ' (верх)', subtype: 'top', quantity: 1}
    const bunBottom: IBurgerItem = {...item, name: item.name + ' (низ)', subtype: 'bottom', quantity: 1}

    cart.push(bunTop)
    cart.push(bunBottom)

    return cart
}

export const cartSlice: Slice = createSlice({
    name: 'cartItems',
    initialState: initialState,
    reducers: {
        addToCart: (state: ICartItemsState, action: PayloadAction<IBurgerItem>) => {
            const ingredient = {...action.payload}
            if (ingredient) {
                if (ingredient.type === 'bun') {
                    return {
                        ...state,
                        bunItems: replacedBun(state.ingredientItems, ingredient)
                    }
                }

                const item = state.ingredientItems.find(cartItem => cartItem._id === ingredient._id)
                if (item) {
                    item.quantity++
                } else {
                    state.ingredientItems.push({...ingredient, quantity: 1})
                }
            }
        },

        removeFromCart: (state: ICartItemsState, action: PayloadAction<IBurgerItem>) => {
            const ingredient = {...action.payload}
            const item = state.ingredientItems.find(cartItem => cartItem._id === ingredient._id)

            if (item) {
                if (item && item.quantity <= 1) {
                    const removeItemIndex = state.ingredientItems.findIndex((cartItem: IBurgerItem) => cartItem._id === action.payload._id)
                    if (removeItemIndex !== -1) {
                        state.ingredientItems.splice(removeItemIndex, 1)
                    }
                } else {
                    item.quantity--;
                }
            }
        },

        moveIngredient: (state: ICartItemsState, action: PayloadAction<IMoveIngredientAction>) => {
            const sortableCart = [...state.ingredientItems]
            const dragItem = sortableCart[action.payload.dragIndex]

            sortableCart.splice(action.payload.dragIndex, 1)
            sortableCart.splice(action.payload.hoverIndex, 0, dragItem)

            state.ingredientItems = sortableCart
        }
    }
})

export const {addToCart, removeFromCart, moveIngredient} = cartSlice.actions

export default cartSlice.reducer
