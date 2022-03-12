import { configureStore } from '@reduxjs/toolkit'
import {rootReducer} from "./services";
import thunk from "redux-thunk";

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production',
})

export type AppRootState = ReturnType<typeof store.getState>
