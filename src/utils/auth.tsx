import { baseUrl, checkResponse } from "../services/api";
import { getCookie } from "./cookie";

export interface IUser {
    email: string,
    name: string,
    password?: string
}

export interface ILoginAndRegisterResponse {
    success: boolean,
    accessToken: string,
    refreshToken: string,
    user: IUser
}

export interface ILogoutResponse {
    success: boolean,
    message: string
}

export interface IRefreshTokenResponse {
    success: boolean,
    accessToken: string,
    refreshToken: string,
}

export interface IProfileResponse {
    success: boolean,
    user: IUser
}

export interface ILoginData {
    email: string,
    password: string
}

interface ILogin {
    (data: ILoginData): Promise<void | ILoginAndRegisterResponse>
}

export interface IRegisterData {
    name: string,
    email: string,
    password: string
}

interface IRegister {
    (data: IRegisterData): Promise<void | ILoginAndRegisterResponse>
}

export interface ITokenData {
    token: string
}

interface ILogout {
    (data: ITokenData): Promise<void | ILogoutResponse>
}

interface IRefreshToken {
    (data: ITokenData): Promise<void | IRefreshTokenResponse>
}

interface IProfile {
    (): Promise<void | IProfileResponse>
}

interface IProfileUpdate {
    (data: IRegisterData): Promise<void | IProfileResponse>
}

const loginUrl = baseUrl + '/auth/login'
const registerUrl = baseUrl + '/auth/register'
const logoutUrl = baseUrl + '/auth/logout'
const refreshTokenUrl = baseUrl + '/auth/token'
const profileUrl = baseUrl + '/auth/user'

const login: ILogin = (data) => {
    return fetch(loginUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse)
        .then((response: ILoginAndRegisterResponse) => {
            return response
        })
}

const register: IRegister = (data) => {
    return fetch(registerUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse)
        .then((response: ILoginAndRegisterResponse) => {
            return response
        })
}

const logout: ILogout = (data) => {
    return fetch(logoutUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse)
        .then((response: ILogoutResponse) => {
            return response
        })
}

const refreshToken: IRefreshToken = (data) => {
    return fetch(refreshTokenUrl, {
        method: "POST",
        body: JSON.stringify({token: data.token}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse)
        .then((response: IRefreshTokenResponse) => {
            return response
        })
}

const profile: IProfile = () => {
    return fetch(profileUrl, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token'),
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })
        .then(checkResponse)
        .then((response: IProfileResponse) => {
            return response
        })
}

const profileUpdate: IProfileUpdate = (data) => {
    return fetch(profileUrl, {
        method: 'PATCH',
        body: JSON.stringify(data),
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token'),
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })
        .then(checkResponse)
        .then((response: IProfileResponse) => {
            return response
        })
}

const authService = {
    register,
    login,
    logout,
    refreshToken,
    profile,
    profileUpdate
}

export default authService
