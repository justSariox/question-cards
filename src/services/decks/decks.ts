import { baseApi } from '@/services/base-api.ts'
import { CardsResponseType } from '@/services/cards/types.ts'
import {
  CardsParams,
  CreateCardParams,
  CreateCardResponse,
  CreateDeckParamsType,
  Deck,
  DecksParams,
  DecksResponseType,
  DeleteDeckResponseType,
  EditDeckParamsType,
  GetLearnCardParams,
  LearnCardResponse,
  PostGradeCardParams,
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
      createDeck: builder.mutation<Deck, CreateDeckParamsType>({
        query: ({ name, isPrivate }) => ({
          url: 'v1/decks',
          method: 'POST',
          body: { name, isPrivate },
        }),
        invalidatesTags: ['Decks'],
      }),
      editDeck: builder.mutation<Deck, EditDeckParamsType>({
        query: ({ id, ...restProps }) => ({
          url: `v1/decks/${id}`,
          method: 'PATCH',
          body: restProps,
        }),
        invalidatesTags: ['Decks'],
      }),
      removeDeck: builder.mutation<DeleteDeckResponseType, { id: string }>({
        query: ({ id }) => ({
          url: `v1/decks/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Decks'],
      }),
      getDeckById: builder.query<Deck, { id: string }>({
        query: ({ id }) => ({
          url: `v1/decks/${id}`,
        }),
        providesTags: ['Decks'],
      }),
      getDeckCards: builder.query<CardsResponseType, CardsParams>({
        query: ({ id, ...restProps }) => ({
          url: `v1/decks/${id}/cards`,
          params: restProps,
        }),
        providesTags: ['Decks'],
      }),
      createCard: builder.mutation<CreateCardResponse, CreateCardParams>({
        query: ({ id, ...restProps }) => ({
          url: `v1/decks/${id}/cards`,
          method: 'POST',
          body: restProps,
        }),
        invalidatesTags: ['Decks'],
      }),
      getCardForLearn: builder.query<LearnCardResponse, GetLearnCardParams>({
        query: ({ id, previousCardId }) => ({
          url: `v1/decks/${id}/learn`,
          params: previousCardId ?? {},
        }),
        providesTags: ['Decks'],
      }),
      postGrade: builder.mutation<{}, PostGradeCardParams>({
        query: ({ id, ...restProps }) => ({
          url: `v1/decks/${id}/learn`,
          method: 'POST',
          body: restProps,
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
  useEditDeckMutation,
  useGetCardForLearnQuery,
  usePostGradeMutation,
} = decksApi
