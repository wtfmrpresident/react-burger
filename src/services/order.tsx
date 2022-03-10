import {createSlice, Dispatch, PayloadAction, Slice} from "@reduxjs/toolkit";
import IBurgerItem from "../interfaces/IBurgerItem";

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

const CREATE_ORDER_URL = 'https://norma.nomoreparties.space/api/orders'

export const createOrder = (cartItems: IBurgerItem[]) => async (dispatch: Dispatch) => {
    // @ts-ignore
    dispatch(getOrderRequest())

    const postData = cartItems.map((cartItem) => {
        return cartItem._id
    })

    fetch(CREATE_ORDER_URL, {
        method: 'POST',
        body: JSON.stringify({"ingredients": postData}),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(new Error(response.statusText))
            }
            return response.json()
        })
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
