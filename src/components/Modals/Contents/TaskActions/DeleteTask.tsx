import React, { MouseEvent, useCallback, useContext } from "react";
import { AppContext } from "../../../../store/context";
import { useMutation } from "@tanstack/react-query";
import { taskApi } from "../../../../rest-api/task-api";
import { Loader } from "../../../shared/Loader/Loader";
import { observer } from "mobx-react-lite";
import { TaskAction } from "./TaskAction";

export const DeleteTask = observer(() => {
    const { 
        taskState: { displayedTask, deleteTaskAction },
        modalState: { setModalClose }
    } = useContext(AppContext)

    const { mutate, isError, isPending } = useMutation({
        mutationFn: (id: number) => taskApi.deleteTask(id)
    })

    const handleCancelDeleteOnClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.nativeEvent.stopImmediatePropagation()
        setModalClose('submit-delete')
        document.body.onclick = function() {
            setModalClose('task-data')
        }
    }, [])

    const handleDeleteTaskOnClick = useCallback(async () => {
        if (displayedTask?.id) {
            mutate(displayedTask.id)
            deleteTaskAction(displayedTask.id, !isError)
            setModalClose('submit-delete')
            setModalClose('task-data')
        }
    }, [displayedTask, displayedTask?.id])

    if (isPending) return <Loader/>

    return (
        <TaskAction
            type="delete"
            cancelHandler={handleCancelDeleteOnClick}
            actionHandler={handleDeleteTaskOnClick}
        />
    )
})

DeleteTask.displayName = "DeleteTask"