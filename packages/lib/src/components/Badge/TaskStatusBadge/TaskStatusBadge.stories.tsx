import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { TaskStatus } from "../../../types/task";
import TaskStatusBadge from ".";

const meta = {
  component: TaskStatusBadge,
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

export const SetupFailed: Story = {
  args: {
    status: TaskStatus.SetupFailed,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Setup Failed")).toBeVisible();
  },
};

export const GroupedCount: Story = {
  args: {
    status: TaskStatus.Failed,
    taskCount: 4,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("4 Failed")).toBeVisible();
  },
};
