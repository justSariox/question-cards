import type { Meta, StoryObj } from '@storybook/react'

import { Radio } from '@/components/ui/radioGroup/radioGroup.tsx'

const options = [
  { label: 'Did not know', value: 'Did not know' },
  { label: 'Forgot', value: 'Forgot' },
  { label: 'A lot of thought', value: 'A lot of thought' },
  { label: 'Сonfused', value: 'Сonfused' },
  { label: 'Knew the answer', value: 'Knew the answer' },
]

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
    disabled: false,
    options: options,
  },
}
