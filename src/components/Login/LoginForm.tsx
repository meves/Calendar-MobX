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
import { AppContext } from "../../store-mobx/context";

const initialState = { login: '', password: '' }

export const LoginForm = observer(() => {
    const navigate = useNavigate()

    const authState = useContext(AppContext).authState

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
        
        authState.login(inputState)
            .then(error => {
                authState.error ? (notify(authState.error)) : navigate('/')
                authState.error  = ''
            })
            .catch(error => {
                navigate('/error')
            })
    }, [inputState])

    if (authState.status === 'loading') {
        return <Loader/>
    }

    return (
        <>
        <form 
            className={styles.form}
            onSubmit={handleSubmitForm}    
        >
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
                    <div className={styles.error}>{errors.login}</div>
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
                    <div className={styles.error}>{errors.password}</div>
                </div>
                <button
                    className={styles.submitButton}
                    type="submit"
                >Войти
                </button>
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