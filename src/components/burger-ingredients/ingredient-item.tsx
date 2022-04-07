import React from "react";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientItemStyle from './ingredient-item.module.css';
import IBurgerItem from "../../interfaces/IBurgerItem";
import {useSelector} from "react-redux";
import {AppRootState} from "../../store";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";

function IngredientItem(props: { item: IBurgerItem }) {
    const location = useLocation()

    const bunItemsState = useSelector((state: AppRootState) => state.cart.bunItems)
    const ingredientItemsState = useSelector((state: AppRootState) => state.cart.ingredientItems)

    function getCartItemQuantity(item: IBurgerItem) {
        const cart = item.type === 'bun' ? bunItemsState : ingredientItemsState

        let quantity = cart.filter((cartItem: IBurgerItem) => item._id === cartItem._id).length
        if (quantity > 0 && item.type === 'bun') {
            return --quantity
        }

        return quantity
    }

    const cartItemQuantity = getCartItemQuantity(props.item)

    const [{opacity, transform}, ref] = useDrag({
        type: props.item.type === 'bun' ? 'bun' : 'ingredient',
        item: props.item,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
            transform: "translate(0, 0)"
        })
    })

    return (
        <>
            <Link
                to={`/ingredients/${props.item._id}`}
                state={{backgroundLocation: location}}
                key={props.item._id}
                className={`${ingredientItemStyle.item} mb-10`}
            >
                <div
                    style={{cursor:"pointer", opacity, transform}}
                    ref={ref}
                >
                    {cartItemQuantity ? (
                        <Counter count={cartItemQuantity} />
                    ) : null}
                    <div className={ingredientItemStyle.image}>
                        <img src={props.item.image} alt={props.item.name}/>
                    </div>
                    <p className={`${ingredientItemStyle.paragraph} text text_type_digits-default pt-1 pb-1`}>
                        <span className="mr-2">{props.item.price}</span>
                        <CurrencyIcon type="primary" />
                    </p>
                    <p className={`${ingredientItemStyle.paragraph} text text_type_main-default pb-5`}>
                        {props.item.name}
                    </p>
                </div>
            </Link>
        </>
    )
}

export default IngredientItem
