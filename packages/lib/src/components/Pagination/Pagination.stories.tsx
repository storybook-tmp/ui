import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import Pagination from './index';

const meta = {
  component: Pagination,
  tags: ['ai-generated'],
  args: {
    currentPage: 0,
    totalResults: 100,
    pageSize: 10,
    onChange: fn(),
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    // Prev button is disabled on first page (LeafyGreen uses aria-disabled)
    await expect(canvas.getByRole('button', { name: /chevron left/i })).toHaveAttribute('aria-disabled', 'true');
    await expect(canvas.getByRole('button', { name: /chevron right/i })).toHaveAttribute('aria-disabled', 'false');
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 4,
    totalResults: 100,
    pageSize: 10,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('5 / 10')).toBeVisible();
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 9,
    totalResults: 100,
    pageSize: 10,
  },
};

export const WithCountLimit: Story = {
  args: {
    currentPage: 0,
    totalResults: 500,
    pageSize: 10,
    countLimit: 500,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / many')).toBeVisible();
  },
};
