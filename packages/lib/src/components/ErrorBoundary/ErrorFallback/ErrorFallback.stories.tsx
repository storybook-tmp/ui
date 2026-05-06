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
    const link = canvas.getByRole('link', { name: /back to home/i });
    await expect(link).toHaveAttribute('href', '/');
  },
};

// CssCheck: ErrorFallback's Center div uses background-color: #5bbf7d
export const CssCheck: Story = {
  play: async ({ canvasElement }) => {
    const container = canvasElement.querySelector('[data-cy="error-fallback"]');
    await expect(getComputedStyle(container!).backgroundColor).toBe('rgb(91, 191, 125)');
  },
};
