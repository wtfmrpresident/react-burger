import IOrder from "../../interfaces/IOrder";

interface IOrderReducer {
    order: IOrder | {},
    orderRequest: false,
    orderFailed: false,
}
