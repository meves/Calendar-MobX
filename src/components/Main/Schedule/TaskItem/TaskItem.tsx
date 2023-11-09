import React, { DragEvent, MouseEvent, MutableRefObject, useCallback, useContext } from "react";
import styles from './index.module.scss'
import { Task } from "../../../../rest-api/types";
import { observer } from "mobx-react-lite";
import { AppContext } from "../../../../store-mobx/context";

export const TaskItem = observer(({
    task,
    draggableTask
} : {
    task: Task
    draggableTask: MutableRefObject<Task | undefined>
}) => {
    const {
        taskState: { setDisplayedTask, resetActionMessage },
        modalState: { setModalOpen, setModalClose }
    } = useContext(AppContext)

    const handleDisplyTaskOnClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        resetActionMessage()
        setDisplayedTask(task)
        setModalOpen('task-data')
        document.body.onclick = function() {
            setModalClose('task-data')
        }
    }, [task])

    const handleOnDragStart = useCallback((event: DragEvent<HTMLDivElement>, task: Task) => {
        draggableTask.current = task
    }, [task])

    return (
        <div 
            className={styles.wrapper}
            onClick={handleDisplyTaskOnClick}
            draggable="true"
            onDragStart={event => handleOnDragStart(event, task)}
        >
            <p className={styles.title}>{task.name}</p>
        </div>
    )
})

TaskItem.displayName = "TaskItem"