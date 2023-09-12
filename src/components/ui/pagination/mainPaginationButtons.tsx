import { FC } from 'react'

import s from './pagination.module.scss'

export type MainPaginationButtonsProps = {
  paginationRange: (number | string)[]
  currentPage: number
  onClick: (pageNumber: number) => () => void
  className?: string
}

export const MainPaginationButtons = (props: MainPaginationButtonsProps) => {
  const { onClick, currentPage, paginationRange } = props
  const Dots: FC = () => {
    return <span className={s.dots}>&#8230;</span>
  }

  return (
    <>
      {paginationRange.map((page, index) => {
        const isSelected = page == currentPage

        if (typeof page !== 'number') {
          return <Dots key={index} />
        }

        return (
          <button
            key={index}
            onClick={onClick(page)}
            className={`${isSelected ? s.selectedPage : ''} ${s.button} `}
          >
            {page}
          </button>
        )
      })}
    </>
  )
}
