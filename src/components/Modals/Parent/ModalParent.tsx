import React, { ReactNode } from "react"
import { useModal } from "../useModal"
import { createPortal } from "react-dom"
import styles from './index.module.scss'

export const ModalWrapper = ({
    children,
    isModalOpen,
    isContextMenu
} : {
    children: ReactNode
    isModalOpen: boolean
    isContextMenu?: boolean
}) => {
    const {domElement} = useModal(isModalOpen)

    return (
        createPortal(
            <div 
                className={`${isContextMenu ? styles.context : styles.modal}`}
            >
                {children}
            </div>,
            domElement
        )
    )
}