import { FC, useEffect } from "react";
import feedStyles from "./feed.module.css";
import orderSocketSlice from "../services/order-socket";
import { TWsOrder } from "../interfaces/TWsOrderActions";
import { useAppDispatch, useAppSelector } from "../types/hooks";
import FeedItem from "../components/feed-item/feed-item";
import {wsUrl} from "../services/api";

const Feed: FC = () => {
    const dispatch = useAppDispatch()

    const ordersSocketState = useAppSelector(store => store.orderSocket)

    useEffect(
        () => {
            dispatch(orderSocketSlice.actions.wsInit({
                wsUrl: wsUrl + '/all'
            }))
            return () => {
                dispatch(orderSocketSlice.actions.onClose)
            }
        },
        [dispatch]
    )

    const orders = ordersSocketState.orders
    if (!orders) {
        return <p>Заказов пока нет, но мы работаем над этим...</p>
    }

    const ordersDone = orders.filter(order => order.status === 'done').slice(0, 10)
    const ordersInProgress = orders.filter(order => order.status !== 'done')

    return (
        <div className={feedStyles.container}>
            <main className={feedStyles.main}>
                <section className={`${feedStyles.section} mb-10 mr-10`}>
                    <h1 className="mt-10 mb-5 text text_type_main-large">Лента заказов</h1>

                    <div className="scroll">
                        {orders.map((orderItem: TWsOrder) => {
                            return (<FeedItem key={orderItem._id} order={orderItem} isShowStatusAllowed={false} />)
                        })}
                    </div>
                </section>
                <section className={`${feedStyles.section} pt-25`}>
                    <div className={`${feedStyles.order_statistics_container}`}>
                        <div className={`${feedStyles.order_statistics_column} mb-15`}>
                            <p className="text text_type_main-medium mb-6">Готовы:</p>
                            <ul className={`${feedStyles.order_statistics_list} ${feedStyles.done} list-unstyled `}>
                                {
                                    ordersDone.map(order => {
                                        return <li className="mb-2 text text_type_digits-default">{order.number}</li>
                                    })
                                }
                            </ul>
                        </div>
                        <div className={`${feedStyles.order_statistics_column} mb-15`}>
                            <p className="text text_type_main-medium mb-6">В работе:</p>
                            <ul className={`${feedStyles.order_statistics_list} ${feedStyles.pending} list-unstyled `}>
                                {
                                    ordersInProgress.map(order => {
                                        return <li className="mb-2 text text_type_digits-default">{order.number}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className={`${feedStyles.order_statistics_total_container}`}>
                        <p className="text text_type_main-medium mb-6">Выполнено за все время:</p>
                        <p className={`${feedStyles.order_statistics_total} text text_type_digits-large mb-6`}>{ordersSocketState.total}</p>
                    </div>
                    <div className={`${feedStyles.order_statistics_total_container}`}>
                        <p className="text text_type_main-medium mb-6">Выполнено за сегодня:</p>
                        <p className={`${feedStyles.order_statistics_total} text text_type_digits-large mb-6`}>{ordersSocketState.totalToday}</p>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Feed
