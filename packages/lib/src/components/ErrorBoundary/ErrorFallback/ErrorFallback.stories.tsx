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
    await expect(canvas.getByText('Error')).toBeVisible();
    await expect(canvas.getByText(/sorry about that/i)).toBeVisible();
    const link = canvas.getByRole('link', { name: /back to home/i });
    await expect(link).toHaveAttribute('href', '/');
  },
};

export const CssCheck: Story = {
  play: async ({ canvasElement }) => {
    // ErrorFallback uses background-color: #5bbf7d on the Center div
    const centerDiv = canvasElement.querySelector('[data-cy="error-fallback"]');
    await expect(getComputedStyle(centerDiv!).backgroundColor).toBe('rgb(91, 191, 125)');
  },
};
