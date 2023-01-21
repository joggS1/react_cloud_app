
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/authService";
import authReducer from '../services/userSlice'



export const store = configureStore({
    reducer: {
        [api.reducerPath] : api.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})



export type RootState = ReturnType<typeof store.getState>

