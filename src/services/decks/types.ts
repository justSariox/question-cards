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

export type DeleteDeckResponseType = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string
  rating: number
  created: string
  updated: string
  cardsCount: number
}

export type DecksResponseType = {
  maxCardsCount?: number
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

export type CardsParams = {
  id: string
  question?: string
  answer?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}

export type CreateCardParams = {
  id: string
  question?: string
  answer?: string
  questionImg?: string
  answerImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type CreateCardResponse = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  questionImg?: string | null
  answerImg?: string | null
  answerVideo?: string | null
  questionVideo?: string | null
  comments?: string | null
  type?: string | null
  rating: number
  moreId?: string | null
  created: string
  updated: string
}

export type EditDeckParamsType = {
  id: string
  cover?: string
  name: string
  isPrivate: boolean
}

export type CreateDeckParamsType = {
  cover?: string
  name: string
  isPrivate?: boolean
}

export type GetLearnCardParams = {
  id: string
  previousCardId?: string
}

export type PostGradeCardParams = {
  id: string
  cardId: string
  grade: number
}

export type LearnCardResponse = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  answerImg: string
  questionImg: string
  questionVideo: string
  answerVideo: string
  rating: number
  created: string
  updated: string
}
