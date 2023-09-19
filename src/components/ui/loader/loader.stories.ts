import type { Meta, StoryObj } from '@storybook/react'

import { Loader } from './'

const meta = {
  title: 'Components/Loader',
  component: Loader,
  tags: ['autodocs'],

  argTypes: {
    isDisabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Loader>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
