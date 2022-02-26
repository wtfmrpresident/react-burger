import IBurgerItem from "./IBurgerItem";

export default interface IAppState {
    items: IBurgerItem[] | []
    cart: IBurgerItem[] | [],
    isLoaded: boolean,
    hasErrors: boolean
}
