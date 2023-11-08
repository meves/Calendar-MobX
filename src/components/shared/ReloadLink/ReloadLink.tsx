import React from "react";
import { NavLink } from "react-router-dom";
import styles from './index.module.scss'

export const ReloadLink = ({
    path
} : {
    path: string
}) => {
    
    return (
        <NavLink 
            className={styles.reloadLink}
            to={path} 
            reloadDocument
        >Назад</NavLink>
    )
}