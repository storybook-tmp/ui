import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { TaskStatus } from "../../../types/task";
import TaskStatusBadge from "./index";

const meta = {
  component: TaskStatusBadge,
  tags: ["ai-generated"],
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

export const SetupFailed: Story = {
  args: {
    status: TaskStatus.SetupFailed,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Setup Failed")).toBeVisible();
  },
};

export const KnownIssue: Story = {
  args: {
    status: TaskStatus.KnownIssue,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Known Issue")).toBeVisible();
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
