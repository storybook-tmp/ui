import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ErrorFallback from './ErrorFallback';

const meta = {
  component: ErrorFallback,
  title: 'Components/ErrorBoundary/ErrorFallback',
  decorators: [
    (Story) => (
      <div style={{ height: '400px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ErrorFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    homeURL: '/',
  },
  play: async (context) => {
    const canvas = context.canvas;
    const fallback = canvas.getByTestId('error-fallback');
    await expect(fallback).toBeVisible();

    const heading = canvas.getByRole('heading', { name: /error/i });
    await expect(heading).toBeVisible();

    const subtitle = canvas.getByText(/ouch/i);
    await expect(subtitle).toBeVisible();

    const link = canvas.getByRole('link', { name: /back to home/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/');
  },
};

export const WithCustomURL: Story = {
  args: {
    homeURL: '/dashboard',
  },
  play: async (context) => {
    const canvas = context.canvas;
    const link = canvas.getByRole('link', { name: /back to home/i });
    await expect(link).toHaveAttribute('href', '/dashboard');
  },
};
