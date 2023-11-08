import React, { useCallback, useContext, useEffect } from "react";
import styles from './index.module.scss'
import classNames from "classnames";
import { Task } from "../../../../rest-api/types";
import { Loader } from "../../../shared//Loader/Loader";
import { AppContext } from "../../../../store-mobx/context";
import { useMutation } from "@tanstack/react-query";
import { taskApi } from "../../../../rest-api/task-api";
import { observer } from "mobx-react-lite";

export const CreateTask = observer(() => {
    const { 
        modalState: { setModalClose },
        taskState: { currentTask, createTaskAction }
    } = useContext(AppContext)

    const { mutate, isError, isPending, data } = useMutation({
        mutationFn: async (currentTask: Task) => taskApi.createTask(currentTask)
    })

    const handleCancelOnClick = useCallback(() => {
        setModalClose('submit-create')
    }, [])

    const handleCreateOnClick = useCallback(async () => {
        if (currentTask) {            
            mutate(currentTask)
        }
    }, [currentTask])

    useEffect(() => {
        if (currentTask) {
            createTaskAction({...currentTask, id: data}, !isError)
            if (!isError) {
                setModalClose('new-task')
            }
            setModalClose('submit-create')
        }
    }, [data])

    if (isPending) return <Loader/>

    return (
        <div className={styles.wrapper}>
            <h2 
                className={styles.title}
            >Подтвердите создание новой задачи
            </h2>
            <p>{}</p>
            <div className={styles.buttons}>
                <button
                    className={classNames(styles.button, styles.cancel)}
                    onClick={handleCancelOnClick}
                    type="button"
                >Отмена
                </button>
                <button
                    className={classNames(styles.button, styles.create)}
                    onClick={handleCreateOnClick}
                    type="button"
                >Создать
                </button>
            </div>
        </div>
    )
})

CreateTask.displayName = "CreateTask"