import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from './'

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['text', 'password', 'search'],
      control: { type: 'radio' },
    },
    error: {
      options: [undefined, 'Error!', 'Error message'],
      control: { type: 'radio' },
    },
    label: {
      options: ['Input'],
      control: { type: 'text' },
    },
    value: {
      options: ['Input'],
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Input: Story = {
  args: {
    type: 'text',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
  },
}
export const Search: Story = {
  args: {
    type: 'search',
  },
}
