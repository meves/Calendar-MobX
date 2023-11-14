import { createContext } from "react";
import { authState } from "./auth-state";
import { modalState } from "./modal-state";
import { taskState } from "./task-state";
import { uiState } from "./ui-state";

export const appState = {
    authState,
    modalState,
    taskState,
    uiState
}

type AppState = typeof appState

export const AppContext 
    = createContext<AppState>(appState)
