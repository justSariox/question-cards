import { Edit, Trash } from '@/components/ui/assets/svg'
import { Button } from '@/components/ui/button'
import { Grade } from '@/components/ui/grade/grade.tsx'
import { Table } from '@/components/ui/table'
import s from '@/pages/decks/deck/deck.module.css'
import { ModalForCards } from '@/pages/decks/modals/modal-for-cards/modal-for-cards.tsx'
import { User } from '@/services/auth/auth.ts'
import { CardType, Deck } from '@/services/decks/types.ts'

type PropsType = {
  card: CardType
  user: User | undefined
  deck: Deck
  handleSubmit: any
  errors: any
  control: any
}

export const TableRowCard = ({ card, user, deck, handleSubmit, errors, control }: PropsType) => {
  return (
    <Table.TableRow key={card.id}>
      <Table.TableCell as={'td'} className={s.tableCellQuestion}>
        {card.question}
      </Table.TableCell>
      <Table.TableCell as={'td'} className={s.tableCellAnswer}>
        {card.answer}
      </Table.TableCell>
      <Table.TableCell as={'td'} className={s.tableCellDate}>
        {new Date(card.updated).toLocaleDateString('ru-RU')}
      </Table.TableCell>
      <Table.TableCell as={'td'} className={s.tableCellGrade}>
        <Grade gradeValue={card.grade} />
      </Table.TableCell>
      <Table.TableCell as={'td'}>
        <div className={`${user?.id === deck?.userId ? s.actions : s.actionsHide}`}>
          <ModalForCards
            handleSubmit={handleSubmit}
            control={control}
            errors={errors}
            variant={'edit'}
            card={card}
          >
            <Edit className={s.editIcon} />
          </ModalForCards>
          <ModalForCards
            handleSubmit={handleSubmit}
            control={control}
            errors={errors}
            variant={'delete'}
            card={card}
          >
            <Button disabled={false} variant={'link'} onClick={() => {}} className={s.trashButton}>
              <Trash />
            </Button>
          </ModalForCards>
        </div>
      </Table.TableCell>
    </Table.TableRow>
  )
}
