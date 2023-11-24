import React, { ReactNode, useCallback, useContext, useEffect } from "react";
import { ColorScheme, ColorSchemeProvider, MantineProvider, rem } from "@mantine/core";
import { useLocalStorage, useHotkeys } from '@mantine/hooks' 
import { rootStore } from "../../store/root-store";

export const AppStyles = ({
    children
} : {
    children: ReactNode
}) => {
    const { setColorTheme } = rootStore.uiStore

    const [colorSheme, setColorSheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-sheme',
        defaultValue: 'dark',
        getInitialValueInEffect: true
    })

    useEffect(() => {
        setColorTheme(colorSheme)
    }, [colorSheme])

    const toggleColorScheme = useCallback((value?: ColorScheme) => {
        setColorSheme(value || (colorSheme === 'dark' ? 'light' : 'dark'))
    }, [colorSheme, setColorSheme])

    useHotkeys([['mod+J', () => toggleColorScheme()]])

    return (
        <ColorSchemeProvider colorScheme={colorSheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                    withGlobalStyles withNormalizeCSS
                    theme={{
                        colorScheme: colorSheme,
                        fontFamily: 'Roboto, sans-serif',
                        colors: {
                            dark: [
                                '#d5d7e0', // шрифт
                                '#bfacb2', // 
                                '#8c8fa3', // 
                                '#666980', // 
                                '#4d4f66', // 
                                '#34354a', // 
                                '#2b2c3d', // 
                                '#1d1e30', // 
                                '#0c0d21', // 
                                '#01010a', // 
                            ]
                        },
                        defaultRadius: 8,
                        cursorType: 'default',
                        focusRingStyles: {
                            resetStyles: () => ({outline: 'none'}),
                            inputStyles: (theme) => ({outline: `${rem(2)} solid ${theme.colors[0]}`})
                        }
                    }}
                >
                    { children }
            </MantineProvider>
        </ColorSchemeProvider>
    )
}