import { fn } from 'storybook/test';
import preview from '#.storybook/preview';
import { expect } from 'storybook/test';
import Pagination from './index';

const meta = preview.meta({
  component: Pagination,
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
});

export default meta;

export const FirstPage = meta.story({
  args: {
    currentPage: 0,
    totalResults: 50,
    pageSize: 10,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / 5')).toBeVisible();
    // Prev button should be disabled on first page
    const buttons = canvas.getAllByRole('button');
    const prevButton = buttons[0];
    await expect(prevButton).toHaveAttribute('aria-disabled', 'true');
  },
});

export const MiddlePage = meta.story({
  args: {
    currentPage: 2,
    totalResults: 50,
    pageSize: 10,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('3 / 5')).toBeVisible();
  },
});

export const LastPage = meta.story({
  args: {
    currentPage: 4,
    totalResults: 50,
    pageSize: 10,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('5 / 5')).toBeVisible();
    // Next button should be disabled on last page
    const buttons = canvas.getAllByRole('button');
    const nextButton = buttons[buttons.length - 1];
    await expect(nextButton).toHaveAttribute('aria-disabled', 'true');
  },
});

export const WithCountLimit = meta.story({
  args: {
    currentPage: 0,
    totalResults: 1000,
    pageSize: 10,
    countLimit: 1000,
    onChange: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('1 / many')).toBeVisible();
  },
});
