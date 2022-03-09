import React, {useContext} from "react";
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientItemStyle from './ingredient-item.module.css';
import IBurgerItem from "../../interfaces/IBurgerItem";
import useModal from "../modal/use-modal";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useSelector} from "react-redux";
import {AppRootState} from "../../store";

function IngredientItem(props: { item: IBurgerItem}) {
    const cartItemsState = useSelector((state: AppRootState) => state.cart.cartItems)

    function hasCartItem(item: IBurgerItem, cart: IBurgerItem[]): boolean {
        return cart && cart.some((cartItem) => cartItem._id === item._id)
    }

    const hasCartThisItem = hasCartItem(props.item, cartItemsState)
    const { isOpen, toggle } = useModal();

    return (
        <>
            <Modal isOpen={isOpen} hide={toggle} title="Детали ингредиента">
                <IngredientDetails item={props.item} />
            </Modal>
            <div
                className={`${ingredientItemStyle.item} mb-10`}
                style={{cursor:"pointer"}}
                onClick={toggle}
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
        </>
    )
}

export default IngredientItem
