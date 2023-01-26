
import React, { useState } from "react";
import styles from './modal.module.css'
import { Button } from "../button";
import { useSelector } from "react-redux";
import { selectModalState, toggleModal } from "../../services/uiSlice";
import { useDispatch } from "react-redux";
import { api } from "../../services/authService";
import { selectСurrentDirectory } from "../../services/fileSlice";

export const Modal: React.FC = () => {
    const dispatch = useDispatch()
    const showModal = useSelector(selectModalState)
    const currentDirrectory = useSelector(selectСurrentDirectory)
    const [createDir] = api.useCreateDirectoryMutation()
    const [directoryName, setDirectoryName] = useState('')
    
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target
        setDirectoryName((dirName) => (dirName = value))
    }
    
    const handleModal = () =>{
        dispatch(toggleModal())
    }
    const createDirectory = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        createDir({name: directoryName, type: 'dir', parentDirectory: currentDirrectory ? currentDirrectory : ''})
        handleModal()
        setDirectoryName('')
    }
    return (
        <div className={(showModal ? styles.modal_active : styles.modal_disabled) + " " + styles.modal } onClick={handleModal}>
            <form className={styles.modal_content}  onClick={(event) => event.stopPropagation()}>
                <div className={styles.modal_header}>
                    <div className={styles.modal_header_title}>Create Folder</div>
                    <div className={styles.modal_header_close_btn} onClick={handleModal}>X</div>
                </div>
            <div className={styles.modal_input_container}>
               <label htmlFor="folder_name">
                <div className={styles.modal_input_name}>Folder Name</div>
                    <input className={styles.modal_input} value={directoryName} type="text" id="folder_name" name="folder_name" onChange={onChange} placeholder="John" required={true}/>
                </label>
            </div>
            <Button color="primary" onClick={(event) => createDirectory(event)} >Create</Button>
            </form>
        </div>
    )
}