import { forgotPassword, initialState, reducer, resetPassword, setPasswordEmailRequest } from "./reset-password";

describe("cart reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {type: 'test'})).toEqual(initialState)
    })

    it("should handle forgot password pending", () => {
        const action = {type: forgotPassword.pending.type}
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            forgotPasswordRequest: true,
        })
    })

    it("should handle forgot password fulfilled", () => {
        const action = {type: forgotPassword.fulfilled.type}
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            forgotPasswordRequest: false,
        })
    })

    it("should handle forgot password rejected", () => {
        const action = {type: forgotPassword.rejected.type}
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            forgotPasswordRequest: false,
            forgotPasswordFailed: true,
        })
    })

    it("should handle forgot password set email", () => {
        const action = {
            type: setPasswordEmailRequest.type,
            payload: {
                email: 'my@email.com',
            }
        }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            forgotPasswordEmailRequest: 'my@email.com',
        })
    })

    it("should handle reset password pending", () => {
        const action = {type: resetPassword.pending.type}
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            resetPasswordRequest: true,
        })
    })

    it("should handle reset password fulfilled", () => {
        const action = {type: resetPassword.fulfilled.type}
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            resetPasswordRequest: false,
        })
    })

    it("should handle reset password rejected", () => {
        const action = {type: resetPassword.rejected.type}
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            resetPasswordRequest: false,
            resetPasswordFailed: true,
        })
    })
})
