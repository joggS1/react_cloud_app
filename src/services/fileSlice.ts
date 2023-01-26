import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { FileState } from "../types/filesType";
import { api } from "./authService";


const fileSlice = createSlice({
    name: 'files',
    initialState: {files: [], currentDirectory: null, directoryStack: []} as FileState,
    reducers: {
        setCurrentDirectory: (state, action: PayloadAction<string | null >) => {

            state.currentDirectory = action.payload
        },
        pushToDirectoryStack: (state, action: PayloadAction<string > ) => {
            state.directoryStack.push(action.payload)
        },
        popFromDirectoryStack: (state) => {
           const dir = state.directoryStack.pop()
           state.currentDirectory = dir ? dir : null
        },
        deleteFilesWhenLogout: (state) => {
            state.files = []
            state.currentDirectory = null
            state.directoryStack = []
        }
    },
    extraReducers: (builder) => {
        builder
        .addMatcher(
            api.endpoints.getFiles.matchFulfilled,
            (state, {payload}) => {
                state.files = payload.files
            }
        )
        // .addMatcher(
        //     api.endpoints.createDirectory.matchFulfilled,
        //     (state, {payload}) => {
        //         state.files = [...state.files, payload.file]
        //     }
        // )
    }
})


export default fileSlice.reducer
export const {setCurrentDirectory, pushToDirectoryStack, popFromDirectoryStack, deleteFilesWhenLogout } = fileSlice.actions
export const selectUserFiles = (state: RootState) => state.files.files
export const selectСurrentDirectory = (state: RootState) => state.files.currentDirectory
export const selectDirectoryStack = (state: RootState) => state.files.directoryStack