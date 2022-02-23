import React from "react";
import IBurgerItem from "../interfaces/IBurgerItem";
import ingredientDetailsStyles from "./ingredient-details.module.css"

export default function IngredientDetails(props: {item: IBurgerItem}) {
    return (
        <>
            <div className={ingredientDetailsStyles.imgContainer}>
                <img src={props.item.image_large} alt={props.item.name} />
            </div>

            <p className="mt-4 mb-8 text text_type_main-medium" style={{textAlign: "center"}}>
                {props.item.name}
            </p>

            <div className={`${ingredientDetailsStyles.properties} mb-15`}>
                <div>
                    <p className={`${ingredientDetailsStyles.propertiesColumn} text text_type_main-default text_color_inactive`}>
                        Калории, ккал
                    </p>
                    <p className={`${ingredientDetailsStyles.propertiesColumn} text text_type_digits-default text_color_inactive`}>
                        {props.item.calories}
                    </p>
                </div>

                <div>
                    <p className={`${ingredientDetailsStyles.propertiesColumn} text text_type_main-default text_color_inactive`}>
                        Белки, г
                    </p>
                    <p className={`${ingredientDetailsStyles.propertiesColumn} text text_type_digits-default text_color_inactive`}>
                        {props.item.proteins}
                    </p>
                </div>

                <div>
                    <p className={`${ingredientDetailsStyles.propertiesColumn} text text_type_main-default text_color_inactive`}>
                        Жиры, г
                    </p>
                    <p className={`${ingredientDetailsStyles.propertiesColumn} text text_type_digits-default text_color_inactive`}>
                        {props.item.fat}
                    </p>
                </div>

                <div>
                    <p className={`${ingredientDetailsStyles.propertiesColumn} text text_type_main-default text_color_inactive`}>
                        Углеводы, г
                    </p>
                    <p className={`${ingredientDetailsStyles.propertiesColumn} text text_type_digits-default text_color_inactive`}>
                        {props.item.carbohydrates}
                    </p>
                </div>
            </div>
        </>
    )
}