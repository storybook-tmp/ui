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
};

export const SystemFailed: Story = {
  args: {
    status: TaskStatus.SystemFailed,
  },
};

export const SetupFailed: Story = {
  args: {
    status: TaskStatus.SetupFailed,
  },
};

export const Running: Story = {
  args: {
    status: TaskStatus.Started,
  },
};

export const KnownIssue: Story = {
  args: {
    status: TaskStatus.KnownIssue,
  },
};

export const WithTaskCount: Story = {
  args: {
    status: TaskStatus.Failed,
    taskCount: 3,
  },
};

export const Pending: Story = {
  args: {
    status: TaskStatus.Pending,
  },
};

export const CssCheck: Story = {
  args: {
    status: TaskStatus.Succeeded,
  },
  play: async ({ canvas }) => {
    const badge = canvas.getByText('Succeeded');
    // LeafyGreen Badge with Green variant applies a green background
    const bgColor = getComputedStyle(badge).backgroundColor;
    // Verify it's not unstyled (default transparent/white)
    await expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
    await expect(bgColor).not.toBe('transparent');
  },
};
