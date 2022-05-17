import React, { FC } from "react";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientItemStyle from './ingredient-item.module.css';
import IBurgerItem from "../../interfaces/IBurgerItem";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import { useAppSelector } from "../../types/hooks";

type TIngredientItemProps = {
    item: IBurgerItem;
}

type TDragCollectedProps = {
    opacity: number;
    transform: string;
}

const IngredientItem: FC<TIngredientItemProps> = ({ item }) => {
    const location = useLocation()

    const bunItemsState = useAppSelector(store => store.cart.bunItems)
    const ingredientItemsState = useAppSelector(store => store.cart.ingredientItems)

    function getCartItemQuantity(item: IBurgerItem): number {
        const cart = item.type === 'bun' ? bunItemsState : ingredientItemsState

        if (!cart) {
            return 0
        }

        let quantity = cart.filter((cartItem: IBurgerItem) => item._id === cartItem._id).length
        if (quantity > 0 && item.type === 'bun') {
            return --quantity
        }

        return quantity
    }

    const cartItemQuantity = getCartItemQuantity(item)

    const [{opacity, transform}, ref] = useDrag<IBurgerItem, IBurgerItem, TDragCollectedProps>({
        type: item.type === 'bun' ? 'bun' : 'ingredient',
        item: item,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
            transform: "translate(0, 0)"
        })
    })

    return (
        <>
            <Link
                to={`/ingredients/${item._id}`}
                state={{backgroundLocation: location}}
                key={item._id}
                className={`${ingredientItemStyle.item} mb-10`}
            >
                <div
                    style={{cursor:"pointer", opacity, transform}}
                    ref={ref}
                >
                    {cartItemQuantity ? (
                        <Counter count={cartItemQuantity} />
                    ) : null}
                    <div className={ingredientItemStyle.image}>
                        <img src={item.image} alt={item.name}/>
                    </div>
                    <p className={`${ingredientItemStyle.paragraph} text text_type_digits-default pt-1 pb-1`}>
                        <span className="mr-2">{item.price}</span>
                        <CurrencyIcon type="primary" />
                    </p>
                    <p className={`${ingredientItemStyle.paragraph} text text_type_main-default pb-5`}>
                        {item.name}
                    </p>
                </div>
            </Link>
        </>
    )
}

export default IngredientItem
