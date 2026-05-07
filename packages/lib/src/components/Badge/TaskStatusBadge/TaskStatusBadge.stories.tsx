import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { TaskStatus, TaskStatusUmbrella } from "../../../types/task";
import TaskStatusBadge from ".";

const meta = {
  component: TaskStatusBadge,
  tags: ["ai-generated"],
} satisfies Meta<typeof TaskStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Failed: Story = {
  args: {
    status: TaskStatus.Failed,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Failed")).toBeInTheDocument();
  },
};

export const SetupFailed: Story = {
  args: {
    status: TaskStatus.SetupFailed,
  },
};

export const CountedRunning: Story = {
  args: {
    status: TaskStatusUmbrella.Running,
    taskCount: 7,
  },
};
