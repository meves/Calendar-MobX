import { makeAutoObservable } from "mobx"
import { ModalTypes } from "./types"
import { RootStore } from "./root-store"

export class ModalStore {    
    modals = {
        'new-task': false,
        'submit-create': false,
        'submit-update': false,
        'submit-delete': false,
        'task-data': false,
        'context-menu': false
    }
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        makeAutoObservable(this, {}, {autoBind: true})
        this.rootStore = rootStore
    }

    setModalOpen(modalType: ModalTypes) {
        this.modals[modalType] = true
    }

    setModalClose(modalType: ModalTypes) {
        this.modals[modalType] = false
    }

    getModal(modalType: ModalTypes) {
        return this.modals[modalType]
    }
}

//export const modalState = new ModalState()