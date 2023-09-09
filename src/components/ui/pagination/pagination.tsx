import { FC, useEffect, useState } from 'react'

import axios from 'axios'

import s from './pagination.module.scss'

import firstVectorLeft from '@/components/ui/assets/svg/firstVectorLeft.svg'
import secondVectorLeft from '@/components/ui/assets/svg/secondVectorLeft.svg'
import { MainPaginationButtons } from '@/components/ui/pagination/mainPaginationButtons.tsx'
import { NextButton, PrevButton } from '@/components/ui/pagination/navigationButtons.tsx'
import { usePagination } from '@/components/ui/pagination/usePagination.ts'
import { Select } from '@/components/ui/select'

export type PaginationProps = {
  count: number
  page: number
  onChange: (page: number) => void
  siblings?: number
  perPage?: number
  perPageOptions?: number[]
  onPerPageChange?: (itemPerPage: number) => void
}

const selectItems = [
  { id: '1', option: '10' },
  { id: '2', option: '20' },
  { id: '3', option: '30' },
  { id: '4', option: '50' },
  { id: '5', option: '100' },
]

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
  // const [currentPage] = useState(1)
  const [cardsPerPage] = useState(10)

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
          className={s.button}
        />
        <NextButton onClick={handleNextPageClicked} disabled={isLastPage} />
        <div className={s.selectBox}>
          Показать
          <Select selectItems={selectItems} />
          на странице
        </div>
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
