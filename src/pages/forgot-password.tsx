import { ChangeEvent, SyntheticEvent, useState } from "react";
import forgotPasswordPageStyles from "./forgot-password.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppRootState } from "../store";
import { ILocationState } from "../interfaces/ILocationState";
import { forgotPassword, setPasswordEmailRequest } from "../services/reset-password";
import { useAppDispatch } from "../types/hooks";

export function ForgotPasswordPage() {
    const dispatch = useAppDispatch()
    const accountState = useSelector((state: AppRootState) => state.account)
    const forgotPasswordState = useSelector((state: AppRootState) => state.resetPassword)
    const navigate = useNavigate()

    const location: ILocationState = useLocation() as ILocationState
    const from = location.state?.from?.pathname || '/'

    const [form, setValue] = useState({email: ''})

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        // @ts-ignore
        dispatch(setPasswordEmailRequest(form))
        dispatch(forgotPassword(form))
            .unwrap()
            .then(() => {
                navigate("/reset-password", {replace: false})
            })
    }

    if (accountState.user) {
        return <Navigate replace to={from}/>
    }

    return (
        <div className="container">
            <div className={`${forgotPasswordPageStyles.main}`}>
                <h2 className="text__center">Восстановление пароля</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mt-6">
                        <Input placeholder="Укажите e-mail" value={form.email} name="email" onChange={onChange}/>
                    </div>
                    <div className="mt-6 mb">
                        <Button htmlType="submit"
                                disabled={forgotPasswordState.forgotPasswordRequest}>Восстановить</Button>
                    </div>
                </form>
                <p className="mt-20">Вспомнили пароль? <Link to="/register">Войти</Link></p>
            </div>
        </div>
    )
}
