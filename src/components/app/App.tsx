import React, {useEffect, useReducer, useState} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constuctor/burger-constructor";
import IBurgerItem from "../../interfaces/IBurgerItem"
import appStyles from  './app.module.css';
import {IngredientItemsContext, CartItemsContext} from "../../services/burger-context";
import cartReducer from "../../services/cart-reducer";

const API_URL = 'https://norma.nomoreparties.space/api/ingredients'

const cartItemsInitialState: IBurgerItem[] = []

function App() {
    const [ingredientItems, setIngredientItems] = useState<IBurgerItem[]>([])
    const [cartItemsState, cartItemDispatcher] = useReducer(cartReducer, cartItemsInitialState, undefined)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [hasErrors, setHasErrors] = useState<boolean>(false)

    useEffect(() => {
        setIsLoaded(false)
        setHasErrors(false)
        fetch(API_URL)
            .then((result) => result.json())
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
            ingredientItems.forEach((item) => {
                cartItemDispatcher({
                    type: "add",
                    payload: item
                })
            })
        }
    }, [isLoaded, ingredientItems])

    return (
        <>
            <AppHeader />
            <div className={appStyles.container}>
                <IngredientItemsContext.Provider value={{ ingredientItems }}>
                    <CartItemsContext.Provider value={{cartItemsState, cartItemDispatcher}}>
                        <main className={appStyles.main}>
                            <section className={`${appStyles.section} ${appStyles.limitedHeight} mb-10 mr-10`}>
                                {isLoaded && !hasErrors && <BurgerIngredients />}
                                {!isLoaded && !hasErrors && <p className="">Рагружаем контейнер с ингридиентами...</p> }
                                {isLoaded && hasErrors && <p className="">При разгрузке контейнера с ингридиентами произошла нелепая ошибка. Исправляем...</p> }
                            </section>
                            <section className={`${appStyles.section} pt-25`}>
                                <BurgerConstructor />
                            </section>
                        </main>
                    </CartItemsContext.Provider>
                </IngredientItemsContext.Provider>
            </div>
        </>
    );
}

export default App;
