import React from "react";
import BurgerConstructorItem from "./burger-constructor-item";
import IBurgerItem from "../../interfaces/IBurgerItem";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {BurgerConstructorTotal} from "./burger-constructor-total";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../store";
import {useDrop} from "react-dnd";
import {addToCart} from "../../services/cart";

function BurgerConstructor() {
    const dispatch = useDispatch()

    const bunItemsState: IBurgerItem[] = useSelector((state: AppRootState) => state.cart.bunItems)
    const ingredientItemsState: IBurgerItem[] = useSelector((state: AppRootState) => state.cart.ingredientItems)

    const bunTop = bunItemsState ? bunItemsState.find((cartItem: IBurgerItem) => cartItem.subtype === 'top') : null
    const bunBottom = bunItemsState ? bunItemsState.find((cartItem: IBurgerItem) => cartItem.subtype === 'bottom') : null

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
            <div className={`${burgerConstructorStyles.container} ${ingredientIsHover ? burgerConstructorStyles.container_active : null} mt-10`} ref={ingredientDropTarget}>
                { bunTop && (
                    <BurgerConstructorItem item={bunTop} key={'top_' + bunTop._id} isDrugEnabled={false} />
                )}

                <div className={`${burgerConstructorStyles.scroll}`}>
                    {ingredientItemsState ? ingredientItemsState.map((item: IBurgerItem, index) => {
                        return <BurgerConstructorItem item={item} key={item._id} index={index} isDrugEnabled={true} />
                    }) : null}
                </div>

                { bunBottom && (
                    <BurgerConstructorItem item={bunBottom} key={'bottom_' + bunBottom._id} isDrugEnabled={false} />
                )}
            </div>
            {(bunTop && bunBottom) || ingredientItemsState.length > 0 ? (
                <BurgerConstructorTotal />
            ) : null}
        </>
    )
}

export default BurgerConstructor
