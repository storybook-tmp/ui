import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ResultCountLabel } from './index';

const meta = {
  component: ResultCountLabel,
  tags: ['ai-generated'],
} satisfies Meta<typeof ResultCountLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    numerator: 25,
    denominator: 100,
    label: 'tasks',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('25')).toBeVisible();
    await expect(canvas.getByText('100')).toBeVisible();
    await expect(canvas.getByText('tasks', { exact: false })).toBeVisible();
  },
};

export const AllResults: Story = {
  args: {
    numerator: 50,
    denominator: 50,
    label: 'items',
  },
};

export const NoResults: Story = {
  args: {
    numerator: 0,
    denominator: 0,
    label: 'tests',
  },
};
