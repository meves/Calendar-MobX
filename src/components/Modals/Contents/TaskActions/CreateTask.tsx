import React, { useCallback, useContext, useEffect } from "react";
import { Task } from "../../../../rest-api/types";
import { Loader } from "../../../shared//Loader/Loader";
import { AppContext } from "../../../../store/context";
import { useMutation } from "@tanstack/react-query";
import { taskApi } from "../../../../rest-api/task-api";
import { observer } from "mobx-react-lite";
import { TaskAction } from "./TaskAction";

export const CreateTask = observer(() => {
    const { 
        modalState: { setModalClose },
        taskState: { currentTask, createTaskAction }
    } = useContext(AppContext)

    const { mutate, isError, isPending, data } = useMutation({
        mutationFn: async (currentTask: Task) => taskApi.createTask(currentTask)
    })

    const handleCancelCreateOnClick = useCallback(() => {
        setModalClose('submit-create')
    }, [])

    const handleCreateTaskOnClick = useCallback(async () => {
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
        <TaskAction
            type="create"
            cancelHandler={handleCancelCreateOnClick}
            actionHandler={handleCreateTaskOnClick}
        />
    )
})

CreateTask.displayName = "CreateTask"