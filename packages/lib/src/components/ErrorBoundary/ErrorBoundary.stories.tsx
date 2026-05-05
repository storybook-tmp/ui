import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ErrorFallback from './ErrorFallback/ErrorFallback';

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
    await expect(canvas.getByText(/sorry about that/i)).toBeVisible();
    await expect(canvas.getByText('Back To Home')).toBeVisible();
  },
};

export const WithCustomHomeURL: Story = {
  args: {
    homeURL: '/dashboard',
  },
  play: async ({ canvas }) => {
    const link = canvas.getByText('Back To Home');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/dashboard');
  },
};
