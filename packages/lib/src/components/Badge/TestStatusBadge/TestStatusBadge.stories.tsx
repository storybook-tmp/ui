import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { TestStatus } from "../../../types/test";
import TestStatusBadge from "./index";

const meta: Meta<typeof TestStatusBadge> = {
  component: TestStatusBadge,
  tags: ["ai-generated"],
};

export default meta;
type Story = StoryObj<typeof TestStatusBadge>;

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

export const Skip: Story = {
  args: {
    status: TestStatus.Skip,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Skip")).toBeVisible();
  },
};

export const SilentFail: Story = {
  args: {
    status: TestStatus.SilentFail,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Silent Fail")).toBeVisible();
  },
};
