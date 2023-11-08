import React from "react";
import styles from './index.module.scss'
import { ReloadLink } from "../../components/shared/ReloadLink/ReloadLink";

const NotFoundPage = () => {
    
    return (
        <div className={styles.wrapper}>
            <h2>Страница, которую в ищете, не существует</h2>
            <ReloadLink path="/" />
        </div>
    )
}

export default NotFoundPage