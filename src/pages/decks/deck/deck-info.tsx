import { Link } from 'react-router-dom'

import s from './deck.module.css'

import { Button } from '@/components/ui/button'
import { DropDown } from '@/components/ui/dropDown'
import { Typography } from '@/components/ui/typography'
import { ModalForCards } from '@/pages/decks/modals/modal-for-cards/modal-for-cards.tsx'
import { User } from '@/services/auth/types.ts'
import { Deck } from '@/services/decks/types.ts'

type PropsType = {
  deck?: Deck
  user?: User
  deckId?: string
  handleSubmit: any
  control: any
  errors: any
}

export const DeckInfo = ({ deck, user, deckId, errors, handleSubmit, control }: PropsType) => {
  return (
    <div className={s.deckInfo}>
      <div className={s.nameAndImage}>
        <div className={s.typographyAndDropdown}>
          <Typography variant={'large'} className={s.titleDeck}>
            {deck?.name}
          </Typography>
          {user?.id === deck?.userId && <DropDown deckId={deckId} />}
        </div>
        {deck?.cover && <img src={deck?.cover} alt="deck cover" className={s.coverDeck} />}
      </div>

      {user?.id !== deck?.userId ? (
        <div className={s.learnToPackWrapper}>
          <Link to={`/decks/${deckId}/learn`} className={s.linkBackPacks}>
            <Button>Learn to Deck</Button>
          </Link>
        </div>
      ) : (
        <ModalForCards
          handleSubmit={handleSubmit}
          control={control}
          errors={errors}
          variant={'add'}
          deck={deck}
        >
          <div className={s.addNewCardWrapper}>
            <Button className={s.buttonAddCard}>Add New Card</Button>
          </div>
        </ModalForCards>
      )}
    </div>
  )
}
