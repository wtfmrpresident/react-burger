import React from "react";
import { NavLink } from "react-router-dom";
import appHeaderStyles from "./app-header.module.css";
import IMenuItem from "../../interfaces/IMenuItem";

function Menu(props: { items: IMenuItem[]; }) {
    return (
        <>
            <ul className={appHeaderStyles.menu}>
                {props.items.map((menuItem, index) => {
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
