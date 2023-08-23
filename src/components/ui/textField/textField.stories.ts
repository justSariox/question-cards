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
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Input: Story = {
  args: {
    /*    variant: 'primary',
        children: 'Primary TextField',
        disabled: false,*/
  },
}

export const Password: Story = {
  args: {
    /*    variant: 'secondary',
        children: 'Secondary TextField',
        disabled: false,*/
  },
}
export const Search: Story = {
  args: {
    /*    variant: 'tertiary',
        children: 'Tertiary TextField',
        disabled: false,*/
  },
}
