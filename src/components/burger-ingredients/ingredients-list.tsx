import React from "react";
import ingredientsStyle from './ingredients-list.module.css'
import IngredientItem from "./ingredient-item";
import IBurgerItem from "../../interfaces/IBurgerItem";
import IAddToCart from "../../interfaces/IAddToCart";

const IngredientsList = React.forwardRef((props: { items: IBurgerItem[], cart: IBurgerItem[],  addToCartHandler: IAddToCart }, ref) => {
    return (
        <div className={`${ingredientsStyle.ingredients} pt-6`}>
            {props.items ? props.items.map((item: IBurgerItem) => {
                return <IngredientItem
                    item={item}
                    cart={props.cart}
                    key={item._id}
                    addToCartHandler={props.addToCartHandler}
                />
            }) : null}
        </div>
    )
})

export default IngredientsList