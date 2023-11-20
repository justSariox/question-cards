import type { Meta, StoryObj } from '@storybook/react'

import { Header } from '@/components/ui/header/header.tsx'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    isLoggedIn: {
      options: [false, true],
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderBtn: Story = {
  args: {
    isLoggedIn: false,
    user: {
      name: 'John',
      avatar: '',
      updated: '',
      email: '',
      isEmailVerified: true,
      created: '',
      id: '',
    },
  },
}

export const HeaderAvatar: Story = {
  args: {
    isLoggedIn: true,
    user: {
      name: 'John',
      avatar: '',
      updated: '',
      email: '',
      isEmailVerified: true,
      created: '',
      id: '',
    },
  },
}
