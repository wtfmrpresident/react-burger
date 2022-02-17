import React from "react";
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientItemStyle from './ingredient-item.module.css';

function IngredientItem(props: { item: object, cart: object[], addToCartHandler: any }, key: React.Key | null) {
    let hasCartThisItem = false
    if (props.cart) {
        hasCartThisItem = typeof props.cart.find((cartItem) => cartItem._id === props.item._id) !== "undefined"
    }

    return (
        <a className={`${ingredientItemStyle.item} mb-10`} style={{cursor:"pointer"}} onClick={() => props.addToCartHandler(props.item)}>
            {hasCartThisItem ? (
                <span className={`${ingredientItemStyle.badge} text text_type_digits-default`}>1</span>
            ) : null}
            <div className={ingredientItemStyle.image}>
                <img src={props.item.image} alt={props.name}/>
            </div>
            <p className="text text_type_digits-default pt-1 pb-1" style={{display:"flex", alignItems:"center", justifyContent: "center"}}>
                <span className="mr-2">{props.item.price}</span>
                <CurrencyIcon type="primary" />
            </p>
            <p className="text text_type_main-default pb-5" style={{display:"flex", alignItems:"center", justifyContent: "center"}}>
                {props.item.name}
            </p>
        </a>
    )
}

export default IngredientItem