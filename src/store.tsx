import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from "./services";
import thunk from "redux-thunk";
import { socketMiddleware } from "./services/socket-middleware";

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(thunk, socketMiddleware());
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
