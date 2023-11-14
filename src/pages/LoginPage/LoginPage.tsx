import React, { useContext } from "react";
import { LoginForm } from "../../components/Login/LoginForm";
import styles from './index.module.scss'
import { observer } from "mobx-react-lite";
import { AppContext } from "../../store/context";

const LoginPage = observer(() => {
    const { colorTheme } = useContext(AppContext).uiState

    return (
        <section 
            className={`${styles.pageWrapper} ${colorTheme === 'dark' ? styles.dark : ''}`}
        >
            <LoginForm />
        </section>
    )
})

LoginPage.displayName = "LoginPage"

export default LoginPage