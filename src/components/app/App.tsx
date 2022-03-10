import React, {useEffect} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constuctor/burger-constructor";
import appStyles from  './app.module.css';
import {useDispatch, useSelector} from "react-redux";
import {IIngredientItemsState, getItems} from "../../services/ingredient-items";
import {AppRootState} from "../../store";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
    const dispatch = useDispatch()
    const ingredients: IIngredientItemsState = useSelector((state: AppRootState) => state.ingredients)

    useEffect(() => {
        if (!ingredients.items.length) {
            dispatch(getItems())
        }
    }, [dispatch, ingredients.items.length])

    return (
        <>
            <AppHeader />
            <div className={appStyles.container}>
                <main className={appStyles.main}>
                    <DndProvider backend={HTML5Backend}>
                        <section className={`${appStyles.section} ${appStyles.limitedHeight} mb-10 mr-10`}>
                            {ingredients.items.length > 0 && <BurgerIngredients />}
                            {ingredients.request && !ingredients.failed && <p className="">Рагружаем контейнер с ингридиентами...</p> }
                            {ingredients.failed && <p className="">При разгрузке контейнера с ингридиентами произошла нелепая ошибка. Исправляем...</p> }
                        </section>
                        <section className={`${appStyles.section} pt-25`}>
                            <BurgerConstructor />
                        </section>
                    </DndProvider>
                </main>
            </div>
        </>
    );
}

export default App;
