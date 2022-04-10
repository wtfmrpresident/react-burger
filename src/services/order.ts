import {createAsyncThunk, createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import ordersService, {ICreateOrderData, ICreateOrderResponse} from "../utils/orders";

type TOrderState = {
    orderNumber: number | null,
    request: boolean,
    failed: boolean,
}

const initialState: TOrderState = {
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

type TOrderActions = {
    request: (state: TOrderState) => void;
    success: (state: TOrderState) => void;
    failed: (state: TOrderState) => void;
    resetOrderNumber: (state: TOrderState) => void;
}

export const orderSlice: Slice<TOrderState, TOrderActions> = createSlice({
    name: 'order',
    initialState,
    reducers: {
        request: (state: TOrderState) => {
            state.orderNumber = null
            state.request = true
            state.failed = false
        },
        success: (state) => {
            state.request = false
            state.failed = false
        },
        failed: (state: TOrderState) => {
            state.orderNumber = null
            state.request = false
            state.failed = true
        },
        resetOrderNumber: (state: TOrderState) => {
            state.orderNumber = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state: TOrderState) => {
                orderSlice.caseReducers.request(state)
            })
            .addCase(createOrder.fulfilled, (state: TOrderState, action: PayloadAction<void | ICreateOrderResponse>) => {
                if (action.payload && action.payload.success) {
                    state.orderNumber = action.payload.order.number
                }
                orderSlice.caseReducers.success(state)
            })
            .addCase(createOrder.rejected, (state: TOrderState) => {
                orderSlice.caseReducers.failed(state)
            })
    }
})

export const { resetOrderNumber } = orderSlice.actions

export default orderSlice
