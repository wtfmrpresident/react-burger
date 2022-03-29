import IBurgerItem from "../interfaces/IBurgerItem";
import {baseUrl, checkResponse} from "../services/api";
import {getCookie} from "./cookie";

export interface ICreateOrderResponse {
    success: boolean,
    order: {
        number: number
    }
}

export interface ICreateOrderData {
    items: IBurgerItem[]
}

export interface ICreateOrder {
    (data: ICreateOrderData): Promise<void| ICreateOrderResponse>
}

const CREATE_ORDER_URL = baseUrl + '/orders'

const createOrder: ICreateOrder = (data) => {
    const postData = data.items.map((cartItem) => {
        return cartItem._id
    })

    return fetch(CREATE_ORDER_URL, {
        method: 'POST',
        body: JSON.stringify({"ingredients": postData}),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token'),
        },
    })
        .then(checkResponse)
        .then((response) => {
            return response
        })
}

const ordersService = { createOrder }

export default ordersService
