import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { z } from 'zod'

import s from './card.module.css'

import arrowBack from '@/components/ui/assets/svg/arrow-back.svg'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader } from '@/components/ui/loader'
import { Typography } from '@/components/ui/typography'
import { useGetMeQuery } from '@/services/auth/auth.ts'
import {
  useGetCardForLearnQuery,
  useGetDeckByIdQuery,
  useGetDeckCardsQuery,
} from '@/services/decks/decks.ts'

export type FormValues = z.infer<typeof cardSchema>
const cardSchema = z.object({
  question: z.string().min(3, {
    message: 'Question must be longer than or equal to 3 characters!',
  }),
  answer: z.string().min(3, {
    message: 'Answer must be longer than or equal to 3 characters!',
  }),
})

export const CardPage = () => {
  const { data: user } = useGetMeQuery()
  const { deckId } = useParams()
  const { data: deck, isLoading, isError } = useGetDeckByIdQuery({ id: deckId || '' })
  const { data: deckCards, isLoading: getDeckCardsLoading } = useGetDeckCardsQuery({
    id: deckId || '',
  })
  const { data: card } = useGetCardForLearnQuery({ id: deckId || '', previousCardId: '' })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(cardSchema),
  })

  if (isLoading) return <Loader />
  if (isError) return <div>Error</div>
  if (getDeckCardsLoading) return <Loader />

  return (
    <div className={s.mainContainer}>
      <div className={s.backToDecksList}>
        <Link to={'/'} className={s.linkBackPacks}>
          <img src={arrowBack} alt="arrow back" className={s.arrowBackIcon} />
          Back to Packs List
        </Link>
      </div>
      <div className={s.cardContainer}>
        <Card className={s.card}>
          <Typography variant={'large'} className={s.cardTitle}>
            Learn &#8220;{deck?.name || 'Deck Name'}&#8221;
          </Typography>
          <div className={s.cardInfo}>
            <Typography variant={'subtitle1'} className={s.question}>
              <strong>Question:</strong> {deckCards || 'How This works in JavaScript?'}
            </Typography>
            <Typography variant={'subtitle2'} className={s.description}>
              Количество попыток ответов на вопрос: 10
            </Typography>
          </div>
          <Button className={s.cardButton}>Show Answer</Button>
        </Card>
      </div>
    </div>
  )
}
