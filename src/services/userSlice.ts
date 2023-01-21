import { createSlice } from "@reduxjs/toolkit"
import { api } from "./authService"
import { RootState } from "../store"


const slice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, isAuthenticated: false, message: null } as AuthState,
    reducers: {
      logout: (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
      },
    },
    extraReducers: (builder) => {
      builder.addMatcher(
        api.endpoints.authUser.matchFulfilled,
        (state, { payload }) => {
          state.message = payload.message
          state.user = payload.user
          state.token = payload.JWT
          state.isAuthenticated = true
        },
      )
    },
  })

export default slice.reducer
export const { logout } = slice.actions
export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated