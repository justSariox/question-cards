import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './decks.module.css'

import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { Pagination } from '@/components/ui/pagination'
import { Sort } from '@/components/ui/table/table.stories.tsx'
import { Typography } from '@/components/ui/typography'
import { FiltersForDecks } from '@/pages/decks/filters-for-decks/filters-for-decks.tsx'
import { ModalForDecks } from '@/pages/decks/modals/modal-for-decks/modal-for-decks.tsx'
import { TableForDecks } from '@/pages/decks/table-for-decks/table-for-decks.tsx'
import { useGetMeQuery } from '@/services/auth/auth.ts'
import { useGetDecksQuery } from '@/services/decks/decks.ts'

export type FormValues = z.infer<typeof deckSchema>
const deckSchema = z.object({
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
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(deckSchema),
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

  if (isLoading) return <Loader />
  if (isError) return <div>Error</div>
  if (getMeIsLoading) return <Loader />

  return (
    <div className={s.mainContainer}>
      <div className={s.titleAndButtonWrapper}>
        <Typography variant={'large'} className={s.titleDeck}>
          Decks list
        </Typography>
        <ModalForDecks
          handleSubmit={handleSubmit}
          control={control}
          errors={errors}
          variant={'add'}
        >
          <Button className={s.buttonAddDeck}>Add New Deck</Button>
        </ModalForDecks>
      </div>
      <FiltersForDecks
        setShowUserDecks={setShowUserDecks}
        showUserDecks={showUserDecks}
        setRange={setRange}
        setSearch={setSearch}
        search={search}
        range={range}
      />
      <TableForDecks
        sort={sort}
        setSort={setSort}
        decks={decks}
        user={user}
        handleSubmit={handleSubmit}
        errors={errors}
        control={control}
      />
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
