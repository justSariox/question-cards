import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import s from './decks.module.css'

import { Edit, PlayCircle, Trash } from '@/components/ui/assets/svg'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
// import { Pagination } from '@/components/ui/pagination'
import { Slider } from '@/components/ui/slider'
import { Column, Table } from '@/components/ui/table'
import { Sort } from '@/components/ui/table/table.stories.tsx'
import { Tabs } from '@/components/ui/tabs'
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
  const navigate = useNavigate()
  /*  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)*/

  const {
    data: decks,
    isLoading,
    isError,
  } = useGetDecksQuery({
    name: search,
    orderBy: sortString,
    authorId: showUserDecks ? user?.id : undefined,
    minCardsCount: range[0],
    maxCardsCount: range[1],
    /*    itemsPerPage: perPage,
        currentPage: page,*/
  })
  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useRemoveDeckMutation()
  const columns: Column[] = [
    { title: 'Name', key: 'name', sortable: true },
    { title: 'Cards', key: 'cardsCount', sortable: true },
    { title: 'Last Updated', key: 'updated', sortable: true },
    { title: 'Created by', key: 'createdBy', sortable: false },
    { title: '', key: 'actions', sortable: false },
  ]
  const cardsOption = [
    { value: 'My Cards', title: 'My Cards' },
    { value: 'All Cards', title: 'All Cards' },
  ]

  if (isLoading) return <Loader />
  if (isError) return <div>Error</div>
  if (getMeIsLoading) return <Loader />
  const createDeckHandler = () => {
    createDeck({ name: 'New Deck' })
  }

  const changeAuthor = () => {
    setShowUserDecks(!showUserDecks)
  }

  const clearFilters = () => {
    setRange([0, 100])
    changeAuthor()
    setSearch('')
  }

  const deckInfoHandler = (deckId: string) => {
    navigate('/deck/' + deckId)
  }

  return (
    <div className={s.mainContainer}>
      <div className={s.titleAndButtonWrapper}>
        <Typography variant={'large'} className={s.titleDeck}>
          Decks list
        </Typography>
        <Button onClick={createDeckHandler} className={s.buttonAddDeck}>
          Add New Deck
        </Button>
      </div>
      <div className={s.decksWrapper}>
        <TextField
          type={'search'}
          value={search}
          onChangeValue={setSearch}
          placeholder={'Search'}
        />
        <Tabs
          tabs={cardsOption}
          value={showUserDecks ? 'All Cards' : 'My Cards'}
          defaultValue={'All Cards'}
          onValueChange={changeAuthor}
        />
        <Slider range={range} onRangeChange={setRange} />
        <Button onClick={clearFilters} variant={'secondary'} remove={true}>
          Clear Filter
        </Button>
      </div>
      {/*        <Pagination
          count={decks?.pagination?.totalPages || 1}
          page={page}
          onChange={setPage}
          perPage={perPage}
          onPerPageChange={setPerPage}
        >*/}
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
                  <div className={s.actions}>
                    <PlayCircle className={s.playCircle} onClick={() => deckInfoHandler(deck.id)} />
                    <Edit />
                    <Button
                      disabled={deck.author.id !== user?.id}
                      variant={'link'}
                      onClick={() => deleteDeck({ id: deck.id })}
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
      {/*</Pagination>*/}
    </div>
  )
}
