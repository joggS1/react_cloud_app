
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'



export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/api',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        }
        return headers
      },
},
    ),
    endpoints: (builder) => ({
        createUser: builder.mutation<SignUpMessage, Omit<UserType, 'id' | 'diskSpace' | 'usedSpace' | 'files'>>({
            query: (user) => ({
                url: '/signup',
                method: 'POST',
                body: user
            })
        }),
        authUser: builder.mutation<SignInMessage, Omit<UserType, 'id' | 'diskSpace' | 'usedSpace' | 'files' | 'username'>>({
            query: (user) => ({
                url: '/signin',
                method: 'POST',
                body: user
            })
        })
    })
})