import { useState } from 'react'

import s from '../deck.module.css'

import { Loader } from '@/components/ui/loader'
import { Pagination } from '@/components/ui/pagination'
import { Column, Table } from '@/components/ui/table'
import { Sort } from '@/components/ui/table/table.stories.tsx'
import { TextField } from '@/components/ui/textField'
import { TableRowCard } from '@/pages/decks/deck/table-for-deck/table-row-card/table-row-card.tsx'
import { User } from '@/services/auth/types.ts'
import { Card } from '@/services/cards/types.ts'
import { useGetDeckCardsQuery } from '@/services/decks/decks.ts'
import { Deck } from '@/services/decks/types.ts'

type PropsType = {
  deckId?: string
  user?: User
  deck?: Deck
  handleSubmit: any
  control: any
  errors: any
}

export const TableForDeck = ({ deckId, user, deck, handleSubmit, control, errors }: PropsType) => {
  const [sort, setSort] = useState<Sort | null>({ key: 'updated', direction: 'desc' })
  const sortString = sort ? `${sort.key}-${sort.direction}` : undefined
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)
  const { data: deckCards, isLoading: getDeckCardsLoading } = useGetDeckCardsQuery({
    id: deckId || '',
    question: search,
    orderBy: sortString,
    currentPage: page,
    itemsPerPage: perPage,
  })

  const columns: Column[] = [
    { title: 'Question', key: 'name', sortable: true },
    { title: 'Answer', key: 'cardsCount', sortable: true },
    { title: 'Last Updated', key: 'updated', sortable: true },
    { title: 'Grade', key: 'createdBy', sortable: true },
    { title: '', key: 'actions', sortable: false },
  ]

  if (getDeckCardsLoading) return <Loader />

  return (
    <div>
      <div className={s.inputSearchWrapper}>
        <TextField
          type={'search'}
          placeholder={'Search cards'}
          value={search}
          onChangeValue={setSearch}
          className={s.inputWidth}
        />
      </div>
      <Table.TableRoot width={'100%'} style={{ textAlign: 'left' }}>
        <Table.TableHeader columns={columns} sort={sort} onSort={setSort} />
        <Table.TableBody>
          {deckCards?.items.map((card: Card) => {
            return (
              <TableRowCard
                key={card.id}
                card={card}
                user={user}
                deck={deck}
                handleSubmit={handleSubmit}
                control={control}
                errors={errors}
              />
            )
          })}
        </Table.TableBody>
      </Table.TableRoot>
      <Pagination
        count={deckCards?.pagination.totalPages || 1}
        page={page}
        onChange={setPage}
        perPage={perPage}
        onPerPageChange={setPerPage}
      >
        {' '}
      </Pagination>
    </div>
  )
}
