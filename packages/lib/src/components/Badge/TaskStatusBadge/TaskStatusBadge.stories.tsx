import preview from '#.storybook/preview';
import { expect } from 'storybook/test';
import { TaskStatus } from '../../../types/task';
import TaskStatusBadge from './index';

const meta = preview.meta({
  component: TaskStatusBadge,
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
});

export default meta;

export const Succeeded = meta.story({
  args: {
    status: TaskStatus.Succeeded,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Succeeded')).toBeVisible();
  },
});

export const Failed = meta.story({
  args: {
    status: TaskStatus.Failed,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Failed')).toBeVisible();
  },
});

export const Running = meta.story({
  args: {
    status: TaskStatus.Started,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Running')).toBeVisible();
  },
});

export const SetupFailed = meta.story({
  args: {
    status: TaskStatus.SetupFailed,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Setup Failed')).toBeVisible();
  },
});

export const WithTaskCount = meta.story({
  args: {
    status: TaskStatus.Failed,
    taskCount: 3,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('3 Failed')).toBeVisible();
  },
});

export const SystemFailed = meta.story({
  args: {
    status: TaskStatus.SystemFailed,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('System Failed')).toBeVisible();
  },
});
