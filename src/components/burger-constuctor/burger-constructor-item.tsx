import React from "react";
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructorItem(props: {item: object, removeFromCart: any}, key: React.Key) {
    return (
        <div className="mb-4">
            <ConstructorElement
                text={props.item.name}
                thumbnail={props.item.image_mobile}
                price={props.item.price}
                type={props.item.subtype}
                isLocked={props.item.type === 'bun'}
                handleClose={() => props.removeFromCart(props.item._id)}
            />
        </div>
    )
}

export default BurgerConstructorItem