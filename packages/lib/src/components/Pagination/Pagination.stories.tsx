import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Pagination from './index';

const meta = {
  component: Pagination,
  tags: ['ai-generated'],
  args: {
    currentPage: 0,
    totalResults: 100,
    pageSize: 10,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / 10')).toBeVisible();
  },
};

export const MiddlePage: Story = {
  args: { currentPage: 4 },
};

export const LastPage: Story = {
  args: { currentPage: 9, totalResults: 100, pageSize: 10 },
};

export const WithCountLimit: Story = {
  args: { countLimit: 50, totalResults: 100 },
};
