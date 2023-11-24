import { AuthStore } from "./auth-state";
import { ModalStore } from "./modal-state";
import { TaskStore } from "./task-state";
import { UIStore } from "./ui-state";

export class RootStore {
    authStore: AuthStore
    modalStore: ModalStore
    taskStore: TaskStore
    uiStore: UIStore

    constructor() {
        this.authStore = new AuthStore(this)
        this.modalStore = new ModalStore(this)
        this.taskStore = new TaskStore(this)
        this.uiStore = new UIStore(this)
    }
}

export const rootStore = new RootStore()