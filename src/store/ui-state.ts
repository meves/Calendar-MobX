import { ColorScheme } from "@mantine/core"
import { makeAutoObservable } from "mobx"
import { RootStore } from "./root-store"

export class UIStore {
    colorTheme: ColorScheme
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        makeAutoObservable(this, {}, {autoBind: true})
        this.rootStore = rootStore
    }

    setColorTheme(colorScheme: ColorScheme) {
        this.colorTheme = colorScheme
    }
}

//export const uiState = new UIState()