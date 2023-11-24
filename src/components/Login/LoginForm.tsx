import React, { ChangeEvent, FormEvent, useCallback, useContext, useState } from "react";
import styles from './index.module.scss';
import { REQUIRED } from "./libs/constants";
import { validate } from "./libs/validators";
import { useNavigate } from "react-router-dom";
import { InputName } from "./libs/types";
import { displayError } from "./libs/displayError";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { observer } from "mobx-react-lite";
import { Loader } from "../shared/Loader/Loader";
import { Button, ColorScheme } from "@mantine/core";
import { ToggleTheme } from "../Header/ToggleTheme/ToggleTheme";
import { rootStore } from "../../store/root-store";

const initialState = { login: '', password: '' }

export const LoginForm = observer(() => {
    const navigate = useNavigate()

    const { authStore, uiStore: { colorTheme }} = rootStore

    const notify = (message: string) => toast(message)

    const [errors, setErrors] = useState(initialState)

    const [inputState, setInputState] = useState(initialState)

    const handleInputOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget
        setInputState(prev => ({...prev, [name]: value}))
        value ?
            setErrors(prev => ({...prev, [name]: ''})) :
            setErrors(prev => ({...prev, [name]: REQUIRED}))
    }, [])

    const handleSubmitForm = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        for (let entry of Object.entries(inputState)) {
            const name = entry[0] as InputName
            const value = entry[1]
            if (!value) {
                return setErrors(prev => ({...prev, [name]: REQUIRED}))
            }
            if (!validate(name, value)) {
                return setErrors(prev => ({...prev, [name]: displayError(name)}))
            }
        }
        
        authStore.login(inputState)
            .then(error => {
                authStore.error ? (notify(authStore.error)) : navigate('/')
                authStore.error  = ''
            })
            .catch(error => {
                navigate('/error')
            })
    }, [inputState])

    if (authStore.status === 'loading') {
        return <Loader/>
    }

    return (
        <>
        <form 
            className={`${styles.form} ${colorTheme === 'dark' ? styles.formDark : ''}`}
            onSubmit={handleSubmitForm}    
        >
        <div className={styles.toggleTheme}>
            <ToggleTheme/>
        </div>
            <legend className={styles.legend}>
                Авторизация
            </legend>
            <fieldset
                className={styles.fieldset}
            >
                <div className={styles.inputWrapper}>
                    <label 
                        className={styles.label}
                        htmlFor="login"
                    >Логин
                    </label>
                    <input 
                        className={styles.input}
                        type="text"
                        placeholder="Введите имя пользователя"
                        id="login"
                        name="login"
                        value={inputState.login}
                        onChange={handleInputOnChange}
                        autoComplete="username"
                    />
                    <ErrorMessage 
                        message={errors.login}
                        colorTheme={colorTheme}
                    />
                </div>

                <div className={styles.inputWrapper}>
                    <label 
                        className={styles.label}
                        htmlFor="password"
                    >Пароль
                    </label>
                    <input 
                        className={styles.input}
                        type="password"
                        placeholder="Введите пароль"
                        id="password"
                        name="password"
                        value={inputState.password}
                        onChange={handleInputOnChange}
                        autoComplete="current-password"                    
                    />
                    <ErrorMessage 
                        message={errors.password}
                        colorTheme={colorTheme}
                    />
                </div>
                <Button
                    className={styles.submitButton}
                    type="submit"
                    variant="default"
                >Войти
                </Button>
            </fieldset>
        </form>
        <ToastContainer 
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={true}
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover
            theme="dark"
        />
        </>
    )
})

LoginForm.displayName = "LoginForm"

const ErrorMessage = ({
    message,
    colorTheme
} : {
    message: string
    colorTheme: ColorScheme
}) => {
    return (
        <div 
            className={`${styles.error} ${colorTheme === 'dark' ? styles.errorDark : ''}`}
        >{message}
        </div>
    )
}