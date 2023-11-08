import { makeAutoObservable } from "mobx"
import { Task } from "../rest-api/types"
import { Draggable } from "../store/types"
import { TASK_CREATED, TASK_DELETED, TASK_NOT_CREATED, TASK_NOT_DELETED, TASK_NOT_UPDATED, TASK_UPDATED } from "../store/constants"

class TaskState {
    tasks: Task[] = []
    currentTask: Task | null = null
    displayedTask: Task | null = null
    draggableTask: Task | null = null
    actionMessage: string = ''
    
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    setTasks(tasks: Task[]) {
        this.tasks = tasks        
    }

    addTask (task: Task) {
        this.tasks.push(task)
    }

    deleteTask(id: number) {
        this.tasks = this.tasks.filter(task => task.id !== id)
    }

    updateTask(task: Task) {
        this.tasks.forEach((item, idx, arr) => {
            if (item.id === task.id) arr[idx] = task
        })
    }

    setCurrentTask(task: Task) {
        this.currentTask = task
    }
    
    resetCurrentTask() {
        this.currentTask = null
    }

    setDisplayedTask(task: Task) {
        this.displayedTask = task
    }
    
    resetDisplayedTask() {
        this.displayedTask = null
    }

    setDraggableTask(task: Task) {
        const foundTask = this.tasks.find(item => item.id === task.id)
        if (foundTask) {
            this.draggableTask = foundTask
        }
    }
    
    resetDraggableTask() {
        this.draggableTask = null
    }
    
    changeDateAtDraggableTask({ task, date }: Draggable) {
        this.tasks.forEach(item => {
            if (item.id === task.id) {
                item.date = date
            }
        })
    }
    
    setActionMessage(message: string) {
        this.actionMessage = message
    }
    
    resetActionMessage() {
        this.actionMessage = ''
    }

    createTaskAction(task: Task, isSuccess: boolean) {
        if (isSuccess) {
            this.addTask(task)
            this.resetCurrentTask()
            this.resetDisplayedTask()
            this.setActionMessage(TASK_CREATED)
        }
        else {
            this.setActionMessage(TASK_NOT_CREATED)
        }
    }

    deleteTaskAction(id: number, isSuccess: boolean) {
            if (isSuccess) {
                this.deleteTask(id)
                this.setActionMessage(TASK_DELETED)
            } else {
                this.setActionMessage(TASK_NOT_DELETED)
            }
            this.resetDisplayedTask()
        }

    updateTaskAction(task: Task, isSuccess: boolean) {
            if (isSuccess) {
                this.updateTask(task)
                this.resetCurrentTask()
                this.resetDisplayedTask()
                this.setActionMessage(TASK_UPDATED)
            } else {
                this.setActionMessage(TASK_NOT_UPDATED)
            }            
        }

    updateDraggableTask(draggable: Draggable) {
        this.changeDateAtDraggableTask(draggable)
        this.setDraggableTask(draggable.task)
    }
}

export const taskState = new TaskState()