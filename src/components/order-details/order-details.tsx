import orderDetailsStyles from "./order-details.module.css"
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IProps {
    orderNumber: number | null
    hasError: boolean
}

export default function orderDetails(props: IProps) {
    return (
        <>
            <p className={`${orderDetailsStyles.order_id} text__center text text_type_digits-large mb-8`}>
                {props.orderNumber}
            </p>

            <p className="text__center mb-15 text text_type_main-default">идентификатор заказа</p>

            <div className={`${orderDetailsStyles.accepted_container} mb-15`}>
                <div className={orderDetailsStyles.accepted}>
                    <CheckMarkIcon type="primary" />
                </div>
            </div>

            <p className="text__center mb-2 text text_type_main-small">Ваш заказ начали готовить</p>

            <p className="text__center mb-30 text text_type_main-small">Дождитесь готовности на орбитальной станции</p>
        </>
    )
}
