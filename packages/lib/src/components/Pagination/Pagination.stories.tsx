import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Pagination from './index';

const meta = {
  component: Pagination,
  tags: ['ai-generated'],
  args: {
    totalResults: 100,
    pageSize: 10,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 0,
    onChange: () => {},
  },
  play: async ({ canvas }) => {
    // Verify page indicator renders the correct text
    await expect(canvas.getByText('1 / 10')).toBeVisible();
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 4,
    onChange: () => {},
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 9,
    onChange: () => {},
  },
};

export const WithCountLimit: Story = {
  args: {
    currentPage: 0,
    countLimit: 50,
    totalResults: 100,
    onChange: () => {},
  },
};
