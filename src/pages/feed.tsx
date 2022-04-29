import { FC, useEffect } from "react";
import feedStyles from "./feed.module.css";
import orderSocketSlice from "../services/order-socket";
import { TWsOrder } from "../interfaces/TWsOrderActions";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../types/hooks";
import FeedItem from "../components/feed-item/feed-item";

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

const Feed: FC = () => {
    const dispatch = useAppDispatch()

    const ordersSocketState = useAppSelector(store => store.orderSocket)

    useEffect(
        () => {
            dispatch(orderSocketSlice.actions.wsInit({
                wsUrl
            }))
        },
        [dispatch]
    )

    return (
        <div className={feedStyles.container}>
            <main className={feedStyles.main}>
                <section className={`${feedStyles.section} mb-10 mr-10`}>
                    <h1 className="mt-10 mb-5 text text_type_main-large">Лента заказов</h1>
                    {!ordersSocketState.orders ? 'Заказов пока нет, но мы работаем над этим...' : ''}

                    {ordersSocketState.orders.map((orderItem: TWsOrder) => {
                        return (<FeedItem key={orderItem._id} {...orderItem} />)
                    })}
                </section>
                <section className={`${feedStyles.section} pt-25`}>

                </section>
            </main>
        </div>
    )
}

export default Feed
