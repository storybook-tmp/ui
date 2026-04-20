import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { TestStatus } from "../../../types/test";
import TestStatusBadge from ".";

const meta = {
  component: TestStatusBadge,
} satisfies Meta<typeof TestStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pass: Story = {
  args: {
    status: TestStatus.Pass,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Pass")).toBeVisible();
  },
};

export const Fail: Story = {
  args: {
    status: TestStatus.Fail,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Fail")).toBeVisible();
  },
};

export const UnknownStatus: Story = {
  args: {
    status: "quarantined",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("quarantined")).toBeVisible();
  },
};
