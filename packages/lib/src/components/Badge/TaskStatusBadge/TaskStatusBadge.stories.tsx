import type { Meta, StoryObj } from "@storybook/react-vite";
import { TaskStatus } from "../../../types/task";
import TaskStatusBadge from ".";

const meta = {
  title: "AI Generated/Simple/TaskStatusBadge",
  component: TaskStatusBadge,
  args: {
    status: TaskStatus.Succeeded,
  },
} satisfies Meta<typeof TaskStatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Succeeded: Story = {};

export const SetupFailedWithCount: Story = {
  args: {
    status: TaskStatus.SetupFailed,
    taskCount: 3,
  },
};
