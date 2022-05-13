import { createSlice, Slice } from "@reduxjs/toolkit";
import { TWsOrderActions, TWsOrderState } from "../interfaces/TWsOrderActions";

export const WS_ORDER_ACTIONS = {
    wsInit: "ws-order/wsInit",
    wsSendMessage: "ws-order/sendMessage",
    wsClose: "ws-order/close",
    onOpen: "ws-order/onOpen",
    onClose: "ws-order/onClose",
    onError: "ws-order/onError",
    onMessage: "ws-order/onMessage",
};

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
