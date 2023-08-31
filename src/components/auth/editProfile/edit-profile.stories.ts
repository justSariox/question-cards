import type { Meta, StoryObj } from '@storybook/react'

import { EditProfile } from '@/components/auth/editProfile/edit-profile.tsx'

const meta = {
  title: 'Auth/EditProfile',
  component: EditProfile,
  tags: ['autodocs'],
} satisfies Meta<typeof EditProfile>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
