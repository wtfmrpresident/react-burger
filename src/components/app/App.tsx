import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
    AccountPage,
    ForgotPasswordPage,
    HomePage,
    LoginPage,
    NotFoundPage,
    ProfileOrdersPage,
    ProfilePage,
    RegisterPage,
    ResetPasswordPage
} from "../../pages";
import { RequireAuth } from "../RequireAuth";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {AppLayout} from "../../pages/AppLayout";

function App() {
    const location = useLocation()
    const navigate = useNavigate()
    const state = location.state as { backgroundLocation?: Location };

    const handleToggleModal = () => {
        navigate(-1)
    }

    return (
        <>
            <Routes location={state?.backgroundLocation || location}>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/profile/*" element={
                        <RequireAuth>
                            <AccountPage />
                        </RequireAuth>
                    }>
                        <Route path="update" element={<ProfilePage />} />
                        <Route path="orders" element={<ProfileOrdersPage />} />
                    </Route>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/ingredients/:id" element={<IngredientDetails />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>

            {state?.backgroundLocation && (
                <Routes>
                    <Route path="/ingredients/:id" element={
                        <Modal isOpen={true} hide={handleToggleModal}>
                            <IngredientDetails />
                        </Modal>
                    } />
                </Routes>
            )}
        </>
    );
}

export default App;
