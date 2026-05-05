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
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /10 \/ page/i })).toBeVisible();
  },
};

export const WithLargerPageSize: Story = {
  args: {
    value: 50,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /50 \/ page/i })).toBeVisible();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /10 \/ page/i });
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  },
};
