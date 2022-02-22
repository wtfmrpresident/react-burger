import React from "react";
import BurgerConstructorItem from "./burger-constructor-item";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IBurgerItem from "../../interfaces/IBurgerItem";
import IRemoveFromCart from "../../interfaces/IRemoveFromCart";
import burgerConstructorStyles from "./burger-constructor.module.css";

function BurgerConstructor(props: {items: IBurgerItem[], removeFromCart: IRemoveFromCart}) {
    let bunTop: IBurgerItem | undefined,
        bunBottom: IBurgerItem | undefined,
        cartTotal: number = 0

    if (props.items) {
        bunTop = props.items.find((cartItem: IBurgerItem) => cartItem.subtype === 'top')
        bunBottom = props.items.find((cartItem: IBurgerItem) => cartItem.subtype === 'bottom')

        cartTotal += (bunTop ? bunTop.price : 0) + (bunBottom ? bunBottom.price : 0)
    }

    const items = props.items && props.items.filter((item) => item.type !== 'bun')

    return (
        <>
            <div className={`${burgerConstructorStyles.scroll} mt-10`}>
                {bunTop && <BurgerConstructorItem item={bunTop} key={'top_' + bunTop._id} removeFromCart={props.removeFromCart} isDrugEnabled={false} />}

                {items ? items.map((item) => {
                    cartTotal += item.price
                    return <BurgerConstructorItem removeFromCart={props.removeFromCart} item={item} key={item._id} isDrugEnabled={true} />
                }) : null}

                {bunBottom && <BurgerConstructorItem item={bunBottom} key={'bottom_' + bunBottom._id} removeFromCart={props.removeFromCart} isDrugEnabled={false} />}
            </div>
            {props.items.length > 0 ? (
                <div className="mt-10" style={{display: "flex", alignItems: "center", justifyContent:"flex-end"}}>
                    <p className="text text_type_digits-medium mr-10">
                        <span className="text text_type_digits-medium">{cartTotal}</span>
                        <CurrencyIcon type="primary" />
                    </p>
                    <Button  type="primary" size="large">Оформить заказ</Button>
                </div>
            ) : null}
        </>
    )
}

export default BurgerConstructor