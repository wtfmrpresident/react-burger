import {FC} from "react";
import IBurgerItem from "../../interfaces/IBurgerItem";
import feedItemIngredientStyles from "./feed-item-ingredient.module.css";

type TFeedItemIngredient = {
    ingredient: IBurgerItem;
    isLast?: boolean;
    length?: number;
    zIndex?: number;
}

const FeedItemIngredient: FC<TFeedItemIngredient> = ({ingredient, isLast, length, zIndex}) => {
    return (
        <>
            {
                <li className={feedItemIngredientStyles.feed_item_footer_ingredient}>
                    <img
                        className={`${feedItemIngredientStyles.feed_item_footer_ingredient_image} ${isLast ? feedItemIngredientStyles.feed_item_footer_ingredient_last : ''}`}
                        src={ingredient.image_mobile}
                        alt={ingredient.name}
                        style={{zIndex}}
                    />
                    {isLast && length ? (
                        <span className={`${feedItemIngredientStyles.ingredients_number} text text_type_digits-default`}>+{length}</span>
                    ) : null}
                </li>
            }
        </>
    )
}

export default FeedItemIngredient