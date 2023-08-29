import { Meta } from '@storybook/react'

import {
  TableRoot,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table/table.tsx'

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
