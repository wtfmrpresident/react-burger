import {
    addToCart,
    cartSlice,
    ICartItemsState,
    initialState,
    moveIngredient,
    reducer,
    removeFromCart,
    resetCart
} from "./cart";
import IBurgerItem from "../interfaces/IBurgerItem";

const MOCK_INGREDIENTS = [
    {
        "_id": "60d3b41abdacab0026a733c6",
        "name": "Краторная булка N-200i",
        "type": "bun",
        "proteins": 80,
        "fat": 24,
        "carbohydrates": 53,
        "calories": 420,
        "price": 1255,
        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
        "__v": 0
    },
    {
        "_id": "60d3b41abdacab0026a733c7",
        "name": "Флюоресцентная булка R2-D3",
        "type": "bun",
        "proteins": 44,
        "fat": 26,
        "carbohydrates": 85,
        "calories": 643,
        "price": 988,
        "image": "https://code.s3.yandex.net/react/code/bun-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
        "__v": 0
    },
    {
        "_id": "60d3b41abdacab0026a733c8",
        "name": "Филе Люминесцентного тетраодонтимформа",
        "type": "main",
        "proteins": 44,
        "fat": 26,
        "carbohydrates": 85,
        "calories": 643,
        "price": 988,
        "image": "https://code.s3.yandex.net/react/code/meat-03.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
        "__v": 0
    },
    {
        "_id": "60d3b41abdacab0026a733c9",
        "name": "Мясо бессмертных моллюсков Protostomia",
        "type": "main",
        "proteins": 433,
        "fat": 244,
        "carbohydrates": 33,
        "calories": 420,
        "price": 1337,
        "image": "https://code.s3.yandex.net/react/code/meat-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
        "__v": 0
    },
    {
        "_id": "60d3b41abdacab0026a733ca",
        "name": "Говяжий метеорит (отбивная)",
        "type": "main",
        "proteins": 800,
        "fat": 800,
        "carbohydrates": 300,
        "calories": 2674,
        "price": 3000,
        "image": "https://code.s3.yandex.net/react/code/meat-04.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
        "__v": 0
    },
    {
        "_id": "60d3b41abdacab0026a733cb",
        "name": "Биокотлета из марсианской Магнолии",
        "type": "main",
        "proteins": 420,
        "fat": 142,
        "carbohydrates": 242,
        "calories": 4242,
        "price": 424,
        "image": "https://code.s3.yandex.net/react/code/meat-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
        "__v": 0
    }
]

describe("cart reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {type: 'test'})).toEqual(initialState)
    })

    it("should handle add to cart", () => {
        const item: IBurgerItem= MOCK_INGREDIENTS[5]
        item.uuid = '1234-12345-12345'

        const newState = {
            ...initialState,
            ingredientItems: [...initialState.ingredientItems, item]
        }

        expect(reducer(initialState, addToCart(item))).toEqual(newState)
    })

    it("should handle replace bun", () => {
        const firstBun: IBurgerItem= MOCK_INGREDIENTS[0]
        firstBun.uuid = '1234-12345-12345'

        const firstBunTop: IBurgerItem = {
            ...firstBun,
            name: firstBun.name + ' (верх)',
            subtype: "top",
        }

        const firstBunBottom: IBurgerItem = {
            ...firstBun,
            name: firstBun.name + ' (низ)',
            subtype: "bottom",
        }

        const secondBun: IBurgerItem= MOCK_INGREDIENTS[1]
        secondBun.uuid = '1234-12345-12345'

        const secondBunTop: IBurgerItem = {
            ...secondBun,
            name: secondBun.name + ' (верх)',
            subtype: "top",
        }

        const secondBunBottom: IBurgerItem = {
            ...secondBun,
            name: secondBun.name + ' (низ)',
            subtype: "bottom",
        }

        const prevState: ICartItemsState = {
            ...initialState,
            bunItems: [firstBunTop, firstBunBottom]
        }

        const newState: ICartItemsState = {
            ...initialState,
            bunItems: [secondBunTop, secondBunBottom]
        }

        expect(reducer(initialState, addToCart(firstBun))).toEqual(prevState)

        expect(reducer(prevState, addToCart(secondBun))).toEqual(newState)
    })

    it("should remove ingredient from cart", () => {
        const prevState: ICartItemsState = {
            ...initialState,
            ingredientItems: [MOCK_INGREDIENTS[2], MOCK_INGREDIENTS[3]]
        }

        const newState: ICartItemsState = {
            ...initialState,
            ingredientItems: [MOCK_INGREDIENTS[3]]
        }

        expect(reducer(prevState, removeFromCart(MOCK_INGREDIENTS[2]))).toEqual(newState)
    })

    it("should handle sort ingredient in cart", () => {
        const prevState: ICartItemsState = {
            ...initialState,
            ingredientItems: [MOCK_INGREDIENTS[2], MOCK_INGREDIENTS[3], MOCK_INGREDIENTS[4]]
        }

        const newState: ICartItemsState = {
            ...initialState,
            ingredientItems: [MOCK_INGREDIENTS[3], MOCK_INGREDIENTS[2], MOCK_INGREDIENTS[4]]
        }

        const payload = {
            dragIndex: 1,
            hoverIndex: 0
        }

        expect(reducer(prevState, moveIngredient(payload))).toEqual(newState)
    })

    it("should handle reset cart", () => {
        const prevState: ICartItemsState = {
            ...initialState,
            ingredientItems: [MOCK_INGREDIENTS[2], MOCK_INGREDIENTS[3], MOCK_INGREDIENTS[4]]
        }

        expect(reducer(prevState, resetCart)).toEqual(initialState)
    })
})
