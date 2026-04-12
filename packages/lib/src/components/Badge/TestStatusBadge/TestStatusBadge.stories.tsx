import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import TestStatusBadge from ".";

const meta = {
  component: TestStatusBadge,
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

export const SilentFail: Story = {
  args: {
    status: "silentFail",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Silent Fail")).toBeVisible();
  },
};

export const UnknownStatus: Story = {
  args: {
    status: "Custom Status",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Custom Status")).toBeVisible();
  },
};
