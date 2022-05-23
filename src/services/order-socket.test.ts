import { onClose, onError, onMessage, onOpen } from "./order-socket";
import { initialState, reducer } from "./order-socket";

const MOCK_ORDERS = [
    {
        createdAt: "2022-05-23T12:26:34.356Z",
        ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733cd"],
        name: "Space флюоресцентный бургер",
        number: 15686,
        status: "done",
        updatedAt: "2022-05-23T12:26:34.599Z",
        _id: "628b7d7afa747e001bd49c74"
    },
    {
        createdAt: "2022-05-23T11:13:44.958Z",
        ingredients: ["60d3b41abdacab0026a733cd"],
        name: "Space бургер",
        number: 15685,
        status: "done",
        updatedAt: "2022-05-23T11:13:45.201Z",
        _id: "628b6c68fa747e001bd49bf9"
    },
    {
        createdAt: "2022-05-22T23:35:01.568Z",
        ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733c7"],
        name: "Space флюоресцентный бургер",
        number: 15682,
        status: "done",
        updatedAt: "2022-05-22T23:35:01.943Z",
        _id: "628ac8a5fa747e001bd49b1c"
    },
]

describe("order socket", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {type: 'test'})).toEqual(initialState)
    })

    it("should handle onOpen", () => {
        const action = {type: onOpen.type}
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isWsConnected: true,
        })
    })

    it("should handle onClose", () => {
        const prevState = {
            ...initialState,
            isWsConnected: true,
        }

        const action = {type: onClose.type}
        expect(reducer(prevState, action)).toEqual({
            ...initialState,
            isWsConnected: false,
        })
    })

    it("should handle onError", () => {
        const prevState = {
            ...initialState,
            isWsConnected: true,
        }

        const action = {type: onError.type}
        expect(reducer(prevState, action)).toEqual({
            ...initialState,
            isWsConnected: false,
        })
    })

    it("should handle onMessage", () => {
        const prevState = {
            ...initialState,
            isWsConnected: true,
        }

        const action = {
            type: onMessage.type,
            payload: {
                orders: MOCK_ORDERS,
                total: 100,
                totalToday: 10,
            }
        }
        expect(reducer(prevState, action)).toEqual({
            ...initialState,
            isWsConnected: true,
            orders: MOCK_ORDERS,
            total: 100,
            totalToday: 10,
        })
    })
})
