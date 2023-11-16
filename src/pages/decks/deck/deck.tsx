import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'

import s from './deck.module.css'

import arrowBack from '@/components/ui/assets/svg/arrow-back.svg'
import { Loader } from '@/components/ui/loader'
import { Typography } from '@/components/ui/typography'
import { DeckInfo } from '@/pages/decks/deck/deck-info.tsx'
import { TableForDeck } from '@/pages/decks/deck/table-for-deck/table-for-deck.tsx'
import { useGetMeQuery } from '@/services/auth/auth.ts'
import { useGetDeckByIdQuery } from '@/services/decks/decks.ts'

export type FormValues = z.infer<typeof cardSchema>
const cardSchema = z.object({
  question: z.string().min(3, {
    message: 'Question must be longer than or equal to 3 characters!',
  }),
  answer: z.string().min(3, {
    message: 'Answer must be longer than or equal to 3 characters!',
  }),
})

export const Deck = () => {
  const { data: user, isLoading: getMeIsLoading, isError: getMeIsError } = useGetMeQuery()
  const { deckId } = useParams()
  const { data: deck, isLoading, isError } = useGetDeckByIdQuery({ id: deckId || '' })
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(cardSchema),
  })

  if (isLoading || getMeIsLoading) return <Loader />
  if (isError || getMeIsError) return <div>Error</div>

  const goBack = () => navigate(-1)

  return (
    <div className={s.mainContainer}>
      <div className={s.backToDecksList}>
        <div onClick={goBack} className={s.linkBackPacks}>
          <img src={arrowBack} alt="arrow back" className={s.arrowBackIcon} />
          Back to Packs List
        </div>
      </div>
      <DeckInfo
        deck={deck}
        user={user}
        deckId={deckId}
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
      />
      {deck?.cardsCount === 0 && (
        <div>
          <div className={s.descriptionDeckWrapper}>
            <Typography variant={'body2'} className={s.descriptionDeck}>
              This pack is empty.
              {user?.id === deck.userId && ' Click add new card to fill this pack'}
            </Typography>
          </div>
        </div>
      )}
      {deck && deck.cardsCount > 0 && (
        <TableForDeck
          deck={deck}
          deckId={deckId}
          user={user}
          handleSubmit={handleSubmit}
          errors={errors}
          control={control}
        />
      )}
    </div>
  )
}
