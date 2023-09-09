import { baseApi } from '@/services/base-api.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getMe: builder.query<User, void>({
        query: () => ({
          url: `v1/auth/me`,
          method: 'GET',
        }),
      }),
      login: builder.mutation<any, { email: string; password: string }>({
        query: params => ({
          url: `v1/auth/login`,
          method: 'POST',
          body: params,
        }),
      }),

      signUp: builder.mutation<any, { email: string; password: string }>({
        query: params => ({
          url: 'v1/auth/sign-up',
          method: 'POST',
          body: params,
        }),
      }),
    }
  },
})

export type User = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
}

export const { useLoginMutation, useSignUpMutation, useGetMeQuery } = authApi
