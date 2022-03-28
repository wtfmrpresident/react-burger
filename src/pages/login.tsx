import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import loginPageStyles from './login.module.css';
import {ChangeEvent, SyntheticEvent, useState} from "react";
import {Link, Navigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../store";
import {login} from "../services/account";
import {ILocationState} from "../interfaces/ILocationState";

export function LoginPage() {
    const dispatch = useDispatch()
    const accountState = useSelector((state: AppRootState) => state.account)

    const [form, setValue] = useState({ email: '', password: '' })

    const location: ILocationState = useLocation() as ILocationState
    const from = location.state?.from?.pathname || '/'

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        dispatch(login(form))
    }

    if (accountState.user) {
        return <Navigate replace to={from} />
    }

    return (
        <div className="container">
            <div className={`${loginPageStyles.main}`}>
                <h2 className="text__center">Вход</h2>
                <div className="mt-6">
                    <Input placeholder="Email" value={form.email} name="email" onChange={onChange} />
                </div>
                <div className="mt-6">
                    <PasswordInput value={form.password} name="password" onChange={onChange} />
                </div>
                <div className="mt-6 mb">
                    <Button onClick={handleSubmit} disabled={accountState.loginRequest}>Войти</Button>
                </div>
                <p className="mt-20">Вы - новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>
                <p className="mt-4">Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></p>
            </div>
        </div>
    )
}
