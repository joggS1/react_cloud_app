//import {StackObject} from "./stack";

export type FilesType = {
    _id: string;
    name: string;
    type: string;
    size: number;
    accessLink: String;
    date: string;
    path: String;
    user: string;
    parentDirectory:string;
    childs: string[];
}

export type FileState = {
    files: FilesType[] | [],
    currentDirectory: string | null,
    directoryStack: string[]
}

export type CreateDirectoryMessage = {
    file: FilesType;
    date: string;
}
export type CreateDirectoryBody = {
    name: string,
    type: string,
    parentDirectory: string 
}
export type FileToUpload = {
    file: File,
    parentDirectory: string | null
}
