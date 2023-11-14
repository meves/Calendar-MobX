import React from "react"
import styles from './index.module.scss'
import { UserIcon } from "./UserIcon/UserIcon"
import { ToggleTheme } from "./ToggleTheme/ToggleTheme"

export const Header = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Мои задачи</h1>
            <ToggleTheme/>
            <UserIcon 
                initials="иа"
            />
        </header>
    )
}