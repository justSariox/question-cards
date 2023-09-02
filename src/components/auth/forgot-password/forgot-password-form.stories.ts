import type { Meta, StoryObj } from '@storybook/react'

import { forgotPasswordForm } from './forgot-password-form.tsx'

const meta = {
  title: 'Auth/forgotPasswordForm',
  component: forgotPasswordForm,
  tags: ['autodocs'],
} satisfies Meta<typeof forgotPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
