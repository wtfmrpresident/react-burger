import React from "react";
import BurgerConstructorItem from "./burger-constructor-item";
import IBurgerItem from "../../interfaces/IBurgerItem";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { BurgerConstructorTotal } from "./burger-constructor-total";
import { AppRootState } from "../../store";
import { useDrop } from "react-dnd";
import { addToCart } from "../../services/cart";
import { useAppDispatch, useAppSelector } from "../../types/hooks";

function BurgerConstructor() {
    const dispatch = useAppDispatch()

    const bunItemsState: IBurgerItem[] = useAppSelector((state: AppRootState) => state.cart.bunItems)
    const ingredientItemsState: IBurgerItem[] = useAppSelector((state: AppRootState) => state.cart.ingredientItems)

    const bunTop = bunItemsState ? bunItemsState.find((cartItem) => cartItem.subtype === 'top') : null
    const bunBottom = bunItemsState ? bunItemsState.find((cartItem) => cartItem.subtype === 'bottom') : null

    const [{ingredientIsHover}, ingredientDropTarget] = useDrop({
        accept: ['bun', 'ingredient'],
        collect: monitor => ({
            ingredientIsHover: monitor.isOver()
        }),
        drop(item) {
            dispatch(addToCart(item))
        }
    })

    return (
        <>
            <div
                className={`${burgerConstructorStyles.container} ${ingredientIsHover ? burgerConstructorStyles.container_active : null} mt-10`}
                ref={ingredientDropTarget}>
                {bunTop && (
                    <BurgerConstructorItem item={bunTop} key={bunTop.uuid} isDrugEnabled={false}/>
                )}

                <div className={`${burgerConstructorStyles.scroll}`}>
                    {ingredientItemsState ? ingredientItemsState.map((item: IBurgerItem, index) => {
                        return <BurgerConstructorItem item={item} key={item.uuid} index={index} isDrugEnabled={true}/>
                    }) : null}
                </div>

                {bunBottom && (
                    <BurgerConstructorItem item={bunBottom} key={bunBottom.uuid} isDrugEnabled={false}/>
                )}
            </div>

            <BurgerConstructorTotal/>
        </>
    )
}

export default BurgerConstructor
