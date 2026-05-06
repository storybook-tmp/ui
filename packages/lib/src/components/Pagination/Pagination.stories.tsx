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
    // Prev button should be disabled on first page (LeafyGreen uses aria-disabled)
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
  play: async ({ canvas }) => {
    await expect(canvas.getByText('3 / 5')).toBeVisible();
    // Both buttons should be enabled
    const buttons = canvas.getAllByRole('button');
    await expect(buttons[0]).not.toBeDisabled();
    await expect(buttons[1]).not.toBeDisabled();
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
    // Next button should be disabled on last page (LeafyGreen uses aria-disabled)
    const buttons = canvas.getAllByRole('button');
    await expect(buttons[1]).toHaveAttribute('aria-disabled', 'true');
  },
};
