import React from "react";
import ingredientsStyle from './ingredients-list.module.css'
import IngredientItem from "./ingredient-item";
import IBurgerItem from "../../interfaces/IBurgerItem";

const IngredientsList = (props: { items: IBurgerItem[], toggleModal: (item: IBurgerItem) => void }) => {
    return (
        <div className={`${ingredientsStyle.ingredients} pt-6`}>
            {props.items ? props.items.map((item: IBurgerItem) => {
                return <IngredientItem
                    item={item}
                    key={item._id}
                    toggleModal={props.toggleModal}
                />
            }) : null}
        </div>
    )
}

export default IngredientsList
