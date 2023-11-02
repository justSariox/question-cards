export type Pagination = {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

export type Author = {
  id: string
  name: string
}

export type Deck = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover?: string | null
  rating: number
  isDeleted?: boolean | null
  isBlocked?: boolean | null
  created: string
  updated: string
  cardsCount: number
  author: Author
}

export type DecksResponseType = {
  maxCardsCount: number
  pagination: Pagination
  items: Deck[]
}

export type DecksParams = {
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  orderBy?: string | null
  currentPage?: number
  itemsPerPage?: number
} | void

export type CardType = {
  id: string
  question: string
  answer: string
  deckId: string
  questionImg?: any
  answerImg?: any
  questionVideo?: any
  answerVideo?: any
  created: string
  updated: string
  shots: number
  grade: number
  userId: string
}

export type CardsParams = {
  id: string
  question?: string
  answer?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}

export type DeckResponseType = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover?: any
  rating: number
  isDeleted?: any
  isBlocked?: any
  created: string
  updated: string
  cardsCount: number
}

export type CreateDeckParamsType = {
  cover?: string
  name: string
  isPrivate?: boolean
}
