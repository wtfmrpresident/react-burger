import {createSlice, Dispatch, PayloadAction, Slice} from "@reduxjs/toolkit";
import IBurgerItem from "../interfaces/IBurgerItem";
import {baseUrl, checkResponse} from "./api";

interface IOrderState {
    orderNumber: number | null,
    request: boolean,
    failed: boolean,
}

const initialState: IOrderState = {
    orderNumber: null,
    request: false,
    failed: false
}

export const orderSlice: Slice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        getOrderRequest: (state: IOrderState) => {
            return {
                ...state,
                orderNumber: null,
                request: true,
                failed: false
            }
        },
        getOrderSuccess: (state: IOrderState, action: PayloadAction<number>) => {
            return {
                ...state,
                orderNumber: action.payload,
                request: false,
                failed: false,
            }
        },
        getOrderFailed: (state: IOrderState) => {
            return {
                ...state,
                orderNumber: null,
                request: false,
                failed: true
            }
        },
    }
})

export const {getOrderRequest, getOrderSuccess, getOrderFailed} = orderSlice.actions

const CREATE_ORDER_URL = baseUrl + '/orders'

export const createOrder = (cartItems: IBurgerItem[]) => async (dispatch: Dispatch) => {
    // @ts-ignore
    dispatch(getOrderRequest())

    const postData = cartItems.map((cartItem) => {
        return cartItem._id
    })

    return fetch(CREATE_ORDER_URL, {
        method: 'POST',
        body: JSON.stringify({"ingredients": postData}),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(checkResponse)
        .then((result) => {
            if (result.success && result.order.number) {
                dispatch(getOrderSuccess(result.order.number))
            }
        })
        .catch((error) => {
            console.log(error)
            // @ts-ignore
            dispatch(getOrderFailed())
        })
}

export default orderSlice.reducer
