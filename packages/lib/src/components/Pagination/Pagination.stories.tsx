import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Pagination from '.';

const meta = {
  component: Pagination,
  tags: ['ai-generated'],
  render: (args) => {
    const [page, setPage] = useState(args.currentPage);
    return <Pagination {...args} currentPage={page} onChange={setPage} />;
  },
  args: {
    currentPage: 0,
    totalResults: 50,
    pageSize: 10,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('1 / 5')).toBeVisible();
    // Navigate to next page — buttons use leftGlyph with aria-labels
    const buttons = canvas.getAllByRole('button');
    const nextButton = buttons[buttons.length - 1];
    await userEvent.click(nextButton);
    await expect(canvas.getByText('2 / 5')).toBeVisible();
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 0,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 4,
  },
};

export const WithCountLimit: Story = {
  args: {
    totalResults: 10000,
    countLimit: 10000,
  },
};

export const SinglePage: Story = {
  args: {
    totalResults: 5,
    pageSize: 10,
  },
};
