import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { TaskStatus } from "../../../types/task";
import TaskStatusBadge from "./index";

const meta: Meta<typeof TaskStatusBadge> = {
  component: TaskStatusBadge,
  tags: ["ai-generated"],
};

export default meta;
type Story = StoryObj<typeof TaskStatusBadge>;

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

export const SystemFailed: Story = {
  args: {
    status: TaskStatus.SystemFailed,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("System Failed")).toBeVisible();
  },
};

export const WithTaskCount: Story = {
  args: {
    status: TaskStatus.Failed,
    taskCount: 5,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("5 Failed")).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    status: TaskStatus.Succeeded,
  },
  play: async ({ canvas }) => {
    const badge = canvas.getByText("Succeeded");
    const style = getComputedStyle(badge);
    // LeafyGreen Badge Green variant applies a green background
    await expect(style.backgroundColor).not.toBe("");
    await expect(style.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  },
};
