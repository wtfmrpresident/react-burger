import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, AppRootState } from "../store";
import { TWsInitPayload, TWsOrderState, TWsSocketActions } from "../interfaces/TWsSocketActions";
import orderSocketSlice from "./order-socket";
import { PayloadAction, Slice } from "@reduxjs/toolkit";

export const socketMiddleware = (wsSlice: Slice<any, TWsSocketActions>): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, AppRootState>) => {
        let socket: WebSocket | null = null

        return next => (action) => {
            const { dispatch } = store;
            const { type } = action;

            const {
                wsInit,
                wsSendMessage,
                onClose,
            } = wsSlice.actions;

            if (type === wsInit.type) {
                const { payload }: PayloadAction<TWsInitPayload> = action
                socket = new WebSocket(payload.wsUrl)
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

                if (type === wsSendMessage.type) {
                    const { payload } = action

                    socket.send(JSON.stringify(payload));
                }

                if (type === onClose.type) {
                    socket.close()
                }
            }

            next(action);
        };
    }) as Middleware;
};
