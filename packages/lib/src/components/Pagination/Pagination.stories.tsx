import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Pagination from './index';

const meta = {
  component: Pagination,
  tags: ['ai-generated'],
  args: {
    pageSize: 10,
    totalResults: 50,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: { currentPage: 0 },
  play: async ({ canvas }) => {
    // On first page, prev button should be disabled
    const prevButton = canvas.getByRole('button', { name: /chevron left icon/i });
    await expect(prevButton).toHaveAttribute('aria-disabled', 'true');
  },
};

export const MiddlePage: Story = {
  args: { currentPage: 2 },
};

export const LastPage: Story = {
  args: { currentPage: 4 },
};

export const Interactive: Story = {
  render: (args) => {
    const [page, setPage] = useState(0);
    return <Pagination {...args} currentPage={page} onChange={setPage} />;
  },
  args: { currentPage: 0, totalResults: 30, pageSize: 10 },
  play: async ({ canvas, userEvent }) => {
    // Click next — LeafyGreen button with chevron icon
    const buttons = canvas.getAllByRole('button');
    // The second button is the "next" button
    const nextButton = buttons[1];
    await userEvent.click(nextButton);
    await expect(canvas.getByText('2 / 3')).toBeVisible();
  },
};
