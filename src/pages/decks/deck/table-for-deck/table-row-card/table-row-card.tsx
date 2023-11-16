import { Edit, Trash } from '@/components/ui/assets/svg'
import { Button } from '@/components/ui/button'
import { Grade } from '@/components/ui/grade/grade.tsx'
import { Table } from '@/components/ui/table'
import s from '@/pages/decks/deck/deck.module.css'
import { ModalForCards } from '@/pages/decks/modals/modal-for-cards/modal-for-cards.tsx'
import { User } from '@/services/auth/types.ts'
import { Card } from '@/services/cards/types.ts'
import { Deck } from '@/services/decks/types.ts'

type PropsType = {
  card: Card
  user: User | undefined
  deck: Deck | undefined
  handleSubmit: any
  errors: any
  control: any
}

export const TableRowCard = ({ card, user, deck, handleSubmit, errors, control }: PropsType) => {
  return (
    <Table.TableRow key={card.id}>
      <Table.TableCell as={'td'} className={s.tableCellQuestion}>
        <div className={s.questionContainer}>
          {card.questionImg && (
            <div className={s.questionVideo}>
              <img src={card.questionImg} alt="image question" className={s.questionImage} />
            </div>
          )}

          {card.questionVideo && (
            <div className={s.questionVideo}>
              <video src={card.questionVideo} />
            </div>
          )}

          {card.question}
        </div>
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
            <Button disabled={false} variant={'link'} className={s.trashButton}>
              <Trash />
            </Button>
          </ModalForCards>
        </div>
      </Table.TableCell>
    </Table.TableRow>
  )
}
