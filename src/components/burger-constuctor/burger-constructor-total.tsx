import React, {useEffect} from "react";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import useModal from "../modal/use-modal";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import burgerConstructorTotalStyles from './burger-constructor-total.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../store";
import IBurgerItem from "../../interfaces/IBurgerItem";
import {totalPriceSelector} from "../../services/total-price";
import {createOrder} from "../../services/order";

export const BurgerConstructorTotal = () => {
    const dispatch = useDispatch()

    const totalPrice = useSelector(totalPriceSelector)

    const bunItemsState: IBurgerItem[] = useSelector((state: AppRootState) => state.cart.bunItems)
    const ingredientItemsState: IBurgerItem[] = useSelector((state: AppRootState) => state.cart.ingredientItems)
    const {orderNumber, request, failed} = useSelector((state: AppRootState) => state.order)

    const { isOpen, toggle } = useModal();

    const handleCreateOrderClick = () => {
        const cartItems = bunItemsState.concat(ingredientItemsState)
        dispatch(createOrder(cartItems))
    }

    useEffect(() => {
        if (orderNumber) {
            toggle()
        }
        // Тут точно не должно быть зависимости от toggle, но без него при сборке появляется WARNING
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderNumber])

    return (
        <>
            {orderNumber && (
                    <Modal isOpen={isOpen} hide={toggle}>
                        <OrderDetails orderNumber={orderNumber} hasError={failed} />
                    </Modal>
                )
            }

            <div className={`${burgerConstructorTotalStyles.container} mt-10`}>
                <p className="text text_type_digits-medium mr-10">
                    <span className="text text_type_digits-medium">{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                </p>
                <Button type="primary" size="large" onClick={handleCreateOrderClick} disabled={request}>Оформить заказ</Button>
            </div>
        </>
    )
}
