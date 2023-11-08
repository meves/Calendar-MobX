import React, { useCallback, useContext, useEffect } from "react";
import styles from './index.module.scss'
import classNames from "classnames";
import { AppContext } from "../../../../store-mobx/context";
import { Loader } from "../../../shared/Loader/Loader";
import { observer } from "mobx-react-lite";
import { useMutation } from "@tanstack/react-query";
import { taskApi } from "../../../../rest-api/task-api";
import { UpdateTask as Updated } from "../../../../store/types";

export const UpdateTask = observer(() => {
    
    const { 
        modalState: { setModalClose },
        taskState: { 
            displayedTask, currentTask, draggableTask, 
            resetCurrentTask, updateTaskAction, updateTask 
        }
    } = useContext(AppContext)

    const { mutate, isPending, isError } = useMutation({
        mutationFn: ({ id, task }: Updated) => taskApi.updateTask({id, task})
    })

    const handleCancelUpdateOnClick = useCallback(() => {
        resetCurrentTask()
        setModalClose('submit-update')
    }, [])

    const handleUpdateTaskOnClick = useCallback(async () => {
        if (displayedTask && currentTask) {
            const { name, description, date, type } = currentTask

            const updatedTask = {
                id: displayedTask.id as number,
                task: {
                    name,
                    description,
                    date,
                    type,
                    tags: []
                }
            }
            mutate(updatedTask)
            updateTaskAction({...updatedTask.task, id: displayedTask.id}, !isError)}
            if (!isError) {
                setModalClose('new-task')
            }
            setModalClose('submit-update')
    }, [displayedTask, currentTask, isError])

    useEffect(() => {
        if (draggableTask) {
            updateTask({ ...draggableTask, id: draggableTask.id as number })
        }
    }, [draggableTask])

    if (isPending) return <Loader/>

    return (
        <div className={styles.wrapper}>
            <h2 
                className={styles.title}
            >Подтвердите обновление задачи
            </h2>
            <div className={styles.buttons}>
                <button
                    className={classNames(styles.button, styles.cancel)}
                    onClick={handleCancelUpdateOnClick}
                >Отмена
                </button>
                <button
                    className={classNames(styles.button, styles.create)}
                    onClick={handleUpdateTaskOnClick}
                >Обновить
                </button>
            </div>
        </div>
    )
})

UpdateTask.displayName = "UpdateTask"