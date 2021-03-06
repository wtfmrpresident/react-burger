import React, { useEffect } from 'react';
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
import { AppLayout } from "../../pages/AppLayout";
import { getCookie } from "../../utils/cookie";
import { profile, refreshToken } from "../../services/account";
import { ITokenData } from "../../utils/auth";
import { getIngredients, IIngredientItemsState } from "../../services/get-ingredients";
import Feed from "../../pages/feed";
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import FeedDetails from "../feed-item/feed-details";
import FeedDetail from "../../pages/feed-detail";
import { ProfileOrderDetails } from "../../pages/profile-order-details";

function App() {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const state = location.state as { backgroundLocation?: Location };

    const handleToggleModal = () => {

        navigate(-1)
    }

    const ingredients: IIngredientItemsState = useAppSelector(state => state.ingredients)

    useEffect(() => {
        if (!ingredients.items.length) {
            dispatch(getIngredients())
        }
    }, [dispatch, ingredients.items.length])

    useEffect(
        () => {
            const token = getCookie('token')
            if (token) {
                dispatch(profile())
                    .unwrap()
                    .catch(() => {
                        const refreshTokenValue = getCookie('refreshToken')
                        if (refreshTokenValue) {
                            const data: ITokenData = {token: refreshTokenValue}
                            dispatch(refreshToken(data)).unwrap().then(() => {
                                dispatch(profile())
                            })
                        }
                    })
            }
        },
        [dispatch]
    )

    return (
        <>
            <Routes location={state?.backgroundLocation || location}>
                <Route path="/" element={<AppLayout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/feed" element={<Feed/>}/>
                    <Route path="/feed/:id" element={<FeedDetail/>}/>
                    <Route path="/profile/orders/:id" element={
                        <RequireAuth>
                            <ProfileOrderDetails />
                        </RequireAuth>
                    }/>
                    <Route path="/profile/*" element={
                        <RequireAuth>
                            <AccountPage/>
                        </RequireAuth>
                    }>
                        <Route path="update" element={<ProfilePage/>}/>
                        <Route path="orders" element={<ProfileOrdersPage/>}/>
                    </Route>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                    <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                    <Route path="/ingredients/:id" element={<IngredientDetails/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
            </Routes>

            {state?.backgroundLocation && (
                <Routes>
                    <Route path="/ingredients/:id" element={
                        <Modal onClose={handleToggleModal}>
                            <IngredientDetails/>
                        </Modal>
                    }/>
                    <Route path="/feed/:id" element={
                        <Modal onClose={handleToggleModal}>
                            <FeedDetails/>
                        </Modal>
                    }/>
                    <Route path="/profile/orders/:id" element={
                        <RequireAuth>
                            <Modal onClose={handleToggleModal}>
                                <ProfileOrderDetails/>
                            </Modal>
                        </RequireAuth>
                    }/>
                </Routes>
            )}
        </>
    );
}

export default App;
