import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Pagination from './index';

const meta = {
  component: Pagination,
  tags: ['ai-generated'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 0,
    totalResults: 50,
    pageSize: 10,
  },
  render: (args) => {
    const [page, setPage] = useState(args.currentPage);
    return (
      <Pagination
        {...args}
        currentPage={page}
        onChange={setPage}
      />
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / 5')).toBeVisible();
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 4,
    totalResults: 50,
    pageSize: 10,
  },
  render: (args) => (
    <Pagination {...args} onChange={() => {}} />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('5 / 5')).toBeVisible();
    // Next button should be disabled on last page
    const nextButton = canvas.getByRole('button', { name: /chevron right/i });
    await expect(nextButton).toHaveAttribute('aria-disabled', 'true');
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 0,
    totalResults: 5,
    pageSize: 10,
  },
  render: (args) => (
    <Pagination {...args} onChange={() => {}} />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / 1')).toBeVisible();
  },
};
