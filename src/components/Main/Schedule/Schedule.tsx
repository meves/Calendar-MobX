import React, { DragEvent, useCallback, useContext, useEffect, useRef } from "react";
import styles from './index.module.scss'
import { TaskItem } from "./TaskItem/TaskItem";
import { Loader } from "../../shared/Loader/Loader";
import { getDayMonthFormat } from "../../utils/getDayMonthFormat";
import { getNameOfDayOfTheWeek } from "../../utils/getNameOfDayOfTheWeek";
import { v4 as uuidv4 } from 'uuid'
import { generateDaysOfWeeks } from "../../utils/generateDaysOfWeeks";
import { Task } from "../../../rest-api/types";
import { isCurrentDate } from "../../utils/isCurrentDate";
import { Notify } from "../../shared/Notify/Notify";
import ErrorPage from "../../../pages/ErrorPages/ErrorPage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { taskApi } from "../../../rest-api/task-api";
import { Dates, UpdatedTask } from "../../../store/types";
import { observer } from "mobx-react-lite";
import { rootStore } from "../../../store/root-store";

export const Schedule = observer(({
    startDate,
    endDate,
    currentDate
} : {
    startDate: string
    endDate: string
    currentDate: Date
}) => {
    const { 
        taskStore: { tasks, setTasks, updateTaskAction },
        uiStore: { colorTheme }
    } = rootStore

    const { isPending: isPendingGetTasks, isError, data } = useQuery({
        queryKey: ['tasks', {startDate, endDate}], 
        queryFn: ({queryKey}) => taskApi.getTasks(queryKey[1] as Dates)
    })

    const { mutate, isPending: isPendingUpdate, isError: isErrorUpdate, data: resData } = useMutation({
        mutationFn: ({ id, task }: UpdatedTask) => taskApi.updateTask({id, task})
    })

    useEffect(() => {
        if (data) {
            setTasks(data.result)
        }        
    }, [data])

    const draggableTask = useRef<Task>()

    const handleDragStart = useCallback((event: DragEvent<HTMLDivElement>) => {
        const taskElement = event.currentTarget.childNodes[0] as HTMLDivElement
            event.currentTarget.draggable = false
    }, [])

    const handleDragEnd = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.currentTarget.draggable = true
        event.currentTarget.style.backgroundColor = colorTheme === 'dark' ? '#1d1e30' : '#fff'
    }, [colorTheme])

    const handleOnDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.currentTarget.style.backgroundColor = '#a8f6ed78'
    }, [draggableTask])

    const handleOnDragEner = useCallback((event: DragEvent<HTMLDivElement>) => {   
        if (draggableTask.current) {
            event.currentTarget.style.backgroundColor = '#a8f6ed78'
        }
    }, [])

    const handleOnDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.currentTarget.style.backgroundColor = colorTheme === 'dark' ? '#1d1e30' : '#fff'
    }, [colorTheme])

    const handleOnDrop = useCallback(async (event: DragEvent<HTMLDivElement>, date: string) => {
        event.preventDefault()
        event.currentTarget.style.backgroundColor = colorTheme === 'dark' ? '#1d1e30' : '#fff'
        if (draggableTask.current?.id && (draggableTask.current?.date !== date)) {
            draggableTask.current = {...draggableTask.current, date}
            mutate({id: draggableTask.current.id as number, task: draggableTask.current})
        }
    }, [draggableTask.current, colorTheme])
    
    useEffect(() => {
        if (!isPendingUpdate && draggableTask.current) {
            updateTaskAction(draggableTask.current, !isErrorUpdate)
            draggableTask.current = undefined
        }
    }, [isPendingUpdate, draggableTask.current])
    
    
    const days: number[] = []    
    for(let i = 0; i < 7; i++) {
        days.push(i)
    }    

    if (isPendingGetTasks || isPendingUpdate) {
        return <Loader/>
    }

    if (isError) {
        return <ErrorPage/>
    }
    
    return (
        <main className={styles.wrapper}>
            {days.map(day => (
                <section 
                    key={uuidv4()}
                    className={`${styles.column} ${isCurrentDate(currentDate, startDate, day) ? styles.currentDate : ''}`}
                >
                    <div 
                        className={styles.cell}
                    >
                        <span>{ getNameOfDayOfTheWeek(generateDaysOfWeeks(startDate, day)) }</span>
                        <span>{ getDayMonthFormat(generateDaysOfWeeks(startDate, day)) }</span>
                    </div>

                    <div 
                        className={styles.tasks}
                        draggable="true"
                        onDragOver={handleOnDragOver}
                        onDrop={event => handleOnDrop(event, generateDaysOfWeeks(startDate, day))}
                        onDragEnter={handleOnDragEner}
                        onDragLeave={handleOnDragLeave}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
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
                </section>
            ))}
            <Notify/>
        </main>
    )
    
})

Schedule.displayName = "Schedule"