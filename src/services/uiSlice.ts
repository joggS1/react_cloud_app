import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
type uiState = {
    showModal: boolean
}

const uiSlice = createSlice({
    name: 'UI',
    initialState: {showModal: false} as uiState,
    reducers: {
        toggleModal: (state) => {
            state.showModal = !state.showModal
        }
    },
    extraReducers: (builder) => {
        
    }
})


export default uiSlice.reducer
export const { toggleModal } = uiSlice.actions
export const selectModalState = (state: RootState) => state.UI.showModal
