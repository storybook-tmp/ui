import type { Meta, StoryObj } from "@storybook/react-vite";
import { TaskStatus } from "../../../types/task";
import TaskStatusBadge from ".";

const meta = {
  title: "AI Generated/Simple/TaskStatusBadge",
  component: TaskStatusBadge,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TaskStatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Succeeded: Story = {
  args: {
    status: TaskStatus.Succeeded,
  },
};

export const KnownIssueWithCount: Story = {
  args: {
    status: TaskStatus.KnownIssue,
    taskCount: 2,
  },
};
