import { ChangeEvent, SyntheticEvent, useState } from "react";
import resetPasswordPageStyles from "./forgot-password.module.css";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {AppRootState, useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { ILocationState } from "../interfaces/ILocationState";
import { resetPassword } from "../services/reset-password";

export function ResetPasswordPage() {
    const dispatch = useAppDispatch()
    const accountState = useSelector((state: AppRootState) => state.account)
    const forgotPasswordState = useSelector((state: AppRootState) => state.resetPassword)
    const navigate = useNavigate()

    const location: ILocationState = useLocation() as ILocationState
    const from = location.state?.from?.pathname || '/'

    const [form, setValue] = useState({ password: '', token: '' });

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        dispatch(resetPassword(form))
            .unwrap()
            .then(() => {
                navigate("/login", {replace: true})
            })
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    if (accountState.user || !forgotPasswordState.forgotPasswordEmailRequest) {
        return <Navigate replace to={from} />
    }

    return (
        <div className="container">
            <div className={`${resetPasswordPageStyles.main}`}>
                <h2 className="text__center">Восстановление пароля</h2>
                <div className="mt-6">
                    <PasswordInput value={form.password} name="password" onChange={onChange} />
                </div>
                <div className="mt-6">
                    <Input placeholder="Введите код из письма" value={form.token} name="token" onChange={onChange} />
                </div>
                <div className="mt-6 mb">
                    <Button onClick={handleSubmit} disabled={forgotPasswordState.resetPasswordRequest}>Восстановить</Button>
                </div>
                <p className="mt-20">Вспомнили пароль? <Link to="/register">Войти</Link></p>
            </div>
        </div>
    )
}
