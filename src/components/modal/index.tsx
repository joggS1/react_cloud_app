import React, { useState } from 'react'
import styles from './modal.module.css'
import { Button } from '../button'
import { useSelector } from 'react-redux'
import { selectModalState, toggleModal } from '../../services/uiSlice'
import { useDispatch } from 'react-redux'
import { api } from '../../services/authService'
import { selectСurrentDirectory } from '../../services/fileSlice'
import { Input } from '../input'

export const Modal: React.FC = () => {
  const dispatch = useDispatch()
  const showModal = useSelector(selectModalState)
  const currentDirrectory = useSelector(selectСurrentDirectory)
  const [createDir] = api.useCreateDirectoryMutation()
  const [directoryName, setDirectoryName] = useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setDirectoryName((dirName) => (dirName = value))
  }

  const handleModalClick = () => {
    dispatch(toggleModal())
  }
  const createDirectory = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    createDir({
      name: directoryName,
      type: 'dir',
      parentDirectory: currentDirrectory ? currentDirrectory : '',
    })
    handleModalClick()
    setDirectoryName((dirName) => (dirName = ''))
  }
  return (
    <div
      className={
        (showModal ? styles.modal_active : styles.modal_disabled) +
        ' ' +
        styles.modal
      }
      onClick={handleModalClick}
    >
      <form
        className={styles.modal_content}
        onClick={(event) => event.stopPropagation()}
        onSubmit={createDirectory}
      >
        <div className={styles.modal_header}>
          <div className={styles.modal_header_title}>Create Folder</div>
          <div
            className={styles.modal_header_close_btn}
            onClick={handleModalClick}
          >
            X
          </div>
        </div>
        <Input
          id="folder_name"
          required
          label="Folder Name"
          onChange={onChange}
          placeholder="John"
          type="text"
        />
        <Button color="primary">Create</Button>
      </form>
    </div>
  )
}
