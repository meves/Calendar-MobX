import React, { Dispatch, SetStateAction, useCallback, useContext } from "react";
import styles from './index.module.scss'
import classNames from "classnames";
import { dayDuration } from "../../utils/constants";
import { Diapason } from "../../utils/types";
import { getStartEndDates } from "../../utils/getStartEndDates";
import { Button } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { rootStore } from "../../../store/root-store";

export const ButtonsBlock = observer(({
    startDate,
    setDates
} : {
    startDate: string
    setDates: Dispatch<SetStateAction<Diapason>>
}) => {
    const { setModalOpen } = rootStore.modalStore
    const { resetDisplayedTask } = rootStore.taskStore
    const { colorTheme } = rootStore.uiStore

    const handleSetPrevDateOnclick = useCallback(() => {
        const prevStartDate = new Date(new Date(startDate).getTime() - dayDuration*6)
        const { startDate: start, endDate: end } = getStartEndDates(prevStartDate)
        setDates({ startDate: start, endDate: end }) 
    }, [startDate])

    const handleSetNextDateOnclick = useCallback(() => {
        const nextStartDate = new Date(new Date(startDate).getTime() + dayDuration*7)        
        const { startDate: start, endDate: end } = getStartEndDates(nextStartDate)
        setDates({ startDate: start, endDate: end }) 
    }, [startDate])

    const handleSetTodayOnClick = useCallback(() => {
        const { startDate, endDate } = getStartEndDates(new Date())
        setDates({ startDate, endDate })
    }, [])

    const handleAddNewTaskOnClick = useCallback(() => {
        resetDisplayedTask()
        setModalOpen('new-task')
    }, [])

    return (
        <div  className={styles.wrapper}>
            <Button.Group 
                className={styles.btnGroup}
            >
                <button
                    className={`${styles.button} ${styles.arrow} ${colorTheme === 'dark' ? styles.dark : ''}`}
                    onClick={handleSetPrevDateOnclick}
                >{`<`}
                </button>
                
                <Button
                    className={`${styles.button} ${styles.today} ${colorTheme === 'dark' ? styles.dark : ''}`}
                    onClick={handleSetTodayOnClick}
                    variant="filled"
                >{`Сегодня`}
                </Button>
                
                <Button
                    className={`${styles.button} ${styles.arrow} ${colorTheme === 'dark' ? styles.dark : ''}`}
                    onClick={handleSetNextDateOnclick}
                    variant="filled"
                >{`>`}
                </Button>
            </Button.Group>
                
            <Button
                className={classNames(styles.button, styles.addTask)}
                onClick={handleAddNewTaskOnClick}
                variant="filled"
            >{`Добавить задачу`}
            </Button>
        </div>
    )
})

ButtonsBlock.displayName = "ButtonsBlock"