import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { observer } from "mobx-react-lite";
import { rootStore } from "../../../store/root-store";

export const Notify = observer(({
    delay=3000
} : {
    delay?: number
}) => {
    const { actionMessage, resetActionMessage } = rootStore.taskStore
    
    const notify = (actionMessage?: string) => {
        toast(actionMessage)
    }

    useEffect(() => {
        if (actionMessage) {
            notify(actionMessage)            
            const timerId = setTimeout(() => {
                resetActionMessage()
            }, delay)
            
            return () => {
                clearTimeout(timerId)
            }
        }
    }, [actionMessage])

    if (!actionMessage) {
        return null
    }

    return (
        <div style={{zIndex: '10'}}>
            <ToastContainer
                position="bottom-left"
                autoClose={delay}
                hideProgressBar={true}
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover
                theme="dark"
            />
        </div>
    )
})

Notify.displayName = "Notify"