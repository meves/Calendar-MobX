import { ColorScheme } from "@mantine/core"
import { makeAutoObservable } from "mobx"

class UIState {
    colorTheme: ColorScheme

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    setColorTheme(colorScheme: ColorScheme) {
        this.colorTheme = colorScheme
    }
}

export const uiState = new UIState()