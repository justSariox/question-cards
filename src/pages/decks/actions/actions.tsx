import { useNavigate } from 'react-router-dom'

import { Edit, PlayCircle, Trash } from '@/components/ui/assets/svg'
import { Button } from '@/components/ui/button'
import s from '@/pages/decks/decks.module.css'
import { ModalForDecks } from '@/pages/decks/modals/modal-for-decks/modal-for-decks.tsx'
import { User } from '@/services/auth/auth.ts'
import { Deck } from '@/services/decks/types.ts'

type PropsType = {
  deck: Deck
  handleSubmit: any
  control: any
  errors: any
  user: User | undefined
}

export const Actions = ({ deck, handleSubmit, control, errors, user }: PropsType) => {
  const navigate = useNavigate()

  const deckInfoHandler = (deckId: string) => {
    navigate(`/decks/${deckId}/cards`)
  }

  return (
    <div className={s.actions}>
      <Button
        variant={'link'}
        onClick={() => deckInfoHandler(deck.id)}
        className={s.playCircleButton}
      >
        <PlayCircle className={s.playCircle} />
      </Button>
      <ModalForDecks
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
        variant={'edit'}
        deck={deck}
      >
        <Button
          disabled={deck.author.id !== user?.id}
          variant={'link'}
          className={s.editIconButton}
        >
          <Edit className={s.editIcon} />
        </Button>
      </ModalForDecks>
      <ModalForDecks
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
        variant={'delete'}
        deck={deck}
      >
        <Button disabled={deck.author.id !== user?.id} variant={'link'} className={s.trashButton}>
          <Trash />
        </Button>
      </ModalForDecks>
    </div>
  )
}
