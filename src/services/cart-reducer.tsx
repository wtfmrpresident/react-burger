import IBurgerItem from "../interfaces/IBurgerItem";

export interface ICartActions {
    type: "add" | "remove",
    payload: IBurgerItem
}

function isBunAlreadyInCart(cartItems: IBurgerItem[]): boolean {
    return cartItems.some((cartItem) => cartItem.type === 'bun')
}

function isItemAlreadyInCart(cartItems: IBurgerItem[], item: IBurgerItem): boolean {
    return cartItems.some((cartItem) => cartItem._id === item._id)
}

function replaceBun(cartItems: IBurgerItem[], item: IBurgerItem): IBurgerItem[] {
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

function add(cartItems: IBurgerItem[], action: ICartActions): IBurgerItem[] {
    const cart = [...cartItems]
    const item = {...action.payload}

    if (item) {
        if (isItemAlreadyInCart(cart, item)) {
            return cart
        }

        if (item.type === 'bun') {
            return replaceBun(cartItems, item)
        }

        cart.push(item)

        return cart
    }

    return []
}

function remove(cartItems: IBurgerItem[], action: ICartActions): IBurgerItem[] {
    const cart = [...cartItems]
    if (cart) {
        let removeItemIndex = cart.findIndex((cartItem: IBurgerItem) => cartItem._id === action.payload._id)
        if (removeItemIndex !== -1) {
            cart.splice(removeItemIndex, 1)
        }
    }

    return cart
}

export default function cartReducer(state: IBurgerItem[], action: ICartActions): IBurgerItem[] {
    switch (action.type) {
        case "add":
            return add(state, action)
        case "remove":
            return remove(state, action)
    }
}
