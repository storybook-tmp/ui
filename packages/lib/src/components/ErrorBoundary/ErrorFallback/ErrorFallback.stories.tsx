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
  args: {
    homeURL: '/',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Error')).toBeVisible();
    await expect(
      canvas.getByText(/sorry about that/i),
    ).toBeVisible();
    const link = canvas.getByRole('link', { name: /back to home/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/');
  },
};

export const WithCustomHomeURL: Story = {
  args: {
    homeURL: '/dashboard',
  },
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: /back to home/i });
    await expect(link).toHaveAttribute('href', '/dashboard');
  },
};
