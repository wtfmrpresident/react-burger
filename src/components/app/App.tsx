import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constuctor/burger-constructor";
import IBurgerItem from "../../interfaces/IBurgerItem"
import appStyles from  './app.module.css';
import fetchedData from "../../utils/data.json"

interface IProps {}

interface IState {
    items: IBurgerItem[],
    cart: IBurgerItem[],
}

class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            items: [],
            cart: [],
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        const data: IBurgerItem[] = fetchedData
        this.setState((prevState: IState) => ({
            ...prevState,
            items: data
        }))
    }

    addToCart = (item: IBurgerItem) => {
        if (item.type === 'bun') {
            const cart = this.state.cart
            // Не даем добавлять несколько булочек, вместо этого меняем одну на другую
            if (cart) {
                let currentTopBunIndex = cart.findIndex((cartItem: IBurgerItem) => cartItem.subtype === 'top')
                if (currentTopBunIndex !== -1) {
                    cart.splice(currentTopBunIndex, 1)
                }

                let currentBottomBunIndex = cart.findIndex((cartItem: IBurgerItem) => cartItem.subtype === 'bottom')
                if (currentBottomBunIndex !== -1) {
                    cart.splice(currentBottomBunIndex, 1)
                }

                this.setState((prevState: IState) => ({
                    ...prevState,
                    cart: cart
                }))
            }
        }

        const cart: IBurgerItem[] = this.state.cart

        if (cart) {
            if (cart.find((cartItem) => cartItem._id === item._id)) {
                return
            }
        }

        if (item.type === 'bun') {
            let bunTop = Object.assign({}, item)
            bunTop.name += ' (верх)'
            bunTop.subtype = 'top'
            cart.push(bunTop)

            let bunBottom = Object.assign({}, item)
            bunBottom.name += ' (низ)'
            bunBottom.price = 0
            bunBottom.subtype = 'bottom'

            cart.push(bunBottom)
        } else {
            cart.push(item)
        }

        this.setState((prevState: IState) => ({
            ...prevState,
            cart: cart
        }))
    }

    removeFromCart = (id: string) => {
        const cart = this.state.cart
        if (cart) {
            let removeItemIndex = cart.findIndex((cartItem: IBurgerItem) => cartItem._id === id)
            if (removeItemIndex !== -1) {
                cart.splice(removeItemIndex, 1)

                this.setState((prevState: IState) => ({
                    ...prevState,
                    cart: cart
                }))
            }
        }
    }

    render() {
        return (
            <>
                <AppHeader />
                <div className={appStyles.container}>
                    <main className={appStyles.main}>
                        <section className={`${appStyles.section} ${appStyles.limitedHeight} mb-10 mr-10`}>
                            <BurgerIngredients items={this.state.items} cart={this.state.cart} addToCartHandler={this.addToCart} />
                        </section>
                        <section className={`${appStyles.section} pt-25`}>
                            <BurgerConstructor items={this.state.cart} removeFromCart={this.removeFromCart} />
                        </section>
                    </main>
                </div>
            </>
        );
    }
}

export default App;
