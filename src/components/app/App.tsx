import React, {useEffect, useReducer, useState} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constuctor/burger-constructor";
import IBurgerItem from "../../interfaces/IBurgerItem"
import appStyles from  './app.module.css';
import {IngredientItemsContext, CartItemsContext, CartTotalContext} from "../../services/burger-context";
import cartReducer from "../../services/cart-reducer";

const API_URL = 'https://norma.nomoreparties.space/api/ingredients'

const cartItemsInitialState: IBurgerItem[] = []

function App() {
    const [ingredientItems, setIngredientItems] = useState<IBurgerItem[]>([])
    const [cartItemsState, cartItemDispatcher] = useReducer(cartReducer, cartItemsInitialState, undefined)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [hasErrors, setHasErrors] = useState<boolean>(false)

    const [totalPrice, setTotalPrice] = useState<number | null>(null)

    useEffect(() => {
        setIsLoaded(false)
        setHasErrors(false)
        fetch(API_URL)
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(new Error(response.statusText))
                }
                return response.json()
            })
            .then((result) => {
                if (result && result.success) {
                    setIngredientItems(result.data)
                    setIsLoaded(true)
                }
            })
            .catch((error) => {
                console.log(error)
                setHasErrors(true)
            })
    }, [])

    useEffect(() => {
        if (isLoaded) {
            const buns = ingredientItems.filter((item) => item.type === 'bun')
            const ingredients = ingredientItems.filter((item) => item.type !== 'bun')

            // Добавляем случайную булку
            cartItemDispatcher({
                type: "add",
                payload: buns[Math.floor(Math.random() * buns.length)]
            })

            // Добавляем случайное кол-во
            for (let i = 0; i <= Math.floor(Math.random() * ingredients.length); i++) {
                cartItemDispatcher({
                    type: "add",
                    payload: ingredients[i]
                })
            }
        }
    }, [isLoaded, ingredientItems])

    return (
        <>
            <AppHeader />
            <div className={appStyles.container}>
                <CartItemsContext.Provider value={{cartItemsState, cartItemDispatcher}}>
                    <main className={appStyles.main}>
                        <IngredientItemsContext.Provider value={{ ingredientItems }}>
                            <section className={`${appStyles.section} ${appStyles.limitedHeight} mb-10 mr-10`}>
                                {isLoaded && !hasErrors && <BurgerIngredients />}
                                {!isLoaded && !hasErrors && <p className="">Рагружаем контейнер с ингридиентами...</p> }
                                {isLoaded && hasErrors && <p className="">При разгрузке контейнера с ингридиентами произошла нелепая ошибка. Исправляем...</p> }
                            </section>
                        </IngredientItemsContext.Provider>
                        <section className={`${appStyles.section} pt-25`}>
                            <CartTotalContext.Provider value={{totalPrice, setTotalPrice}}>
                                <BurgerConstructor />
                            </CartTotalContext.Provider>
                        </section>
                    </main>
                </CartItemsContext.Provider>
            </div>
        </>
    );
}

export default App;
