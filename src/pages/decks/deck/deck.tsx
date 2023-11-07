import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { z } from 'zod'

import s from './deck.module.css'

import arrowBack from '@/components/ui/assets/svg/arrow-back.svg'
import { Button } from '@/components/ui/button'
import { DropDown } from '@/components/ui/dropDown'
import { Loader } from '@/components/ui/loader'
import { Pagination } from '@/components/ui/pagination'
import { Column, Table } from '@/components/ui/table'
import { Sort } from '@/components/ui/table/table.stories.tsx'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { TableRowCard } from '@/pages/decks/deck/table-row-card/table-row-card.tsx'
import { ModalForCards } from '@/pages/decks/modals/modal-for-cards/modal-for-cards.tsx'
import { useGetMeQuery } from '@/services/auth/auth.ts'
import { useGetDeckByIdQuery, useGetDeckCardsQuery } from '@/services/decks/decks.ts'
import { CardType } from '@/services/decks/types.ts'

export type FormValues = z.infer<typeof cardSchema>
const cardSchema = z.object({
  question: z.string().min(3, {
    message: 'Question must be longer than or equal to 3 characters!',
  }),
  answer: z.string().min(3, {
    message: 'Answer must be longer than or equal to 3 characters!',
  }),
})

export const Deck = () => {
  const { data: user } = useGetMeQuery()
  const { deckId } = useParams()
  const [sort, setSort] = useState<Sort | null>({ key: 'updated', direction: 'desc' })
  const sortString = sort ? `${sort.key}-${sort.direction}` : undefined
  const [search, setSearch] = useState<string>('')
  const { data: deck, isLoading, isError } = useGetDeckByIdQuery({ id: deckId || '' })
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)
  const { data: deckCards, isLoading: getDeckCardsLoading } = useGetDeckCardsQuery({
    id: deckId || '',
    question: search,
    answer: search,
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

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(cardSchema),
  })

  if (isLoading) return <Loader />
  if (isError) return <div>Error</div>
  if (getDeckCardsLoading) return <Loader />

  return (
    <div className={s.mainContainer}>
      <div className={s.backToDecksList}>
        <Link to={'/'} className={s.linkBackPacks}>
          <img src={arrowBack} alt="arrow back" className={s.arrowBackIcon} />
          Back to Packs List
        </Link>
      </div>
      <div className={s.deckInfo}>
        <div className={s.typographyAndDropdown}>
          <Typography variant={'large'} className={s.titleDeck}>
            {deck?.name}
          </Typography>
          {user?.id === deck?.userId && <DropDown />}
        </div>

        {deck && deck.cardsCount > 0 && user?.id !== deck?.userId ? (
          <div className={s.learnToPackWrapper}>
            <Link to={`/v1/decks/${deck.id}/learn`} className={s.linkBackPacks}>
              <Button>Learn to Deck</Button>
            </Link>
          </div>
        ) : (
          <ModalForCards
            handleSubmit={handleSubmit}
            control={control}
            errors={errors}
            variant={'add'}
            deck={deck}
          >
            <div className={s.addNewCardWrapper}>
              <Button className={s.buttonAddCard}>Add New Card</Button>
            </div>
          </ModalForCards>
        )}
      </div>

      {deck?.cardsCount === 0 && (
        <div>
          <div className={s.descriptionDeckWrapper}>
            <Typography variant={'body2'} className={s.descriptionDeck}>
              This pack is empty.
              {user?.id === deck.userId && ' Click add new card to fill this pack'}
            </Typography>
          </div>
        </div>
      )}
      {deck && deck.cardsCount > 0 && (
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
              {deckCards.items.map((card: CardType) => {
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
            count={deckCards?.pagination?.totalPages || 1}
            page={page}
            onChange={setPage}
            perPage={perPage}
            onPerPageChange={setPerPage}
          >
            {' '}
          </Pagination>
        </div>
      )}
    </div>
  )
}
