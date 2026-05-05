import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Pagination from './index';

const meta = {
  component: Pagination,
  tags: ['ai-generated'],
  args: {
    currentPage: 0,
    totalResults: 50,
    pageSize: 10,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  play: async ({ canvas }) => {
    const prevButton = canvas.getByRole('button', { name: /chevron.*left/i });
    await expect(prevButton).toHaveAttribute('aria-disabled', 'true');
  },
};

export const MiddlePage: Story = {
  args: { currentPage: 2 },
};

export const LastPage: Story = {
  args: { currentPage: 4 },
};

export const WithCountLimit: Story = {
  args: { currentPage: 0, totalResults: 100, countLimit: 100 },
};

export const SinglePage: Story = {
  args: { totalResults: 5 },
};
