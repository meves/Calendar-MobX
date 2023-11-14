import React, { MouseEvent, useCallback, useContext } from "react";
import styles from './index.module.scss'
import { 
    displayTaskType, getDateToDisplayTask, getFullNameOfWeekDay 
} from "../../../utils";
import classNames from "classnames";
import { AppContext } from "../../../../store/context";
import { observer } from "mobx-react-lite";
import { Button } from "@mantine/core";

export const DisplayTaskData = observer(() => {
    const { 
        modalState: { setModalOpen, setModalClose },
        taskState: { displayedTask },
        uiState: { colorTheme }
    } = useContext(AppContext)
    
    const handleUpdateTaskOnClick = useCallback(() => {
        setModalOpen('new-task')
        document.body.onclick = null
    }, [])

    const handleDeleteTaskOnClick = useCallback(() => {
        setModalOpen('submit-delete')
        document.body.onclick = null
    }, [])

    const handleArticleOnClick = useCallback((
        event: MouseEvent<HTMLDivElement>
    ) => {
        event.nativeEvent.stopImmediatePropagation()
    }, [])

    const handleCloseTaskDataOnClick = useCallback(() => {
        setModalClose('task-data')
        document.body.onclick = null
    }, [])

    return (
        <article 
            className={`${styles.wrapper} ${colorTheme === 'dark' ? styles.dark : ''}`}
            onClick={handleArticleOnClick}  
        >
            <div 
                className={styles.cross}
                onClick={handleCloseTaskDataOnClick}
            >&#10008;
            </div>
            <h2>{displayedTask?.name}</h2>
            
            <section className={styles.taskData}>
                <div className={styles.row}>
                    <span>Описание</span>
                    <span>{displayedTask?.description}</span>
                </div>
                <div className={styles.row}>
                    <span>Дата</span>
                    <span>
                        {getDateToDisplayTask(displayedTask?.date)} ({getFullNameOfWeekDay(displayedTask?.date)})
                    </span>
                </div>
                <div className={styles.row}>
                    <span>Тип</span>
                    <span>
                        <span 
                            className={`${styles.type} ${displayedTask?.type === 1 ? styles.current : displayedTask?.type === 2 ? styles.important : styles.urgent}`}
                        >{displayTaskType(displayedTask?.type)}
                        </span>
                    </span>
                </div>
                <div className={styles.buttons}>
                    <Button
                        className={styles.button}
                        onClick={handleUpdateTaskOnClick}
                    >
                        Изменить задачу
                    </Button>
                    <Button
                        className={classNames(styles.button, styles.deleteButton)}
                        onClick={handleDeleteTaskOnClick}
                    >
                        Удалить задачу
                    </Button>
                </div>
            </section>                    
        </article>
    )
})

DisplayTaskData.displayName = "DisplayTaskData"