import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import IconWithTooltip from '.';

const meta = {
  component: IconWithTooltip,
  tags: ['ai-generated'],
} satisfies Meta<typeof IconWithTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    glyph: 'InfoWithCircle',
    children: 'This is helpful tooltip information.',
  },
  play: async ({ canvas }) => {
    const icon = canvas.getByRole('img', { name: /info with circle/i });
    await expect(icon).toBeVisible();
  },
};

export const WarningIcon: Story = {
  args: {
    glyph: 'Warning',
    children: 'Warning: This action may have consequences.',
  },
  play: async ({ canvas }) => {
    const icon = canvas.getByRole('img', { name: /warning/i });
    await expect(icon).toBeVisible();
  },
};

export const WithHover: Story = {
  args: {
    glyph: 'QuestionMarkWithCircle',
    children: 'Hover tooltip content',
  },
  render: (args) => (
    <div style={{ padding: '60px' }}>
      <IconWithTooltip {...args} />
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const icon = canvas.getByRole('img', { name: /question mark with circle/i });
    await expect(icon).toBeVisible();
    await userEvent.hover(icon);
    await waitFor(() => {
      expect(canvas.getByText('Hover tooltip content')).toBeVisible();
    });
  },
};
