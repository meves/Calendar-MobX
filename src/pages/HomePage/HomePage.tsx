import React, { useContext } from "react";
import { Main } from "../../components/Main/Main";
import styles from './index.module.scss'
import { Header } from "../../components/Header/Header";
import { 
    CreateTask, DeleteTask, UpdateTask, DisplayTaskData, 
    ModalWrapper, AddNewtask 
} from "../../components/Modals/";
import { observer } from "mobx-react-lite";
import { AppContext } from "../../store-mobx/context";

export const HomePage = observer(() => {
    const {  
            "new-task": isNewTaskModalOpen,
            "submit-create": isCreationModalOpen,
            "submit-update": isUpdatingModalOpen,
            "submit-delete": isDeletionModalOpen,
            "task-data": isTaskDataModalOpen            
        
    } = useContext(AppContext).modalState.modals

    return (
        <>
        <section className={styles.pageWrapper}>
            <div className={styles.homeContainer}>
                <Header/>
                <Main/>
            </div>
        </section>
        
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

HomePage.displayName = "HomePage"