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

export const Failed: Story = {
  args: {
    status: TaskStatus.Failed,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Failed")).toBeVisible();
  },
};

export const WithTaskCount: Story = {
  args: {
    status: TaskStatus.Succeeded,
    taskCount: 12,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("12 Succeeded")).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    status: TaskStatus.SetupFailed,
  },
  play: async ({ canvas }) => {
    const badge = canvas
      .getByText("Setup Failed")
      .closest('[data-cy="task-status-badge"]');
    await expect(badge).toBeVisible();
    await expect(getComputedStyle(badge as Element).backgroundColor).toBe(
      "rgb(241, 212, 253)",
    );
  },
};
