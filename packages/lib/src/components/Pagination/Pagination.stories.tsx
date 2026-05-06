import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Pagination from './index';

const PaginationWrapper = (props: { totalResults: number; pageSize: number }) => {
  const [page, setPage] = useState(0);
  return (
    <Pagination
      currentPage={page}
      onChange={setPage}
      pageSize={props.pageSize}
      totalResults={props.totalResults}
    />
  );
};

const meta = {
  component: Pagination,
  tags: ['ai-generated'],
  render: (args) => <PaginationWrapper pageSize={args.pageSize} totalResults={args.totalResults} />,
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
    // Should show page 1 / 5
    await expect(canvas.getByText('1 / 5')).toBeVisible();
    // Click next - button has aria-label from the ChevronRight icon
    const nextBtn = canvas.getByRole('button', { name: /chevron right/i });
    await userEvent.click(nextBtn);
    await expect(canvas.getByText('2 / 5')).toBeVisible();
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
    totalResults: 10000,
    pageSize: 10,
    countLimit: 10000,
  },
  render: () => (
    <Pagination
      countLimit={10000}
      currentPage={0}
      pageSize={10}
      totalResults={10000}
    />
  ),
};
