import { FC } from "react";
import { TWsOrder } from "../../interfaces/TWsOrderActions";
import feedItemStyles from "./feed-item.module.css";
import Moment from "react-moment";

const FeedItem: FC<TWsOrder> = (order) => {
    const calendarStrings = {
        lastDay : '[Вчера, ] LT [GMT] Z',
        sameDay : '[Сегодня, ] LT [GMT] Z',
        sameElse : 'LT [GMT] Z'
    };

    return (
        <div className={`${feedItemStyles.container} mb-4`}>
            <div className={`${feedItemStyles.feed_item_header} mb-6`}>
                <div className={`${feedItemStyles.feed_item_order_number}`}>
                    #{order.number}
                </div>
                <div className={`${feedItemStyles.feed_item_order_created_datetime}`}>
                    <Moment locale="ru" calendar={calendarStrings}>{order.createdAt}</Moment>
                </div>
            </div>
        </div>
    )
}

export default FeedItem
