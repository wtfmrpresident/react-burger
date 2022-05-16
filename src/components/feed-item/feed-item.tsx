import React, {FC, useMemo} from "react";
import { TWsOrder } from "../../interfaces/TWsSocketActions";
import feedItemStyles from "./feed-item.module.css";
import Moment from "react-moment";
import {useAppSelector} from "../../types/hooks";
import IBurgerItem from "../../interfaces/IBurgerItem";
import FeedItemIngredient from "./feed-item-ingredient";
import { Link, useLocation } from "react-router-dom";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import feedDetailsStyles from "./feed-details.module.css";

type TFeedItem = {
    order: TWsOrder;
    isShowStatusAllowed: boolean;
    isAuthenticated: boolean;
}

const FeedItem: FC<TFeedItem> = ({order, isShowStatusAllowed, isAuthenticated}) => {
    const allIngredients = useAppSelector(state => state.ingredients.items)

    const orderIngredients = useMemo(
        () => {
            const orderIngredients: IBurgerItem[] = []
            order.ingredients.forEach(ingredientId => {
                const ingredient = allIngredients.find(item => item._id === ingredientId)
                if (ingredient) {
                    orderIngredients.push(ingredient)
                }
            })
            return orderIngredients
        },
        [order.ingredients, allIngredients]
    )

    const orderIngredientsSliced = orderIngredients.slice(0, 5)
    const isMoreIngredients = orderIngredients.length > 6

    const totalPrice = orderIngredients.reduce((acc, el) => acc + el.price, 0)

    let zIndex = 6

    const calendarStrings = {
        lastDay: '[Вчера, ] LT [GMT] Z',
        sameDay: '[Сегодня, ] LT [GMT] Z',
        sameElse: 'DD.MM.YYYY LT [GMT] Z'
    };

    const orderStatus =
        order.status === 'done'
            ? { text: 'Выполнен', color: feedDetailsStyles.done }
            : order.status === 'pending'
                ? { text: 'Готовится', color: feedDetailsStyles.pending }
                : { text: 'Создан', color: feedDetailsStyles.created }

    const location = useLocation()

    const linkTo = isAuthenticated ? `/profile/orders/${order._id}` : `/feed/${order._id}`

    return (
        <Link
            to={linkTo}
            state={{backgroundLocation: location}}
            className={feedItemStyles.feed_item_link}
        >
            <div className={`${feedItemStyles.container} mb-4`}>
                <div className={`${feedItemStyles.feed_item_header} mb-6`}>
                    <div className="text text_type_digits-default">
                        #{order.number}
                    </div>
                    <div className={`${feedItemStyles.feed_item_order_created_datetime} text text_type_main-default`}>
                        <Moment locale="ru" calendar={calendarStrings}>{order.createdAt}</Moment>
                    </div>
                </div>
                <p className={`text text_type_main-medium ${isShowStatusAllowed ? '' : 'mb-6'}`}>
                    {order.name}
                </p>
                {isShowStatusAllowed ? <p className={`${orderStatus.color} text text_type_main-default mb-6`}>{orderStatus.text}</p> : null}
                <div className={feedItemStyles.feed_item_footer}>
                    <ul className={`${feedItemStyles.feed_item_footer_ingredients}`}>
                        {
                            orderIngredientsSliced.map((ingredient, index) => {
                                return <FeedItemIngredient ingredient={ingredient} isLast={false} zIndex={(zIndex -= 1)} key={index} />
                            })
                        }
                        {
                            isMoreIngredients ? (
                                <FeedItemIngredient ingredient={orderIngredients[0]} isLast={true} length={orderIngredients.length - 5} zIndex={(zIndex -= 1)} key={orderIngredients[0]._id} />
                            ) : null
                        }
                    </ul>
                    <div className={`${feedItemStyles.price} text text_type_digits-default`}>
                        <span className="mr-2">{totalPrice}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default FeedItem
