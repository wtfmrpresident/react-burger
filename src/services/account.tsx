import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import authService, {
    ILoginAndRegisterResponse,
    ILoginData,
    ILogoutResponse, IProfileResponse,
    IRefreshTokenResponse,
    IRegisterData,
    ITokenData,
    IUser
} from "../utils/auth";
import {setCookie} from "../utils/cookie";

interface IAccountState {
    user: IUser | null,

    registerRequest: boolean,
    registerFailed: boolean,
    registerErrorMessage: string | undefined,

    loginRequest: boolean,
    loginFailed: boolean,

    logoutRequest: boolean,
    logoutFailed: boolean,

    refreshTokenRequest: boolean,
    refreshTokenFailed: boolean,

    profileRequest: boolean,
    profileFailed: boolean,

    profileUpdateRequest: boolean,
    profileUpdateFailed: boolean,
}

export const register = createAsyncThunk(
    'auth/register',
    async (data: IRegisterData): Promise<void | ILoginAndRegisterResponse> => {
        return await authService.register(data)
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (data: ILoginData): Promise<void | ILoginAndRegisterResponse> => {
        return await authService.login(data)
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (data: ITokenData): Promise<void | ILogoutResponse> => {
        return await authService.logout(data)
    }
)

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (data: ITokenData): Promise<void | IRefreshTokenResponse> => {
        return await authService.refreshToken(data)
    }
)

export const profile = createAsyncThunk(
    'auth/profile',
    async (): Promise<void | IProfileResponse> => {
        return await authService.profile()
    }
)

export const profileUpdate = createAsyncThunk(
    'auth/profileUpdate',
    async (data: IRegisterData): Promise<void | IProfileResponse> => {
        return await authService.profileUpdate(data)
    }
)

const initialState: IAccountState = {
    user: null,
    registerRequest: false,
    registerFailed: false,
    registerErrorMessage: undefined,

    loginRequest: false,
    loginFailed: false,

    logoutRequest: false,
    logoutFailed: false,

    refreshTokenRequest: false,
    refreshTokenFailed: false,

    profileRequest: false,
    profileFailed: false,

    profileUpdateRequest: false,
    profileUpdateFailed: false
}

const authSlice = createSlice({
    name: "account",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Register extra reducers
        builder
            .addCase(register.pending, (state: IAccountState) => {
                state.registerRequest = true
                state.registerFailed = false
            })
            .addCase(register.fulfilled, (state: IAccountState, action: PayloadAction<void | ILoginAndRegisterResponse>) => {
                if (action.payload && action.payload.accessToken) {
                    setCookie('token', action.payload.accessToken, {path: '/'})

                    state.registerRequest = false
                    state.registerFailed = false
                } else {
                    state.registerRequest = false
                    state.registerFailed = true
                }
            })
            .addCase(register.rejected, (state: IAccountState, action) => {
                state.registerErrorMessage = action.error.message
                state.registerRequest = false
                state.registerFailed = true
            })

        // Login extra reducers
        builder
            .addCase(login.pending, (state: IAccountState) => {
                state.loginRequest = true
                state.loginFailed = false
            })
            .addCase(login.fulfilled, (state: IAccountState, action: PayloadAction<void | ILoginAndRegisterResponse>) => {
                if (action && action.payload) {
                    state.loginRequest = false
                    state.loginFailed = false
                    state.user = action.payload.user
                    setCookie('token', action.payload.accessToken.split('Bearer ')[1], {path: '/'})
                    setCookie('refreshToken', action.payload.refreshToken, {path: '/'})
                } else {
                    state.loginRequest = false
                    state.loginFailed = true
                }
            })
            .addCase(login.rejected, (state: IAccountState) => {
            state.loginRequest = false
            state.loginFailed = true
        })

        // Logout extra reducers
        builder
            .addCase(logout.pending, (state: IAccountState) => {
                state.logoutRequest = true
                state.logoutFailed = false
            })
            .addCase(logout.fulfilled, (state: IAccountState) => {
                state.user = null
                setCookie('token', "", {expires: -1})
                setCookie('refreshToken', "", {expires: -1})

                state.loginRequest = false
                state.loginFailed = false
            })
            .addCase(logout.rejected, (state: IAccountState) => {
                state.loginRequest = false
                state.loginFailed = true
            })

        // Refresh token extra reducers
        builder
            .addCase(refreshToken.pending, (state: IAccountState) => {
                state.refreshTokenRequest = true
                state.refreshTokenFailed = false
            })
            .addCase(refreshToken.fulfilled, (state: IAccountState, action: PayloadAction<void | IRefreshTokenResponse>) => {
                if (action && action.payload) {
                    setCookie('token', action.payload.accessToken.split('Bearer ')[1], {path: '/'})
                    setCookie('refreshToken', action.payload.refreshToken, {path: '/'})
                }

                state.refreshTokenRequest = false
                state.refreshTokenFailed = false
            })
            .addCase(refreshToken.rejected, (state: IAccountState) => {
                state.refreshTokenRequest = false
                state.refreshTokenFailed = true
            })

        // Profile extra reducers
        builder
            .addCase(profile.pending, (state: IAccountState) => {
                state.profileRequest = true
                state.profileFailed = false
            })
            .addCase(profile.fulfilled, (state: IAccountState, action: PayloadAction<void | IProfileResponse>) => {
                if (action && action.payload) {
                    state.user = action.payload.user
                }

                state.profileRequest = false
                state.profileFailed = false
            })
            .addCase(profile.rejected, (state: IAccountState) => {
                state.profileRequest = false
                state.profileFailed = true
            })

        // Profile Update extra reducers
        builder
            .addCase(profileUpdate.pending, (state: IAccountState) => {
                state.profileUpdateRequest = true
                state.profileUpdateFailed = false
            })
            .addCase(profileUpdate.fulfilled, (state: IAccountState, action: PayloadAction<void | IProfileResponse>) => {
                if (action && action.payload) {
                    state.user = action.payload.user
                }

                state.profileUpdateRequest = false
                state.profileUpdateFailed = false
            })
            .addCase(profileUpdate.rejected, (state: IAccountState) => {
                state.profileUpdateRequest = false
                state.profileUpdateFailed = true
            })
    }
})

export default authSlice.reducer
