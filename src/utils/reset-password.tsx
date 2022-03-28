import {baseUrl, checkResponse} from "../services/api";

const forgotPasswordUrl = baseUrl + '/password-reset'
const resetPasswordUrl = forgotPasswordUrl + '/reset'

export interface IForgotPasswordData {
    email: string
}

export interface IResetPasswordResponse {
    success: boolean,
    message: string
}

interface IForgotPassword {
    (data: IForgotPasswordData): Promise<void | IResetPasswordResponse>
}

export interface IResetPasswordData {
    password: string,
    token: string,
}

interface IResetPassword {
    (data: IResetPasswordData): Promise<void | IResetPasswordResponse>
}

const forgotPassword: IForgotPassword = (data) => {
    return fetch(forgotPasswordUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse)
        .then((response: IResetPasswordResponse) => {
            return response
        })
}

const resetPassword: IResetPassword = (data) => {
    return fetch(resetPasswordUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse)
        .then((response: IResetPasswordResponse) => {
            return response
        })
}

const resetPasswordService = {
    forgotPassword,
    resetPassword,
}

export default resetPasswordService
