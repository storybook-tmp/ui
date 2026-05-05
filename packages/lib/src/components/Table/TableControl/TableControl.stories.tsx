import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import TableControl from './index';

const meta = {
  component: TableControl,
  tags: ['ai-generated'],
} satisfies Meta<typeof TableControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filteredCount: 25,
    totalCount: 100,
    limit: 10,
    page: 0,
    label: 'tasks',
    onClear: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('25')).toBeVisible();
    await expect(canvas.getByText('100')).toBeVisible();
    await expect(canvas.getByText('tasks')).toBeVisible();
    await expect(canvas.getByRole('button', { name: /clear all filters/i })).toBeVisible();
  },
};

export const NoResults: Story = {
  args: {
    filteredCount: 0,
    totalCount: 50,
    limit: 10,
    page: 0,
    label: 'items',
    onClear: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('0')).toBeVisible();
    await expect(canvas.getByText('50')).toBeVisible();
    await expect(canvas.getByText('items')).toBeVisible();
  },
};

export const ClearFilters: Story = {
  args: {
    filteredCount: 15,
    totalCount: 30,
    limit: 10,
    page: 0,
    label: 'results',
    onClear: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const clearButton = canvas.getByRole('button', { name: /clear all filters/i });
    await userEvent.click(clearButton);
    await expect(args.onClear).toHaveBeenCalled();
  },
};
