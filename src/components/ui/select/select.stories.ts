import type { Meta, StoryObj } from '@storybook/react'

import { Select, SelectItemType } from './'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Select>

const selectItems: SelectItemType[] = [
  { id: 'optinon1', option: 'option1' },
  { id: 'optinon2', option: 'option2' },
  { id: 'optinon3', option: 'option3' },
]

export default meta
type Story = StoryObj<typeof meta>

export const Secondary: Story = {
  args: {
    label: 'test select',
    selectItems: selectItems,
  },
}
