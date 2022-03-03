import React, {useContext, useEffect} from "react";
import BurgerConstructorItem from "./burger-constructor-item";
import IBurgerItem from "../../interfaces/IBurgerItem";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {CartItemsContext, CartTotalContext} from "../../services/burger-context";
import {BurgerConstructorTotal} from "./burger-constructor-total";

function BurgerConstructor() {
    const {cartItemsState} = useContext(CartItemsContext)
    const {setTotalPrice} = useContext(CartTotalContext)

    const bunTop = cartItemsState ? cartItemsState.find((cartItem: IBurgerItem) => cartItem.subtype === 'top') : null
    const bunBottom = cartItemsState ? cartItemsState.find((cartItem: IBurgerItem) => cartItem.subtype === 'bottom') : null

    const items = cartItemsState && cartItemsState.filter((item) => item.type !== 'bun')

    useEffect(() => {
        let total: number = (bunTop ? bunTop.price : 0) + (bunBottom ? bunBottom.price : 0)

        items.forEach((item) => {
            total += item.price
        })

        setTotalPrice(total)
    }, [setTotalPrice, cartItemsState, bunTop, bunBottom, items])

    return (
        <>
            <div className="mt-10">
                {bunTop && <BurgerConstructorItem item={bunTop} key={'top_' + bunTop._id} isDrugEnabled={false} />}

                <div className={`${burgerConstructorStyles.scroll}`}>
                    {items ? items.map((item) => {
                        return <BurgerConstructorItem item={item} key={item._id} isDrugEnabled={true} />
                    }) : null}
                </div>

                {bunBottom && <BurgerConstructorItem item={bunBottom} key={'bottom_' + bunBottom._id} isDrugEnabled={false} />}
            </div>
            {(bunTop && bunBottom) || items.length > 0 ? (
                <BurgerConstructorTotal />
            ) : null}
        </>
    )
}

export default BurgerConstructor
