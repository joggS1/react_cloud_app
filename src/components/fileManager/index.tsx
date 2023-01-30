import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { api } from '../../services/authService'
import {
  popFromDirectoryStack,
  selectСurrentDirectory,
} from '../../services/fileSlice'
import { toggleModal } from '../../services/uiSlice'

import { Button } from '../button'
import { Modal } from '../modal'
import { FileList } from './fileList'
import styles from './fileManager.module.css'

export const FileManager: React.FC = () => {
  const dispatch = useDispatch()
  const currentDirrectory = useSelector(selectСurrentDirectory)
  const [uploadFiles] = api.useUploadFileMutation()
  const { refetch } = api.useGetFilesQuery(currentDirrectory)
  useEffect(() => {
    refetch()
  }, [currentDirrectory, refetch])
  const returnHandler = async () => {
    dispatch(popFromDirectoryStack())
  }
  const handleToggleModal = () => {
    dispatch(toggleModal())
  }
  const uploadFilesHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = [...event.target.files]
      files.forEach((file) => {
        const formData = new FormData()
        formData.append('file', file)
        if (currentDirrectory) {
          formData.append('parentDirectory', currentDirrectory)
        }
        uploadFiles(formData)
      })
    }
  }
  return (
    <div className={styles.file_manager}>
      <div className={styles.file_manager_btns_container}>
        <Button color="primary" onClick={returnHandler}>
          Back
        </Button>
        <Button color="primary" onClick={handleToggleModal}>
          Create Folder
        </Button>
        <div className={styles.file_manager_input_container}>
          <label
            className={styles.file_manager_uplouad_input_label}
            htmlFor="fileInput"
          >
            Upload Files
          </label>
          <input
            onChange={uploadFilesHandler}
            className={styles.file_manager_uplouad_input}
            type="file"
            multiple={true}
            id="fileInput"
          />
        </div>
      </div>
      <hr className={styles.file_manager_hr} />
      <FileList />
      <Modal />
    </div>
  )
}
