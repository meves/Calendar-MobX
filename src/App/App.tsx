import React, { useContext, useEffect } from "react";
import { AppRouter } from "./Router";
import styles from './App.module.scss'
import { Loader } from "../components/shared/Loader/Loader";
import { observer } from "mobx-react-lite";
import { AppContext } from "../store-mobx/context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const App = observer(() => {
    const { 
        isAuth, status, initializeApp 
    } = useContext(AppContext).authState
    
    const queryClient = new QueryClient()

    useEffect(() => {
        initializeApp()
    }, [isAuth])

    if (status === 'loading') {
        return <Loader/>
    }

    return (
        <div className={styles.appContainer}>
            <QueryClientProvider client={queryClient}>
                <AppRouter />
            </QueryClientProvider>
        </div>
    )
})

App.displayName = "App"