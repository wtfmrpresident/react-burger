import { useSelector } from "react-redux";
import { AppRootState } from "../store";
import { Navigate } from "react-router-dom";
import React from "react";

export function OrdersPage() {
    const accountState = useSelector((state: AppRootState) => state.account)

    if (!accountState.user) {
        return <Navigate replace to="/login" />
    }

    return (
        <></>
    )
}
