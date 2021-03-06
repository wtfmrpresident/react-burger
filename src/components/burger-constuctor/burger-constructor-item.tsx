import React, { useRef } from "react";
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import IBurgerItem from "../../interfaces/IBurgerItem";
import { removeFromCart, moveIngredient } from "../../services/cart";
import { useDrag, useDrop } from "react-dnd";
import type { XYCoord, Identifier } from 'dnd-core';
import burgerConstructorItemStyles from './burger-constructor-item.module.css'
import { useAppDispatch } from "../../types/hooks";

interface ISortableIngredient {
    item: IBurgerItem,
    index: number
}

function BurgerConstructorItem(props: { item: IBurgerItem, index?: number, isDrugEnabled: boolean }) {
    const dispatch = useAppDispatch()

    const ref = useRef<HTMLDivElement>(null)

    const [{handlerId}, drop] = useDrop<ISortableIngredient,
        void,
        { handlerId: Identifier | null }>({
        accept: 'ingredientsSort',
        collect: (monitor) => {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        hover: (ingredient: ISortableIngredient, monitor) => {
            if (!props.isDrugEnabled || !ref.current || props.index === undefined) {
                return
            }

            const item = ingredient.item
            const dragIndex = ingredient.index
            const hoverIndex = props.index

            // Не меняем положение текущего элемента, если его перетащили на самого себя
            if (dragIndex === hoverIndex) {
                return;
            }
            // Определяем положение элемента на экране
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Вычисляем середину элемента
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Определяем положение курсора
            const clientOffset = monitor.getClientOffset();

            if (!clientOffset) {
                return
            }

            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            dispatch(moveIngredient({item, hoverIndex, dragIndex}))

            ingredient.index = hoverIndex
        },
    })

    const [{isDragging}, drag] = useDrag({
        type: 'ingredientsSort',
        item: () => {
            return {
                item: props.item,
                index: props.index
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    if (props.isDrugEnabled) {
        drag(drop(ref))
    }

    const opacity = isDragging ? 0 : 1;
    return (
        <div ref={ref} className={`${burgerConstructorItemStyles.container} mb-4 mr-4`} style={{opacity}}
             data-handler-id={handlerId}>
            <div className={burgerConstructorItemStyles.drag_container}>
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
