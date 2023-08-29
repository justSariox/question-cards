import { ComponentProps, ElementType } from 'react'

import s from './table.module.scss'

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

export const Table = {
  TableRoot,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
}
