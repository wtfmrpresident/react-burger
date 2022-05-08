import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { AppRootState } from "../store";
import { Navigate } from "react-router-dom";
import orderSocketSlice from "../services/order-socket";
import {wsUrl} from "../services/api";
import {useAppDispatch, useAppSelector} from "../types/hooks";
import {getCookie} from "../utils/cookie";
import {TWsOrder} from "../interfaces/TWsOrderActions";
import FeedItem from "../components/feed-item/feed-item";

export function ProfileOrdersPage() {
    const dispatch = useAppDispatch()
    const accountState = useSelector((state: AppRootState) => state.account)
    const ordersSocketState = useAppSelector(store => store.orderSocket)

    useEffect(
        () => {
            const token = getCookie('token')
            if (token) {
                dispatch(orderSocketSlice.actions.wsInit({
                    wsUrl,
                    token
                }))
            }
            return () => {
                dispatch(orderSocketSlice.actions.onClose)
            }
        },
        [dispatch]
    )

    if (!accountState.user) {
        return <Navigate replace to="/login" />
    }

    const orders = ordersSocketState.orders

    if (!orders) {
        return <p>Тут будут когда-нибудь заказы...</p>
    }

    return (
        <>
            {orders.map((orderItem: TWsOrder) => {
                return (<FeedItem key={orderItem._id} order={orderItem} isShowStatusAllowed={true} />)
            })}
        </>
    )
}
