import { useMemo, useState } from 'react'

import { Meta } from '@storybook/react'

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from '@/components/ui/table'

export default {
  title: 'Components/Table',
  component: TableRoot,
} as Meta<typeof TableRoot>

export const Table = {
  args: {
    children: (
      <>
        <TableHead>
          <TableRow>
            <TableCell as={'th'}>test1</TableCell>
            <TableCell as={'th'}>test2</TableCell>
            <TableCell as={'th'}>test3</TableCell>
            <TableCell as={'th'}>test4</TableCell>
            <TableCell as={'th'}>test5</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell as={'td'}>test1</TableCell>
            <TableCell as={'td'}>test2</TableCell>
            <TableCell as={'td'}>test3</TableCell>
            <TableCell as={'td'}>test4</TableCell>
            <TableCell as={'td'}>test5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as={'td'}>test1</TableCell>
            <TableCell as={'td'}>test2</TableCell>
            <TableCell as={'td'}>test3</TableCell>
            <TableCell as={'td'}>test4</TableCell>
            <TableCell as={'td'}>test5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as={'td'}>test1</TableCell>
            <TableCell as={'td'}>test2</TableCell>
            <TableCell as={'td'}>test3</TableCell>
            <TableCell as={'td'}>test4</TableCell>
            <TableCell as={'td'}>test5</TableCell>
          </TableRow>
        </TableBody>
      </>
    ),
  },
}

export type Sort = {
  key: string
  direction: 'asc' | 'desc'
}

type Column = {
  key: string
  title: string
  sortable?: boolean
}

const data = [
  {
    title: 'test1',
    cardsCount: 5,
    updated: 'test1updated',
    createdBy: 'test1created',
  },
  {
    title: 'test2',
    cardsCount: 7,
    updated: 'test2updated',
    createdBy: 'test2created',
  },
  {
    title: 'test3',
    cardsCount: 121,
    updated: 'test3updated',
    createdBy: 'test3created',
  },
]

const columns: Column[] = [
  {
    key: 'title',
    title: 'Name',
    sortable: true,
  },
  {
    key: 'cardsCount',
    title: 'Cards',
    sortable: true,
  },
  {
    key: 'updated',
    title: 'Last Updated',
    sortable: true,
  },
  {
    key: 'createdBy',
    title: 'Created by',
    sortable: true,
  },
]

export const WithSort = {
  render: () => {
    const [sort, setSort] = useState<Sort | null>(null)

    /*
        const sortedString = useMemo(() => {
          if (!sort) return null

          return `${sort.key}-${sort.direction}`
        }, [sort])
    */

    const sortedData = useMemo(() => {
      if (!sort) return data

      const sortedData = [...data]

      sortedData.sort((a: any, b: any) => {
        if (a[sort.key] < b[sort.key]) {
          return sort.direction === 'asc' ? -1 : 1
        }
        if (a[sort.key] > b[sort.key]) {
          return sort.direction === 'desc' ? 1 : -1
        }

        return 0
      })

      return sortedData
    }, [data, sort])

    return (
      <TableRoot>
        <TableHeader columns={columns} sort={sort} onSort={setSort} />
        <TableBody>
          {sortedData.map(i => (
            <TableRow key={i.title}>
              <TableCell as={'td'}>{i.title}</TableCell>
              <TableCell as={'td'}>{i.cardsCount}</TableCell>
              <TableCell as={'td'}>{i.createdBy}</TableCell>
              <TableCell as={'td'}>{i.updated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    )
  },
}
