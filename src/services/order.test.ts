import { createOrder, initialState, reducer, resetOrderNumber } from "./order";

describe("cart reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {type: 'test'})).toEqual(initialState)
    })

    it("should handle order pending", () => {
        const action = {type: createOrder.pending.type}
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            request: true
        })
    })

    it("should handle order fulfilled", () => {
        const action = {
            type: createOrder.fulfilled.type,
            payload: {
                success: true,
                order: {
                    number: 2038
                }
            }
        }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            request: false,
            orderNumber: 2038
        })
    })

    it("should handle order rejected", () => {
        const action = {type: createOrder.rejected.type}
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            request: false,
            failed: true
        })
    })

    it("should handle order reset number", () => {
        const prevState = {
            ...initialState,
            orderNumber: 2038
        }

        expect(reducer(prevState, resetOrderNumber)).toEqual({
            ...initialState,
            orderNumber: null,
        })
    })
})
