import React, {useEffect} from "react";
import orderSocketSlice from "../services/order-socket";
import {wsUrl} from "../services/api";
import {useAppDispatch, useAppSelector} from "../types/hooks";
import FeedDetails from "../components/feed-item/feed-details";
import { getCookie } from "../utils/cookie";

export function ProfileOrderDetails() {
    const dispatch = useAppDispatch()

    const ordersSocketState = useAppSelector(store => store.orderSocket)

    useEffect(
        () => {
            const token = getCookie('token')
            console.log(token)
            if (token) {
                dispatch(orderSocketSlice.actions.wsInit({
                    wsUrl: `${wsUrl}?token=${token}`
                }))
            }
            return () => {
                dispatch(orderSocketSlice.actions.onClose)
            }
        },
        [dispatch, ordersSocketState.isWsConnected]
    )

    return (
        <div className="mt-10">
            <FeedDetails />
        </div>
    )
}
