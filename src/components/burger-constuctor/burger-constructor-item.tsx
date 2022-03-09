import React, {useContext} from "react";
import {DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import IBurgerItem from "../../interfaces/IBurgerItem";
import {useDispatch} from "react-redux";
import {removeFromCart} from "../../services/cart";

function BurgerConstructorItem(props: {item: IBurgerItem, isDrugEnabled: boolean}) {
    const dispatch = useDispatch()

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
                handleClose={() => dispatch(removeFromCart(props.item))}
            />
        </div>
    )
}

export default BurgerConstructorItem
