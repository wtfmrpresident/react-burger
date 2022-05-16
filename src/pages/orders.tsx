import { Navigate } from "react-router-dom";
import React from "react";
import { useAppSelector } from "../types/hooks";

export function OrdersPage() {
    const accountState = useAppSelector(state => state.account)

    if (!accountState.user) {
        return <Navigate replace to="/login" />
    }

    return (
        <></>
    )
}
