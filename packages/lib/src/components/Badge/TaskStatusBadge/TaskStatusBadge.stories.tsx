import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { TaskStatus } from "../../../types/task";
import TaskStatusBadge from ".";

const meta = {
  component: TaskStatusBadge,
  title: "Components/Badge/TaskStatusBadge",
} satisfies Meta<typeof TaskStatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Succeeded: Story = {
  args: {
    status: TaskStatus.Succeeded,
  },
  play: async ({ mount }) => {
    const canvas = await mount(<TaskStatusBadge status={TaskStatus.Succeeded} />);
    const badge = await canvas.findByText("Succeeded");

    await expect(badge).toBeVisible();
    await expect(badge).toHaveTextContent("Succeeded");
  },
};

export const CountedKnownIssue: Story = {
  args: {
    status: TaskStatus.KnownIssue,
    taskCount: 2,
  },
  play: async ({ mount }) => {
    const canvas = await mount(
      <TaskStatusBadge status={TaskStatus.KnownIssue} taskCount={2} />,
    );
    const badge = await canvas.findByText("2 Known Issue");

    await expect(badge).toBeVisible();
    await expect(badge).toHaveTextContent("2 Known Issue");
  },
};

export const SystemFailure: Story = {
  args: {
    status: TaskStatus.SystemFailed,
    taskCount: 5,
  },
  play: async ({ mount }) => {
    const canvas = await mount(
      <TaskStatusBadge status={TaskStatus.SystemFailed} taskCount={5} />,
    );
    const badge = await canvas.findByText("5 System Failed");

    await expect(badge).toBeVisible();
    await expect(window.getComputedStyle(badge).backgroundColor).not.toBe(
      "rgba(0, 0, 0, 0)",
    );
  },
};
