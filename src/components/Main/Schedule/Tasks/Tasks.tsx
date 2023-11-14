import React, { DragEvent, useCallback, useContext, useEffect, useRef } from "react";
import { generateDaysOfWeeks } from "../../../utils/generateDaysOfWeeks";
import { TaskItem } from "../TaskItem/TaskItem";
import { Task } from "../../../../rest-api/types";
import styles from './index.module.scss'
import { observer } from "mobx-react-lite";
import { useMutation } from "@tanstack/react-query";
import { UpdatedTask } from "../../../../store/types";
import { taskApi } from "../../../../rest-api/task-api";
import { Loader } from "../../../shared/Loader/Loader";
import { v4 as uuidv4 } from 'uuid'
import { AppContext } from "../../../../store/context";

export const Tasks = observer(({
    startDate,
    endDate,
    day
} : {
    startDate: string
    endDate: string
    day: number
}) => {
    const { tasks, updateTaskAction  } = useContext(AppContext).taskState

    const { mutate, isPending, isError} = useMutation({
        mutationFn: ({ id, task }: UpdatedTask) => taskApi.updateTask({id, task})
    })

    const draggableTask = useRef<Task>()

    useEffect(() => {
        if (!isPending && draggableTask.current) {
            updateTaskAction(draggableTask.current, !isError)
            draggableTask.current = undefined
        }
    }, [isPending, draggableTask.current])
    
    const handleDragStart = useCallback((event: DragEvent<HTMLDivElement>) => {
        const taskElement = event.currentTarget.childNodes[0] as HTMLDivElement
        event.currentTarget.draggable = false
    }, [])

    const handleDragEnd = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.currentTarget.draggable = true
        event.currentTarget.style.backgroundColor = '#fff'
    }, [])

    const handleOnDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.currentTarget.style.backgroundColor = '#a8f6ed78'
        console.log('over: ', draggableTask.current);
    }, [draggableTask])

    const handleOnDragEner = useCallback((event: DragEvent<HTMLDivElement>) => {   
        if (draggableTask.current) {
            event.currentTarget.style.backgroundColor = '#a8f6ed78'
        }
        console.log('enter: ', draggableTask.current);
    }, [])

    const handleOnDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.currentTarget.style.backgroundColor = '#fff'
    }, [])

    const handleOnDrop = useCallback(async (event: DragEvent<HTMLDivElement>, date: string) => {
        event.preventDefault()
        event.currentTarget.style.backgroundColor = '#fff'
        
        if (draggableTask.current?.id) {
            draggableTask.current = {...draggableTask.current, date}
            mutate({id: draggableTask.current.id as number, task: draggableTask.current})
        }
    }, [draggableTask.current])

    if (isPending) {
        return <Loader/>
    }

    return (
        <div 
            className={styles.tasks}
            draggable="true"
            onDragStart={handleDragStart}
            onDragEnter={handleOnDragEner}
            onDragOver={handleOnDragOver}
            onDragLeave={handleOnDragLeave}
            onDragEnd={handleDragEnd}
            onDrop={event => handleOnDrop(event, generateDaysOfWeeks(startDate, day))}
        >
            {tasks.map((item: Task) => (
                generateDaysOfWeeks(startDate, day) === item.date ?
                <TaskItem
                    key={uuidv4()}
                    task={item}
                    draggableTask={draggableTask}
                /> : null
            ))}
        </div>
    )
})

Tasks.displayName = "Tasks"