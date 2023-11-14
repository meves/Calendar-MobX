import React, { useCallback, useContext } from "react";
import { AppContext } from "../../../../store/context";
import { Loader } from "../../../shared/Loader/Loader";
import { observer } from "mobx-react-lite";
import { useMutation } from "@tanstack/react-query";
import { taskApi } from "../../../../rest-api/task-api";
import { UpdatedTask } from "../../../../store/types";
import { TaskAction } from "./TaskAction";

export const UpdateTask = observer(() => {
    
    const { 
        modalState: { setModalClose },
        taskState: { displayedTask, currentTask, resetCurrentTask, updateTaskAction }
    } = useContext(AppContext)

    const { mutate, isPending, isError } = useMutation({
        mutationFn: ({ id, task }: UpdatedTask) => taskApi.updateTask({id, task})
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
            setModalClose('submit-update')
            setModalClose('new-task')
            setModalClose('task-data')
    }, [displayedTask, currentTask])

    if (isPending) return <Loader/>

    return (
        <TaskAction
            type="update"
            cancelHandler={handleCancelUpdateOnClick}
            actionHandler={handleUpdateTaskOnClick}
        />
    )
})

UpdateTask.displayName = "UpdateTask"