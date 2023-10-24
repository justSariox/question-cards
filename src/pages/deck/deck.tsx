import { useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import s from './deck.module.css'

import { Edit, Trash } from '@/components/ui/assets/svg'
import arrowBack from '@/components/ui/assets/svg/arrow-back.svg'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { Column, Table } from '@/components/ui/table'
import { Sort } from '@/components/ui/table/table.stories.tsx'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { useGetMeQuery } from '@/services/auth/auth.ts'
import {
  useCreateCardMutation,
  useGetDeckByIdQuery,
  useGetDeckCardsQuery,
} from '@/services/decks/decks.ts'
import { CardType } from '@/services/decks/types.ts'

export const Deck = () => {
  const { data: user } = useGetMeQuery()
  const { deckId } = useParams()
  const [sort, setSort] = useState<Sort | null>({ key: 'updated', direction: 'desc' })
  const sortString = sort ? `${sort.key}-${sort.direction}` : undefined
  const [search, setSearch] = useState<string>('')
  const { data: deck, isLoading, isError } = useGetDeckByIdQuery({ id: deckId || '' })
  const { data: deckCards, isLoading: getDeckCardsLoading } = useGetDeckCardsQuery({
    id: deckId || '',
    question: search,
    answer: search,
    orderBy: sortString,
  })
  const [createCard] = useCreateCardMutation()

  const columns: Column[] = [
    { title: 'Question', key: 'name', sortable: true },
    { title: 'Answer', key: 'cardsCount', sortable: true },
    { title: 'Last Updated', key: 'updated', sortable: true },
    { title: 'Grade', key: 'createdBy', sortable: true },
    { title: '', key: 'actions', sortable: false },
  ]

  if (isLoading) return <Loader />
  if (isError) return <div>Error</div>
  if (getDeckCardsLoading) return <Loader />

  const createCardHandler = () => {
    createCard({ id: deck.id, question: '123', answer: '456' })
  }

  return (
    <div className={s.mainContainer}>
      <div className={s.backToDecksList}>
        <Link to={'/'} className={s.linkBackPacks}>
          <img src={arrowBack} alt="arrow back" className={s.arrowBackIcon} />
          Back to Packs List
        </Link>
      </div>
      <div className={s.typographyAndButton}>
        <Typography variant={'large'} className={s.titleDeck}>
          {deck?.name}
        </Typography>

        {deck?.cardsCount > 0 && (
          <div className={s.learnToPackWrapper}>
            <Button onClick={createCardHandler}>Learn to Pack</Button>
          </div>
        )}
      </div>

      {deck?.cardsCount === 0 && (
        <div>
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
      )}
      {deck?.cardsCount > 0 && (
        <div>
          <div className={s.inputSearchWrapper}>
            <TextField
              type={'search'}
              placeholder={'Search cards'}
              value={search}
              onChangeValue={setSearch}
            />
          </div>
          <Table.TableRoot width={'100%'} style={{ textAlign: 'left' }}>
            <Table.TableHeader columns={columns} sort={sort} onSort={setSort} />
            <Table.TableBody>
              {deckCards.items.map((card: CardType) => {
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
                      {card.grade}
                    </Table.TableCell>
                    <Table.TableCell as={'td'}>
                      <div className={`${user?.id === deck?.userId ? s.actions : s.actionsHide}`}>
                        <Edit />
                        <Button
                          disabled={false}
                          variant={'link'}
                          onClick={() => {}}
                          className={s.trashButton}
                        >
                          <Trash />
                        </Button>
                      </div>
                    </Table.TableCell>
                  </Table.TableRow>
                )
              })}
            </Table.TableBody>
          </Table.TableRoot>
        </div>
      )}
    </div>
  )
}
