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

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / 5')).toBeVisible();
  },
};

export const MiddlePage: Story = {
  args: { currentPage: 2 },
};

export const LastPage: Story = {
  args: { currentPage: 4 },
};

export const WithCountLimit: Story = {
  args: { currentPage: 0, totalResults: 100, pageSize: 10, countLimit: 100 },
};

export const NextPage: Story = {
  args: { currentPage: 0, onChange: () => {} },
  play: async ({ canvasElement }) => {
    const nextButton = canvasElement.querySelector('[data-cy="next-page-button"]') as HTMLElement;
    await expect(nextButton).not.toBeNull();
    const prevButton = canvasElement.querySelector('[data-cy="prev-page-button"]') as HTMLElement;
    await expect(prevButton).not.toBeNull();
    await expect(prevButton).toHaveAttribute('aria-disabled', 'true');
  },
};
