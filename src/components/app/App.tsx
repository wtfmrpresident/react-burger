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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getData() {
        setState({
            ...state,
            isLoaded: false,
        })

        fetch(API_URL)
            .then((res) => res.json())
            .then(
                (result) => {
                    setState({
                        ...state,
                        isLoaded: true,
                        items: result.data
                    })
                },
                () => {
                    setState({
                        ...state,
                        isLoaded: true,
                        hasErrors: true
                    })
                }
            )
    }

    const addToCart = (items: IBurgerItem[]): void => {
        const cart = [...state.cart]

        items.forEach((item) => {
            if (item.type === 'bun') {
                // Не даем добавлять несколько булочек, вместо этого меняем одну на другую
                if (cart) {
                    const currentTopBunIndex = cart.findIndex((cartItem: IBurgerItem) => cartItem.subtype === 'top')
                    if (currentTopBunIndex !== -1) {
                        cart.splice(currentTopBunIndex, 1)
                    }

                    const currentBottomBunIndex = cart.findIndex((cartItem: IBurgerItem) => cartItem.subtype === 'bottom')
                    if (currentBottomBunIndex !== -1) {
                        cart.splice(currentBottomBunIndex, 1)
                    }
                }
            }

            if (cart) {
                if (cart.find((cartItem) => cartItem._id === item._id)) {
                    return
                }
            }
            if (item.type === 'bun') {
                const bunTop: IBurgerItem = {...item, name: item.name + ' (верх)', subtype: 'top'}
                const bunBottom: IBurgerItem = {...item, name: item.name + ' (низ)', price: 0, subtype: 'bottom'}

                cart.push(bunTop)
                cart.push(bunBottom)
            } else {
                cart.push(item)
            }
        })

        setState({
            ...state,
            cart
        })
    }

    const removeFromCart = (id: string) => {
        const cart = [...state.cart]
        if (cart) {
            let removeItemIndex = cart.findIndex((cartItem: IBurgerItem) => cartItem._id === id)
            if (removeItemIndex !== -1) {
                cart.splice(removeItemIndex, 1)

                setState({
                    ...state,
                    cart
                })
            }
        }
    }

    useEffect(() => {
        if (state.isLoaded) {
            addToCart(state.items)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.isLoaded, state.items])

    return (
        <>
            <AppHeader />
            <div className={appStyles.container}>
                <main className={appStyles.main}>
                    <section className={`${appStyles.section} ${appStyles.limitedHeight} mb-10 mr-10`}>
                        {state.isLoaded && !state.hasErrors && <BurgerIngredients items={state.items} cart={state.cart} />}
                        {!state.isLoaded && !state.hasErrors && <p className="">Рагружаем контейнер с ингридиентами...</p> }
                        {state.isLoaded && state.hasErrors && <p className="">При разгрузке контейнера с ингридиентами произошла нелепая ошибка. Исправляем...</p> }
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
