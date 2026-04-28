import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { TaskStatus } from "../../../types/task";
import TaskStatusBadge from "./index";

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

export const Failed: Story = {
  args: {
    status: TaskStatus.Failed,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Failed")).toBeVisible();
  },
};

export const Running: Story = {
  args: {
    status: TaskStatus.Started,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Running")).toBeVisible();
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

export const WithTaskCount: Story = {
  args: {
    status: TaskStatus.Failed,
    taskCount: 3,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("3 Failed")).toBeVisible();
  },
};
