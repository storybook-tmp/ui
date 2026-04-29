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
  args: {
    onChange: () => {},
  },
  play: async ({ canvasElement }) => {
    const prevButton = canvasElement.querySelector('[data-cy="prev-page-button"]');
    await expect(prevButton).toHaveAttribute('aria-disabled', 'true');
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 4,
    onChange: () => {},
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 9,
    onChange: () => {},
  },
  play: async ({ canvasElement }) => {
    const nextButton = canvasElement.querySelector('[data-cy="next-page-button"]');
    await expect(nextButton).toHaveAttribute('aria-disabled', 'true');
  },
};

export const WithCountLimit: Story = {
  args: {
    currentPage: 0,
    countLimit: 50,
    totalResults: 100,
    onChange: () => {},
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [page, setPage] = useState(0);
    return <Pagination {...args} currentPage={page} onChange={setPage} />;
  },
  args: {
    totalResults: 50,
    pageSize: 10,
  },
  play: async ({ canvasElement, userEvent }) => {
    const nextButton = canvasElement.querySelector('[data-cy="next-page-button"]')!;
    await userEvent.click(nextButton);
    const pageLabel = canvasElement.querySelector('[data-cy="pagination"]');
    await expect(pageLabel).toHaveTextContent('2 / 5');
  },
};
