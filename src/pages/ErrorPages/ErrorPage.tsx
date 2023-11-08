import React from "react";
import styles from './index.module.scss'
import { ReloadLink } from "../../components/shared/ReloadLink/ReloadLink";

const ErrorPage = () => {
    
    return (
        <div className={styles.wrapper}>
            <h2>Что-то пошло не так</h2>
            <ReloadLink path="/"/>
        </div>
    )
}

export default ErrorPage