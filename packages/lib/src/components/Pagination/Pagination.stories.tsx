import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
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
    totalResults: 100,
    pageSize: 10,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / 10')).toBeVisible();
    // prev button should be disabled on first page
    const buttons = canvas.getAllByRole('button');
    await expect(buttons[0]).toHaveAttribute('aria-disabled', 'true');
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 4,
    totalResults: 100,
    pageSize: 10,
    onChange: fn(),
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
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('10 / 10')).toBeVisible();
    // next button should be disabled on last page
    const buttons = canvas.getAllByRole('button');
    await expect(buttons[1]).toHaveAttribute('aria-disabled', 'true');
  },
};

export const WithCountLimit: Story = {
  args: {
    currentPage: 0,
    totalResults: 5000,
    pageSize: 10,
    countLimit: 5000,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/many/)).toBeVisible();
  },
};
