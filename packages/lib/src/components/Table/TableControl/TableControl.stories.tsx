import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import TableControl from './index';

const meta = {
  component: TableControl,
  tags: ['ai-generated'],
  args: {
    filteredCount: 42,
    totalCount: 100,
    limit: 10,
    page: 0,
    label: 'tasks',
    onClear: fn(),
    onPageSizeChange: fn(),
    onPageChange: fn(),
  },
} satisfies Meta<typeof TableControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('42')).toBeVisible();
    await expect(canvas.getByRole('button', { name: /clear all filters/i })).toBeVisible();
  },
};

export const AllResults: Story = {
  args: {
    filteredCount: 100,
    totalCount: 100,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvas }) => {
    // LeafyGreen Button uses aria-disabled rather than the disabled attribute
    await expect(canvas.getByRole('button', { name: /clear all filters/i })).toHaveAttribute('aria-disabled', 'true');
  },
};
