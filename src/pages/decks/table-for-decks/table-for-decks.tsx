import { Column, Table } from '@/components/ui/table'
import { Sort } from '@/components/ui/table/table.stories.tsx'
import { TableRowDeck } from '@/pages/decks/table-for-decks/table-row-deck/table-row-deck.tsx'
import { User } from '@/services/auth/types.ts'
import { Deck, DecksResponseType } from '@/services/decks/types.ts'

type PropsType = {
  sort: Sort | null
  setSort: (sort: Sort | null) => void
  decks: DecksResponseType | undefined
  user: User | undefined
  handleSubmit: any
  errors: any
  control: any
}

export const TableForDecks = ({
  sort,
  setSort,
  decks,
  user,
  handleSubmit,
  errors,
  control,
}: PropsType) => {
  const columns: Column[] = [
    { title: 'Name', key: 'name', sortable: true },
    { title: 'Cards', key: 'cardsCount', sortable: true },
    { title: 'Last Updated', key: 'updated', sortable: true },
    { title: 'Created by', key: 'createdBy', sortable: false },
    { title: '', key: 'actions', sortable: false },
  ]

  return (
    <Table.TableRoot width={'100%'} style={{ textAlign: 'left' }}>
      <Table.TableHeader columns={columns} sort={sort} onSort={setSort} />
      <Table.TableBody>
        {decks?.items.map((deck: Deck) => {
          return (
            <TableRowDeck
              key={deck.id}
              deck={deck}
              user={user}
              handleSubmit={handleSubmit}
              errors={errors}
              control={control}
            />
          )
        })}
      </Table.TableBody>
    </Table.TableRoot>
  )
}
