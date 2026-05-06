import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { fn } from 'storybook/test';
import PageSizeSelector from './index';

const meta = {
  component: PageSizeSelector,
  tags: ['ai-generated'],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof PageSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 10,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /10 \/ page/i })).toBeVisible();
  },
};

export const LargePageSize: Story = {
  args: {
    value: 100,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /100 \/ page/i })).toBeVisible();
  },
};

export const Disabled: Story = {
  args: {
    value: 10,
    disabled: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /10 \/ page/i })).toHaveAttribute('aria-disabled', 'true');
  },
};
