import type { Meta, StoryObj } from '@storybook/react-vite';
import TaskStatusBadge from './index';
import { TaskStatus } from '../../../types/task';

const meta = {
  title: 'AI Generated/Simple/TaskStatusBadge',
  component: TaskStatusBadge,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TaskStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Succeeded: Story = {
  args: {
    status: TaskStatus.Succeeded,
  },
};

export const Failed: Story = {
  args: {
    status: TaskStatus.Failed,
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
