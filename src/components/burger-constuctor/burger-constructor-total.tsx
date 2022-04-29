import React, { useEffect, useState } from "react";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import burgerConstructorTotalStyles from './burger-constructor-total.module.css'
import { useSelector } from "react-redux";
import { AppRootState } from "../../store";
import IBurgerItem from "../../interfaces/IBurgerItem";
import { totalPriceSelector } from "../../services/total-price";
import { createOrder, resetOrderNumber } from "../../services/order";
import { resetCart } from "../../services/cart";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../types/hooks";

export const BurgerConstructorTotal = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const totalPrice = useSelector(totalPriceSelector)

    const accountState = useSelector((state: AppRootState) => state.account)
    const bunItemsState: IBurgerItem[] = useSelector((state: AppRootState) => state.cart.bunItems)
    const ingredientItemsState: IBurgerItem[] = useSelector((state: AppRootState) => state.cart.ingredientItems)
    const {orderNumber, request, failed} = useSelector((state: AppRootState) => state.order)

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    const handleCreateOrderClick = () => {
        if (!accountState.user) {
            navigate('/login')
        }

        const items = bunItemsState.concat(ingredientItemsState)
        dispatch(createOrder({items}))
    }

    useEffect(() => {
        if (orderNumber) {
            setIsModalVisible(true)
            // @ts-ignore
            dispatch(resetCart())
        }
        // Тут точно не должно быть зависимости от toggle, но без него при сборке появляется WARNING
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderNumber])

    const onModalClose = () => {
        setIsModalVisible(false)
        // @ts-ignore
        dispatch(resetOrderNumber())
    }

    return (
        <>
            {orderNumber && (
                <Modal isModalVisible={isModalVisible} onClose={onModalClose}>
                    <OrderDetails orderNumber={orderNumber} hasError={failed}/>
                </Modal>
            )}

            {bunItemsState.length || ingredientItemsState.length > 0 ? (
                <div className={`${burgerConstructorTotalStyles.container} mt-10`}>
                    <p className="text text_type_digits-medium mr-10">
                        <span className="text text_type_digits-medium">{totalPrice}</span>
                        <CurrencyIcon type="primary"/>
                    </p>

                    <Button type="primary" size="large" onClick={handleCreateOrderClick}
                            disabled={request || bunItemsState.length === 0}>Оформить заказ</Button>
                </div>
            ) : null}
        </>
    )
}
