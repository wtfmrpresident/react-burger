import ingredientItemsSlice, { reducer, getIngredients, initialState } from "./get-ingredients";
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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

describe("ingredients reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {type: 'test'})).toEqual(initialState)
    })

    it("should handle fetch ingredients pending", () => {
        const action = {
            type: getIngredients.pending.type
        }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            request: true,
        });
    })

    it("should handle fetch ingredients fulfilled", () => {
        const action = {
            type: getIngredients.fulfilled.type,
            payload: {data: MOCK_INGREDIENTS, success: true}
        }

        const updatedItems = MOCK_INGREDIENTS.map((item: IBurgerItem) => {
            return {...item, quantity: 0}
        })

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            request: false,
            items: updatedItems,
        });
    })

    it("should handle fetch ingredients rejected", () => {
        const action = { type: getIngredients.rejected.type }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            request: false,
            failed: true
        });
    })
})
