import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import TestStatusBadge from "./index";

const meta = {
  component: TestStatusBadge,
  tags: ["ai-generated"],
} satisfies Meta<typeof TestStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pass: Story = {
  args: {
    status: "pass",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Pass")).toBeVisible();
  },
};

export const Fail: Story = {
  args: {
    status: "fail",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Fail")).toBeVisible();
  },
};

export const Skip: Story = {
  args: {
    status: "skip",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Skip")).toBeVisible();
  },
};

export const SilentFail: Story = {
  args: {
    status: "silentfail",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Silent Fail")).toBeVisible();
  },
};
