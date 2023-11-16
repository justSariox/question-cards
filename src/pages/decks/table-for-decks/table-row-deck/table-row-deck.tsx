import s from '../../decks.module.css'

import { Table } from '@/components/ui/table'
import { Actions } from '@/pages/decks/table-for-decks/table-row-deck/actions/actions.tsx'
import { User } from '@/services/auth/types.ts'
import { Deck } from '@/services/decks/types.ts'

type PropsType = {
  user: User | undefined
  deck: Deck
  handleSubmit: any
  errors: any
  control: any
}

export const TableRowDeck = ({ user, deck, handleSubmit, errors, control }: PropsType) => {
  return (
    <Table.TableRow key={deck.id}>
      <Table.TableCell as={'td'} className={s.tableCellName}>
        <div className={s.tableCellNameContainer}>
          {deck.cover && <img src={deck.cover} alt="deck cover" className={s.coverDeck} />}
          {deck.name}
        </div>
      </Table.TableCell>
      <Table.TableCell as={'td'} className={s.tableCellCardsCount}>
        {deck.cardsCount}
      </Table.TableCell>
      <Table.TableCell as={'td'} className={s.tableCellDate}>
        {new Date(deck.updated).toLocaleDateString('ru-RU')}
      </Table.TableCell>
      <Table.TableCell as={'td'} className={s.tableCellAuthorName}>
        {deck.author.name}
      </Table.TableCell>
      <Table.TableCell as={'td'}>
        <Actions
          deck={deck}
          handleSubmit={handleSubmit}
          control={control}
          errors={errors}
          user={user}
        />
      </Table.TableCell>
    </Table.TableRow>
  )
}
