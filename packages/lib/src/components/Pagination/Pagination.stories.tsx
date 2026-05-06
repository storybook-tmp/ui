import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Pagination from './index';

const meta = {
  component: Pagination,
  tags: ['ai-generated'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: {
    currentPage: 0,
    totalResults: 50,
    pageSize: 10,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / 5')).toBeVisible();
    // Prev button should be disabled on first page
    const prevButton = canvas.getAllByRole('button')[0];
    await expect(prevButton).toHaveAttribute('aria-disabled', 'true');
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 2,
    totalResults: 50,
    pageSize: 10,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 4,
    totalResults: 50,
    pageSize: 10,
  },
};

export const WithCountLimit: Story = {
  args: {
    currentPage: 0,
    totalResults: 1000,
    pageSize: 10,
    countLimit: 1000,
  },
  play: async ({ canvas }) => {
    // When totalResults >= countLimit, displays "many"
    await expect(canvas.getByText(/many/)).toBeVisible();
  },
};
