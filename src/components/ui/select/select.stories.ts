import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],

  argTypes: {
    isDisabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    selectItems: [
      { label: 'Apple', value: 'Apple' },
      { label: 'Lenovo', value: 'Lenovo' },
      { label: 'Asus', value: 'Asus' },
      { label: 'Sony', value: 'Sony' },
    ],
    isDisabled: false,
  },
}
