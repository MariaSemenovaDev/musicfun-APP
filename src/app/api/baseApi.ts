import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { handleErrors } from '@/common/utils'
import { AUTH_KEYS } from '@/common/constants'
import { baseQueryWithReauth } from '@/app/api/baseQueryWithReauth.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Playlist', 'Auth'],
  endpoints: () => ({}),
  baseQuery: baseQueryWithReauth,
  skipSchemaValidation: process.env.NODE_ENV === 'production',
})