import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../store";
import {Outlet, Link, Navigate, NavLink, useLocation} from "react-router-dom";
import accountPageStyles from "./account.module.css";
import React, { SyntheticEvent } from "react";
import {getCookie} from "../utils/cookie";
import {ITokenData} from "../utils/auth";
import {logout} from "../services/account";

export function AccountPage() {
    const dispatch = useDispatch()
    const accountState = useSelector((state: AppRootState) => state.account)

    const location = useLocation()

    const onLogoutClick = (e: SyntheticEvent) => {
        e.preventDefault()

        const token = getCookie('refreshToken')
        if (token) {
            const data: ITokenData = {token: token}
            dispatch(logout(data))
        }
    }

    if (!accountState.user) {
        return <Navigate replace to="/login" />
    }

    if (location.pathname === '/profile') {
        return <Navigate replace to="/profile/update" />
    }

    return (
        <div className="container">
            <div className={`${accountPageStyles.main}`}>
                <section className={`${accountPageStyles.section} ${accountPageStyles.section_menu}`}>
                    <ul className={`${accountPageStyles.menu_list}`}>
                        <li className={`${accountPageStyles.menu_list_item}`}>
                            <NavLink
                                to="/profile/update"
                                className={({ isActive }) => {
                                    return `text text_type_main-default ${isActive ? accountPageStyles.menu_list_item_active : null}`
                                }}
                            >
                                Профиль
                            </NavLink>
                        </li>
                        <li className={`${accountPageStyles.menu_list_item}`}>
                            <NavLink
                                to="/profile/orders"
                                className={({ isActive }) => {
                                    return `text text_type_main-default ${isActive ? accountPageStyles.menu_list_item_active : null}`
                                }}
                            >
                                История заказов
                            </NavLink>
                        </li>
                        <li className={`${accountPageStyles.menu_list_item}`}>
                            <Link
                                to="/profile"
                                className="text text_type_main-default"
                                onClick={onLogoutClick}
                            >
                                Выход
                            </Link>
                        </li>
                    </ul>

                    <p className={`${accountPageStyles.text_muted} text text_type_main-small text_color_inactive mt-20`}>
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </section>
                <section className={`${accountPageStyles.section} ${accountPageStyles.section_content}`}>
                    <Outlet />
                </section>
            </div>
        </div>
    )
}
