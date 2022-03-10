import React from "react";
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientItemStyle from './ingredient-item.module.css';
import IBurgerItem from "../../interfaces/IBurgerItem";
import useModal from "../modal/use-modal";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useSelector} from "react-redux";
import {AppRootState} from "../../store";
import {useDrag} from "react-dnd";

function IngredientItem(props: { item: IBurgerItem}) {
    const cartItemsState = useSelector((state: AppRootState) => state.cart.ingredientItems)

    function getCartItemQuantity(item: IBurgerItem, cart: IBurgerItem[]) {
        let i = cart.length;
        while (i--) {
            if (cart[i]._id === item._id) {
                return cart[i].quantity;
            }
        }
    }

    const cartItemQuantity = getCartItemQuantity(props.item, cartItemsState)
    const { isOpen, toggle } = useModal();

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
            <Modal isOpen={isOpen} hide={toggle} title="Детали ингредиента">
                <IngredientDetails item={props.item} />
            </Modal>
            <div
                className={`${ingredientItemStyle.item} mb-10`}
                style={{cursor:"pointer", opacity, transform}}
                onClick={toggle}
                ref={ref}
            >
                {cartItemQuantity ? (
                    <span className={`${ingredientItemStyle.badge} text text_type_digits-default`}>{cartItemQuantity}</span>
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
