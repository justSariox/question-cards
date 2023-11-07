export type EditCardRequestType = {
  id: string
  questionImg?: string
  answerImg?: string
  question?: string
  answer?: string
  questionVideo?: string
  answerVideo?: string
}

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
