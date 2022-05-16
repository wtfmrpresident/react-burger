import homePageStyles from "./home.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constuctor/burger-constructor";
import React from "react";
import { useSelector} from "react-redux";
import {IIngredientItemsState} from "../services/get-ingredients";
import {AppRootState} from "../store";
import { useAppSelector } from "../types/hooks";

export function HomePage() {
    const ingredients: IIngredientItemsState = useAppSelector(state => state.ingredients)

    return (
        <div className={homePageStyles.container}>
            <main className={homePageStyles.main}>
                <DndProvider backend={HTML5Backend}>
                    <section className={`${homePageStyles.section} mb-10 mr-10`}>
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
