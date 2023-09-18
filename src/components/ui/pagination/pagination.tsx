import { FC, useEffect, useState } from 'react'

import axios from 'axios'

import s from './pagination.module.scss'

import firstVectorLeft from '@/components/ui/assets/svg/firstVectorLeft.svg'
import secondVectorLeft from '@/components/ui/assets/svg/secondVectorLeft.svg'
import { MainPaginationButtons } from '@/components/ui/pagination/mainPaginationButtons.tsx'
import { NextButton, PrevButton } from '@/components/ui/pagination/navigationButtons.tsx'
import { PerPageSelect } from '@/components/ui/pagination/perPageSelect.tsx'
import { usePagination } from '@/components/ui/pagination/usePagination.ts'

export type PaginationProps = {
  count: number
  page: number
  onChange: (page: number) => void
  siblings?: number
  perPage?: number
  perPageOptions?: number[] | string[]
  onPerPageChange?: (itemPerPage: number) => void
}

const selectItems = ['10', '20', '30', '50', '100']

type CardProps = {
  userId: number
  id: number
  title: string
  body: string
}

export const Pagination: FC<PaginationProps> = ({ onChange, count, page, siblings }) => {
  const {
    paginationRange,
    isLastPage,
    isFirstPage,
    handlePreviousPageClicked,
    handleNextPageClicked,
    handleMainPageClicked,
  } = usePagination({
    page,
    count,
    onChange,
    siblings,
  })

  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)
  const [cardsPerPage, setCardsPerPage] = useState(10)

  const indexOfLastCard = page * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')

      setCards(res.data)
      setLoading(false)
    }

    fetchPosts()
  }, [])

  if (loading) {
    return <h2>Loading...</h2>
  }

  const onPerPageChange = (itemPerPage: string) => {
    setCardsPerPage(+itemPerPage)
  }

  return (
    <div className={s.root}>
      <div className={s.container}>
        {isFirstPage ? (
          <PrevButton
            onClick={handlePreviousPageClicked}
            disabled={isFirstPage}
            image={firstVectorLeft}
          />
        ) : (
          <PrevButton onClick={handlePreviousPageClicked} image={secondVectorLeft} />
        )}
        <MainPaginationButtons
          currentPage={page}
          onClick={handleMainPageClicked}
          paginationRange={paginationRange}
        />
        <NextButton onClick={handleNextPageClicked} disabled={isLastPage} />
        <PerPageSelect
          perPage={null}
          perPageOptions={selectItems}
          onPerPageChange={onPerPageChange}
        />
      </div>
      <div>
        <ul>
          {currentCards.map((card: CardProps) => {
            return <li key={card.id}>{card.title}</li>
          })}
        </ul>
      </div>
    </div>
  )
}
