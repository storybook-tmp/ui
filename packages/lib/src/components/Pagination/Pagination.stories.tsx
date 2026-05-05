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
    // The prev button uses data-cy, query by role and position
    const buttons = canvas.getAllByRole('button');
    const prevButton = buttons[0];
    await expect(prevButton).toHaveAttribute('aria-disabled', 'true');
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 4,
    totalResults: 100,
    pageSize: 10,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 9,
    totalResults: 100,
    pageSize: 10,
  },
};
