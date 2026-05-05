import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TaskStatus } from '../../../types/task';
import TaskStatusBadge from './index';

const meta = {
  component: TaskStatusBadge,
  tags: ['ai-generated'],
} satisfies Meta<typeof TaskStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Succeeded: Story = {
  args: { status: TaskStatus.Succeeded },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Succeeded')).toBeVisible();
  },
};

export const Failed: Story = {
  args: { status: TaskStatus.Failed },
};

export const Running: Story = {
  args: { status: TaskStatus.Started },
};

export const SystemFailed: Story = {
  args: { status: TaskStatus.SystemFailed },
};

export const SetupFailed: Story = {
  args: { status: TaskStatus.SetupFailed },
};

export const KnownIssue: Story = {
  args: { status: TaskStatus.KnownIssue },
};

export const WithTaskCount: Story = {
  args: { status: TaskStatus.Failed, taskCount: 5 },
};

export const CssCheck: Story = {
  args: { status: TaskStatus.Succeeded },
  play: async ({ canvas }) => {
    const badge = canvas.getByText('Succeeded');
    // LeafyGreen Badge with Green variant renders with a green-tinted background
    const bg = getComputedStyle(badge).backgroundColor;
    // Verify that the badge has a non-transparent background color (CSS loaded)
    await expect(bg).not.toBe('');
    await expect(bg).not.toBe('rgba(0, 0, 0, 0)');
  },
};
