import React, {useContext} from "react";
import BurgerConstructorItem from "./burger-constructor-item";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IBurgerItem from "../../interfaces/IBurgerItem";
import burgerConstructorStyles from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import useModal from "../modal/use-modal";
import {CartItemsContext} from "../../services/burger-context";

function BurgerConstructor() {
    const { isOpen, toggle } = useModal();

    const {cartItemsState} = useContext(CartItemsContext)

    const bunTop = cartItemsState ? cartItemsState.find((cartItem: IBurgerItem) => cartItem.subtype === 'top') : null
    const bunBottom = cartItemsState ? cartItemsState.find((cartItem: IBurgerItem) => cartItem.subtype === 'bottom') : null

    const items = cartItemsState && cartItemsState.filter((item) => item.type !== 'bun')

    let cartTotal: number = (bunTop ? bunTop.price : 0) + (bunBottom ? bunBottom.price : 0)

    items.forEach((item) => {
        cartTotal += item.price
    })

    return (
        <>
            <Modal isOpen={isOpen} hide={toggle}>
                <OrderDetails orderId="0345636" />
            </Modal>
            <div className="mt-10">
                {bunTop && <BurgerConstructorItem item={bunTop} key={'top_' + bunTop._id} isDrugEnabled={false} />}

                <div className={`${burgerConstructorStyles.scroll}`}>
                    {items ? items.map((item) => {
                        return <BurgerConstructorItem item={item} key={item._id} isDrugEnabled={true} />
                    }) : null}
                </div>

                {bunBottom && <BurgerConstructorItem item={bunBottom} key={'bottom_' + bunBottom._id} isDrugEnabled={false} />}
            </div>
            {items.length > 0 ? (
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
