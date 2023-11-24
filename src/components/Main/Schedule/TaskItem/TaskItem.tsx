import React, { DragEvent, MouseEvent, MutableRefObject, useCallback, useContext, useEffect, useState } from "react";
import styles from './index.module.scss'
import { Task } from "../../../../rest-api/types";
import { observer } from "mobx-react-lite";
import { ModalWrapper } from "../../../Modals";
import { ContextMenu } from "../../../Modals/Contents/ContextMenu/ContextMenu";
import { rootStore } from "../../../../store/root-store";

export const TaskItem = observer(({
    task,
    draggableTask
} : {
    task: Task
    draggableTask: MutableRefObject<Task | undefined>
}) => {
    const {
        taskStore: { setDisplayedTask, resetActionMessage },
        modalStore: { setModalOpen, setModalClose, modals: { "context-menu": isContextMenuOpen } },
        uiStore: { colorTheme }
    } = rootStore

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
    
    const handleContextMenuOpen = useCallback((event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.nativeEvent.stopImmediatePropagation()
        setModalOpen("context-menu")
        document.body.onclick = function(event: any) {
            setModalClose("context-menu")
            document.body.onclick = null
            document.body.oncontextmenu = null
        }
        document.body.oncontextmenu = function(event: any) {
            event.preventDefault()
        }
    }, [])

    return (
        <div className={styles.taskItmem}>
            <div 
                className={`${styles.wrapper} ${colorTheme === 'dark' ? styles.dark : ''}`}
                onClick={handleDisplyTaskOnClick}
                onContextMenu={handleContextMenuOpen}
                draggable="true"
                onDragStart={event => handleOnDragStart(event, task)}
            >
                <p className={styles.title}>{task.name}</p>
            </div>
                <ModalWrapper
                    isModalOpen={isContextMenuOpen}
                    isContextMenu
                >
                    <ContextMenu/>
                </ModalWrapper>
        </div>
    )
})

TaskItem.displayName = "TaskItem"