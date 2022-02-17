import React from "react";
import ingredientsStyle from './ingredients-list.module.css'
import IngredientItem from "./ingredient-item";

function IngredientsList(props: { items: object[], cart: object[], type: string, title: string, addToCartHandler: any }) {
    return (
        <>
            <h2 className="mb-6">{props.title}</h2>
            <div className={`${ingredientsStyle.ingredients} pt-6`}>
                {props.items ? props.items.map((item) => {
                    return <IngredientItem item={item} cart={props.cart} key={item._id} addToCartHandler={props.addToCartHandler} />
                }) : null}
            </div>
        </>
    )
}

export default IngredientsList