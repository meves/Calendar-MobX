import { Task } from "../rest-api/types"
import { modalState } from "../store-mobx/modal-store"

export type Dates = {startDate: string, endDate: string}

export type UpdatedTask = {
    id: number
    task: Task
}

export type Draggable = {
    task: Task
    date: string
}

export type Sorting = 'importance' | 'date'

export type Status = 'init' | 'loading' | 'success' | 'error'

export type ModalTypes = keyof typeof modalState.modals