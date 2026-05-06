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
    await expect(canvas.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
  },
};
