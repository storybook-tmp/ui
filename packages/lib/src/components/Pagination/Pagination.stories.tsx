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
    return <Pagination {...args} currentPage={page} onChange={setPage} />;
  },
  play: async ({ canvas, userEvent }) => {
    const buttons = canvas.getAllByRole('button');
    // Second button is the "next" button
    await userEvent.click(buttons[1]);
    await expect(canvas.getByText('2 / 5')).toBeVisible();
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 0,
    totalResults: 100,
    pageSize: 20,
    onChange: () => {},
  },
  play: async ({ canvas }) => {
    const buttons = canvas.getAllByRole('button');
    // First button is the "prev" button — should be disabled on page 0
    await expect(buttons[0]).toHaveAttribute('aria-disabled', 'true');
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 4,
    totalResults: 50,
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
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / many')).toBeVisible();
  },
};
