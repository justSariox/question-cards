import { baseApi } from '@/services/base-api.ts'
import { DecksParams, DecksResponseType } from '@/services/decks/types.ts'

export const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponseType, DecksParams>({
        query: params => ({
          url: `v1/decks`,
          params: params ?? {},
        }),
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<any, { name: string }>({
        query: ({ name }) => ({
          url: 'v1/decks',
          method: 'POST',
          body: { name },
        }),
        invalidatesTags: ['Decks'],
      }),
      removeDeck: builder.mutation<any, { id: string }>({
        query: ({ id }) => ({
          url: `v1/decks/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const { useGetDecksQuery, useCreateDeckMutation, useRemoveDeckMutation } = decksApi
