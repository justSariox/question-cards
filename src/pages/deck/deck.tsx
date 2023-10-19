import { useNavigate, useParams } from 'react-router-dom'

import s from './deck.module.css'

import arrowBack from '@/components/ui/assets/svg/arrow-back.svg'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { Typography } from '@/components/ui/typography'
import { useGetMeQuery } from '@/services/auth/auth.ts'
import { useCreateDeckMutation, useGetDeckQuery, useGetDecksQuery } from '@/services/decks/decks.ts'

export const Deck = () => {
  const { isLoading: getMeIsLoading } = useGetMeQuery()
  const navigate = useNavigate()
  const { isLoading, isError } = useGetDecksQuery()
  const [] = useCreateDeckMutation()
  const { deckId } = useParams()

  const {} = useGetDeckQuery({ id: deckId || '' })

  if (isLoading) return <Loader />
  if (isError) return <div>Error</div>
  if (getMeIsLoading) return <Loader />

  const createCardHandler = () => {}
  const backToDecksList = () => {
    navigate('/')
  }

  return (
    <div className={s.mainContainer}>
      <div onClick={backToDecksList} className={s.backToDecksList}>
        <img src={arrowBack} alt="arrow back" className={s.arrowBackIcon} />
        Back to Packs List
      </div>
      <Typography variant={'large'} className={s.titleDeck}>
        Name Deck
      </Typography>
      <div className={s.descriptionDeckWrapper}>
        <Typography variant={'body2'} className={s.descriptionDeck}>
          This pack is empty. Click add new card to fill this pack
        </Typography>
      </div>
      <div className={s.addNewCardWrapper}>
        <Button onClick={createCardHandler} className={s.buttonAddCard}>
          Add New Card
        </Button>
      </div>
    </div>
  )
}
