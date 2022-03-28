import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from "./services";
import { useDispatch } from 'react-redux'
import thunk from "redux-thunk";

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(thunk);
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
