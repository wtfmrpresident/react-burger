import { createSlice, Slice } from "@reduxjs/toolkit";
import { TWsOrderActions, TWsOrderState } from "../interfaces/TWsOrderActions";

const initialState: TWsOrderState = {
    isWsConnected: false,

    orders: [],
    total: 0,
    totalToday: 0
}

const orderSocketSlice: Slice<TWsOrderState, TWsOrderActions> = createSlice({
    name: "ws-order",
    initialState,
    reducers: {
        wsInit: (state, action) => {
        },
        wsSendMessage: (state, action) => {
        },
        onOpen: (state) => {
            state.isWsConnected = true;
        },
        onClose: (state) => {
            state.isWsConnected = false;
        },
        onError: (state) => {
            state.isWsConnected = false;
        },
        onMessage: (state, action) => {
            state.orders = action.payload.orders
            state.total = action.payload.total
            state.totalToday = action.payload.totalToday
        }
    }
})

export const { wsInit } = orderSocketSlice.actions

export default orderSocketSlice
