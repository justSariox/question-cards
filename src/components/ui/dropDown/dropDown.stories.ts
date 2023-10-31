import { Meta, StoryObj } from '@storybook/react'

import { DropDown } from './'

const meta = {
  title: 'Components/DropDown',
  component: DropDown,
  tags: ['autodocs'],
} satisfies Meta<typeof DropDown>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultDropDown: Story = {
  args: {},
}
