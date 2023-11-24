import React from "react";
import { Main } from "../../components/Main/Main";
import styles from './index.module.scss'
import { 
    CreateTask, DeleteTask, UpdateTask, DisplayTaskData, 
    ModalWrapper, AddNewtask 
} from "../../components/Modals/";
import { observer } from "mobx-react-lite";
import { Layout } from "../../components/Layout/Layout";
import { rootStore } from "../../store/root-store";

export const HomePage = () => {    
    return (
        <>
            <Layout>
                <section className={styles.pageWrapper}>
                    <div className={styles.homeContainer}>
                        <Main/>
                    </div>
                </section>
            </Layout>
            <Modals/>
        </>
    )
}

HomePage.displayName = "HomePage"

const Modals = observer(() => {
    const {  
        "new-task": isNewTaskModalOpen,
        "submit-create": isCreationModalOpen,
        "submit-update": isUpdatingModalOpen,
        "submit-delete": isDeletionModalOpen,
        "task-data": isTaskDataModalOpen
    
    } = rootStore.modalStore.modals

    return (
        <>
            {isNewTaskModalOpen ? <ModalWrapper
                isModalOpen={isNewTaskModalOpen}
            >
                <AddNewtask/>
            </ModalWrapper> : null}

            <ModalWrapper
                isModalOpen={isCreationModalOpen}
            >
                <CreateTask/>
            </ModalWrapper>

            <ModalWrapper
                isModalOpen={isUpdatingModalOpen}
            >
                <UpdateTask/>
            </ModalWrapper>

            <ModalWrapper
                isModalOpen={isDeletionModalOpen}
            >
                <DeleteTask/>
            </ModalWrapper>

            <ModalWrapper
                isModalOpen={isTaskDataModalOpen}
            >
                <DisplayTaskData/>
            </ModalWrapper>            
        </>
    )
})