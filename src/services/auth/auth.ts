import { Login, SignUp, SignUpResponse, User } from './types.ts'

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
      login: builder.mutation<{ accessToken: string }, Login>({
        query: params => ({
          url: `v1/auth/login`,
          method: 'POST',
          body: params,
        }),
      }),

      signUp: builder.mutation<SignUpResponse, SignUp>({
        query: params => ({
          url: 'v1/auth/sign-up',
          method: 'POST',
          body: params,
        }),
      }),
    }
  },
})

export const { useLoginMutation, useSignUpMutation, useGetMeQuery } = authApi
