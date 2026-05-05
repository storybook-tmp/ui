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
  render: (args) => {
    const [page, setPage] = useState(args.currentPage);
    return <Pagination {...args} currentPage={page} onChange={setPage} />;
  },
  play: async ({ canvas, userEvent, canvasElement }) => {
    // Verify page display
    await expect(canvas.getByText('1 / 10')).toBeVisible();
    // Navigate to next page
    const nextButton = canvasElement.querySelector('[data-cy="next-page-button"]') as HTMLElement;
    await userEvent.click(nextButton);
    await expect(canvas.getByText('2 / 10')).toBeVisible();
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 9,
    totalResults: 100,
    pageSize: 10,
    onChange: () => {},
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
