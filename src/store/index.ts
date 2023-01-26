
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/authService";
import authReducer from '../services/userSlice'
import fileReducer from '../services/fileSlice'
import uiReducer from '../services/uiSlice'


export const store = configureStore({
    reducer: {
        [api.reducerPath] : api.reducer,
        auth: authReducer,
        files: fileReducer,
        UI: uiReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})



export type RootState = ReturnType<typeof store.getState>

