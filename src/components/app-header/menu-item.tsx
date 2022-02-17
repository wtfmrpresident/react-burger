import React from "react";
import appHeaderStyles from "./app-header.module.css";
import {BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function getIcon(iconName: string) {
    switch (iconName) {
        case 'burger':
            return <BurgerIcon type="secondary" />;
        case 'list':
            return <ListIcon type="secondary" />;
        case 'profile':
            return <ProfileIcon type="secondary" />;
        default:
            return null;
    }
}

function MenuItem(props: item<object>, key: React.Key | null | undefined) {
    return (
        <li key={key}>
            <a className={`${appHeaderStyles.menuText} text text_type_main-default`}>
                {getIcon(props.item.iconName)}
                {props.item.text}
            </a>
        </li>
    )
}

export default MenuItem