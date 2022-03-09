import IBurgerItem from "../interfaces/IBurgerItem";
import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";

interface ICartItemsState {
    cartItems: IBurgerItem[] | []
}

const initialState: ICartItemsState = {
    cartItems: [],
}

function isBunAlreadyInCart(cartItems: IBurgerItem[]): boolean {
    return cartItems.some((cartItem) => cartItem.type === 'bun')
}

function isItemAlreadyInCart(cartItems: IBurgerItem[], item: IBurgerItem): boolean {
    return cartItems.some((cartItem) => cartItem._id === item._id)
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

    const bunTop: IBurgerItem = {...item, name: item.name + ' (верх)', subtype: 'top'}
    const bunBottom: IBurgerItem = {...item, name: item.name + ' (низ)', subtype: 'bottom'}

    cart.push(bunTop)
    cart.push(bunBottom)

    return cart
}

export const cartSlice: Slice = createSlice({
    name: 'cartItems',
    initialState: initialState,
    reducers: {
        addToCart: (state: ICartItemsState, action: PayloadAction<IBurgerItem>) => {
            const cart = [...state.cartItems]
            const item = {...action.payload}

            if (item) {
                if (isItemAlreadyInCart(cart, item)) {
                    return state
                }

                if (item.type === 'bun') {
                    return {
                        ...state,
                        cartItems: replacedBun(state.cartItems, item)
                    }
                }

                cart.push(item)
            }

            return {
                ...state,
                cartItems: cart
            }
        },

        removeFromCart: (state: ICartItemsState, action: PayloadAction<IBurgerItem>) => {
            const cart = [...state.cartItems]
            if (cart) {
                let removeItemIndex = cart.findIndex((cartItem: IBurgerItem) => cartItem._id === action.payload._id)
                if (removeItemIndex !== -1) {
                    cart.splice(removeItemIndex, 1)
                }
            }

            return {
                ...state,
                cartItems: cart
            }
        }
    }
})

export const {addToCart, removeFromCart} = cartSlice.actions

export default cartSlice.reducer
