import { Meta, StoryObj } from '@storybook/react'

import { DropDown } from './'

import { User } from '@/services/auth/types.ts'

const meta = {
  title: 'Components/DropDown',
  component: DropDown,
  tags: ['autodocs'],
} satisfies Meta<typeof DropDown>

const TestUser: User = {
  avatar: '',
  updated: '',
  name: 'test',
  id: '',
  created: '',
  email: '',
  isEmailVerified: true,
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultDropDown: Story = {
  args: {
    user: { ...TestUser },
    deckId: '',
  },
}
