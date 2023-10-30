import { FC } from 'react'

import s from '@/components/ui/pagination/pagination.module.scss'
import { Select } from '@/components/ui/select'

export type PerPageSelectProps = {
  perPage: number | undefined
  perPageOptions: string[]
  onPerPageChange?: (itemPerPage: string) => void
}

export const PerPageSelect: FC<PerPageSelectProps> = ({
  perPage,
  perPageOptions,
  onPerPageChange,
}) => {
  const selectOptions = perPageOptions.map(value => ({
    label: value,
    value,
  }))

  return (
    <div className={s.selectBox}>
      Показать
      <Select
        className={s.select}
        value={perPage}
        selectItems={selectOptions}
        onChange={onPerPageChange}
        isPagination={true}
      />
      на странице
    </div>
  )
}
