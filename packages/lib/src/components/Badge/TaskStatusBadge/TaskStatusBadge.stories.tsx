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
  args: { status: TaskStatus.Succeeded },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Succeeded')).toBeVisible();
    // Verify the badge renders with the correct data-cy attribute
    await expect(canvas.getByText('Succeeded').closest('[data-cy="task-status-badge"]')).toBeVisible();
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

export const Running: Story = {
  args: { status: TaskStatus.Started },
};

export const WithTaskCount: Story = {
  args: { status: TaskStatus.Failed, taskCount: 5 },
};

export const KnownIssue: Story = {
  args: { status: TaskStatus.KnownIssue },
};

export const CssCheck: Story = {
  args: { status: TaskStatus.Succeeded },
  play: async ({ canvas }) => {
    const badge = canvas.getByText('Succeeded');
    // LeafyGreen Badge with Green variant applies a green background.
    // This verifies that Emotion styles + LeafyGreen CSS are loaded.
    const bg = getComputedStyle(badge).backgroundColor;
    // The badge should have a non-transparent background color
    await expect(bg).not.toBe('rgba(0, 0, 0, 0)');
    await expect(bg).not.toBe('transparent');
  },
};
