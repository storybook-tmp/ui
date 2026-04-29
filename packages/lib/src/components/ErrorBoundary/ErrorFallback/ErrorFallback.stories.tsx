import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ErrorFallback from './ErrorFallback';

const meta = {
  component: ErrorFallback,
  tags: ['ai-generated'],
  args: {
    homeURL: '/',
  },
} satisfies Meta<typeof ErrorFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: /back to home/i });
    await expect(link).toHaveAttribute('href', '/');
  },
};

export const CssCheck: Story = {
  args: { homeURL: '/home' },
  play: async ({ canvas }) => {
    const container = canvas.getByText('Error').closest('div')!;
    // ErrorFallback uses palette.white for the header color
    await expect(getComputedStyle(container).color).toBe('rgb(255, 255, 255)');
  },
};
