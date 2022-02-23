import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constuctor/burger-constructor";
import IBurgerItem from "../../interfaces/IBurgerItem"
import appStyles from  './app.module.css';
import IAppState from "../../interfaces/IAppState";

const API_URL = 'https://norma.nomoreparties.space/api/ingredients'

function App() {
    const [state, setState] = useState<IAppState>({
        items: [],
        cart: [],
        isLoaded: false,
        hasErrors: false
    })

    useEffect(() => {
        getData()
    }, [])

    function getData() {
        setState((prevState) => ({
            ...prevState,
            isLoaded: false,
        }))

        fetch(API_URL)
            .then((res) => res.json())
            .then(
                (result) => {
                    setState((prevState) => ({
                        ...prevState,
                        isLoaded: true,
                        items: result.data
                    }))
                },
                () => {
                    setState((prevState) => ({
                        ...prevState,
                        isLoaded: true,
                        hasErrors: true
                    }))
                }
            )
    }

    useEffect(() => {
        crutchilyFillCart()
    }, [state.items])

    function crutchilyFillCart() {
        state.items.forEach((item) => {
            addToCart(item)
        })
    }

    function addToCart(item: IBurgerItem): void {
        if (item.type === 'bun') {
            const cart = state.cart
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

                setState((prevState: IAppState) => ({
                    ...prevState,
                    cart: cart
                }))
            }
        }

        const cart: IBurgerItem[] | null = state.cart

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

        setState((prevState: IAppState) => ({
            ...prevState,
            cart: cart
        }))
    }

    function removeFromCart(id: string) {
        const cart = state.cart
        if (cart) {
            let removeItemIndex = cart.findIndex((cartItem: IBurgerItem) => cartItem._id === id)
            if (removeItemIndex !== -1) {
                cart.splice(removeItemIndex, 1)

                setState((prevState: IAppState) => ({
                    ...prevState,
                    cart: cart
                }))
            }
        }
    }

    return (
        <>
            <AppHeader />
            <div className={appStyles.container}>
                <main className={appStyles.main}>
                    <section className={`${appStyles.section} ${appStyles.limitedHeight} mb-10 mr-10`}>
                        {state.isLoaded && !state.hasErrors && <BurgerIngredients items={state.items} cart={state.cart} addToCartHandler={addToCart} />}
                        {!state.isLoaded && !state.hasErrors && <p className="">Рагружаем контейнер с ингридиентами...</p> }
                        {!state.isLoaded && state.hasErrors && <p className="">При разгрузке контейнера с ингридиентами произошла нелепая ошибка. Исправляем...</p> }
                    </section>
                    <section className={`${appStyles.section} pt-25`}>
                        <BurgerConstructor items={state.cart} removeFromCart={removeFromCart} />
                    </section>
                </main>
            </div>
        </>
    );
}

export default App;
