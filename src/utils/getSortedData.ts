import { Sort } from '@/components/ui/table/table.stories.tsx'

type SortedDataType<T> = T
export const getSortedData = (data: SortedDataType<any>, sort: Sort | null) => {
  if (!sort) return data

  const sortedData = [...data]

  sortedData.sort((a, b) => {
    if (a[sort.key] < b[sort.key]) {
      return sort.direction === 'asc' ? -1 : 1
    }
    if (a[sort.key] > b[sort.key]) {
      return sort.direction === 'desc' ? 1 : -1
    }

    return 0
  })

  return sortedData
}
