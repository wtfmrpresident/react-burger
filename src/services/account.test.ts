import authSlice, {
    reducer,
    initialState,
    register,
    login,
    logout,
    refreshToken,
    profile,
    profileUpdate
} from "./account";

describe("ingredients reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {type: 'test'})).toEqual(initialState)
    })

    it("should handle register pending", () => {
        const action = { type: register.pending.type }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            registerRequest: true,
        })
    })

    it("should handle register fulfilled", () => {
        const action = {
            type: register.fulfilled.type,
            payload: {
                user: { name: 'Vasiliy P.', email: 'my@email.com' },
                accessToken: 'lovely-access-token'
            }
        }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            registerRequest: false,
            user: {
                name: 'Vasiliy P.',
                email: 'my@email.com',
            },
        })
    })

    it("should handle register failed", () => {
        const action = { type: register.rejected.type, error: { message: 'Something wrong' } }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            registerRequest: false,
            registerFailed: true,
            registerErrorMessage: 'Something wrong',
        })
    })

    it("should handle login pending", () => {
        const action = { type: login.pending.type }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            loginRequest: true,
        })
    })

    it("should handle login fulfilled", () => {
        const action = {
            type: login.fulfilled.type,
            payload: {
                user: {
                    name: 'Vasiliy P.',
                    email: 'my@email.com'
                },
                accessToken: 'Bearer lovely-access-token',
                refreshToken: 'lovely-refresh-token'
            }
        }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            loginRequest: false,
            user: {
                name: 'Vasiliy P.',
                email: 'my@email.com',
            },
        })
    })

    it("should handle login rejected", () => {
        const action = { type: login.rejected.type }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            loginRequest: false,
            loginFailed: true,
        })
    })

    it("should handle logout pending", () => {
        const action = { type: logout.pending.type }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            logoutRequest: true,
        })
    })

    it("should handle logout fulfilled", () => {
        const action = { type: logout.fulfilled.type }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            logoutRequest: false,
            user: null,
        })
    })

    it("should handle login rejected", () => {
        const action = { type: logout.rejected.type }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            logoutRequest: false,
            logoutFailed: true,
        })
    })

    it("should handle refresh token pending", () => {
        const action = { type: refreshToken.pending.type }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            refreshTokenRequest: true,
        })
    })

    it("should handle refresh token fulfilled", () => {
        const action = { type: refreshToken.fulfilled.type }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            refreshTokenRequest: false,
        })
    })

    it("should handle refresh token rejected", () => {
        const action = { type: refreshToken.rejected.type }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            refreshTokenRequest: false,
            refreshTokenFailed: true,
        })
    })

    it("should handle profile pending", () => {
        const action = { type: profile.pending.type }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            profileRequest: true,
        })
    })

    it("should handle profile fulfilled", () => {
        const action = {
            type: profile.fulfilled.type,
            payload: {
                user: {
                    name: 'Vasiliy P.',
                    email: 'my@email.com',
                }
            }
        }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            profileRequest: false,
            user: {
                name: 'Vasiliy P.',
                email: 'my@email.com',
            }
        })
    })

    it("should handle profile rejected", () => {
        const action = { type: profile.rejected.type }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            profileRequest: false,
            profileFailed: true,
        })
    })

    it("should handle profile update pending", () => {
        const action = { type: profileUpdate.pending.type }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            profileUpdateRequest: true,
        })
    })

    it("should handle profile update fulfilled", () => {
        const action = {
            type: profileUpdate.fulfilled.type,
            payload: {
                user: {
                    name: 'Vasiliy P',
                    email: 'my@email.com',
                }
            }
        }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            profileUpdateRequest: false,
            user: {
                name: 'Vasiliy P',
                email: 'my@email.com',
            }
        })
    })

    it("should handle profile update rejected", () => {
        const action = { type: profileUpdate.rejected.type }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            profileUpdateRequest: false,
            profileUpdateFailed: true,
        })
    })
})
