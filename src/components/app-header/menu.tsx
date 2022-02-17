import React from "react";
import appHeaderStyles from "./app-header.module.css";
import MenuItem from "./menu-item";

function Menu(props: { items: object[]; }) {
    return (
        <>
            <ul className={appHeaderStyles.menu}>
                {props.items.map((menuItem, index) => {
                    return <MenuItem key={index} item={menuItem} />
                })}
            </ul>
        </>
    )
}

export default Menu