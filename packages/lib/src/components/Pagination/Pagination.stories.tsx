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
  render: (args) => {
    const [page, setPage] = useState(args.currentPage ?? 0);
    return <Pagination {...args} currentPage={page} onChange={setPage} />;
  },
  args: {
    currentPage: 0,
    totalResults: 50,
    pageSize: 10,
  },
  play: async ({ canvas, userEvent }) => {
    // Shows page 1 / 5
    await expect(canvas.getByText('1 / 5')).toBeVisible();
    // Click next
    const nextBtn = canvas.getAllByRole('button')[1];
    await userEvent.click(nextBtn);
    await expect(canvas.getByText('2 / 5')).toBeVisible();
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 0,
    totalResults: 5,
    pageSize: 10,
    onChange: () => {},
  },
};

export const WithCountLimit: Story = {
  args: {
    currentPage: 0,
    totalResults: 1000,
    pageSize: 10,
    countLimit: 1000,
    onChange: () => {},
  },
};
