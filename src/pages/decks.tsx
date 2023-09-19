import { useState } from 'react'

import { Edit, PlayCircle, Trash } from '@/components/ui/assets/svg'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { Pagination } from '@/components/ui/pagination'
import { Slider } from '@/components/ui/slider'
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
  const [range, setRange] = useState<Array<number>>([0, 100])
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)

  const {
    data: decks,
    isLoading,
    isError,
  } = useGetDecksQuery({
    name: search,
    itemsPerPage: perPage,
    orderBy: sortString,
    authorId: showUserDecks ? user?.id : undefined,
    minCardsCount: range[0],
    maxCardsCount: range[1],
    currentPage: page,
  })
  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useRemoveDeckMutation()
  const columns: Column[] = [
    { title: 'Name', key: 'name', sortable: true },
    { title: 'Cards', key: 'cardsCount', sortable: true },
    { title: 'Updated', key: 'updated', sortable: true },
    { title: 'Created By', key: 'createdBy', sortable: false },
    { title: 'Actions', key: 'actions', sortable: false },
  ]

  if (isLoading) return <Loader />
  if (isError) return <div>Error</div>
  if (getMeIsLoading) return <Loader />
  const createDeckHandler = () => {
    createDeck({ name: 'New Deck' })
  }

  console.log(perPage)

  return (
    <div style={{ margin: '0 auto', width: '1400px' }}>
      <Typography variant={'large'}>Packs list</Typography>
      <Button onClick={createDeckHandler}>Create deck</Button>
      <label>
        Show only my decks <Toggle checked={showUserDecks} onCheckedChange={setShowUserDecks} />
      </label>
      <TextField type={'search'} value={search} onChangeValue={setSearch} placeholder={'Search'} />
      <Slider range={range} onRangeChange={setRange} />
      <Pagination
        count={decks?.pagination?.totalPages || 1}
        page={page}
        onChange={setPage}
        perPage={perPage}
        onPerPageChange={setPerPage}
      >
        <Table.TableRoot width={'100%'} style={{ textAlign: 'left' }}>
          <Table.TableHeader columns={columns} sort={sort} onSort={setSort} />
          <Table.TableBody>
            {decks?.items?.map((deck: any) => {
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
                      <Button
                        disabled={deck.author.id !== user?.id}
                        variant={'link'}
                        onClick={() => deleteDeck({ id: deck.id })}
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
      </Pagination>
    </div>
  )
}
