import { Outlet } from 'react-router-dom';
import AppHeader from "../components/app-header/app-header";

export function AppLayout() {
    return (
        <>
            <AppHeader />
            <main>
                <Outlet />
            </main>
        </>
    )
}
