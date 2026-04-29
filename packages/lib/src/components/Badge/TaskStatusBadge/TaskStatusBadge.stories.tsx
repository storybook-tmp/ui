import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import TaskStatusBadge from '.';
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
    const badge = canvas.getByText('Succeeded');
    await expect(badge).toHaveAttribute('data-cy', 'task-status-badge');
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

export const Started: Story = {
  args: {
    status: TaskStatus.Started,
  },
};

export const WithTaskCount: Story = {
  args: {
    status: TaskStatus.Failed,
    taskCount: 5,
  },
};

export const KnownIssue: Story = {
  args: {
    status: TaskStatus.KnownIssue,
  },
};

export const CssCheck: Story = {
  args: {
    status: TaskStatus.Succeeded,
  },
  play: async ({ canvas }) => {
    const badge = canvas.getByText('Succeeded');
    // LeafyGreen Badge with Green variant renders with a green-tinted background
    const bg = getComputedStyle(badge).backgroundColor;
    // The badge should have a non-transparent, non-white background color when CSS loads
    await expect(bg).not.toBe('rgba(0, 0, 0, 0)');
    await expect(bg).not.toBe('transparent');
  },
};
