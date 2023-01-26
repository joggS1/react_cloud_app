import React from "react";
import { FilesType } from "../../../../types/filesType";
import styles from './fileNode.module.css'
import folderIcon from '../../../../assets/img/folder.svg'
import fileIcon from '../../../../assets/img/file.svg'
import { useDispatch } from "react-redux";
import { selectСurrentDirectory, setCurrentDirectory, pushToDirectoryStack } from "../../../../services/fileSlice";
import { useSelector } from "react-redux";
import { api } from "../../../../services/authService";
import formatSize from "../../../../utils/formatSize";


interface FileNodeProps {
    file: FilesType
}

export const FileNode : React.FC<FileNodeProps> = ({file}) => {
    const dispath = useDispatch()
    const currentDirrectory = useSelector(selectСurrentDirectory)
    const{refetch} = api.useGetFilesQuery(currentDirrectory)
    const openHandler = async () =>{
        if(currentDirrectory){
            dispath(pushToDirectoryStack(currentDirrectory))
        }
        await dispath(setCurrentDirectory(file._id))
        refetch()
    }

    return (
        <div className={styles.file_node} onClick={() => file.type === 'dir' ? openHandler() : null}>
            <img src={file.type === 'dir' ? folderIcon : fileIcon} alt="file icon" className={styles.file_node_icon} loading="lazy"/>
            <div className={styles.file_node_name}>{  file.name}</div>
            <div className={styles.file_node_size}>{formatSize(file.size)}</div>
            <div className={styles.file_node_date}>{file.date}</div>
        </div>
    )
}