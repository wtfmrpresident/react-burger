import React, {FC, useMemo} from "react";
import feedDetailsStyles from "./feed-details.module.css";
import {useAppSelector} from "../../types/hooks";
import {useParams} from "react-router-dom";
import FeedItemIngredient from "./feed-item-ingredient";
import IBurgerItem from "../../interfaces/IBurgerItem";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Moment from "react-moment";

type TOrderIngredients = {
    data: IBurgerItem;
    count: number;
}

type TOrderIngredientAccounting = {
    [ingredientId: string]: TOrderIngredients
}

const FeedDetails: FC = () => {
    const ordersSocketState = useAppSelector(store => store.orderSocket)

    const { id } = useParams<string>()

    const order = ordersSocketState.orders ? ordersSocketState.orders.find((order) => order._id === id) : undefined

    const allIngredients = useAppSelector(state => state.ingredients.items)
    const orderIngredients = useMemo(
        () => {
            if (!order) {
                return
            }

            const orderIngredients: IBurgerItem[] = []
            order.ingredients.forEach(ingredientId => {
                const ingredient: IBurgerItem | undefined = allIngredients.find(item => item._id === ingredientId)

                if (ingredient) {
                    orderIngredients.push(ingredient)
                }
            })
            return orderIngredients
        },
        [order, allIngredients]
    )

    if (!orderIngredients) {
        return null
    }

    const totalPrice = orderIngredients.reduce((acc, el) => acc + el.price, 0)

    const orderIngredientAccounting: TOrderIngredients[] = Object.values(
        orderIngredients.reduce((acc: TOrderIngredientAccounting, ingredient: IBurgerItem) => {
            if (!acc[ingredient._id]) {
                acc[ingredient._id] = {
                    count: 0,
                    data: ingredient
                }
            }
            acc[ingredient._id].count++

            return acc
        }, {})
    )

    if (!order || !orderIngredients) {
        return null
    }

    const orderStatus =
        order.status === 'done'
            ? { text: 'Выполнен', color: feedDetailsStyles.done }
            : order.status === 'pending'
                ? { text: 'Готовится', color: feedDetailsStyles.pending }
                : { text: 'Создан', color: feedDetailsStyles.created }

    const calendarStrings = {
        lastDay: '[Вчера, ] LT [GMT] Z',
        sameDay: '[Сегодня, ] LT [GMT] Z',
        sameElse: 'LT [GMT] Z'
    };

    return (
        <div className={feedDetailsStyles.feed_container}>
            <p className="text__center text text_type_digits-default mb-10">#{order.number}</p>

            <p className="text text_type_main-medium mb-3">{order.name}</p>

            <p className={`${orderStatus.color} text text_type_main-default mb-15`}>{orderStatus.text}</p>

            <p className="text text_type_main-medium mb-6">Состав:</p>

            <div className={`${feedDetailsStyles.ingredient_container} scroll ${feedDetailsStyles.scroll} mb-10`}>
                {
                    orderIngredientAccounting.map(ingredient => {
                        return (
                            <div className={feedDetailsStyles.ingredient_item} key={ingredient.data._id}>
                                <div className={`${feedDetailsStyles.ingredient_image} mr-4`}>
                                    <ul className="list-unstyled">
                                        <FeedItemIngredient ingredient={ingredient.data} />
                                    </ul>
                                </div>
                                <div className={`${feedDetailsStyles.ingredient_name} text text_type_main-default mr-4`}>{ingredient.data.name}</div>
                                <div className={`${feedDetailsStyles.ingredient_price} text text_type_main-default`}>
                                    <span className="text text_type_digits-default">{ingredient.count}</span> x <span className="text text_type_digits-default mr-2">{ingredient.data.price}</span>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className={feedDetailsStyles.datetime_and_price}>
                <div className={`${feedDetailsStyles.datetime} text text_type_main-default`}><Moment locale="ru" calendar={calendarStrings}>{order.createdAt}</Moment></div>
                <div className={`${feedDetailsStyles.price} text text_type_digits-default`}>
                    <span className="mr-2">{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default FeedDetails