import {useAppDispatch, useAppSelector} from "../types/hooks";
import {FC, useEffect} from "react";
import orderSocketSlice from "../services/order-socket";
import {wsUrl} from "../services/api";
import FeedDetails from "../components/feed-item/feed-details";

const FeedDetail: FC = () => {
    const dispatch = useAppDispatch()

    const ordersSocketState = useAppSelector(store => store.orderSocket)

    useEffect(
        () => {
            if (!ordersSocketState.isWsConnected) {
                dispatch(orderSocketSlice.actions.wsInit({
                    wsUrl: wsUrl + '/all'
                }))
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

export default FeedDetail