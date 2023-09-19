import type { Meta, StoryObj } from '@storybook/react'

import { Tabs } from './'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],

  argTypes: {
    isDisabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    isDisabled: false,
  },
}
