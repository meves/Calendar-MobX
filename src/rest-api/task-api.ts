import { Task, TasksData } from "./types"
import { Dates, UpdatedTask } from "../store/types"
import { instance } from './index'

export const taskApi = {
    async getTasks({ startDate, endDate }: Dates) {
        try {
            const response = await instance.get<TasksData>(
                `tasks/?start_date=${startDate}&end_date=${endDate}`)
            return response.data
        } catch (error: any) {
            throw new Error(error.response)
        }        
    },
    async getTaskById(id: number) {
        try {
            const response = await instance.get<Task>(`tasks/${id}`)
            return response.data
        } catch (error: any) {
            throw new Error(error.response)
        }
    },
    async createTask(task: Task) {
        try {
            const response = await instance.post<number>(`tasks`, task)
            return response.data
        } catch (error: any) {
            throw new Error(error.response)
        }
    },
    async updateTask({ id, task }: UpdatedTask) {
        try {
            const response = await instance.put<Task>(`tasks/${id}`, task)
            return response.data
        } catch (error: any) {
            throw new Error(error.response)
        }
    },
    async deleteTask(id: number) {
        try {
            const response = await instance.delete<string>(`tasks/${id}`)
            return response.data
        } catch (error: any) {
            throw new Error(error.response)
        }
    }
}