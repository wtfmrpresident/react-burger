import React from "react";
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientItemStyle from './ingredient-item.module.css';
import IBurgerItem from "../../interfaces/IBurgerItem";
import {useSelector} from "react-redux";
import {AppRootState} from "../../store";
import {useDrag} from "react-dnd";

function IngredientItem(props: { item: IBurgerItem, toggleModal: (item: IBurgerItem) => void}) {
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
            <div
                className={`${ingredientItemStyle.item} mb-10`}
                style={{cursor:"pointer", opacity, transform}}
                onClick={() => props.toggleModal(props.item)}
                ref={ref}
            >
                {cartItemQuantity ? (
                    <span className={`${ingredientItemStyle.badge} text text_type_digits-default`}>{cartItemQuantity}</span>
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
        </>
    )
}

export default IngredientItem
