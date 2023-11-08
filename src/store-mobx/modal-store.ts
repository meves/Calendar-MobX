import { makeAutoObservable } from "mobx"
import { ModalTypes } from "../store/types"

class ModalState {    
    modals = {
        'new-task': false,
        'submit-create': false,
        'submit-update': false,
        'submit-delete': false,
        'task-data': false
    }

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
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

export const modalState = new ModalState()