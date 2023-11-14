import React, { 
    ChangeEvent, FormEvent, MouseEvent, useCallback, useContext, useEffect, useState 
} from "react";
import styles from './index.module.scss'
import { REQUIRED } from "../../../Login/libs/constants";
import { validate } from "../../../Login/libs/validators";
import { InputName } from "../../../Login/libs/types";
import { displayError } from "../../../Login/libs/displayError";
import classNames from "classnames";
import { TaskTypes } from "../../../Login/libs/enum";
import { AppContext } from "../../../../store/context";
import { observer } from "mobx-react-lite";
import { Button, NativeSelect } from "@mantine/core";
import { IconChevronDown } from '@tabler/icons-react';

const initialState = {name: '', description: '', date: '', type: ''}
const initialErrors = {name: '', description: '', date: '', type: ''}

const selectValues = {
    [TaskTypes.Current]: 1,
    [TaskTypes.Important]: 2,
    [TaskTypes.Urgent]: 3
}

const typeToString = {
    1: TaskTypes.Current,
    2: TaskTypes.Important,
    3: TaskTypes.Urgent
}

export const AddNewtask = observer(() => {
    
    const { 
        taskState: { displayedTask, setCurrentTask },
        modalState: { setModalClose, setModalOpen },
        uiState: { colorTheme }
    } = useContext(AppContext)
    
    const [errors, setErrors] = useState(initialErrors)

    const [inputState, setInputState] = useState(initialState)

    useEffect(() => {
        if (displayedTask) {
            const { name, description, date, type } = displayedTask
            setInputState({
                name,
                description: description ? description : '',
                date,
                type: String(type)
            })
        } else {
            setInputState(initialState)
        }        
    }, [displayedTask])

    const handleAddTaskNameOnChange = useCallback((
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        let { name, value: inputValue } = event.currentTarget
        const value: number | string = name === 'type' ? selectValues[inputValue] : inputValue
        
        setInputState(prev => ({...prev, [name]: value}))
        if (value) {
            setErrors(prev => ({...prev, [name]: ''}))
        } else if (!value && name !== 'description') {
            setErrors(prev => ({...prev, [name]: REQUIRED}))
        }
    }, [])

    const handleCloseFormOnClick = useCallback((event: MouseEvent) => {
        event.nativeEvent.stopImmediatePropagation()
        setErrors(initialErrors)
        setInputState(initialState)
        setModalClose('new-task')
        document.body.onclick = function() {
            setModalClose('task-data')
        }
    }, [initialErrors, initialState])
    
    const handleOnSubmitForm = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        for (let entry of Object.entries(inputState)) {
            const name = entry[0] as InputName
            const value = entry[1]
            
            if (!value && name !== 'description') {
                return setErrors(prev => ({...prev, [name]: REQUIRED}))
            }
            if (!validate(name, value)) {
                return setErrors(prev => ({...prev, [name]: displayError(name)}))
            }
        }
        setCurrentTask({
            name: inputState.name,
            description: inputState.description || null,
            date: inputState.date,
            type: +inputState.type,
            tags: []
        })
        
        displayedTask 
            ? setModalOpen('submit-update') 
            : setModalOpen('submit-create')
    }, [inputState])

    return (
        <div className={styles.wrapper}>
            <form 
                className={`${styles.form} ${colorTheme === 'dark' ? styles.dark : ''}`} 
                onSubmit={handleOnSubmitForm}
            >

                <fieldset className={styles.fieldset}>
                    <legend className={styles.legend}>{displayedTask ? 'Изменить ' : 'Создать '}задачу</legend>
                    
                    <div className={styles.inputWrapper}>
                        <label className={styles.label} htmlFor="name">Название задачи</label>
                        <input 
                            className={styles.input}
                            name="name"
                            id="name"
                            value={inputState.name}
                            onChange={handleAddTaskNameOnChange}
                            autoComplete="off"
                        />
                        <div className={styles.error}>{errors.name}</div>
                    </div>

                    <div className={styles.inputWrapper}>
                        <label className={styles.label} htmlFor="description">Описание задачи</label>
                        <textarea 
                            className={styles.textarea}
                            name="description" 
                            id="description" 
                            cols={30} 
                            rows={5}
                            wrap="hard"
                            value={inputState.description}
                            onChange={handleAddTaskNameOnChange}
                        />
                        <div className={styles.error}>{errors.description}</div>
                    </div>

                    <div className={styles.inputWrapper}>
                        <label className={styles.label} htmlFor="date">Выберите дату</label>
                        <input 
                            className={styles.input}
                            type="date"
                            name="date"
                            id="date"
                            value={inputState.date}
                            onChange={handleAddTaskNameOnChange}
                            autoComplete="off"
                        />
                        <div className={styles.error}>{errors.date}</div>
                    </div>

                    <div className={styles.inputWrapper}>
                        <label className={styles.label} htmlFor="type">Выберите тип</label>
                        <NativeSelect 
                            name="type" 
                            id="type"
                            value={typeToString[inputState.type]}
                            onChange={handleAddTaskNameOnChange}
                            data={["Выберите из списка", TaskTypes.Current, TaskTypes.Important, TaskTypes.Urgent]}
                            rightSection={<IconChevronDown size="1rem" />}
                            rightSectionWidth={40}
                            variant="default"
                            size="lg"
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '56px',
                                    border: (colorTheme === 'dark') ? 'none' : '1px solid #000',
                                    outline: 'none',
                                    borderRadius: '8px'
                                }
                            }}
                        />
                        <div className={styles.error}>{errors.type ?? errors.type}</div>
                    </div>

                    <div className={styles.buttons}>
                        <Button
                            className={classNames(styles.cancel, styles.button)}
                            onClick={handleCloseFormOnClick}
                            type="button"
                            variant="outline"
                        >Закрыть окно
                        </Button>
                        <Button
                            className={styles.button}
                            type="submit"
                            variant="filled"
                        >{displayedTask ? 'Изменить ' : 'Создать '}задачу
                        </Button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
})

AddNewtask.displayName = "AddNewTask"