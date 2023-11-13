import { Link, useParams } from 'react-router-dom'

import s from './card.module.css'

import arrowBack from '@/components/ui/assets/svg/arrow-back.svg'
import { Loader } from '@/components/ui/loader'
import { useGetMeQuery } from '@/services/auth/auth.ts'
import { CardInfo } from '@/services/cards/cardInfo.tsx'
import { useGetDeckByIdQuery, useGetDeckCardsQuery } from '@/services/decks/decks.ts'

export const CardPage = () => {
  const { isLoading: getMeIsLoading, isError: getMeIsError } = useGetMeQuery()
  const { deckId } = useParams()
  const { data: deck, isLoading, isError } = useGetDeckByIdQuery({ id: deckId || '' })
  const { isLoading: getDeckCardsLoading } = useGetDeckCardsQuery({
    id: deckId || '',
  })

  if (isLoading || getMeIsLoading) return <Loader />
  if (isError || getMeIsError) return <div>Error</div>
  if (getDeckCardsLoading) return <Loader />

  return (
    <div className={s.mainContainer}>
      <div className={s.backToDecksList}>
        <Link to={'/'} className={s.linkBackPacks}>
          <img src={arrowBack} alt="arrow back" className={s.arrowBackIcon} />
          Back to Packs List
        </Link>
      </div>
      <CardInfo deck={deck} deckId={deckId} />
    </div>
  )
}
