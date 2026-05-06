import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ErrorFallback from './ErrorFallback';

const meta = {
  component: ErrorFallback,
  tags: ['ai-generated'],
} satisfies Meta<typeof ErrorFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { homeURL: '/' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Error')).toBeVisible();
    const link = canvas.getByRole('link', { name: /back to home/i });
    await expect(link).toHaveAttribute('href', '/');
  },
};
