import React from "react";
import appHeaderStyles from "./app-header.module.css";
import MenuItem from "./menu-item";
import IMenuItem from "../../interfaces/IMenuItem";

function Menu(props: { items: IMenuItem[]; }) {
    return (
        <>
            <ul className={appHeaderStyles.menu}>
                {props.items.map((menuItem, index) => {
                    return (
                        <li key={index}>
                            <MenuItem item={menuItem} isActive={menuItem.text === 'Конструктор'} /> {/* пока оставлю костыликом, думаю, это исправится, когда будет роутинг */}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Menu