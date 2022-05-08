import { PayloadAction } from "@reduxjs/toolkit";

export type TWsOrder = {
    ingredients: string[];

    _id: string;
    status: "created" | "pending" | "done";
    number: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

type TWsState = {
    isWsConnected: boolean;
}

export type TWsOrderState = TWsState & {
    orders: TWsOrder[];
    total: number;
    totalToday: number;
}

export type TWsInitPayload = {
    wsUrl: string;
    token?: string;
}

export type TWsOrderActions = {
    wsInit: (state: TWsOrderState, action: PayloadAction<TWsInitPayload>) => void,
    wsSendMessage: (state: TWsOrderState, action: PayloadAction<TWsOrderState>) => void,
    onOpen: (state: TWsOrderState) => void,
    onClose: (state: TWsOrderState) => void,
    onError: (state: TWsOrderState) => void,
    onMessage: (state: TWsOrderState, action: PayloadAction<TWsOrderState>) => void
}
