import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {ChangeEvent, SyntheticEvent, useRef, useState} from "react";
import {IRegisterData} from "../utils/auth";
import {profileUpdate} from "../services/account";
import { useAppDispatch, useAppSelector } from "../types/hooks";

export function ProfilePage() {
    const dispatch = useAppDispatch()
    const accountState = useAppSelector(state => state.account)

    const [isDataChanged, setIsDataChanged] = useState<boolean>(false)

    const inputNameRef = useRef<HTMLInputElement | null>(null)
    const inputEmailRef = useRef<HTMLInputElement | null>(null)
    const inputPasswordRef = useRef<HTMLInputElement | null>(null)

    const [form, setValue] = useState<IRegisterData>({ name: accountState.user?.name || '', email: accountState.user?.email || '', password: '' });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
        setIsDataChanged(true)
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        e.stopPropagation()

        dispatch(profileUpdate(form))
    }

    const onIconClick = (e: SyntheticEvent, name: "name" | "email" | "password") => {
        e.preventDefault()

        switch (name) {
            case "name": {
                inputNameRef?.current?.focus()
                break
            }
            case "email": {
                inputEmailRef?.current?.focus()
                break
            }
            case "password": {
                inputPasswordRef?.current?.focus()
                break
            }
        }
    }

    const onClickCancel = (e: SyntheticEvent) => {
        e.preventDefault()

        setValue({...form, ...accountState.user, password: ''})
        setIsDataChanged(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mt-6">
                <Input
                    type="text"
                    icon="EditIcon"
                    placeholder="Имя"
                    value={form.name}
                    name="name"
                    onChange={onChange}
                    ref={inputNameRef}
                    onIconClick={(e: SyntheticEvent) => onIconClick(e, "name")}
                />
            </div>
            <div className="mt-6">
                <Input
                    type="email"
                    icon="EditIcon"
                    placeholder="E-mail"
                    value={form.email}
                    name="email"
                    onChange={onChange}
                    ref={inputEmailRef}
                    onIconClick={(e: SyntheticEvent) => onIconClick(e, "email")}
                />
            </div>
            <div className="mt-6">
                <Input
                    type="password"
                    icon="EditIcon"
                    placeholder="Пароль"
                    value={form.password}
                    name="password"
                    onChange={onChange}
                    ref={inputPasswordRef}
                    onIconClick={(e: SyntheticEvent) => onIconClick(e, "password")}
                />
            </div>
            {
                isDataChanged ? (
                    <div className="mt-6 mb">
                        <Button htmlType="submit" disabled={accountState.registerRequest}>Сохранить</Button>
                        <Button type="secondary" onClick={onClickCancel} disabled={accountState.registerRequest}>Отмена</Button>
                    </div>
                ) : null
            }
        </form>
    )
}
