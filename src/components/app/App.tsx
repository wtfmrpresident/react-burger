import React, {useEffect, useReducer, useState} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constuctor/burger-constructor";
import appStyles from  './app.module.css';
import {CartTotalContext} from "../../services/burger-context";
import {useDispatch, useSelector} from "react-redux";
import {IIngredientItemsState, getItems} from "../../services/ingredient-items";
import {AppRootState} from "../../store";
import {addToCart} from "../../services/cart";

function App() {
    const dispatch = useDispatch()

    const ingredients: IIngredientItemsState = useSelector((state: AppRootState) => state.ingredients)

    const [totalPrice, setTotalPrice] = useState<number | null>(null)

    useEffect(() => {
        if (!ingredients.items.length) {
            dispatch(getItems())
        }
    }, [dispatch])

    useEffect(() => {
        if (ingredients.items.length) {
            const buns = ingredients.items.filter((item) => item.type === 'bun')
            const ingredientItems = ingredients.items.filter((item) => item.type !== 'bun')

            // Добавляем случайную булку
            dispatch(addToCart(buns[Math.floor(Math.random() * buns.length)]))

            // Добавляем случайное кол-во
            for (let i = 0; i <= Math.floor(Math.random() * ingredientItems.length); i++) {
                dispatch(addToCart(ingredientItems[i]))
            }
        }
    }, [ingredients.items])

    return (
        <>
            <AppHeader />
            <div className={appStyles.container}>
                <main className={appStyles.main}>
                    <section className={`${appStyles.section} ${appStyles.limitedHeight} mb-10 mr-10`}>
                        {ingredients.items.length > 0 && <BurgerIngredients />}
                        {ingredients.request && !ingredients.failed && <p className="">Рагружаем контейнер с ингридиентами...</p> }
                        {ingredients.failed && <p className="">При разгрузке контейнера с ингридиентами произошла нелепая ошибка. Исправляем...</p> }
                    </section>
                    <section className={`${appStyles.section} pt-25`}>
                        <CartTotalContext.Provider value={{totalPrice, setTotalPrice}}>
                            <BurgerConstructor />
                        </CartTotalContext.Provider>
                    </section>
                </main>
            </div>
        </>
    );
}

export default App;
