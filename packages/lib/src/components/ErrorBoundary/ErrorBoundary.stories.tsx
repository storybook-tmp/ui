import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ErrorBoundary from '.';

const ThrowingComponent = () => {
  throw new Error('Test error');
};

const meta = {
  component: ErrorBoundary,
  tags: ['ai-generated'],
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    homeURL: '/',
    children: <div>Application content renders normally</div>,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Application content renders normally'),
    ).toBeVisible();
  },
};

export const WithError: Story = {
  args: {
    homeURL: '/',
    children: null,
  },
  render: () => (
    <ErrorBoundary homeURL="/">
      <ThrowingComponent />
    </ErrorBoundary>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Error')).toBeVisible();
    await expect(canvas.getByText('Back To Home')).toBeVisible();
  },
};

export const CustomHomeURL: Story = {
  args: {
    homeURL: '/dashboard',
    children: null,
  },
  render: () => (
    <ErrorBoundary homeURL="/dashboard">
      <ThrowingComponent />
    </ErrorBoundary>
  ),
  play: async ({ canvas }) => {
    const link = canvas.getByText('Back To Home');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/dashboard');
  },
};
