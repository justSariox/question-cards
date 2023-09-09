import { useState } from 'react'

import { Edit, PlayCircle, Trash } from '@/components/ui/assets/svg'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { Column, Table } from '@/components/ui/table'
import { Sort } from '@/components/ui/table/table.stories.tsx'
import { Toggle } from '@/components/ui/tabs/tabs.tsx'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { useGetMeQuery } from '@/services/auth/auth.ts'
import {
  useCreateDeckMutation,
  useGetDecksQuery,
  useRemoveDeckMutation,
} from '@/services/decks/decks.ts'

export const Decks = () => {
  const { data: user, isLoading: getMeIsLoading } = useGetMeQuery()
  const [showUserDecks, setShowUserDecks] = useState<boolean>(false)
  const [sort, setSort] = useState<Sort | null>({ key: 'updated', direction: 'desc' })
  const sortString = sort ? `${sort.key}-${sort.direction}` : null
  const [search, setSearch] = useState<string>('')
  const decks = useGetDecksQuery({
    name: search,
    itemsPerPage: 10,
    orderBy: sortString,
    authorId: showUserDecks ? user?.id : undefined,
  })
  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useRemoveDeckMutation()
  const columns: Column[] = [
    { title: 'Name', key: 'name', sortable: true },
    { title: 'Cards', key: 'cardsCount', sortable: true },
    { title: 'Updated', key: 'updated', sortable: true },
    { title: 'Created By', key: 'createdBy', sortable: true },
    { title: 'Actions', key: 'actions', sortable: false },
  ]

  if (decks.isLoading) return <Loader />
  if (decks.isError) return <div>Error</div>
  if (getMeIsLoading) return <Loader />
  const createDeckHandler = () => {
    createDeck({ name: 'New Deck' })
  }

  return (
    <div style={{ margin: '0 auto', width: '1400px' }}>
      <Typography variant={'large'}>Packs list</Typography>
      <Button onClick={createDeckHandler}>Create deck</Button>
      <label>
        Show only my decks <Toggle checked={showUserDecks} onCheckedChange={setShowUserDecks} />
      </label>
      <TextField type={'search'} value={search} onChangeValue={setSearch} placeholder={'Search'} />
      <Table.TableRoot width={'100%'} style={{ textAlign: 'left' }}>
        <Table.TableHeader columns={columns} sort={sort} onSort={setSort} />

        <Table.TableBody>
          {decks.data?.items?.map(deck => {
            return (
              <Table.TableRow key={deck.id}>
                <Table.TableCell as={'td'}>{deck.name}</Table.TableCell>
                <Table.TableCell as={'td'}>{deck.cardsCount}</Table.TableCell>
                <Table.TableCell as={'td'}>
                  {new Date(deck.updated).toLocaleDateString('ru-RU')}
                </Table.TableCell>
                <Table.TableCell as={'td'}>{deck.author.name}</Table.TableCell>
                <Table.TableCell as={'td'}>
                  <div>
                    <PlayCircle />
                    <Edit />
                    <Button variant={'link'} onClick={() => deleteDeck({ id: deck.id })}>
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
  )
}
