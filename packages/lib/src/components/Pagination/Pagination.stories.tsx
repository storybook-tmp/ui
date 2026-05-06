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

export const FirstPage: Story = {
  play: async ({ canvas }) => {
    // On first page, prev button should be disabled
    const prevButton = canvas.getByRole('button', { name: /chevron left/i });
    await expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    // Page label shows "1 / 10"
    await expect(canvas.getByText('1 / 10')).toBeVisible();
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 4,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 9,
  },
};

export const WithCountLimit: Story = {
  args: {
    countLimit: 50,
    totalResults: 100,
  },
};

export const SinglePage: Story = {
  args: {
    totalResults: 5,
    pageSize: 10,
  },
};
