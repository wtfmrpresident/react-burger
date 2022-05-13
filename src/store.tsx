import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from "./services";
import thunk from "redux-thunk";
import { socketMiddleware } from "./services/socket-middleware";
import { WS_ORDER_ACTIONS } from "./services/order-socket";

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(thunk, socketMiddleware(WS_ORDER_ACTIONS));
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
