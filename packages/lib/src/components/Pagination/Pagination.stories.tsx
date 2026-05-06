import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Pagination from '.';

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
  render: () => {
    const [page, setPage] = useState(0);
    return (
      <Pagination
        currentPage={page}
        totalResults={100}
        pageSize={10}
        onChange={setPage}
      />
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / 10')).toBeVisible();
  },
};

export const MiddlePage: Story = {
  render: () => {
    const [page, setPage] = useState(4);
    return (
      <Pagination
        currentPage={page}
        totalResults={100}
        pageSize={10}
        onChange={setPage}
      />
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('5 / 10')).toBeVisible();
  },
};

export const NavigateNext: Story = {
  render: () => {
    const [page, setPage] = useState(0);
    return (
      <Pagination
        currentPage={page}
        totalResults={50}
        pageSize={10}
        onChange={setPage}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('1 / 5')).toBeVisible();
    // The next-page button is the second small button in the pagination
    const buttons = canvas.getAllByRole('button');
    const nextButton = buttons[1];
    await userEvent.click(nextButton);
    await expect(canvas.getByText('2 / 5')).toBeVisible();
  },
};

export const WithCountLimit: Story = {
  render: () => {
    const [page, setPage] = useState(0);
    return (
      <Pagination
        currentPage={page}
        totalResults={1000}
        pageSize={10}
        countLimit={1000}
        onChange={setPage}
      />
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / many')).toBeVisible();
  },
};
