import { createSlice } from "@reduxjs/toolkit"
import { api } from "./authService"
import { RootState } from "../store"


const slice = createSlice({
    name: 'auth',
    initialState: { user: null, isAuthenticated: false, message: null } as AuthState,
    reducers: {
      logout: (state) => {
        state.user = null
        localStorage.removeItem('token')
        state.isAuthenticated = false
      },
    },
    extraReducers: (builder) => {
      builder
      .addMatcher(
        api.endpoints.authUser.matchFulfilled,
        (state, { payload }) => {
          state.message = payload.message
          state.user = payload.user
          localStorage.setItem('token', payload.JWT)
          state.isAuthenticated = true
        },
      )
      .addMatcher(api.endpoints.authRequest.matchFulfilled,
        (state, {payload}) => {
          state.isAuthenticated = true
          state.user = payload.user
          localStorage.setItem('token', payload.JWT)
        }
      )

    },
  })

export default slice.reducer
export const { logout } = slice.actions
export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated