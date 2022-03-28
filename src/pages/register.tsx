import {ChangeEvent, SyntheticEvent, useState} from "react";
import registerPageStyles from "./register.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {register} from "../services/account";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../store";
import {IRegisterData} from "../utils/auth";

export function RegisterPage() {
    const dispatch = useDispatch()
    const accountState = useSelector((state: AppRootState) => state.account)

    const [form, setValue] = useState<IRegisterData>({ name: '', email: '', password: '' });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        dispatch(register(form))
    }

    return (
        <div className="container">
            <div className={`${registerPageStyles.main}`}>
                <h2 className="text__center">Регистрация</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mt-6">
                        <Input placeholder="Имя" value={form.name} name="name" onChange={onChange} />
                    </div>
                    <div className="mt-6">
                        <Input placeholder="Email" value={form.email} name="email" onChange={onChange} />
                    </div>
                    <div className="mt-6">
                        <PasswordInput value={form.password} name="password" onChange={onChange} />
                    </div>
                    <div className="mt-6 mb">
                        <Button htmlType="submit" disabled={accountState.registerRequest}>Зарегистрироваться</Button>
                    </div>
                </form>
                <p className="mt-20">Уже зарегистрированы? <Link to="/login">Войти</Link></p>
            </div>
        </div>
    )
}
