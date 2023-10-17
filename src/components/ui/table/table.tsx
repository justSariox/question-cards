import { ComponentProps, ComponentPropsWithoutRef, ElementType, FC } from 'react'

import arrowDown from '../assets/svg/arrow-down.svg'
import arrowUp from '../assets/svg/arrow-up.svg'

import s from './table.module.scss'

import { Sort } from '@/components/ui/table/table.stories.tsx'

export type Column = {
  title: string
  key: string
  sortable?: boolean
}

export type TableProps = ComponentProps<'table'> & {
  className?: string
}

export const TableRoot = ({ className, ...props }: TableProps) => {
  return <table className={`${s.table} ${className}`} {...props} />
}

export type TableHeadProps = ComponentProps<'thead'> & {
  className?: string
}

export const TableHead = ({ className, ...props }: TableHeadProps) => {
  return <thead className={`${s.tablehead} ${className}`} {...props} />
}

export type TableBodyProps = ComponentProps<'tbody'> & {
  className?: string
}

export const TableBody = ({ className, ...props }: TableBodyProps) => {
  return <tbody className={` ${s.tablebody} ${className}`} {...props} />
}
export type TableRowProps = ComponentProps<'tr'> & {
  className?: string
}

export const TableRow = ({ className, ...props }: TableRowProps) => {
  return <tr className={`${s.tablerow} ${className}`} {...props} />
}

export type TableCellProps<T extends ElementType> = {
  as?: T
  className?: string
} & ComponentProps<T>

export const TableCell = <T extends ElementType = 'th' | 'td'>({
  as: Component,
  className,
  ...restProps
}: TableCellProps<T> & Omit<ComponentProps<T>, keyof TableCellProps<T>>) => {
  return (
    <Component
      className={`${Component === 'th' ? s.tablecellhead : s.tablecellbody} ${className}`}
      {...restProps}
    />
  )
}

export const TableHeader: FC<
  Omit<
    ComponentPropsWithoutRef<'thead'> & {
      columns: Column[]
      sort?: Sort | null
      onSort?: (sort: Sort | null) => void
    },
    'children'
  >
> = ({ columns, sort, onSort, ...restProps }) => {
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) return

    if (sort?.key !== key) return onSort({ key, direction: 'asc' })

    if (sort.direction === 'desc') return onSort(null)

    return onSort({
      key,
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
    })
  }

  return (
    <TableHead {...restProps}>
      <TableRow>
        {columns.map(({ title, key, sortable }) => (
          <TableCell as={'th'} key={key} onClick={handleSort(key, sortable)}>
            {title}
            {sort && sort.key === key && (
              <span>
                {sort.direction === 'asc' ? (
                  <img src={arrowUp} className={s.arrow} />
                ) : (
                  <img src={arrowDown} className={s.arrow} />
                )}
              </span>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export const Table = {
  TableRoot,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TableHeader,
}
