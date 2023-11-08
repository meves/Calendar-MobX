import React, { useCallback, useContext } from "react";
import styles from './index.module.scss'
import classNames from "classnames";
import { AppContext } from "../../../../store-mobx/context";
import { useMutation } from "@tanstack/react-query";
import { taskApi } from "../../../../rest-api/task-api";
import { Loader } from "../../../shared/Loader/Loader";
import { observer } from "mobx-react-lite";

export const DeleteTask = observer(() => {
    const { 
        taskState: { displayedTask, resetDisplayedTask, deleteTaskAction },
        modalState: { setModalClose }
    } = useContext(AppContext)

    const { mutate, isError, isPending } = useMutation({
        mutationFn: (id: number) => taskApi.deleteTask(id)
    })

    const handleCancelDeleteOnClick = useCallback(() => {
        resetDisplayedTask()
        setModalClose('submit-delete')
    }, [])

    const handleDeleteTaskOnClick = useCallback(async () => {
        if (displayedTask?.id) {
            mutate(displayedTask.id)
            deleteTaskAction(displayedTask.id, !isError)
            setModalClose('submit-delete')
        }
    }, [displayedTask, displayedTask?.id])

    if (isPending) return <Loader/>

    return (
        <div className={styles.wrapper}>
            <h2 
                className={styles.title}
            >Подтвердите удаление задачи
            </h2>
            <div className={styles.buttons}>
                <button
                    className={classNames(styles.button, styles.cancel)}
                    onClick={handleCancelDeleteOnClick}
                    type="button"
                >Отмена
                </button>
                <button
                    className={classNames(styles.button, styles.create)}
                    onClick={handleDeleteTaskOnClick}
                    type="button"
                >Удалить
                </button>
            </div>
        </div>
    )
})

DeleteTask.displayName = "DeleteTask"