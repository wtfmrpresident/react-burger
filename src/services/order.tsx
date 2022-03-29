import {createAsyncThunk, createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import ordersService, {ICreateOrderData, ICreateOrderResponse} from "../utils/orders";

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

export const createOrder = createAsyncThunk(
    'order/create',
    async (data: ICreateOrderData): Promise<void | ICreateOrderResponse> => {
        return await ordersService.createOrder(data)
    }
)

export const orderSlice: Slice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetOrderNumber: (state: IOrderState) => {
            state.orderNumber = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state: IOrderState) => {
                state.orderNumber = null
                state.request = true
                state.failed = false
            })
            .addCase(createOrder.fulfilled, (state: IOrderState, action: PayloadAction<void | ICreateOrderResponse>) => {
                if (action.payload && action.payload.success) {
                    state.orderNumber = action.payload.order.number
                }
                state.request = false
                state.failed = false
            })
            .addCase(createOrder.rejected, (state: IOrderState) => {
                state.orderNumber = null
                state.request = false
                state.failed = true
            })
    }
})

export const { resetOrderNumber } = orderSlice.actions

export default orderSlice.reducer
