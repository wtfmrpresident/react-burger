import {useLocation, Navigate} from "react-router-dom";
import { useAppSelector } from "../types/hooks";

export function RequireAuth({ children }: { children: JSX.Element }) {
    const accountState = useAppSelector(state => state.account)
    const location = useLocation();

    if (!accountState.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
