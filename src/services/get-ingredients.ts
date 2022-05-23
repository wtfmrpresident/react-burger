import IBurgerItem from "../interfaces/IBurgerItem";
import {createAsyncThunk, createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import ingredientsService, {IIngredientsResponse} from "../utils/ingredients";

export interface IIngredientItemsState {
    items: IBurgerItem[] | [],
    request: boolean,
    failed: boolean,
}

export const initialState: IIngredientItemsState = {
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

type TIngredientItemsActions = {
    request: (state: IIngredientItemsState) => void;
    success: (state: IIngredientItemsState) => void;
    failed: (state: IIngredientItemsState) => void;
}

export const ingredientItemsSlice: Slice<IIngredientItemsState, TIngredientItemsActions> = createSlice({
    name: 'ingredientItems',
    initialState: initialState,
    reducers: {
        request: (state: IIngredientItemsState) => {
            state.request = true
            state.failed = false
        },
        success: (state: IIngredientItemsState) => {
            state.request = false
            state.failed = false
        },
        failed: (state: IIngredientItemsState) => {
            state.request = false
            state.failed = true
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.pending, (state: IIngredientItemsState) => {
                ingredientItemsSlice.caseReducers.request(state)
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

                ingredientItemsSlice.caseReducers.success(state)
            })
            .addCase(getIngredients.rejected, (state: IIngredientItemsState) => {
                ingredientItemsSlice.caseReducers.failed(state)
            })
    }
})

export const reducer = ingredientItemsSlice.reducer

export default ingredientItemsSlice
