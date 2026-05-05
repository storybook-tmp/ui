import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import TaskStatusBadge from './index';
import { TaskStatus } from '../../../types/task';

const meta = {
  component: TaskStatusBadge,
  tags: ['ai-generated'],
} satisfies Meta<typeof TaskStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Succeeded: Story = {
  args: {
    status: TaskStatus.Succeeded,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Succeeded')).toBeVisible();
  },
};

export const Failed: Story = {
  args: {
    status: TaskStatus.Failed,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Failed')).toBeVisible();
  },
};

export const SystemFailed: Story = {
  args: {
    status: TaskStatus.SystemFailed,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('System Failed')).toBeVisible();
  },
};

export const WithTaskCount: Story = {
  args: {
    status: TaskStatus.Failed,
    taskCount: 3,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('3 Failed')).toBeVisible();
  },
};
