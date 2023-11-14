import React, { ReactNode } from "react";
import { AppContext, appState } from "../../store/context";
import makeInspectable from 'mobx-devtools-mst';

makeInspectable(appState)

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
// @ts-ignore
window.appState = appState