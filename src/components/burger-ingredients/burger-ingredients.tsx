import React, { FC, useState } from "react";
import Tabs from "./tabs";
import IngredientsList from "./ingredients-list";
import IBurgerItem from "../../interfaces/IBurgerItem";
import ITitles from "../../interfaces/ITitles";
import {InView} from "react-intersection-observer";
import { useAppSelector } from "../../types/hooks";

type TBurgerIngredientsPositionState = {
    type: string;
    entryTop: number;
    inView: boolean
}

export type TSetSelectedTab = {
    (value: string): void
}

const BurgerIngredients: FC = () => {
    const ingredientItems = useAppSelector(state => state.ingredients.items)

    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const bunRef = React.useRef<HTMLHeadingElement | null>(null)
    const sauceRef = React.useRef<HTMLHeadingElement | null>(null)
    const mainRef = React.useRef<HTMLHeadingElement | null>(null)

    const [selectedTab, setSelectedTab] = useState<string>("bun");
    const [headingPositions, setHeadingPositions] = useState<TBurgerIngredientsPositionState[]>([
        {type: "bun", entryTop: 0, inView: false},
        {type: "sauce", entryTop: 0, inView: false},
        {type: "main", entryTop: 0, inView: false},
    ])

    const handleChangeTab: TSetSelectedTab = (value: string) => {
        const refHtmlElement = getRefHtmlElement(value)
        if (refHtmlElement.current) {
            refHtmlElement.current.scrollIntoView({behavior: "smooth"})
        }

        setSelectedTab(value)
    }

    const handleHeadingScroll = (type: string, inView: boolean, entry: IntersectionObserverEntry) => {
        const newHeadingPositions = [...headingPositions].map((item) => {
            if (item.type === type) {
                item.inView = inView
                item.entryTop = entry ? entry.boundingClientRect.top : 0
            }
            return item
        })
        setHeadingPositions(newHeadingPositions)

        // Выбираем только видимые заголовки и из них определяем ближайший к контейнеру элемент
        const inViewItems = newHeadingPositions.filter(item => item.inView)

        if (inViewItems.length > 0) {
            const activeHeading = inViewItems.reduce((p, v) => {
                return (p.entryTop < v.entryTop ? p : v);
            });

            setSelectedTab(activeHeading.type)
        }
    }

    const getRefHtmlElement = (value: string): React.RefObject<HTMLHeadingElement> => {
        switch (value) {
            case 'bun':
            default:
                return bunRef
            case 'sauce':
                return sauceRef
            case 'main':
                return mainRef
        }
    }

    const titles = (): ITitles => {
        return {
            bun:  'Булочки',
            sauce: 'Соусы',
            main: 'Начинки'
        }
    }

    return (
        <>
            <h1 className="mt-10 mb-5 text text_type_main-large">Соберите Бургер</h1>
            <Tabs selectedTab={selectedTab} setSelectedTab={handleChangeTab} />

            <div ref={containerRef} className={`scroll pr-4`}>
                {Object.entries(titles()).map((title: [string, string]) => {
                    const type = title[0]
                    const items = ingredientItems ? ingredientItems.filter((item: IBurgerItem) => item.type === type) : []

                    return (
                        <div key={type}>
                            <InView root={containerRef.current} onChange={(inView, entry) => handleHeadingScroll(type, inView, entry)}>
                                <h2 className="text text_type_main-medium" ref={getRefHtmlElement(type)}>{title[1]}</h2>
                            </InView>

                            <IngredientsList items={items} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default BurgerIngredients
