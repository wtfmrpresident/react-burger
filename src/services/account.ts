import { createAsyncThunk, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
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

type TRejectedAction = {
    error: {
        message: string
    }
}

type TAccountState = {
    user: IUser | null;

    registerRequest: boolean;
    registerFailed: boolean;
    registerErrorMessage: string | undefined;

    loginRequest: boolean;
    loginFailed: boolean;

    logoutRequest: boolean;
    logoutFailed: boolean;

    refreshTokenRequest: boolean;
    refreshTokenFailed: boolean;

    profileRequest: boolean;
    profileFailed: boolean;

    profileUpdateRequest: boolean;
    profileUpdateFailed: boolean;
}

export const register = createAsyncThunk<
    void | ILoginAndRegisterResponse,
    IRegisterData,
    {
        state: TAccountState;
        rejectValue: TRejectedAction;
    }
    >(
    'auth/register',
    async (data: IRegisterData): Promise<void | ILoginAndRegisterResponse> => {
        return await authService.register(data)
    }
)

export const login = createAsyncThunk<
    void | ILoginAndRegisterResponse,
    ILoginData,
    {
        state: TAccountState;
    }
    >(
    'auth/login',
    async (data: ILoginData): Promise<void | ILoginAndRegisterResponse> => {
        return await authService.login(data)
    }
)

export const logout = createAsyncThunk<
    void | ILogoutResponse,
    ITokenData,
    {
        state: TAccountState;
    }
    >(
    'auth/logout',
    async (data: ITokenData): Promise<void | ILogoutResponse> => {
        return await authService.logout(data)
    }
)

export const refreshToken = createAsyncThunk<
    void | IRefreshTokenResponse,
    ITokenData
    >(
    'auth/refreshToken',
    async (data: ITokenData): Promise<void | IRefreshTokenResponse> => {
        return await authService.refreshToken(data)
    }
)

export const profile = createAsyncThunk<
    void | IProfileResponse
    >(
    'auth/profile',
    async (): Promise<void | IProfileResponse> => {
        return await authService.profile()
    }
)

export const profileUpdate = createAsyncThunk<
    void | IProfileResponse,
    IRegisterData
    >(
    'auth/profileUpdate',
    async (data: IRegisterData): Promise<void | IProfileResponse> => {
        return await authService.profileUpdate(data)
    }
)

const initialState: TAccountState = {
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

type TAccountActions = {
    registerRequest: (state: TAccountState) => void;
    registerSuccess: (state: TAccountState) => void;
    registerFailed: (state: TAccountState) => void;

    loginRequest: (state: TAccountState) => void;
    loginSuccess: (state: TAccountState) => void;
    loginFailed: (state: TAccountState) => void;

    logoutRequest: (state: TAccountState) => void;
    logoutSuccess: (state: TAccountState) => void;
    logoutFailed: (state: TAccountState) => void;

    refreshTokenRequest: (state: TAccountState) => void;
    refreshTokenSuccess: (state: TAccountState) => void;
    refreshTokenFailed: (state: TAccountState) => void;

    profileRequest: (state: TAccountState) => void;
    profileSuccess: (state: TAccountState) => void;
    profileFailed: (state: TAccountState) => void;

    profileUpdateRequest: (state: TAccountState) => void;
    profileUpdateSuccess: (state: TAccountState) => void;
    profileUpdateFailed: (state: TAccountState) => void;
}

const authSlice: Slice<TAccountState, TAccountActions> = createSlice({
    name: "account",
    initialState,
    reducers: {
        registerRequest: (state: TAccountState) => {
            state.registerRequest = true
            state.registerFailed = false
        },
        registerSuccess: (state: TAccountState) => {
            state.registerRequest = false
            state.registerFailed = false
        },
        registerFailed: (state: TAccountState) => {
            state.registerRequest = false
            state.registerFailed = true
        },

        loginRequest: (state: TAccountState) => {
            state.loginRequest = true
            state.loginFailed = false
        },
        loginSuccess: (state: TAccountState) => {
            state.loginRequest = false
            state.loginFailed = false
        },
        loginFailed: (state: TAccountState) => {
            state.loginRequest = false
            state.loginFailed = true
        },

        logoutRequest: (state: TAccountState) => {
            state.logoutRequest = true
            state.logoutFailed = false
        },
        logoutSuccess: (state: TAccountState) => {
            state.logoutRequest = false
            state.logoutFailed = false
        },
        logoutFailed: (state: TAccountState) => {
            state.logoutRequest = false
            state.logoutFailed = true
        },

        refreshTokenRequest: (state: TAccountState) => {
            state.refreshTokenRequest = true
            state.refreshTokenFailed = false
        },
        refreshTokenSuccess: (state: TAccountState) => {
            state.refreshTokenRequest = false
            state.refreshTokenFailed = false
        },
        refreshTokenFailed: (state: TAccountState) => {
            state.refreshTokenRequest = false
            state.refreshTokenFailed = true
        },

        profileRequest: (state: TAccountState) => {
            state.profileRequest = true
            state.profileFailed = false
        },
        profileSuccess: (state: TAccountState) => {
            state.profileRequest = false
            state.profileFailed = false
        },
        profileFailed: (state: TAccountState) => {
            state.profileRequest = false
            state.profileFailed = true
        },

        profileUpdateRequest: (state: TAccountState) => {
            state.profileUpdateRequest = true
            state.profileUpdateFailed = false
        },
        profileUpdateSuccess: (state: TAccountState) => {
            state.profileUpdateRequest = false
            state.profileUpdateFailed = false
        },
        profileUpdateFailed: (state: TAccountState) => {
            state.profileUpdateRequest = false
            state.profileUpdateFailed = true
        },
    },
    extraReducers: (builder) => {
        // Register extra reducers
        builder
            .addCase(register.pending, (state) => {
                authSlice.caseReducers.registerRequest(state)
            })
            .addCase(register.fulfilled, (state, action) => {
                if (action.payload && action.payload.accessToken) {
                    setCookie('token', action.payload.accessToken, {path: '/'})
                }
                authSlice.caseReducers.registerSuccess(state)
            })
            .addCase(register.rejected, (state: TAccountState, action) => {
                state.registerErrorMessage = action.error.message
                authSlice.caseReducers.registerFailed(state)
            })

        // Login extra reducers
        builder
            .addCase(login.pending, (state: TAccountState) => {
                authSlice.caseReducers.loginRequest(state)
            })
            .addCase(login.fulfilled, (state: TAccountState, action: PayloadAction<void | ILoginAndRegisterResponse>) => {
                if (action && action.payload) {
                    state.user = action.payload.user
                    setCookie('token', action.payload.accessToken.split('Bearer ')[1], {path: '/'})
                    setCookie('refreshToken', action.payload.refreshToken, {path: '/'})
                }
                authSlice.caseReducers.loginSuccess(state)
            })
            .addCase(login.rejected, (state: TAccountState) => {
                authSlice.caseReducers.loginFailed(state)
            })

        // Logout extra reducers
        builder
            .addCase(logout.pending, (state: TAccountState) => {
                authSlice.caseReducers.logoutRequest(state)
            })
            .addCase(logout.fulfilled, (state: TAccountState) => {
                state.user = null
                setCookie('token', "", {expires: -1})
                setCookie('refreshToken', "", {expires: -1})

                authSlice.caseReducers.logoutSuccess(state)
            })
            .addCase(logout.rejected, (state: TAccountState) => {
                authSlice.caseReducers.logoutFailed(state)
            })

        // Refresh token extra reducers
        builder
            .addCase(refreshToken.pending, (state: TAccountState) => {
                authSlice.caseReducers.refreshTokenRequest(state)
            })
            .addCase(refreshToken.fulfilled, (state: TAccountState, action: PayloadAction<void | IRefreshTokenResponse>) => {
                if (action && action.payload) {
                    setCookie('token', action.payload.accessToken.split('Bearer ')[1], {path: '/'})
                    setCookie('refreshToken', action.payload.refreshToken, {path: '/'})
                }

                authSlice.caseReducers.refreshTokenSuccess(state)
            })
            .addCase(refreshToken.rejected, (state: TAccountState) => {
                authSlice.caseReducers.refreshTokenFailed(state)
            })

        // Profile extra reducers
        builder
            .addCase(profile.pending, (state: TAccountState) => {
                authSlice.caseReducers.profileRequest(state)
            })
            .addCase(profile.fulfilled, (state: TAccountState, action: PayloadAction<void | IProfileResponse>) => {
                if (action && action.payload) {
                    state.user = action.payload.user
                }

                authSlice.caseReducers.profileSuccess(state)
            })
            .addCase(profile.rejected, (state: TAccountState) => {
                authSlice.caseReducers.profileFailed(state)
            })

        // Profile Update extra reducers
        builder
            .addCase(profileUpdate.pending, (state: TAccountState) => {
                authSlice.caseReducers.profileUpdateRequest(state)
            })
            .addCase(profileUpdate.fulfilled, (state: TAccountState, action: PayloadAction<void | IProfileResponse>) => {
                if (action && action.payload) {
                    state.user = action.payload.user
                }

                authSlice.caseReducers.profileUpdateSuccess(state)
            })
            .addCase(profileUpdate.rejected, (state: TAccountState) => {
                authSlice.caseReducers.profileUpdateFailed(state)
            })
    }
})

export default authSlice
