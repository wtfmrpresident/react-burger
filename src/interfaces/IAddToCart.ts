import IBurgerItem from "./IBurgerItem";

interface IAddToCart {
    (item: IBurgerItem): void
}

export default IAddToCart