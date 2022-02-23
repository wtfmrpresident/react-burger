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

            <p className="mb-15 text text_type_main-default" style={{textAlign: "center"}}>идентификатор заказа</p>

            <div className="mb-15" style={{display: "flex", justifyContent: "center"}}>
                <div className={orderDetailsStyles.accepted}>
                    <CheckMarkIcon type="primary" />
                </div>
            </div>

            <p className="mb-2 text text_type_main-small" style={{textAlign: "center"}}>Ваш заказ начали готовить</p>

            <p className="mb-30 text text_type_main-small" style={{textAlign: "center"}}>Дождитесь готовности на орбитальной станции</p>
        </>
    )
}