import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import appHeaderStyles from "./app-header.module.css";
import IMenuItem from "../../interfaces/IMenuItem";

type TMenu = {
    items: IMenuItem[];
}

const Menu: FC<TMenu> = ({ items }) => {
    return (
        <>
            <ul className={appHeaderStyles.menu}>
                {items.map((menuItem, index) => {
                    return (
                        <li key={index}>
                            <NavLink
                                to={menuItem.link}
                                className={({ isActive }) => {
                                    return `${appHeaderStyles.menu_text} text text_type_main-default ${isActive ? appHeaderStyles.active : null}`;
                                }}
                            >
                                {menuItem.icon}
                                {menuItem.text}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Menu
