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

export const Running: Story = {
  args: {
    status: TaskStatus.Started,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Running')).toBeVisible();
  },
};

export const SetupFailed: Story = {
  args: {
    status: TaskStatus.SetupFailed,
  },
  play: async ({ canvas }) => {
    const badge = canvas.getByText('Setup Failed');
    await expect(badge).toBeVisible();
  },
};

export const WithCount: Story = {
  args: {
    status: TaskStatus.Failed,
    taskCount: 5,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('5 Failed')).toBeVisible();
  },
};
