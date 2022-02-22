import React from "react";
import {DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import IRemoveFromCart from "../../interfaces/IRemoveFromCart";
import IBurgerItem from "../../interfaces/IBurgerItem";

function BurgerConstructorItem(props: {item: IBurgerItem, removeFromCart: IRemoveFromCart, isDrugEnabled: boolean}) {
    return (
        <div className="mb-4 mr-4" style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
            <div style={{width: "32px"}}>
                {props.isDrugEnabled && <DragIcon type="primary"/>}
            </div>
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