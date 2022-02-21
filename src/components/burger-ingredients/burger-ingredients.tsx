import React, {useState} from "react";
import Tabs from "./tabs";
import IngredientsList from "./ingredients-list";
import IBurgerItem from "../../interfaces/IBurgerItem";
import IAddToCart from "../../interfaces/IAddToCart";
import ITitles from "../../interfaces/ITitles";
import ingredientsStyle from "./ingredients-list.module.css";

interface IProps {
    items: IBurgerItem[],
    cart: IBurgerItem[],
    addToCartHandler: IAddToCart
}

const BurgerIngredients = (props: IProps) => {
    const bunRef = React.useRef<HTMLHeadingElement>(null)
    const sauceRef = React.useRef<HTMLHeadingElement>(null)
    const mainRef = React.useRef<HTMLHeadingElement>(null)

    const [selectedTab, setSelectedTab] = useState("bun");

    const handleChangeTab = (value: string) => {
        const refHtmlElement = getRefHtmlElement(value)
        if (refHtmlElement.current) {
            refHtmlElement.current.scrollIntoView({behavior: "smooth"})
        }

        setSelectedTab(value)
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
            <div>
                <h1 className="mt-10 mb-5 text text_type_main-large">Соберите Бургер</h1>
                <Tabs selectedTab={selectedTab} setSelectedTab={handleChangeTab} />

                <div className={`${ingredientsStyle.scroll} pr-4`}>
                    {Object.entries(titles()).map((title: [string, string]) => {
                        const type = title[0]
                        const items = props.items ? props.items.filter((item: IBurgerItem) => item.type === type) : []

                        return (
                            <div key={type}>
                                <h2 className="text text_type_main-medium" ref={getRefHtmlElement(type)}>{title[1]}</h2>
                                <IngredientsList items={items} cart={props.cart} addToCartHandler={props.addToCartHandler} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default BurgerIngredients;