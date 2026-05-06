import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import PageSizeSelector from '.';

const meta = {
  component: PageSizeSelector,
  tags: ['ai-generated'],
  args: {
    value: 10,
    onChange: () => {},
  },
} satisfies Meta<typeof PageSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(10);
    return <PageSizeSelector value={value} onChange={setValue} />;
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /10 \/ page/i })).toBeVisible();
  },
};

export const WithLargePageSize: Story = {
  render: () => {
    const [value, setValue] = useState(100);
    return <PageSizeSelector value={value} onChange={setValue} />;
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /100 \/ page/i })).toBeVisible();
  },
};

export const Disabled: Story = {
  render: () => (
    <PageSizeSelector value={20} onChange={() => {}} disabled />
  ),
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /20 \/ page/i });
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  },
};
