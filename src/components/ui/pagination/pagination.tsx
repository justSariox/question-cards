import { FC, ReactNode } from 'react'

import s from './pagination.module.scss'

import { MainPaginationButtons } from '@/components/ui/pagination/mainPaginationButtons.tsx'
import { NextButton, PrevButton } from '@/components/ui/pagination/navigationButtons.tsx'
import { PerPageSelect } from '@/components/ui/pagination/perPageSelect.tsx'
import { usePagination } from '@/components/ui/pagination/usePagination.ts'

export type PaginationProps = {
  count: number
  page: number
  onChange: (page: number) => void
  siblings?: number
  perPage: number
  perPageOptions?: number[] | string[]
  onPerPageChange: (perPage: number) => void
  children: ReactNode
}

const selectItems = ['10', '20', '30', '50', '100']

export const Pagination: FC<PaginationProps> = ({
  onChange,
  count,
  page,
  siblings,
  children,
  perPage,
  onPerPageChange,
}) => {
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

  const onPerPageChangeHandler = (value: string) => {
    onPerPageChange(+value)
  }

  return (
    <div className={s.root}>
      <div className={s.container}>
        <PrevButton onClick={handlePreviousPageClicked} disabled={isFirstPage} />
        <MainPaginationButtons
          currentPage={page}
          onClick={handleMainPageClicked}
          paginationRange={paginationRange}
        />
        <NextButton onClick={handleNextPageClicked} disabled={isLastPage} />
        <PerPageSelect
          perPage={perPage}
          perPageOptions={selectItems}
          onPerPageChange={onPerPageChangeHandler}
        />
      </div>
      <div>{children}</div>
    </div>
  )
}
