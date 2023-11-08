import React, { ReactNode } from "react"
import { useModal } from "../useModal"
import { createPortal } from "react-dom"
import styles from './index.module.scss'

export const ModalWrapper = ({
    children,
    isModalOpen
} : {
    children: ReactNode
    isModalOpen: boolean
}) => {
    const {domElement} = useModal(isModalOpen)

    return (
        createPortal(
            <div 
                className={styles.modal}
            >
                {children}
            </div>,
            domElement
        )
    )
}