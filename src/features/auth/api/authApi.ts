import type { LoginArgs, LoginResponse, MeResponse } from '@/features/auth/api/authApi.types.ts'
import { baseApi } from '@/app/api/baseApi.ts'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getMe: build.query<MeResponse, void>({
      query: () => `auth/me`,
    }),
    login: build.mutation<LoginResponse, LoginArgs>({
      query: payload => ({
        url: `auth/login`,
        method: 'post',
        body: { ...payload, accessTokenTTL: '1d' },
      }),
    }),
  }),
})

export const { useGetMeQuery, useLoginMutation } = authApi