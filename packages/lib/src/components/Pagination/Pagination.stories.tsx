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

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / 10')).toBeVisible();
  },
};

export const MiddlePage: Story = {
  args: { currentPage: 4 },
};

export const LastPage: Story = {
  args: { currentPage: 9 },
  play: async ({ canvasElement }) => {
    const nextButton = canvasElement.querySelector('[data-cy="next-page-button"]');
    await expect(nextButton).toHaveAttribute('aria-disabled', 'true');
  },
};

export const FirstPage: Story = {
  args: { currentPage: 0 },
  play: async ({ canvasElement }) => {
    const prevButton = canvasElement.querySelector('[data-cy="prev-page-button"]');
    await expect(prevButton).toHaveAttribute('aria-disabled', 'true');
  },
};
