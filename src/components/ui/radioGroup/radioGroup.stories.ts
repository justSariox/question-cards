import type { Meta, StoryObj } from '@storybook/react'

import { Radio } from '@/components/ui/radioGroup/radioGroup.tsx'

const meta = {
  title: 'Components/RadioGroup',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      options: [false, true],
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const RadioDisabled: Story = {
  args: {
    disabled: true,
  },
}
