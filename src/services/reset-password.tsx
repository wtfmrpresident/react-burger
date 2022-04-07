import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import resetPasswordService, {
    IForgotPasswordData,
    IResetPasswordData,
    IResetPasswordResponse
} from "../utils/reset-password";

interface IResetPasswordState {
    forgotPasswordRequest: boolean,
    forgotPasswordFailed: boolean,
    forgotPasswordEmailRequest: string | null,

    resetPasswordRequest: boolean,
    resetPasswordFailed: boolean,
}

export const forgotPassword = createAsyncThunk(
    'password/forgot',
    async (data: IForgotPasswordData): Promise<void | IResetPasswordResponse> => {
        return await resetPasswordService.forgotPassword(data)
    }
)

export const resetPassword = createAsyncThunk(
    'password/reset',
    async (data: IResetPasswordData): Promise<void | IResetPasswordResponse> => {
        return await resetPasswordService.resetPassword(data)
    }
)

const initialState = {
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
    forgotPasswordEmailRequest: null,

    resetPasswordRequest: false,
    resetPasswordFailed: false,
}

const resetPasswordSlice = createSlice({
    name: "reset-password",
    initialState,
    reducers: {
        setPasswordEmailRequest: (state: IResetPasswordState, action: PayloadAction<IForgotPasswordData>) => {
            state.forgotPasswordEmailRequest = action.payload.email
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(forgotPassword.pending, (state: IResetPasswordState) => {
                state.forgotPasswordRequest = true
                state.forgotPasswordFailed = false
            })
            .addCase(forgotPassword.fulfilled, (state: IResetPasswordState) => {
                state.forgotPasswordRequest = false
                state.forgotPasswordFailed = false
            })
            .addCase(forgotPassword.rejected, (state: IResetPasswordState) => {
                state.forgotPasswordRequest = false
                state.forgotPasswordFailed = true
            })

        builder
            .addCase(resetPassword.pending, (state: IResetPasswordState) => {
                state.resetPasswordRequest = true
                state.resetPasswordFailed = false
            })
            .addCase(resetPassword.fulfilled, (state: IResetPasswordState) => {
                state.resetPasswordRequest = false
                state.resetPasswordFailed = false
            })
            .addCase(resetPassword.rejected, (state: IResetPasswordState) => {
                state.resetPasswordRequest = false
                state.resetPasswordFailed = true
            })
    }
})

export const { setPasswordEmailRequest } = resetPasswordSlice.actions

export default resetPasswordSlice.reducer
