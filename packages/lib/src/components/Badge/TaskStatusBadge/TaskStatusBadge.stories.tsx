import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import styled from '@emotion/styled';
import TaskStatusBadge from './index';
import { TaskStatus, TaskStatusUmbrella } from '../../../types/task';

const meta = {
  component: TaskStatusBadge,
  title: 'Components/Badge/TaskStatusBadge',
} satisfies Meta<typeof TaskStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

const BadgeGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Succeeded: Story = {
  args: {
    status: TaskStatus.Succeeded,
  },
  play: async (context) => {
    const canvas = context.canvas;
    const badge = await canvas.findByRole('img');
    await expect(badge).toBeVisible();
    await expect(canvas.getByText('Succeeded')).toBeInTheDocument();
  },
};

export const Failed: Story = {
  args: {
    status: TaskStatus.Failed,
  },
  play: async (context) => {
    const canvas = context.canvas;
    const badge = await canvas.findByRole('img');
    await expect(badge).toBeVisible();
    await expect(canvas.getByText('Failed')).toBeInTheDocument();
  },
};

export const Running: Story = {
  args: {
    status: TaskStatus.Started,
  },
  play: async (context) => {
    const canvas = context.canvas;
    const badge = await canvas.findByRole('img');
    await expect(badge).toBeVisible();
    await expect(canvas.getByText('Running')).toBeInTheDocument();
  },
};

export const WithTaskCount: Story = {
  args: {
    status: TaskStatus.Succeeded,
    taskCount: 5,
  },
  play: async (context) => {
    const canvas = context.canvas;
    const badge = await canvas.findByRole('img');
    await expect(badge).toBeVisible();
    await expect(canvas.getByText('5 Succeeded')).toBeInTheDocument();
  },
};

export const AllStatuses: Story = {
  render: () => (
    <BadgeGrid>
      <h3>Task Statuses</h3>
      <BadgeRow>
        <div>Succeeded:</div>
        <TaskStatusBadge status={TaskStatus.Succeeded} taskCount={3} />
      </BadgeRow>
      <BadgeRow>
        <div>Failed:</div>
        <TaskStatusBadge status={TaskStatus.Failed} taskCount={2} />
      </BadgeRow>
      <BadgeRow>
        <div>Running:</div>
        <TaskStatusBadge status={TaskStatus.Started} taskCount={1} />
      </BadgeRow>
      <BadgeRow>
        <div>Unstarted:</div>
        <TaskStatusBadge status={TaskStatus.Unstarted} taskCount={4} />
      </BadgeRow>
      <BadgeRow>
        <div>System Failed:</div>
        <TaskStatusBadge status={TaskStatus.SystemFailed} taskCount={1} />
      </BadgeRow>
      <BadgeRow>
        <div>Task Timed Out:</div>
        <TaskStatusBadge status={TaskStatus.TaskTimedOut} taskCount={1} />
      </BadgeRow>
      <h3>Umbrella Statuses</h3>
      <BadgeRow>
        <div>Scheduled:</div>
        <TaskStatusBadge status={TaskStatusUmbrella.Scheduled} taskCount={2} />
      </BadgeRow>
      <BadgeRow>
        <div>Running:</div>
        <TaskStatusBadge status={TaskStatusUmbrella.Running} taskCount={1} />
      </BadgeRow>
    </BadgeGrid>
  ),
  play: async (context) => {
    const canvas = context.canvas;
    // Just verify multiple badges are visible
    const badges = canvas.getAllByRole('img');
    await expect(badges.length).toBeGreaterThanOrEqual(8);
  },
};

export const Empty: Story = {
  args: {
    status: undefined,
  },
  play: async (context) => {
    const canvas = context.canvas;
    // When status is undefined, the component returns null
    await expect(canvas.queryByRole('img')).not.toBeInTheDocument();
  },
};
