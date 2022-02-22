import React from "react";
import appHeaderStyles from "./app-header.module.css";
import IMenuItem from "../../interfaces/IMenuItem";

function MenuItem(props: {item: IMenuItem, isActive: boolean}) {
    return (
        <a
            className={`${appHeaderStyles.menuText} text text_type_main-default${props.isActive && ' ' + appHeaderStyles.active}`}
            href="/#"
            onClick={(e) => e.preventDefault()}
        >
            {props.item.icon}
            {props.item.text}
        </a>
    )
}

export default MenuItem