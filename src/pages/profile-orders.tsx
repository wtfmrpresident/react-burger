import React from "react";
import { useSelector } from "react-redux";
import { AppRootState } from "../store";
import { Navigate } from "react-router-dom";

export function ProfileOrdersPage() {
    const accountState = useSelector((state: AppRootState) => state.account)

    if (!accountState.user) {
        return <Navigate replace to="/login" />
    }

    return (
        <>
            <p>Тут будут когда-нибудь заказы...</p>
        </>
    )
}
