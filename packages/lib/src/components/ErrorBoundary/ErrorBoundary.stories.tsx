import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ErrorBoundary from './index';
import ErrorFallback from './ErrorFallback/ErrorFallback';

const meta = {
  component: ErrorBoundary,
  tags: ['ai-generated'],
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithChild: Story = {
  args: {
    homeURL: '/',
    children: <div>App content renders normally</div>,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('App content renders normally'),
    ).toBeVisible();
  },
};

export const ErrorFallbackView: Story = {
  args: {
    homeURL: '/dashboard',
    children: <div />,
  },
  render: (args) => <ErrorFallback homeURL={args.homeURL} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Error')).toBeVisible();
    await expect(canvas.getByText(/sorry about that/i)).toBeVisible();
    const homeLink = canvas.getByRole('link', { name: /back to home/i });
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute('href', '/dashboard');
  },
};

export const ErrorFallbackStyles: Story = {
  args: {
    homeURL: '/',
    children: <div />,
  },
  render: (args) => <ErrorFallback homeURL={args.homeURL} />,
  play: async ({ canvas }) => {
    const heading = canvas.getByText('Error');
    // ErrorFallback heading has white color
    await expect(getComputedStyle(heading).color).toBe('rgb(255, 255, 255)');
  },
};
