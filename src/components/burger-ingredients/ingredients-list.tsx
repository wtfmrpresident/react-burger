import React, { FC } from "react";
import ingredientsStyle from './ingredients-list.module.css'
import IngredientItem from "./ingredient-item";
import IBurgerItem from "../../interfaces/IBurgerItem";

type TIngredientList = {
    items: IBurgerItem[]
}

const IngredientsList: FC<TIngredientList> = ({items}) => {
    return (
        <div className={`${ingredientsStyle.ingredients} pt-6`}>
            {items ? items.map((item: IBurgerItem) => {
                return <IngredientItem
                    item={item}
                    key={item._id}
                />
            }) : null}
        </div>
    )
}

export default IngredientsList
