import s from '../modal-for-cards.module.css'

import { Card } from '@/services/cards/types.ts'

type PropsType = {
  card?: Card
}

export const DeleteContent = ({ card }: PropsType) => {
  return (
    <div className={s.descriptionForDeleteDeck}>
      <div className={s.description}>
        Do you really want to remove{' '}
        <strong>
          <i>{card && card.question}</i>
        </strong>
        ? Card will be permanently deleted.
      </div>
    </div>
  )
}
