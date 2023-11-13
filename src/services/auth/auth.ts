import {
  EditProfileParams,
  EditProfileResponse,
  Login,
  RecoverPassword,
  ResendEmailVerification,
  ResetPassword,
  SignUp,
  SignUpResponse,
  User,
} from './types.ts'

import { baseApi } from '@/services/base-api.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getMe: builder.query<User, void>({
        query: () => ({
          url: `v1/auth/me`,
        }),
      }),
      updateProfile: builder.mutation<EditProfileResponse, EditProfileParams>({
        query: params => ({
          url: 'v1/auth/me',
          method: 'PATCH',
          body: params,
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
      verifyEmail: builder.mutation<any, { code?: string }>({
        query: code => ({
          url: 'v1/auth/verify-email',
          method: 'POST',
          body: code ?? {},
        }),
      }),
      resendEmail: builder.mutation<any, ResendEmailVerification>({
        query: params => ({
          url: 'v1/auth/resend-verification-email',
          method: 'POST',
          body: params,
        }),
      }),
      logout: builder.mutation({
        query: () => ({
          url: 'v1/auth/logout',
          method: 'POST',
        }),
      }),
      refreshToken: builder.mutation({
        query: () => ({
          url: 'v1/auth/refresh-token',
          method: 'POST',
        }),
      }),
      recoverPassword: builder.mutation<any, RecoverPassword>({
        query: params => ({
          url: 'v1/auth/recover-password',
          method: 'POST',
          body: params,
        }),
      }),
      resetPasswor: builder.mutation<any, ResetPassword>({
        query: params => ({
          url: `v1/auth/reset-password/${params.token}`,
          method: 'POST',
          body: params,
        }),
      }),
    }
  },
})

export const { useLoginMutation, useSignUpMutation, useGetMeQuery, useUpdateProfileMutation } =
  authApi
