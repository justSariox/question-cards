import { Pagination } from '@/services/decks/types.ts'

export type EditCardRequestType = {
  id: string
  questionImg?: string
  answerImg?: string
  question?: string
  answer?: string
  questionVideo?: string
  answerVideo?: string
}

export type Card = {
  id: string
  question: string
  answer: string
  deckId: string
  questionImg?: string | null
  answerImg?: string | null
  questionVideo?: string | null
  answerVideo?: string | null
  created: string
  updated: string
  shots: number
  grade: number
  userId: string
}

export type CardsResponseType = {
  pagination: Pagination
  items: Card[]
}
