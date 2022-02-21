import React from "react";
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientItemStyle from './ingredient-item.module.css';
import IBurgerItem from "../../interfaces/IBurgerItem";
import IAddToCart from "../../interfaces/IAddToCart";

function IngredientItem(props: { item: IBurgerItem, cart: IBurgerItem[], addToCartHandler: IAddToCart }) {
    let hasCartThisItem = false
    if (props.cart) {
        hasCartThisItem = typeof props.cart.find((cartItem) => cartItem._id === props.item._id) !== "undefined"
    }

    return (
        <div
            className={`${ingredientItemStyle.item} mb-10`}
            style={{cursor:"pointer"}}
            onClick={() => props.addToCartHandler(props.item)} key={props.item._id}
        >
            {hasCartThisItem ? (
                <span className={`${ingredientItemStyle.badge} text text_type_digits-default`}>1</span>
            ) : null}
            <div className={ingredientItemStyle.image}>
                <img src={props.item.image} alt={props.item.name}/>
            </div>
            <p className="text text_type_digits-default pt-1 pb-1" style={{display:"flex", alignItems:"center", justifyContent: "center"}}>
                <span className="mr-2">{props.item.price}</span>
                <CurrencyIcon type="primary" />
            </p>
            <p className="text text_type_main-default pb-5" style={{display:"flex", alignItems:"center", justifyContent: "center"}}>
                {props.item.name}
            </p>
        </div>
    )
}

export default IngredientItem