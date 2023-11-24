import React from "react";
import { LoginForm } from "../../components/Login/LoginForm";
import styles from './index.module.scss'
import { observer } from "mobx-react-lite";
import { rootStore } from "../../store/root-store";

const LoginPage = observer(() => {
    const { colorTheme } = rootStore.uiStore

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