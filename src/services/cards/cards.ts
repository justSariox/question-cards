import { Card, EditCardRequestType } from './types.ts'

import { baseApi } from '@/services/base-api.ts'

export const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCard: builder.query<Card, { id: string }>({
        query: ({ id }) => ({
          url: `v1/cards/${id}`,
        }),
        providesTags: ['Cards'],
      }),
      editCard: builder.mutation<Card, EditCardRequestType>({
        query: ({ id, ...restProps }) => ({
          url: `v1/cards/${id}`,
          method: 'PATCH',
          body: restProps,
        }),
        invalidatesTags: ['Cards'],
      }),
      removeCard: builder.mutation<{}, { id: string }>({
        query: ({ id }) => ({
          url: `v1/cards/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const { useEditCardMutation, useRemoveCardMutation, useGetCardQuery } = cardsApi
