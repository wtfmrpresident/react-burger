import { createSlice, Slice } from "@reduxjs/toolkit";
import { TWsSocketActions, TWsOrderState } from "../interfaces/TWsSocketActions";

export const initialState: TWsOrderState = {
    isWsConnected: false,

    orders: [],
    total: 0,
    totalToday: 0
}

const orderSocketSlice: Slice<TWsOrderState, TWsSocketActions> = createSlice({
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

export const {onOpen, onClose, onError, onMessage} = orderSocketSlice.actions
export const reducer = orderSocketSlice.reducer

export default orderSocketSlice
