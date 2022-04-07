import {useSelector} from "react-redux";
import {AppRootState} from "../store";
import {useLocation, Navigate} from "react-router-dom";

export function RequireAuth({ children }: { children: JSX.Element }) {
    const accountState = useSelector((state: AppRootState) => state.account)
    const location = useLocation();

    if (!accountState.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
