import IBurgerItem from "../interfaces/IBurgerItem";
import {createSlice, Dispatch, PayloadAction, Slice} from "@reduxjs/toolkit";
import {baseUrl, checkResponse} from "./api";

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

const API_URL = baseUrl + '/ingredients'

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
            const items = action.payload.map((item) => {
                return {
                    ...item,
                    quantity: 0
                }
            })

            return {
                ...state,
                request: false,
                failed: false,
                items
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
        .then(checkResponse)
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
