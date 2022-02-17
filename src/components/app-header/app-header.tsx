import React from 'react';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from './app-header.module.css';
import Menu from "./menu";

function AppHeader() {
    const leftMenu = [
        {
            text: 'Конструктор',
            iconName: 'burger'
        },
        {
            text: 'Лента заказов',
            iconName: 'list'
        },
    ];

    const rightMenu = [
        {
            text: 'Личный кабинет',
            iconName: 'profile'
        },
    ];

    return (
        <header className={appHeaderStyles.header}>
            <div className={appHeaderStyles.container}>
                <nav className={appHeaderStyles.navBar}>
                    <div className={appHeaderStyles.menuLeft}>
                        <Menu items={leftMenu} />
                    </div>
                    <Logo />
                    <div className={appHeaderStyles.menuRight}>
                        <Menu items={rightMenu} />
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default AppHeader;
