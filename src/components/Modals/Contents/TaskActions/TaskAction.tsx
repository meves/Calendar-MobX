import React, { MouseEvent, useContext } from "react";
import styles from './index.module.scss'
import classNames from "classnames";
import { Button } from "@mantine/core";
import { rootStore } from "../../../../store/root-store";

export const TaskAction = ({
    type,
    cancelHandler,
    actionHandler
} : {
    type: 'create' | 'update' | 'delete',
    cancelHandler: (event: MouseEvent<HTMLButtonElement>) => void
    actionHandler: () => Promise<void>
}) => {
    const { colorTheme } = rootStore.uiStore

    const action = type === 'create' ? 'создание новой' : type === 'update' ? 'обновление' : 'удаление'
    const btnAction = type === 'create' ? 'Создать' : type === 'update' ? 'Обновить' : 'Удалить'

    return (
        <div className={`${styles.wrapper} ${colorTheme === 'dark' ? styles.dark : ''}`}>
            <h2 
                className={styles.title}
            >Подтвердите {action} задачи
            </h2>
            <div className={styles.buttons}>
                <Button
                    className={classNames(styles.button, styles.cancel)}
                    onClick={cancelHandler}
                    variant="outline"
                >Отмена
                </Button>
                <Button
                    className={classNames(styles.button, styles.action)}
                    onClick={actionHandler}
                    variant="filled"
                >{btnAction}
                </Button>
            </div>
        </div>
    )
}