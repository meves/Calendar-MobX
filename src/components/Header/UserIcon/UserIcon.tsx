import React, { MouseEvent, useCallback, useContext, useEffect, useState } from "react";
import styles from './index.module.scss'
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { AppContext } from "../../../store/context";

export const UserIcon = observer(({
    initials
} : {
    initials: string
}) => {
    const navigate = useNavigate()

    const { 
        authState: { logout },
        uiState: { colorTheme }
    } = useContext(AppContext)
    
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

    const closeDropdownMenu = useCallback(function() {
        setDropdownIsOpen(false)
    }, [])

    useEffect(() => {
        if (dropdownIsOpen) {
            document.body.addEventListener('click', closeDropdownMenu)

            return () => {
                document.body.removeEventListener('click', closeDropdownMenu)
            }
        }
    }, [dropdownIsOpen, closeDropdownMenu])

    const handleDropdownOnClick = useCallback((event: MouseEvent<HTMLParagraphElement>) => {
        event.nativeEvent.stopImmediatePropagation()
        setDropdownIsOpen(prev => !prev)
    }, [])

    const handleLogoutOnClick = useCallback(async () => {
        logout()
        navigate('/login')
    }, [])

    return (
        <div className={`${styles.wrapper} ${colorTheme === 'dark' ? styles.dark : ''}`}>
            <p 
                onClick={handleDropdownOnClick}
                className={`${styles.initials} ${colorTheme === 'dark' ? styles.dark : ''}`}
            >{ initials }
            </p>
            <ul className={`${styles.list} ${dropdownIsOpen ? styles.visible : ''}`}>
                <li 
                    onClick={handleLogoutOnClick}
                    className={`${styles.item} ${colorTheme === 'dark' ? styles.dark : ''}`}
                >Выйти
                </li>
            </ul>
        </div>
    )
})

UserIcon.displayName = "UserIcon"