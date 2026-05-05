import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Pagination from '.';

const meta = {
  component: Pagination,
  tags: ['ai-generated'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 0,
    totalResults: 50,
    pageSize: 10,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / 5')).toBeVisible();
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 2,
    totalResults: 50,
    pageSize: 10,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('3 / 5')).toBeVisible();
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 4,
    totalResults: 50,
    pageSize: 10,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('5 / 5')).toBeVisible();
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
    await expect(canvas.getByText(/1 \/ many/)).toBeVisible();
  },
};

export const NoResults: Story = {
  args: {
    currentPage: 0,
    totalResults: 0,
    pageSize: 10,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('0 / 0')).toBeVisible();
  },
};
