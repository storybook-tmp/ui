import type { Meta, StoryObj } from "@storybook/react-vite";
import { TaskStatus } from "../../../types/task";
import TaskStatusBadge from ".";

const meta = {
  component: TaskStatusBadge,
  args: {
    status: TaskStatus.Succeeded,
  },
} satisfies Meta<typeof TaskStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Succeeded: Story = {
  render: () => <TaskStatusBadge status={TaskStatus.Succeeded} />,
};

export const Failed: Story = {
  render: () => <TaskStatusBadge status={TaskStatus.Failed} />,
};

export const Running: Story = {
  render: () => <TaskStatusBadge status={TaskStatus.Started} />,
};

export const SystemFailed: Story = {
  render: () => <TaskStatusBadge status={TaskStatus.SystemFailed} />,
};

export const SetupFailed: Story = {
  render: () => <TaskStatusBadge status={TaskStatus.SetupFailed} />,
};

export const KnownIssue: Story = {
  render: () => <TaskStatusBadge status={TaskStatus.KnownIssue} />,
};

export const WithTaskCount: Story = {
  render: () => (
    <TaskStatusBadge status={TaskStatus.Failed} taskCount={12} />
  ),
};

export const Undispatched: Story = {
  render: () => <TaskStatusBadge status={TaskStatus.Undispatched} />,
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {Object.values(TaskStatus).map((status) => (
        <TaskStatusBadge key={status} status={status} />
      ))}
    </div>
  ),
};
