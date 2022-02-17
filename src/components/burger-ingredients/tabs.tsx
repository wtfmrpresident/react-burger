import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

class Tabs extends React.Component<any, any> {
    render() {
        return (
            <div style={{ display: 'flex' }} className="mb-10">
                <Tab value="bun" active={this.props.selectedTab === 'bun'} onClick={(value) => this.props.setSelectedTab(value)}>
                    Булки
                </Tab>
                <Tab value="sauce" active={this.props.selectedTab === 'sauce'} onClick={(value) => this.props.setSelectedTab(value)}>
                    Соусы
                </Tab>
                <Tab value="main" active={this.props.selectedTab === 'main'} onClick={(value) => this.props.setSelectedTab(value)}>
                    Начинки
                </Tab>
            </div>
        )
    }
}

export default Tabs