import React, { useContext, useEffect } from "react";
import { AppRouter } from "./AppRouter/AppRouter";
import styles from './App.module.scss'
import { Loader } from "../components/shared/Loader/Loader";
import { observer } from "mobx-react-lite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { rootStore } from "../store/root-store";

export const App = observer(() => {
    const { 
        isAuth, status, initializeApp 
    } = rootStore.authStore
    
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