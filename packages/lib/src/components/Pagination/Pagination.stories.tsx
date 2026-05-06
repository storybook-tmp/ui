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
    // Previous button should be disabled on first page (LeafyGreen uses aria-disabled)
    const prevButton = canvas.getAllByRole('button')[0];
    await expect(prevButton).toHaveAttribute('aria-disabled', 'true');
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
    // Both buttons should be enabled
    const buttons = canvas.getAllByRole('button');
    await expect(buttons[0]).toBeEnabled();
    await expect(buttons[1]).toBeEnabled();
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
    // Next button should be disabled on last page (LeafyGreen uses aria-disabled)
    const buttons = canvas.getAllByRole('button');
    await expect(buttons[1]).toHaveAttribute('aria-disabled', 'true');
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
    await expect(canvas.getByText('1 / many')).toBeVisible();
  },
};
