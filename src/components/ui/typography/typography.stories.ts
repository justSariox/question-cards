import { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/components/ui/typography/'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'large',
        'h1',
        'h2',
        'h3',
        'body1',
        'subtitle1',
        'body2',
        'subtitle2',
        'caption',
        'overline',
        'link1',
        'link2',
      ],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    variant: 'large',
    children: 'Large text',
  },
}
export const H1: Story = {
  args: {
    variant: 'h1',
    children: 'h1 text',
  },
}
export const H2: Story = {
  args: {
    variant: 'h2',
    children: 'h2 text',
  },
}
export const H3: Story = {
  args: {
    variant: 'h3',
    children: 'h3 text',
  },
}
export const Body1: Story = {
  args: {
    variant: 'body1',
    children: 'body1 text',
  },
}
export const Subtitle1: Story = {
  args: {
    variant: 'subtitle1',
    children: 'subtitle1 text',
  },
}
export const Body2: Story = {
  args: {
    variant: 'body2',
    children: 'body2 text',
  },
}
export const Subtitle2: Story = {
  args: {
    variant: 'subtitle2',
    children: 'subtitle2 text',
  },
}
export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'caption text',
  },
}
export const Overline: Story = {
  args: {
    variant: 'overline',
    children: 'overline text',
  },
}
export const Link1: Story = {
  args: {
    variant: 'link1',
    children: 'link1 text',
  },
}
export const Link2: Story = {
  args: {
    variant: 'link2',
    children: 'link2 text',
  },
}
