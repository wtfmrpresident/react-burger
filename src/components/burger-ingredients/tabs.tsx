import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import ISetSelectedTab from "../../interfaces/ISetSelectedTab";

interface IProps {
    selectedTab: string, // Тут типизацию "bun" | "sauce" | "main" не получится поставить, нужно интерфейс Tabs менять на входящий параметр в onClick.
                         // Оставлю так
    setSelectedTab: ISetSelectedTab
}

function Tabs(props: IProps) {
    return (
        <div className="d__flex mb-10">
            <Tab value="bun" active={props.selectedTab === 'bun'} onClick={(value) => props.setSelectedTab(value)}>
                Булки
            </Tab>
            <Tab value="sauce" active={props.selectedTab === 'sauce'} onClick={(value) => props.setSelectedTab(value)}>
                Соусы
            </Tab>
            <Tab value="main" active={props.selectedTab === 'main'} onClick={(value) => props.setSelectedTab(value)}>
                Начинки
            </Tab>
        </div>
    )
}

export default Tabs
