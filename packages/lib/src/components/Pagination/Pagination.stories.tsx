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
    totalResults: 100,
    pageSize: 10,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / 10')).toBeVisible();
    // First page - prev button should be aria-disabled
    const buttons = canvas.getAllByRole('button');
    await expect(buttons[0]).toHaveAttribute('aria-disabled', 'true');
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
  play: async ({ canvas }) => {
    await expect(canvas.getByText('10 / 10')).toBeVisible();
    // Last page - next button should be aria-disabled
    const buttons = canvas.getAllByRole('button');
    await expect(buttons[1]).toHaveAttribute('aria-disabled', 'true');
  },
};
