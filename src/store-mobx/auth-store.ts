import { makeAutoObservable } from "mobx"
import { tokenIsAlive, deleteFromLocalStorage, getFromLocalStorage, saveToLocalStorage } from "../store/local-storage/utils"
import { LoginData, SavedToken } from "../rest-api/types"
import { TOKEN } from "../store/local-storage/constants"
import { authApi } from "../rest-api/auth-api"
import { StatusCodes } from "../rest-api/status-codes"
import { Status } from "../store/types"
import { getErrorMessage } from "./utils"

class AuthState {
    isAuth: boolean = false
    token: string = ''
    status: Status
    error: string
    
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    set IsAuth(isAuth: boolean) {
        this.isAuth = isAuth
    }

    set Token(token: string) {
        this.token = token
    }

    set Status(status: Status) {
        this.status = status
    }

    set Error(error: string) {
        this.error = error
    }

    initializeApp() {
        this.Status = 'loading'
        const token = getFromLocalStorage<SavedToken>(TOKEN)        
        if (token && tokenIsAlive(token.date)) {            
            this.Token = token.token
            this.IsAuth = true
        } else if (token && !tokenIsAlive(token.date)) {
            
            this.logout()
        }
        this.Status = 'init'
    }
    
    logout() {
        deleteFromLocalStorage(TOKEN)
        this.Token = ''
        this.IsAuth = false
        this.Status = 'init'
    }

    async login(loginData: LoginData) {
        this.Status = 'loading'
        const response = await authApi.login(loginData)
        if (response.status === StatusCodes.CREATED_201) {
            const { token, type } = response.data
            saveToLocalStorage(TOKEN, { token, type, date: new Date() } as SavedToken)
            this.Token = response.data.token
            this.IsAuth = true
            this.Status = 'success'
        } else {
            this.Status = 'error'
            this.Error = getErrorMessage(response.status)
        }
    }
}

export const authState = new AuthState()