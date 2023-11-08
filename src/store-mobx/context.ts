import { createContext } from "react";
import { authState } from "./auth-store";
import { modalState } from "./modal-store";
import { taskState } from "./task-store";

export const appState = {
    authState,
    modalState,
    taskState
}

type AppState = typeof appState

export const AppContext 
    = createContext<AppState>(appState)
