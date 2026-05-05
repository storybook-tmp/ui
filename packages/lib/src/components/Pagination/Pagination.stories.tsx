import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Pagination from './index';

const meta = {
  component: Pagination,
  tags: ['ai-generated'],
  args: {
    totalResults: 100,
    pageSize: 10,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 0,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / 10')).toBeVisible();
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 4,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 9,
  },
};

export const Interactive: Story = {
  args: {
    currentPage: 0,
  },
  render: (args) => {
    const [page, setPage] = useState(0);
    return <Pagination {...args} currentPage={page} onChange={setPage} />;
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('1 / 10')).toBeVisible();
    const nextButton = canvas.getByRole('button', { name: /chevron right/i });
    await userEvent.click(nextButton);
    await expect(canvas.getByText('2 / 10')).toBeVisible();
  },
};
