import IBurgerItem from "../interfaces/IBurgerItem";
import {createAsyncThunk, createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import ingredientsService, {IIngredientsResponse} from "../utils/ingredients";

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

export const getIngredients = createAsyncThunk(
    'getIngredients',
    async (): Promise<void | IIngredientsResponse> => {
        return await ingredientsService.ingredients()
    }
)

export const ingredientItemsSlice: Slice = createSlice({
    name: 'ingredientItems',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.pending, (state: IIngredientItemsState) => {
                state.request = true
                state.failed = false
            })
            .addCase(getIngredients.fulfilled, (state: IIngredientItemsState, action: PayloadAction<void | IIngredientsResponse>) => {
                if (action.payload) {
                    state.items = action.payload.data.map((item) => {
                        return {
                            ...item,
                            quantity: 0
                        }
                    })
                }

                state.request = false
                state.failed = false
            })
            .addCase(getIngredients.rejected, (state: IIngredientItemsState) => {
                state.request = false
                state.failed = true
            })
    }
})

export default ingredientItemsSlice.reducer
