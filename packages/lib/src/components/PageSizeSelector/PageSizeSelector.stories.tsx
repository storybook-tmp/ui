import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import PageSizeSelector from '.';

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
    const select = canvas.getByRole('button', { name: /10 \/ page/i });
    await expect(select).toBeVisible();
  },
};

export const LargePageSize: Story = {
  args: {
    value: 100,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    const select = canvas.getByRole('button', { name: /100 \/ page/i });
    await expect(select).toBeVisible();
  },
};

export const Disabled: Story = {
  args: {
    value: 20,
    disabled: true,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    const select = canvas.getByRole('button', { name: /20 \/ page/i });
    await expect(select).toBeVisible();
    await expect(select).toHaveAttribute('aria-disabled', 'true');
  },
};
