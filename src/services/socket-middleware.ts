import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, AppRootState } from "../store";
import { TWsInitPayload, TWsOrderState } from "../interfaces/TWsOrderActions";
import orderSocketSlice from "./order-socket";
import { PayloadAction } from "@reduxjs/toolkit";

export const socketMiddleware = (wsActions: {[key: string]: string}): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, AppRootState>) => {
        let socket: WebSocket | null = null

        return next => (action) => {
            const { dispatch } = store;
            const { type } = action;

            const {
                wsInit,
                wsSendMessage,
                wsClose,
            } = wsActions;

            console.log(type, wsInit)

            if (type === wsInit) {
                const { payload }: PayloadAction<TWsInitPayload> = action
                // определим, как подключаться к сокету
                if (payload.token) {
                    socket = new WebSocket(`${payload.wsUrl}?token=${payload.token}`)
                } else {
                    socket = new WebSocket(payload.wsUrl)
                }
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch(orderSocketSlice.actions.onOpen())
                };

                socket.onerror = event => {
                    dispatch(orderSocketSlice.actions.onError())
                };

                socket.onmessage = event => {
                    const { data }: MessageEvent = event
                    const parsedData: TWsOrderState = JSON.parse(data)
                    dispatch(orderSocketSlice.actions.onMessage(parsedData))
                };

                socket.onclose = event => {
                    dispatch(orderSocketSlice.actions.onClose())
                };

                if (type === wsSendMessage) {
                    const { payload } = action

                    socket.send(JSON.stringify(payload));
                }

                if (type === wsClose) {
                    socket.close()
                }
            }

            next(action);
        };
    }) as Middleware;
};
