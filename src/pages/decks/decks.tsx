import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import s from './decks.module.css'

import { Edit, PlayCircle, Trash } from '@/components/ui/assets/svg'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { Pagination } from '@/components/ui/pagination'
import { Slider } from '@/components/ui/slider'
import { Column, Table } from '@/components/ui/table'
import { Sort } from '@/components/ui/table/table.stories.tsx'
import { Tabs } from '@/components/ui/tabs'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { ModalAddDeck } from '@/pages/decks/modals/modal-add-deck/modal-add-deck.tsx'
import { useGetMeQuery } from '@/services/auth/auth.ts'
import { useGetDecksQuery, useRemoveDeckMutation } from '@/services/decks/decks.ts'
import { Deck } from '@/services/decks/types.ts'

export type FormValues = z.infer<typeof addDeckSchema>
const addDeckSchema = z.object({
  name: z.string().max(30, { message: 'no more 30 symbols' }),
  isPrivate: z.boolean().optional(),
})

export const Decks = () => {
  const { data: user, isLoading: getMeIsLoading } = useGetMeQuery()
  const [showUserDecks, setShowUserDecks] = useState<boolean>(false)
  const [sort, setSort] = useState<Sort | null>({ key: 'updated', direction: 'desc' })
  const sortString = sort ? `${sort.key}-${sort.direction}` : null
  const [search, setSearch] = useState<string>('')
  const [range, setRange] = useState<Array<number>>([0, 100])
  const navigate = useNavigate()
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)

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
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(addDeckSchema),
    defaultValues: {
      isPrivate: false,
    },
  })

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
    itemsPerPage: perPage,
    currentPage: page,
  })

  const changeAuthor = () => {
    setShowUserDecks(!showUserDecks)
  }

  const clearFilters = () => {
    setRange([0, 100])
    setShowUserDecks(false)
    setSearch('')
  }

  const deckInfoHandler = (deckId: string) => {
    navigate('/decks/' + deckId)
  }

  if (isLoading) return <Loader />
  if (isError) return <div>Error</div>
  if (getMeIsLoading) return <Loader />

  return (
    <div className={s.mainContainer}>
      <div className={s.titleAndButtonWrapper}>
        <Typography variant={'large'} className={s.titleDeck}>
          Decks list
        </Typography>
        <ModalAddDeck handleSubmit={handleSubmit} control={control} errors={errors} />
        {/*  <Modal open={open} onClose={onCancelButtonClick} title={'Add New Deck'}>
            <form onSubmit={handleSubmit(createDeckHandler)}>
              <ModalButtons ConfirmButtonTitle={'Save changes'} onClose={onCancelButtonClick}>
                <div className={s.modalContentContainer}>
                  <ControlledTextField
                    name={'name'}
                    control={control}
                    error={errors.isPrivate?.message}
                    label={'Name Deck'}
                    className={s.inputWidth}
                  />
                  <ControlledCheckbox name={'isPrivate'} control={control} label={'Private deck'} />
                </div>
              </ModalButtons>
            </form>
          </Modal>
          <Button className={s.buttonAddDeck} onClick={handleModalOpened}>
            Add New Deck
          </Button>*/}
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
          value={showUserDecks ? cardsOption[0].value : cardsOption[1].value}
          defaultValue={cardsOption[1].value}
          onValueChange={changeAuthor}
        />
        <Slider range={range} onRangeChange={setRange} value={range} />
        <Button onClick={clearFilters} variant={'secondary'} remove={true}>
          Clear Filter
        </Button>
      </div>
      <Table.TableRoot width={'100%'} style={{ textAlign: 'left' }}>
        <Table.TableHeader columns={columns} sort={sort} onSort={setSort} />
        <Table.TableBody>
          {decks?.items?.map((deck: Deck) => {
            return (
              <Table.TableRow key={deck.id}>
                <Table.TableCell as={'td'} className={s.tableCellName}>
                  {deck.name}
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
                  <div className={s.actions}>
                    <Button
                      variant={'link'}
                      onClick={() => deckInfoHandler(deck.id)}
                      className={s.playCircleButton}
                    >
                      <PlayCircle className={s.playCircle} />
                    </Button>
                    <Button
                      disabled={deck.author.id !== user?.id}
                      variant={'link'}
                      onClick={() => {}}
                      className={s.editIconButton}
                    >
                      <Edit className={s.editIcon} />
                    </Button>
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
      <Pagination
        count={decks?.pagination?.totalPages || 1}
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
