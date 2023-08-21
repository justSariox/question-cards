import { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultCheckbox: Story = {
  args: {
    label: 'Check it',
    disabled: false,
    checked: false,
  },
}

export const CheckedCheckbox: Story = {
  args: {
    label: 'Check it',
    disabled: false,
    checked: true,
  },
}

export const DisabledCheckbox: Story = {
  args: {
    label: 'Check it',
    disabled: true,
    checked: true,
  },
}
