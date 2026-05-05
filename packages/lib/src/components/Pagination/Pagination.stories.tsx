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
    totalResults: 100,
    pageSize: 10,
  },
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
};

export const LastPage: Story = {
  args: {
    currentPage: 9,
    totalResults: 100,
    pageSize: 10,
  },
};

export const WithCountLimit: Story = {
  args: {
    currentPage: 0,
    totalResults: 5000,
    pageSize: 10,
    countLimit: 5000,
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [page, setPage] = useState(0);
    return <Pagination {...args} currentPage={page} onChange={setPage} />;
  },
  args: {
    currentPage: 0,
    totalResults: 50,
    pageSize: 10,
  },
  play: async ({ canvas, userEvent }) => {
    const buttons = canvas.getAllByRole('button');
    // The second button is the "next page" button
    const nextButton = buttons[1];
    await userEvent.click(nextButton);
    await expect(canvas.getByText('2 / 5')).toBeVisible();
  },
};
