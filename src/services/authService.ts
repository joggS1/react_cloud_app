
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CreateDirectoryBody, CreateDirectoryMessage } from '../types/filesType'




export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['File'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/api',
    prepareHeaders: (headers) => {
        const token =  localStorage.getItem('token')
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
        }),
        authRequest: builder.query<AuthMeMessage, void>({
            query: () => ({
                url: '/authme',
               
            })
        }),
        getFiles: builder.query<GetFilesMessage, string | null>({
            query: (currentDirectory) => ({
                url: `/files/${currentDirectory ? `?parent=`+currentDirectory : ``}`,
                keepUnusedDataFor: 0.0001
            }),
            providesTags: ['File'],
        
        }),
        createDirectory: builder.mutation<CreateDirectoryMessage, CreateDirectoryBody>({
            query: (directory) => ({
                url: `/files`,
                method: 'POST',
                body: directory,
            }),
            invalidatesTags: ['File']
        }),
        uploadFile: builder.mutation<CreateDirectoryMessage, FormData>({
            query: (form) => ({
                url: '/files/upload',
                method: 'POST',
                body: form,
                
            }),
            invalidatesTags: ['File'],
        }),
    })
})