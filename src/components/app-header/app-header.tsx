import React from 'react';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from './app-header.module.css';
import Menu from "./menu";
import {Link} from "react-router-dom";

function AppHeader() {
    const leftMenu = [
        {
            text: 'Конструктор',
            icon: <BurgerIcon type="secondary" />,
            link: '/'
        },
        {
            text: 'Лента заказов',
            icon: <ListIcon type="secondary" />,
            link: '/feed'
        },
    ];

    const rightMenu = [
        {
            text: 'Личный кабинет',
            icon: <ProfileIcon type="secondary" />,
            link: '/profile'
        },
    ];

    return (
        <header className={appHeaderStyles.header}>
            <div className={appHeaderStyles.container}>
                <nav className={appHeaderStyles.nav_bar}>
                    <div className={appHeaderStyles.menu_left}>
                        <Menu items={leftMenu} />
                    </div>
                    <Link to="/">
                        <Logo />
                    </Link>
                    <div className={appHeaderStyles.menu_right}>
                        <Menu items={rightMenu} />
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default AppHeader;
