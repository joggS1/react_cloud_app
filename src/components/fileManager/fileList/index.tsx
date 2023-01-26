import React from "react";
import { useSelector } from "react-redux";
import { selectUserFiles } from "../../../services/fileSlice";
import styles from './fileList.module.css'
import { FileNode } from "./fileNode";


export const FileList : React.FC = () => {
   
    
  
    const files = useSelector(selectUserFiles)
    let fileNodes;
    if( files){
        fileNodes = files.map(file => <FileNode file={file} key={file._id}/>)
    }


    return (
        <div className={styles.file_list}>
            <div className={styles.file_list_header}>
                <div className={styles.file_list_header_name}>Name</div>
                <div className={styles.file_list_header_size}>Size</div>
                <div className={styles.file_list_header_date}>Date</div>
            </div>
            {fileNodes}
        </div>
    )
}