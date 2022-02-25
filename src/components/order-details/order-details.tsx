import orderDetailsStyles from "./order-details.module.css"
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IProps {
    orderId: string
}

export default function orderDetails(props: IProps) {
    return (
        <>
            <p className={`${orderDetailsStyles.orderID} text text_type_digits-large mb-8`}>
                {props.orderId}
            </p>

            <p className={`${orderDetailsStyles.textCenter} mb-15 text text_type_main-default`}>идентификатор заказа</p>

            <div className={`${orderDetailsStyles.acceptedContainer} mb-15`}>
                <div className={orderDetailsStyles.accepted}>
                    <CheckMarkIcon type="primary" />
                </div>
            </div>

            <p className={`${orderDetailsStyles.textCenter} mb-2 text text_type_main-small`}>Ваш заказ начали готовить</p>

            <p className={`${orderDetailsStyles.textCenter} mb-30 text text_type_main-small`}>Дождитесь готовности на орбитальной станции</p>
        </>
    )
}