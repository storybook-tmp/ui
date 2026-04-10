import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import TestStatusBadge from ".";

const meta = {
  component: TestStatusBadge,
  title: "Components/Badge/TestStatusBadge",
} satisfies Meta<typeof TestStatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Pass: Story = {
  args: {
    status: "pass",
  },
  play: async ({ mount }) => {
    const canvas = await mount(<TestStatusBadge status="pass" />);
    const badge = await canvas.findByText("Pass");

    await expect(badge).toBeVisible();
    await expect(badge).toHaveTextContent("Pass");
  },
};

export const SilentFail: Story = {
  args: {
    status: "silentfail",
  },
  play: async ({ mount }) => {
    const canvas = await mount(<TestStatusBadge status="silentfail" />);
    const badge = await canvas.findByText("Silent Fail");

    await expect(badge).toBeVisible();
    await expect(badge).toHaveTextContent("Silent Fail");
  },
};

export const UnknownStatus: Story = {
  args: {
    status: "pending",
  },
  play: async ({ mount }) => {
    const canvas = await mount(<TestStatusBadge status="pending" />);
    const badge = await canvas.findByText("pending");

    await expect(badge).toBeVisible();
    await expect(badge).toHaveTextContent("pending");
  },
};
