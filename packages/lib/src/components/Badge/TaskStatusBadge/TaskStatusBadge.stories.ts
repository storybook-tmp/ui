import type { Meta, StoryObj } from '@storybook/react';
import { TaskStatus } from '../../../types/task';
import TaskStatusBadge from './index';

const meta = {
  title: 'AI Generated/Simple/TaskStatusBadge',
  component: TaskStatusBadge,
} satisfies Meta<typeof TaskStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    status: TaskStatus.Succeeded,
    taskCount: 5,
  },
};

export const Failed: Story = {
  args: {
    status: TaskStatus.Failed,
    taskCount: 2,
  },
};
