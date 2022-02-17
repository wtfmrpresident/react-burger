import React from 'react';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constuctor/burger-constructor";

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            items: [],
            cart: [],
        }

        this.addToCart = this.addToCart.bind(this)
        this.removeFromCart = this.removeFromCart.bind(this)
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        const data = require('./utils/data.json')
        this.setState((prevState: any) => ({
            ...prevState,
            items: data
        }))
    }

    addToCart(item: object) {
        if (item.type === 'bun') {
            let cart = this.state.cart
            // Не даем добавлять несколько булочек, вместо этого меняем одну на другую
            if (cart) {
                let currentTopBunIndex = cart.findIndex((cartItem: object) => cartItem.subtype === 'top')
                if (currentTopBunIndex.length !== -1) {
                    cart.splice(currentTopBunIndex, 1)
                }

                let currentBottomBunIndex = cart.findIndex((cartItem: object) => cartItem.subtype === 'bottom')
                if (currentBottomBunIndex.length !== -1) {
                    cart.splice(currentBottomBunIndex, 1)
                }

                this.setState((prevState: any) => ({
                    ...prevState,
                    cart: cart
                }))
            }
        }

        let cart = this.state.cart

        if (cart) {
            if (cart.find((cartItem: object) => cartItem._id === item._id)) {
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

        this.setState((prevState: any) => ({
            ...prevState,
            cart: cart
        }))
    }

    removeFromCart(id: string) {
        let cart = this.state.cart
        if (cart) {
            let removeItemIndex = cart.findIndex((cartItem: object) => cartItem._id === id)
            if (removeItemIndex.length !== -1) {
                cart.splice(removeItemIndex, 1)

                this.setState((prevState: any) => ({
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
                <div className="container">
                    <main>
                        <section className="mb-10 mr-10">
                            <BurgerIngredients items={this.state.items} cart={this.state.cart} addToCartHandler={this.addToCart} />
                        </section>
                        <section className="pt-25">
                            <BurgerConstructor items={this.state.cart} removeFromCart={this.removeFromCart} />
                        </section>
                    </main>
                </div>
            </>
        );
    }
}

export default App;
