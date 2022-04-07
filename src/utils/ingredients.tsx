import IBurgerItem from "../interfaces/IBurgerItem";
import {baseUrl, checkResponse} from "../services/api";

export interface IIngredientsResponse {
    success: boolean,
    data: IBurgerItem[],
}

export interface IIngredients {
    (): Promise<void | IIngredientsResponse>
}

const ingredientsUrl = baseUrl + '/ingredients'

const ingredients: IIngredients = () => {
    return fetch(ingredientsUrl)
        .then(checkResponse)
        .then((response) => {
            return response
        })
}

const ingredientsService = {ingredients}

export default ingredientsService
