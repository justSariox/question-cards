import { Meta, StoryObj } from '@storybook/react'

import { Slider } from './slider.tsx'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],

  argTypes: {
    // isDisabled: {
    //   options: [true, false],
    //   control: { type: 'radio' },
    // },
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    value: [0, 100],
    range: [0, 100],
  },
}
