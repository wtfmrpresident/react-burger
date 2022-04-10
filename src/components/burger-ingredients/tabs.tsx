import React, { FC } from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import { TSetSelectedTab } from "./burger-ingredients";

type TTabs = {
    selectedTab: string, // Тут типизацию "bun" | "sauce" | "main" не получится поставить, нужно интерфейс Tabs менять на входящий параметр в onClick.
                         // Оставлю так
    setSelectedTab: TSetSelectedTab
}

const Tabs: FC<TTabs> = ({selectedTab, setSelectedTab}) => {
    return (
        <div className="d__flex mb-10">
            <Tab value="bun" active={selectedTab === 'bun'} onClick={(value) => setSelectedTab(value)}>
                Булки
            </Tab>
            <Tab value="sauce" active={selectedTab === 'sauce'} onClick={(value) => setSelectedTab(value)}>
                Соусы
            </Tab>
            <Tab value="main" active={selectedTab === 'main'} onClick={(value) => setSelectedTab(value)}>
                Начинки
            </Tab>
        </div>
    )
}

export default Tabs
