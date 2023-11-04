import { baseApi } from '@/services/base-api.ts'
import {
  CardsParams,
  CreateDeckParamsType,
  DeckResponseType,
  DecksParams,
  DecksResponseType,
} from '@/services/decks/types.ts'

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
      createDeck: builder.mutation<any, CreateDeckParamsType>({
        query: ({ name, isPrivate }) => ({
          url: 'v1/decks',
          method: 'POST',
          body: { name, isPrivate },
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
      getDeckById: builder.query<DeckResponseType, { id: string }>({
        query: ({ id }) => ({
          url: `v1/decks/${id}`,
        }),
        providesTags: ['Decks'],
      }),
      getDeckCards: builder.query<any, CardsParams>({
        query: ({ id, ...restProps }) => ({
          url: `v1/decks/${id}/cards`,
          params: restProps,
        }),
        providesTags: ['Decks'],
      }),
      createCard: builder.mutation<any, { id: string; question: string; answer: string }>({
        query: ({ id, ...restProps }) => ({
          url: `v1/decks/${id}/cards`,
          method: 'POST',
          body: { question: restProps.question, answer: restProps.answer },
        }),
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useCreateDeckMutation,
  useRemoveDeckMutation,
  useGetDeckByIdQuery,
  useGetDeckCardsQuery,
  useCreateCardMutation,
} = decksApi
