import React, {useEffect} from "react";
import IBurgerItem from "../../interfaces/IBurgerItem";
import ingredientDetailsStyles from "./ingredient-details.module.css"
import {useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../store";
import {getItems} from "../../services/ingredient-items";

export default function IngredientDetails() {
    const dispatch = useDispatch()

    const location = useLocation()
    const state = location.state as { backgroundLocation?: Location };

    const { id } = useParams()

    const ingredientsState: IBurgerItem[] = useSelector((state: AppRootState) => state.ingredients.items)

    const ingredient = ingredientsState.find((item: IBurgerItem) => item._id === id)

    useEffect(() => {
        if (!ingredientsState.length) {
            dispatch(getItems())
        }
    }, [dispatch, ingredientsState.length])

    if (!ingredient) {
        return null
    }

    return (
        <div className={ingredientDetailsStyles.content_container} style={!state?.backgroundLocation ? {marginTop: 120} : {}}>
            <div className={ingredientDetailsStyles.content}>
                <div className={ingredientDetailsStyles.img_container}>
                    <img src={ingredient.image_large} alt={ingredient.name} />
                </div>

                <p className="text__center mt-4 mb-8 text text_type_main-medium">
                    {ingredient.name}
                </p>

                <div className={`${ingredientDetailsStyles.properties} mb-15`}>
                    <div>
                        <p className={`${ingredientDetailsStyles.properties_column} text text_type_main-default text_color_inactive`}>
                            Калории, ккал
                        </p>
                        <p className={`${ingredientDetailsStyles.properties_column} text text_type_digits-default text_color_inactive`}>
                            {ingredient.calories}
                        </p>
                    </div>

                    <div>
                        <p className={`${ingredientDetailsStyles.properties_column} text text_type_main-default text_color_inactive`}>
                            Белки, г
                        </p>
                        <p className={`${ingredientDetailsStyles.properties_column} text text_type_digits-default text_color_inactive`}>
                            {ingredient.proteins}
                        </p>
                    </div>

                    <div>
                        <p className={`${ingredientDetailsStyles.properties_column} text text_type_main-default text_color_inactive`}>
                            Жиры, г
                        </p>
                        <p className={`${ingredientDetailsStyles.properties_column} text text_type_digits-default text_color_inactive`}>
                            {ingredient.fat}
                        </p>
                    </div>

                    <div>
                        <p className={`${ingredientDetailsStyles.properties_column} text text_type_main-default text_color_inactive`}>
                            Углеводы, г
                        </p>
                        <p className={`${ingredientDetailsStyles.properties_column} text text_type_digits-default text_color_inactive`}>
                            {ingredient.carbohydrates}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
