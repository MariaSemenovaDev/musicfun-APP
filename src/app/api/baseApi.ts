import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/app/api/baseQueryWithReauth.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Playlist', 'Auth'],
  endpoints: () => ({}),
  baseQuery: baseQueryWithReauth,
  skipSchemaValidation: process.env.NODE_ENV === 'production',
})