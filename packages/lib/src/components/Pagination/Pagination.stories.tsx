import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Pagination from './index';

const meta = {
  component: Pagination,
  tags: ['ai-generated'],
  render: (args) => {
    const [page, setPage] = useState(args.currentPage);
    return <Pagination {...args} currentPage={page} onChange={setPage} />;
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 0,
    totalResults: 50,
    pageSize: 10,
  },
  play: async ({ canvas, userEvent }) => {
    // On page 1, prev should be disabled
    const prevButton = canvas.getByRole('button', { name: /chevron left/i });
    await expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    // Click next
    const nextButton = canvas.getByRole('button', { name: /chevron right/i });
    await userEvent.click(nextButton);
    // Page label should now show "2 / 5"
    await expect(canvas.getByText('2 / 5')).toBeVisible();
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 4,
    totalResults: 50,
    pageSize: 10,
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 0,
    totalResults: 5,
    pageSize: 10,
  },
};

export const WithCountLimit: Story = {
  args: {
    currentPage: 0,
    totalResults: 100,
    pageSize: 10,
    countLimit: 100,
  },
};
