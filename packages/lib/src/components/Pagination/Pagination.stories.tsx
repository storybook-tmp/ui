import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';
import { useState } from 'react';
import Pagination from './index';

const meta = {
  component: Pagination,
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const PaginationWithState = ({ initialPage = 0 }) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  return (
    <Pagination
      currentPage={currentPage}
      onChange={setCurrentPage}
      totalResults={100}
      pageSize={10}
    />
  );
};

export const FirstPage: Story = {
  render: () => <PaginationWithState initialPage={0} />,
  play: async (context) => {
    const canvas = context.canvas;
    await expect(canvas.getByText('1 / 10')).toBeVisible();
    const prevButton = await canvas.findByRole('button');
    // Previous button should be disabled on first page
    const buttons = canvas.getAllByRole('button');
    await expect(buttons[0]).toBeDisabled();
  },
};

export const MiddlePage: Story = {
  render: () => <PaginationWithState initialPage={4} />,
  play: async (context) => {
    const canvas = context.canvas;
    await expect(canvas.getByText('5 / 10')).toBeVisible();
    const buttons = canvas.getAllByRole('button');
    // Both buttons should be enabled in the middle
    await expect(buttons[0]).not.toBeDisabled();
    await expect(buttons[1]).not.toBeDisabled();
  },
};

export const LastPage: Story = {
  render: () => <PaginationWithState initialPage={9} />,
  play: async (context) => {
    const canvas = context.canvas;
    await expect(canvas.getByText('10 / 10')).toBeVisible();
    const buttons = canvas.getAllByRole('button');
    // Next button should be disabled on last page
    await expect(buttons[1]).toBeDisabled();
  },
};

export const WithCountLimit: Story = {
  render: () => (
    <Pagination
      currentPage={0}
      totalResults={1000}
      pageSize={50}
      countLimit={1000}
    />
  ),
  play: async (context) => {
    const canvas = context.canvas;
    // When totalResults >= countLimit, denominator shows "many"
    await expect(canvas.getByText('1 / many')).toBeVisible();
  },
};

export const SinglePage: Story = {
  render: () => (
    <Pagination
      currentPage={0}
      totalResults={5}
      pageSize={10}
    />
  ),
  play: async (context) => {
    const canvas = context.canvas;
    await expect(canvas.getByText('1 / 1')).toBeVisible();
    const buttons = canvas.getAllByRole('button');
    // Next button should be disabled when there's only one page
    await expect(buttons[1]).toBeDisabled();
  },
};

export const Navigation: Story = {
  render: () => <PaginationWithState initialPage={2} />,
  play: async (context) => {
    const canvas = context.canvas;
    const userEvent = context.userEvent;

    // Start on page 3 (index 2)
    await expect(canvas.getByText('3 / 10')).toBeVisible();

    const buttons = canvas.getAllByRole('button');
    await userEvent.click(buttons[1]);

    // Should now be on page 4 (index 3)
    await expect(canvas.getByText('4 / 10')).toBeVisible();
  },
};
