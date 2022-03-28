import homePageStyles from "./home.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constuctor/burger-constructor";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getItems, IIngredientItemsState} from "../services/ingredient-items";
import {AppRootState} from "../store";

export function HomePage() {
    const dispatch = useDispatch()
    const ingredients: IIngredientItemsState = useSelector((state: AppRootState) => state.ingredients)

    useEffect(() => {
        if (!ingredients.items.length) {
            dispatch(getItems())
        }
    }, [dispatch, ingredients.items.length])

    return (
        <div className={homePageStyles.container}>
            <main className={homePageStyles.main}>
                <DndProvider backend={HTML5Backend}>
                    <section className={`${homePageStyles.section} ${homePageStyles.limitedHeight} mb-10 mr-10`}>
                        {ingredients.items.length > 0 && <BurgerIngredients />}
                        {ingredients.request && !ingredients.failed && <p className="">Рагружаем контейнер с ингридиентами...</p> }
                        {ingredients.failed && <p className="">При разгрузке контейнера с ингридиентами произошла нелепая ошибка. Исправляем...</p> }
                    </section>
                    <section className={`${homePageStyles.section} pt-25`}>
                        <BurgerConstructor />
                    </section>
                </DndProvider>
            </main>
        </div>
    )
}
