import React from "react";
import BurgerConstructorItem from "./burger-constructor-item";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IBurgerItem from "../../interfaces/IBurgerItem";
import IRemoveFromCart from "../../interfaces/IRemoveFromCart";
import burgerConstructorStyles from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import useModal from "../modal/use-modal";

function BurgerConstructor(props: {items: IBurgerItem[], removeFromCart: IRemoveFromCart}) {
    const { isOpen, toggle } = useModal();

    let bunTop: IBurgerItem | undefined,
        bunBottom: IBurgerItem | undefined,
        cartTotal: number = 0

    if (props.items) {
        bunTop = props.items.find((cartItem: IBurgerItem) => cartItem.subtype === 'top')
        bunBottom = props.items.find((cartItem: IBurgerItem) => cartItem.subtype === 'bottom')

        cartTotal += (bunTop ? bunTop.price : 0) + (bunBottom ? bunBottom.price : 0)
    }

    const items = props.items && props.items.filter((item) => item.type !== 'bun')

    items.forEach((item) => {
        cartTotal += item.price
    })

    return (
        <>
            <Modal isOpen={isOpen} hide={toggle}>
                <OrderDetails orderId="0345636" />
            </Modal>
            <div className="mt-10">
                {bunTop && <BurgerConstructorItem item={bunTop} key={'top_' + bunTop._id} removeFromCart={props.removeFromCart} isDrugEnabled={false} />}

                <div className={`${burgerConstructorStyles.scroll}`}>
                    {items ? items.map((item) => {
                        return <BurgerConstructorItem removeFromCart={props.removeFromCart} item={item} key={item._id} isDrugEnabled={true} />
                    }) : null}
                </div>

                {bunBottom && <BurgerConstructorItem item={bunBottom} key={'bottom_' + bunBottom._id} removeFromCart={props.removeFromCart} isDrugEnabled={false} />}
            </div>
            {props.items.length > 0 ? (
                <div className="mt-10" style={{display: "flex", alignItems: "center", justifyContent:"flex-end"}}>
                    <p className="text text_type_digits-medium mr-10">
                        <span className="text text_type_digits-medium">{cartTotal}</span>
                        <CurrencyIcon type="primary" />
                    </p>
                    <Button type="primary" size="large" onClick={toggle}>Оформить заказ</Button>
                </div>
            ) : null}
        </>
    )
}

export default BurgerConstructor