import React, { ReactNode } from "react";
import { AppContext, appState } from "../store-mobx/context";


export const AppProvider = ({
    children
} : {
    children: ReactNode
}) => {
    return (
        <AppContext.Provider value={appState}>
            {children}
        </AppContext.Provider>
    )
}