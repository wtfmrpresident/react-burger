import React, {useContext, useState} from "react";
import {CartItemsContext, CartTotalContext} from "../../services/burger-context";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import useModal from "../modal/use-modal";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import burgerConstructorTotalStyles from './burger-constructor-total.module.css'

export const BurgerConstructorTotal = () => {
    const {cartItemsState} = useContext(CartItemsContext)
    const [orderNumber, setOrderNumber] = useState<number | null>(null)
    const [hasError, setHasError] = useState<boolean>(false)
    const {totalPrice} = useContext(CartTotalContext)

    const CREATE_ORDER_URL = 'https://norma.nomoreparties.space/api/orders'

    const { isOpen, toggle } = useModal();

    const createOrder = () => {
        setHasError(false)

        const postData = cartItemsState.map((cartItem) => {
            return cartItem._id
        })

        fetch(CREATE_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({"ingredients": postData}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((result) => result.json())
            .then((result) => {
                if (result.success && result.order.number) {
                    setOrderNumber(result.order.number)
                }

                toggle()
            })
            .catch((error) => {
                console.log(error)
                setHasError(true)
            })
    }

    return (
        <>
            {orderNumber && (
                    <Modal isOpen={isOpen} hide={toggle}>
                        <OrderDetails orderNumber={orderNumber} hasError={hasError} />
                    </Modal>
                )
            }

            <div className={`${burgerConstructorTotalStyles.container} mt-10`}>
                <p className="text text_type_digits-medium mr-10">
                    <span className="text text_type_digits-medium">{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                </p>
                <Button type="primary" size="large" onClick={createOrder}>Оформить заказ</Button>
            </div>
        </>
    )
}
