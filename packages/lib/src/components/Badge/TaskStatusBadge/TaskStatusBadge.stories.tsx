import type { Meta, StoryObj } from '@storybook/react-vite';
import TaskStatusBadge from './index';
import { TaskStatus } from '../../../types/task';

const meta = {
  component: TaskStatusBadge,
  tags: ['ai-generated'],
} satisfies Meta<typeof TaskStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Succeeded: Story = {
  args: { status: TaskStatus.Succeeded },
};

export const Failed: Story = {
  args: { status: TaskStatus.Failed },
};

export const Started: Story = {
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

export const Undispatched: Story = {
  args: { status: TaskStatus.Undispatched },
};
