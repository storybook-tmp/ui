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
    const badge = canvas.getByText('Succeeded');
    await expect(badge).toBeVisible();
  },
};

export const Failed: Story = {
  args: { status: TaskStatus.Failed },
};

export const Started: Story = {
  args: { status: TaskStatus.Started },
};

export const SetupFailed: Story = {
  args: { status: TaskStatus.SetupFailed },
};

export const SystemFailed: Story = {
  args: { status: TaskStatus.SystemFailed },
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
    // LeafyGreen Badge with Green variant applies a green background.
    const bgColor = getComputedStyle(badge).backgroundColor;
    // Verify that CSS loaded — the green variant should NOT be transparent or white.
    await expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
    await expect(bgColor).not.toBe('rgb(255, 255, 255)');
  },
};
