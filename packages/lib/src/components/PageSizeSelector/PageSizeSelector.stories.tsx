import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import PageSizeSelector from './index';

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

export const LargePageSize: Story = {
  render: () => {
    const [value, setValue] = useState(100);
    return <PageSizeSelector value={value} onChange={setValue} />;
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /100 \/ page/i })).toBeVisible();
  },
};

export const Disabled: Story = {
  render: () => {
    return <PageSizeSelector value={10} onChange={() => {}} disabled />;
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /10 \/ page/i });
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  },
};
