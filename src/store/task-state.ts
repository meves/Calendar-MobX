import { action, flow, makeAutoObservable, makeObservable, override } from "mobx"
import { Task } from "../rest-api/types"
import { 
    TASK_CREATED, TASK_DELETED, TASK_NOT_CREATED, TASK_NOT_DELETED, TASK_NOT_UPDATED, TASK_UPDATED 
} from "./constants"
import { Dates } from "./types"
import { taskApi } from "../rest-api/task-api"
import { RootStore } from "./root-store"

export class TaskStore {
    tasks: Task[] = []
    currentTask: Task | null = null
    displayedTask: Task | null = null
    actionMessage: string = ''
    status: 'init' | 'pending' | 'error' | 'success' = 'init'
    rootStore: RootStore
    
    constructor(rootStore: RootStore) {
        makeAutoObservable(this, {}, {autoBind: true})
        this.rootStore = rootStore
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

    setActionMessage(message: string) {
        this.actionMessage = message
    }
    
    resetActionMessage() {
        this.actionMessage = ''
    }

    fetchTasks = flow(function* ({ startDate, endDate }: Dates) {
        this.status = 'pending'
        try {
            const data = yield taskApi.getTasks({startDate, endDate})            
            this.status = 'success'
            this.tasks = data.result
            this.setActionMessage("Задачи обновлены")
        } catch (error: any) {
            this.status = 'error'
            this.setActionMessage("Не удалось загрузить задачи")
        }
    })

    createTaskAction(task: Task, isSuccess: boolean) {
        if (isSuccess) {
            this.addTask(task)
            this.resetTaskAction(TASK_CREATED)
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
                this.resetTaskAction(TASK_UPDATED)
            } else {
                this.setActionMessage(TASK_NOT_UPDATED)
            }            
        }

    resetTaskAction(message: string) {        
        this.resetCurrentTask()
        this.resetDisplayedTask()
        this.setActionMessage(message)
    }
}

//export const taskState = new TaskState()