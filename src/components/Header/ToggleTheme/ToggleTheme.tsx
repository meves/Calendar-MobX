import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import React from "react";

export const ToggleTheme = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()

    const dark = colorScheme === 'dark'

    return (
        <ActionIcon
            variant="filled"
            color={dark ? 'yellow': 'blue'}
            onClick={() => toggleColorScheme()}
            title="переключить цветовую схему ctrl+J"
        >
            {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
        </ActionIcon>
    )
}