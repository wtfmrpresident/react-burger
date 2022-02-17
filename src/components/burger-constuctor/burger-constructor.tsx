import React from "react";
import BurgerConstructorItem from "./burger-constructor-item";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const itemPropType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
})
function BurgerConstructor(props: {items: object[], removeFromCart: any}, key: React.Key | null) {
    let bunTop,
        bunBottom,
        cartTotal = 0

    if (props.items) {
        bunTop = props.items.find((cartItem: object) => cartItem.subtype === 'top')
        bunBottom = props.items.find((cartItem: object) => cartItem.subtype === 'bottom')

        cartTotal += (bunTop ? bunTop.price : 0) + (bunBottom ? bunBottom.price : 0)
    }

    return (
        <>
            <div className="mb-10">
                {bunTop && <BurgerConstructorItem item={bunTop} key={'top_' + bunTop._id} />}

                {props.items ? props.items.map((item) => {
                    if (item.type === 'bun') {
                        return null
                    }
                    cartTotal += item.price
                    return <BurgerConstructorItem removeFromCart={props.removeFromCart} item={item} key={item._id} />
                }) : null}

                {bunBottom && <BurgerConstructorItem item={bunBottom} key={'bottom_' + bunBottom._id} />}
            </div>
            {props.items.length > 0 ? (
                <div style={{display: "flex", alignItems: "center", justifyContent:"flex-end"}}>
                    <p className="text text_type_digits-medium mr-10">
                        <span className="text text_type_digits-medium">{cartTotal}</span>
                        <CurrencyIcon type="primary" />
                    </p>
                    <Button  type="primary" size="large">Оформить заказ</Button>
                </div>
            ) : null}
        </>
    )
}

BurgerConstructor.propTypes = {
    items: PropTypes.arrayOf(itemPropType),
    removeFromCart: PropTypes.func.isRequired,
}

export default BurgerConstructor