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

export const SystemFailed: Story = {
  args: { status: TaskStatus.SystemFailed },
};

export const SetupFailed: Story = {
  args: { status: TaskStatus.SetupFailed },
};

export const Started: Story = {
  args: { status: TaskStatus.Started },
};

export const KnownIssue: Story = {
  args: { status: TaskStatus.KnownIssue },
};

export const WithTaskCount: Story = {
  args: { status: TaskStatus.Failed, taskCount: 5 },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('5 Failed')).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: { status: TaskStatus.Succeeded },
  play: async ({ canvas }) => {
    const badge = canvas.getByText('Succeeded');
    // LeafyGreen Badge with Variant.Green renders with a green background
    const bg = getComputedStyle(badge).backgroundColor;
    await expect(bg).not.toBe('');
    await expect(bg).not.toBe('rgba(0, 0, 0, 0)');
  },
};
