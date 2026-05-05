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
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / 5')).toBeVisible();
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 2,
    totalResults: 50,
    pageSize: 10,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('3 / 5')).toBeVisible();
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 4,
    totalResults: 50,
    pageSize: 10,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('5 / 5')).toBeVisible();
  },
};

export const WithCountLimit: Story = {
  args: {
    currentPage: 0,
    totalResults: 100,
    pageSize: 10,
    countLimit: 100,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / many')).toBeVisible();
  },
};

export const Interactive: Story = {
  args: {
    currentPage: 0,
    totalResults: 30,
    pageSize: 10,
  },
  render: () => {
    const [page, setPage] = useState(0);
    return (
      <Pagination
        currentPage={page}
        onChange={setPage}
        totalResults={30}
        pageSize={10}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('1 / 3')).toBeVisible();
    // Click next
    const buttons = canvas.getAllByRole('button');
    const nextButton = buttons[1];
    await userEvent.click(nextButton);
    await expect(canvas.getByText('2 / 3')).toBeVisible();
  },
};
