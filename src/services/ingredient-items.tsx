import IBurgerItem from "../interfaces/IBurgerItem";
import {createSlice, Dispatch, PayloadAction, Slice} from "@reduxjs/toolkit";

export interface IIngredientItemsState {
    items: IBurgerItem[] | [],
    request: boolean,
    failed: boolean,
}

const initialState: IIngredientItemsState = {
    items: [],
    request: false,
    failed: false,
}

const API_URL = 'https://norma.nomoreparties.space/api/ingredients'

export const ingredientItemsSlice: Slice = createSlice({
    name: 'ingredientItems',
    initialState: initialState,
    reducers: {
        getIngredientItemsRequest: (state: IIngredientItemsState) => {
            return {
                ...state,
                request: true,
                failed: false
            }
        },
        getIngredientItemsSuccess: (state: IIngredientItemsState, action: PayloadAction<IBurgerItem[]>) => {
            return {
                ...state,
                request: false,
                failed: false,
                items: action.payload
            }
        },
        getIngredientItemsFailed: (state: IIngredientItemsState) => {
            return {
                ...state,
                request: false,
                failed: true,
            }
        }
    },
})

export const {getIngredientItemsRequest, getIngredientItemsSuccess, getIngredientItemsFailed} = ingredientItemsSlice.actions

export const getItems = () => async (dispatch: Dispatch) => {
    // @ts-ignore
    dispatch(getIngredientItemsRequest())
    fetch(API_URL)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(new Error(response.statusText))
            }
            return response.json()
        })
        .then((response) => {
            if (response && response.success) {
                dispatch(getIngredientItemsSuccess(response.data))
            }
        })
        .catch((error) => {
            console.log(error)
            // @ts-ignore
            dispatch(getIngredientItemsFailed())
        })
}

export default ingredientItemsSlice.reducer
