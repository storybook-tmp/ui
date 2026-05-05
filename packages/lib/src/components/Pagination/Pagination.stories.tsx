import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Pagination from '.';

const PaginationWrapper = ({
  totalResults = 100,
  pageSize = 10,
  initialPage = 0,
}: {
  totalResults?: number;
  pageSize?: number;
  initialPage?: number;
}) => {
  const [page, setPage] = useState(initialPage);
  return (
    <Pagination
      currentPage={page}
      totalResults={totalResults}
      pageSize={pageSize}
      onChange={setPage}
    />
  );
};

const meta = {
  component: Pagination,
  tags: ['ai-generated'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 0,
    totalResults: 100,
    pageSize: 10,
  },
  render: (args) => <PaginationWrapper totalResults={args.totalResults} pageSize={args.pageSize} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / 10')).toBeVisible();
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 4,
    totalResults: 100,
    pageSize: 10,
  },
  render: () => <PaginationWrapper initialPage={4} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('5 / 10')).toBeVisible();
  },
};

export const NavigateNext: Story = {
  args: {
    currentPage: 0,
    totalResults: 100,
    pageSize: 10,
  },
  render: () => <PaginationWrapper />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('1 / 10')).toBeVisible();
    const nextButton = canvas.getAllByRole('button').find(
      (btn) => btn.getAttribute('data-cy') === 'next-page-button',
    )!;
    await userEvent.click(nextButton);
    await expect(canvas.getByText('2 / 10')).toBeVisible();
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 9,
    totalResults: 100,
    pageSize: 10,
  },
  render: () => <PaginationWrapper initialPage={9} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('10 / 10')).toBeVisible();
    const nextButton = canvas.getAllByRole('button').find(
      (btn) => btn.getAttribute('data-cy') === 'next-page-button',
    )!;
    await expect(nextButton).toHaveAttribute('aria-disabled', 'true');
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 0,
    totalResults: 100,
    pageSize: 10,
  },
  render: () => <PaginationWrapper />,
  play: async ({ canvas }) => {
    const prevButton = canvas.getAllByRole('button').find(
      (btn) => btn.getAttribute('data-cy') === 'prev-page-button',
    )!;
    await expect(prevButton).toHaveAttribute('aria-disabled', 'true');
  },
};
