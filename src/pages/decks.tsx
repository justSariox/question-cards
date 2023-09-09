import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Column, Table } from '@/components/ui/table'
import { Sort } from '@/components/ui/table/table.stories.tsx'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks/decks.ts'

export const Decks = () => {
  const [sort, setSort] = useState<Sort | null>({ key: 'updated', direction: 'asc' })
  const sortString = sort ? `${sort.key}-${sort.direction}` : null

  const decks = useGetDecksQuery({ name: '', itemsPerPage: 10, orderBy: sortString })
  const [createDeck] = useCreateDeckMutation()

  const columns: Column[] = [
    { title: 'Name', key: 'name', sortable: true },
    { title: 'Cards', key: 'cardsCount', sortable: true },
    { title: 'Updated', key: 'updated', sortable: true },
    { title: 'Created By', key: 'createdBy', sortable: true },
  ]

  if (decks.isLoading) return <div>Loading</div>
  if (decks.isError) return <div>Error</div>

  return (
    <div>
      <Button
        onClick={() => {
          createDeck({ name: '123' })
        }}
      >
        Create deck
      </Button>
      <Table.TableRoot width={'100%'}>
        <Table.TableHeader columns={columns} sort={sort} onSort={setSort} />

        <Table.TableBody>
          {decks.data?.items?.map(deck => {
            return (
              <Table.TableRow key={deck.id}>
                <Table.TableCell as={'td'}>{deck.name}</Table.TableCell>
                <Table.TableCell as={'td'}>{deck.cardsCount}</Table.TableCell>
                <Table.TableCell as={'td'}>{deck.updated}</Table.TableCell>
                <Table.TableCell as={'td'}>{deck.author.name}</Table.TableCell>
              </Table.TableRow>
            )
          })}
        </Table.TableBody>
      </Table.TableRoot>
    </div>
  )
}
