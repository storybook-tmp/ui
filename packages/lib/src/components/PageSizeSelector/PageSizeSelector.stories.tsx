import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import PageSizeSelector from './index';

const meta = {
  component: PageSizeSelector,
  tags: ['ai-generated'],
} satisfies Meta<typeof PageSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 10,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /10 \/ page/i })).toBeVisible();
  },
};

export const LargePageSize: Story = {
  args: {
    value: 100,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /100 \/ page/i })).toBeVisible();
  },
};

export const Disabled: Story = {
  args: {
    value: 20,
    disabled: true,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /20 \/ page/i });
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  },
};
