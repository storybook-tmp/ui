import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { TaskStatus } from "../../../types/task";
import TaskStatusBadge from ".";

const meta = {
  component: TaskStatusBadge,
  tags: ["ai-generated"],
} satisfies Meta<typeof TaskStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Succeeded: Story = {
  args: {
    status: TaskStatus.Succeeded,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Succeeded")).toBeVisible();
  },
};

export const KnownIssueCount: Story = {
  args: {
    status: TaskStatus.KnownIssue,
    taskCount: 2,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("2 Known Issue")).toBeVisible();
  },
};

export const SystemFailure: Story = {
  args: {
    status: TaskStatus.SystemFailed,
  },
  play: async ({ canvas }) => {
    const badge = canvas.getByText("System Failed");
    await expect(badge).toBeVisible();
    await expect(badge).toHaveAttribute("data-cy", "task-status-badge");
  },
};
